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
  var table = new Table({
    head: [chalk.white.bold("Country"), chalk.white.bold("Slug")],
  });
  for (const currentCountry of res) {
    table.push([currentCountry.Country, currentCountry.Slug]);
  }
  console.log(table.toString());
};

/**
 * displays the stats in bar graph form for the specified country
 * @param {String} slug the unique identifier for a country
 */
const printCountrySummary = async (slug) => {
  const countrySummary = await api.getCountrySummary(slug);
  const {
    confirmedCases,
    confirmedDeaths,
    confirmedRecovered,
  } = await api.getCountryLive(countrySummary);
  console.log("");
  console.log(chalk.bold.blue("Confirmed Cases: " + confirmedCases));
  console.log("");
  printConfirmedCasesGraph(countrySummary);
  console.log("");
  console.log(chalk.bold.green("Recovered Cases: " + confirmedRecovered));
  console.log("");
  printRecoveredGraph(countrySummary);
  console.log("");
  console.log(chalk.bold.red("Confirmed Deaths: " + confirmedDeaths));
  console.log("");
  printDeathsGraph(countrySummary);
  process.exit();
};

/**
 * prints a graph for all confirmed cases in the terminal
 * @param {Array} res data gathered from api query
 */
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

  chart.draw();
};

/**
 * prints a graph for all confirmed deaths in the terminal
 * @param {Array} res data gathered from api query
 */
const printDeathsGraph = async (res) => {
  var deathBarNumbers = [];
  for (var i = Math.floor(res.length / 1.75); i < res.length; i += 2) {
    deathBarNumbers.push(res[i].Deaths);
  }

  var chart = new Chart({
    xlabel: "Time",
    ylabel: "Deaths",
    direction: "y",
    height: 12,
    lmargin: 10,
    width: Math.floor(deathBarNumbers.length * 2.1),
    step: 2,
  });

  for (currentBar of deathBarNumbers) {
    chart.addBar(currentBar, "red");
  }

  chart.draw();
};

/**
 * prints a graph for all recovered cases in the terminal
 * @param {*} res data gathered from api query
 */
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
    chart.addBar(currentBar, "green");
  }

  await chart.draw();
};

/**
 * displays the stats of all countries in graph form
 */
const printAllCountriesSummary = async () => {
  var table = new Table({
    head: [
      chalk.white.bold("Country"),
      chalk.blue.bold("Active Cases"),
      chalk.red.bold("Deaths"),
      chalk.green.bold("Recovered"),
    ],
  });
  const res = await api.getAllCountrySummary();
  for (country of res) {
    table.push([
      country.Country,
      chalk.blue(country.TotalConfirmed),
      chalk.red(country.TotalDeaths),
      chalk.green(country.TotalRecovered),
    ]);
  }
  console.log(table.toString());
};

module.exports.printSummary = printSummary;
module.exports.printSlugs = printSlugs;
module.exports.printCountrySummary = printCountrySummary;
module.exports.printAllCountriesSummary = printAllCountriesSummary;
