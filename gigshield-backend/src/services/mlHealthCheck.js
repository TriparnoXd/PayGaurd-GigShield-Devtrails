const axios = require('axios');

/**
 * Check ML service health.
 * Returns { healthy: boolean, details?: object }
 */
async function checkMLHealth() {
  try {
    const res = await axios.get(
      `${process.env.ML_SERVICE_URL}/ml/health`,
      { timeout: 3000 }
    );
    return { healthy: true, details: res.data };
  } catch (err) {
    return {
      healthy: false,
      details: {
        error: err.message,
        code: err.code || 'UNKNOWN',
        status: err.response?.status || null,
      },
    };
  }
}

module.exports = { checkMLHealth };
