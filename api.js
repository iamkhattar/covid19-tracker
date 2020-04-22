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

/**
 * Gets Country Slugs from the Covid19 API
 */
const getSlugs = async () => {
  try {
    const res = await axios.get("https://api.covid19api.com/countries");
    var data = res.data;
    data.sort(dynamicSort("Country"));
    return data;
  } catch (err) {
    return err;
  }
};

function dynamicSort(property) {
  var sortOrder = 1;

  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }

  return function (a,b) {
      if(sortOrder == -1){
          return b[property].localeCompare(a[property]);
      }else{
          return a[property].localeCompare(b[property]);
      }        
  }
};
module.exports.getSummary = getSummary;
module.exports.getSlugs = getSlugs;
