const api = require("./api");
const chalk = require("chalk");
const Table = require("cli-table");
const Chart = require("cli-chart");

/**
 * Prints global Covid19 Summary in the command Line
 */
const printSummary = async () => {
  const res = await api.getSummary();
  var table = new Table();

  const newConfirmed = chalk.blue.bold(res.NewConfirmed);
  const totalConfirmed = chalk.cyan.bold(res.TotalConfirmed);
  const newDeaths = chalk.magenta.bold(res.NewDeaths);
  const totalDeaths = chalk.red.bold(res.TotalDeaths);
  const newRecovered = chalk.yellow.bold(res.NewRecovered);
  const totalRecovered = chalk.greenBright.bold(res.TotalRecovered);

  table.push(["New Confirmed Cases", newConfirmed]);
  table.push(["Total Confirmed Cases", totalConfirmed]);

  table.push(["New Deaths", newDeaths]);
  table.push(["Total Deaths", totalDeaths]);

  table.push(["New Recovered Cases", newRecovered]);
  table.push(["Total Recovered Cases", totalRecovered]);

  console.log(table.toString());
};

/**
 * Prints Slugs for Different Countries
 */
const printSlugs = async () => {
  const res = await api.getSlugs();
  var table = new Table({ head: ["Country", "Slug"] });
  for (const currentCountry of res) {
    table.push([currentCountry.Country, currentCountry.Slug]);
  }
  console.log(table.toString());
};

const printCountrySummary = async (slug) => {
  const res = await api.getCountrySummary(slug);

  var chart = new Chart({
    xlabel: "snausages/hr",
    ylabel: "dog\nhappiness",
    direction: "y",
    width: 50,
    height: 20,
    lmargin: 0,
    step: 2,
  });

  for (currentData of res) {
    console.log(currentData.Confirmed);
    chart.addBar(currentData.Confirmed);
  }
  chart.draw();
  process.exit();
};

module.exports.printSummary = printSummary;
module.exports.printSlugs = printSlugs;
module.exports.printCountrySummary = printCountrySummary;
