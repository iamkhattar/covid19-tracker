const axios = require("axios");
const chalk = require("chalk");

/**
 * Gets Global Summary from the Covid19 API
 */
const getSummary = async () => {
  try {
    const res = await axios.get("https://api.covid19api.com/summary");
    return res.data.Global;
  } catch (err) {
    console.log(chalk.red.bold("An Error Occured!!"));
  }
};

/**
 * Gets Country Slugs from the Covid19 API
 */
const getSlugs = async () => {
  try {
    const res = await axios.get("https://api.covid19api.com/countries");
    return res.data;
  } catch (err) {
    console.log(chalk.red.bold("An Error Occured!!"));
  }
};

const getCountrySummary = async (slug) => {
  try {
    var url = "";
    console.log(url);
    //const res = await axios.get
  } catch (err) {
    console.log(chalk.red.bold("An Error Occured!!"));
  }
};

module.exports.getSummary = getSummary;
module.exports.getSlugs = getSlugs;
module.exports.getCountrySummary = getCountrySummary;
