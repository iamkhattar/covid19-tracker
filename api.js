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
 * Gets Country Summary from the Covid19 API
 */
const getAllCountrySummary = async () => {
  try {
    const res = await axios.get("https://api.covid19api.com/summary");
    return res.data.Countries;
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
    var data = res.data;
    data.sort(sortSlugs("Country"));
    return data;
  } catch (err) {
    console.log(chalk.red.bold("An Error Occured!!"));
  }
};

/**
 * Gets Country Summary data from the Covid19 API
 * @param {String} slug this is the unique identifier for a country
 */
const getCountrySummary = async (slug) => {
  try {
    var url = "https://api.covid19api.com/total/dayone/country/" + slug;
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log(chalk.red.bold("An Error Occured!!"));
  }
};

/**
 * Gets Live Country Statistics from the Covid19 API
 * @param {*} countrySummary response from querying getCountrySummary()
 */
const getCountryLive = async (countrySummary) => {
  return totalLiveCaes(countrySummary);
};
/**
 * Totals all case data for a country
 * @param {Object} obj this is the object containing the history statistics for a country
 */
function totalLiveCaes(obj) {
  var confirmed = 0;
  var deaths = 0;
  var recovered = 0;
  var active = 0;

  var date = Date.parse("1 January 1970");

  obj.forEach((currentObject) => {
    if (new Date(currentObject.Date) > new Date(date)) {
      confirmed = currentObject.Confirmed;
      deaths = currentObject.Deaths;
      recovered = currentObject.Recovered;
      active = currentObject.active;
    }
  });

  var stats = {
    confirmedCases: confirmed,
    confirmedDeaths: deaths,
    confirmedRecovered: recovered,
    conifrmedActive: active,
  };
  return stats;
}

/**
 * Sorts countries into alphabetical order
 * @param {String} property this is the key for the object
 */
function sortSlugs(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    if (sortOrder == -1) {
      return b[property].localeCompare(a[property]);
    } else {
      return a[property].localeCompare(b[property]);
    }
  };
}

module.exports.getSummary = getSummary;
module.exports.getSlugs = getSlugs;
module.exports.getCountrySummary = getCountrySummary;
module.exports.getCountryLive = getCountryLive;
module.exports.getAllCountrySummary = getAllCountrySummary;
