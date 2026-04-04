const axios = require('axios');

/**
 * Get premium multiplier from ML service.
 * Throws on failure — no silent fallback.
 *
 * @param {string} worker_id
 * @param {string} plan
 * @returns {Promise<number>} multiplier
 */
async function getPremiumMultiplier(worker_id, plan) {
  const mlUrl = `${process.env.ML_SERVICE_URL}/ml/premium/calculate`;

  try {
    const res = await axios.post(
      mlUrl,
      { worker_id, plan },
      { timeout: 5000 }
    );

    if (!res.data || typeof res.data.multiplier !== 'number') {
      const msg = `Invalid ML response for premium: ${JSON.stringify(res.data)}`;
      console.error(`[PREMIUM SERVICE] ${msg}`);
      throw new Error(msg);
    }

    return res.data.multiplier;
  } catch (err) {
    if (err.response) {
      // ML service responded with error status
      const msg = `ML service returned ${err.response.status}: ${JSON.stringify(err.response.data)}`;
      console.error(`[PREMIUM SERVICE] ${msg}`);
      throw new Error(msg);
    } else if (err.code === 'ECONNABORTED') {
      const msg = 'ML service request timed out (5s)';
      console.error(`[PREMIUM SERVICE] ${msg}`);
      throw new Error(msg);
    } else {
      // Network / DNS / connection refused
      const msg = `ML service unavailable: ${err.message}`;
      console.error(`[PREMIUM SERVICE] ${msg}`);
      throw new Error(`ML service unavailable — cannot calculate premium`);
    }
  }
}

module.exports = { getPremiumMultiplier };
