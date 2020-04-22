const axios = require("axios");

/**
 * Gets Global Summary from the Covid19 API
 */
const getSummary = async () => {
  try {
    const res = await axios.get("https://api.covid19api.com/summary");
    return res.data.Global;
  } catch (err) {
    return err;
  }
};

module.exports.getSummary = getSummary;
