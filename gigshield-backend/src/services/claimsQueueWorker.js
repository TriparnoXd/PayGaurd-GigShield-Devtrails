// Continuously reads from Redis claims queue and initiates claims
const redis = require('../config/redis');
const supabase = require('../config/supabase');
const { getFraudScore, getStatusFromFraudScore } = require('../services/fraudService');
const notifyService = require('../services/notifyService');

// UUID validation regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Valid trigger types
const VALID_TRIGGER_TYPES = ['heavy_rainfall', 'severe_aqi', 'extreme_heat', 'platform_outage'];

async function processClaimsQueue() {
  console.log('[CLAIMS QUEUE] Worker started');

  while (true) {
    try {
      const item = await redis.brpop('claims:queue', 5);

      if (!item) continue;

      const payload = JSON.parse(item[1]);
      const { trigger_event_id, trigger_type, zone, disruption_start } = payload;

      // Input validation
      if (!trigger_event_id || !trigger_type || !zone || !disruption_start) {
        console.error('[QUEUE ERROR] Invalid payload received, skipping:', JSON.stringify(payload));
        continue;
      }

      if (!UUID_REGEX.test(trigger_event_id)) {
        console.error('[QUEUE ERROR] Invalid trigger event ID format, skipping:', trigger_event_id);
        continue;
      }

      if (!VALID_TRIGGER_TYPES.includes(trigger_type)) {
        console.error('[QUEUE ERROR] Invalid trigger type, skipping:', trigger_type);
        continue;
      }

      const disruptionStartDate = new Date(disruption_start);
      if (isNaN(disruptionStartDate.getTime())) {
        console.error('[QUEUE ERROR] Invalid disruption_start timestamp, skipping:', disruption_start);
        continue;
      }

      // Find all workers with ACTIVE policies in this zone
      // NOTE: .eq('policies.status', 'active') ensures only active policies are joined
      const { data: workers, error } = await supabase
        .from('workers')
        .select('id, avg_active_hrs, avg_weekly_earn, fcm_token, policies!inner(id)')
        .eq('zone', zone)
        .eq('policies.status', 'active');

      if (error) {
        console.error('[QUEUE ERROR] Failed to fetch workers:', error.message);
        await new Promise(resolve => setTimeout(resolve, 5000));
        continue;
      }

      if (!workers || workers.length === 0) {
        console.log(`[QUEUE] No workers with active policies in ${zone}`);
        continue;
      }

      for (const worker of workers) {
        try {
          // Extract active policy ID from nested join
          const activePolicy = worker.policies?.[0];
          if (!activePolicy) {
            console.error(`[QUEUE ERROR] Worker ${worker.id} has no active policy — skipping`);
            continue;
          }

          // Fetch full policy record (the join above only selected id)
          const { data: policyRecord } = await supabase
            .from('policies')
            .select('*')
            .eq('worker_id', worker.id)
            .eq('status', 'active')
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

          if (!policyRecord) {
            console.error(`[QUEUE ERROR] No active policy record for worker ${worker.id} — skipping`);
            continue;
          }

          // Get fraud score — throws if ML unavailable (no silent fallback)
          let fraudScore;
          try {
            fraudScore = await getFraudScore(worker.id, trigger_type, zone);
          } catch (mlErr) {
            console.error(`[QUEUE ERROR] ML failure for worker ${worker.id}: ${mlErr.message}`);
            // Re-queue the item for later retry
            await redis.lpush('claims:queue', JSON.stringify(payload));
            console.error('[QUEUE ERROR] Item re-queued, backing off 30s');
            await new Promise(resolve => setTimeout(resolve, 30000));
            break; // Exit worker loop to retry from top
          }

          const status = getStatusFromFraudScore(fraudScore);

          // Validate worker data
          if (!worker.avg_weekly_earn || !worker.avg_active_hrs || worker.avg_active_hrs <= 0) {
            console.error(`[QUEUE ERROR] Invalid worker data for ${worker.id}, skipping`);
            continue;
          }

          const hourlyRate = worker.avg_weekly_earn / (worker.avg_active_hrs * 7);

          const year = new Date().getFullYear();
          const randomNum = String(Math.floor(Math.random() * 9000) + 1000).padStart(4, '0');
          const claimNumber = `GS-${year}-${randomNum}`;

          const { data: claim, error: claimError } = await supabase
            .from('claims')
            .insert({
              claim_number: claimNumber,
              worker_id: worker.id,
              policy_id: policyRecord.id,
              trigger_event_id,
              trigger_type,
              zone,
              disruption_start: disruptionStartDate.toISOString(),
              hourly_rate: parseFloat(hourlyRate.toFixed(2)),
              fraud_score: fraudScore,
              status,
              upi_id: `${worker.id.substring(0, 8)}@upi`
            })
            .select()
            .single();

          if (claimError) {
            console.error('[QUEUE ERROR] Failed to create claim:', claimError.message);
            continue;
          }

          console.log(`[CLAIM] Created ${claimNumber} for worker ${worker.id} — status: ${status}, fraud_score: ${fraudScore}`);

          if (worker.fcm_token) {
            try {
              await notifyService.sendClaimCreatedNotification(
                worker.fcm_token,
                claim.claim_number,
                claim.status
              );
            } catch (notifyErr) {
              console.error('[QUEUE ERROR] Notification failed:', notifyErr.message);
            }
          }
        } catch (workerErr) {
          console.error('[QUEUE ERROR] Failed to process worker:', workerErr.message);
        }
      }
    } catch (err) {
      console.error('[QUEUE ERROR] Unhandled queue error:', err.message);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

module.exports = { processClaimsQueue };
