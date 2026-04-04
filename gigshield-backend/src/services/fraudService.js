const axios = require('axios');

/**
 * Get fraud score from ML service.
 * Throws on failure — no silent fallback.
 *
 * @param {string} worker_id
 * @param {string} trigger_type
 * @param {string} zone
 * @returns {Promise<number>} fraud score (0-100)
 */
async function getFraudScore(worker_id, trigger_type, zone) {
  const mlUrl = `${process.env.ML_SERVICE_URL}/ml/fraud/score`;

  try {
    const res = await axios.post(
      mlUrl,
      { worker_id, trigger_type, zone },
      { timeout: 5000 }
    );

    if (!res.data || typeof res.data.fraud_score !== 'number') {
      const msg = `Invalid ML response for fraud score: ${JSON.stringify(res.data)}`;
      console.error(`[FRAUD SERVICE] ${msg}`);
      throw new Error(msg);
    }

    return res.data.fraud_score;
  } catch (err) {
    if (err.response) {
      const msg = `ML service returned ${err.response.status}: ${JSON.stringify(err.response.data)}`;
      console.error(`[FRAUD SERVICE] ${msg}`);
      throw new Error(msg);
    } else if (err.code === 'ECONNABORTED') {
      const msg = 'ML service request timed out (5s)';
      console.error(`[FRAUD SERVICE] ${msg}`);
      throw new Error(msg);
    } else {
      const msg = `ML service unavailable: ${err.message}`;
      console.error(`[FRAUD SERVICE] ${msg}`);
      throw new Error(`ML service unavailable — cannot compute fraud score`);
    }
  }
}

/**
 * Determine claim status from fraud score
 * @param {number} fraudScore
 * @returns {string} claim status
 */
function getStatusFromFraudScore(fraudScore) {
  if (fraudScore > 85) return 'rejected';
  if (fraudScore > 60) return 'soft_hold';
  if (fraudScore > 30) return 'verifying';
  return 'approved';
}

module.exports = { getFraudScore, getStatusFromFraudScore };
