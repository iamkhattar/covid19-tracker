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
  const {
    confirmedCases,
    confirmedDeaths,
    confirmedRecovered,
    conifrmedActive,
  } = await api.getCountryLive(slug);
  const res = await api.getCountrySummary(slug);
  console.log("");
  console.log(chalk.bold.blue("Confirmed Cases: " + confirmedCases));
  console.log("");
  printConfirmedCasesGraph(res);

  console.log("");
  console.log(chalk.bold.blue("Recovered: " + confirmedRecovered));
  console.log("");
  printRecoveredGraph(res);
  process.exit();
};

const printConfirmedCasesGraph = async (res) => {
  var confirmationBarNumbers = [];
  for (var i = Math.floor(res.length / 1.75); i < res.length; i += 2) {
    confirmationBarNumbers.push(res[i].Confirmed);
  }

  var chart = new Chart({
    xlabel: "Time",
    ylabel: "Cases",
    direction: "y",
    height: 12,
    lmargin: 10,
    width: Math.floor(confirmationBarNumbers.length * 2.1),
    step: 2,
  });
  

  for (currentBar of confirmationBarNumbers) {
    chart.addBar(currentBar);
  }

  await chart.draw();
};

const printRecoveredGraph = async (res) => {
  var recoveredBarNumbers = [];
  for (var i = Math.floor(res.length / 1.75); i < res.length; i += 2) {
    recoveredBarNumbers.push(res[i].Recovered);
  }

  var chart = new Chart({
    xlabel: "Time",
    ylabel: "Cases",
    direction: "y",
    height: 12,
    lmargin: 10,
    width: Math.floor(recoveredBarNumbers.length * 2.1),
    step: 2,
  });
  

  for (currentBar of recoveredBarNumbers) {
    chart.addBar(currentBar, 'green');
  }

  await chart.draw();
};

module.exports.printSummary = printSummary;
module.exports.printSlugs = printSlugs;
module.exports.printCountrySummary = printCountrySummary;
