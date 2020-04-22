const program = require("commander");
const cli = require("./cli");

/**
 * Program Version and Description
 */
program
  .version("1.0.0")
  .description("A tool to view COVID-19 statistics from the command line.");

/**
 * @usage covid19-tracker summary|s
 * @desc  A summary of new and total cases globally
 */
program
  .command("summary")
  .alias("s")
  .description("A summary of new and total cases globally")
  .action(() => {
    cli.printSummary();
  });

/**
 * @usage covid19-tracker countrysummary|cs
 * @desc  A summary of new and total cases globally
 */
program
  .command("countrysummary")
  .alias("cs")
  .description("A summary of cases in all countries")
  .action(() => {
    cli.printAllCountriesSummary();
  });

/**
 * @usage covid19-tracker slugs|slug
 * @desc  Slugs for each country
 */
program
  .command("slugs")
  .alias("sg")
  .alias("slug")
  .description("Slugs for each country")
  .action(() => {
    cli.printSlugs();
  });

/**
 * @usage covid19-tracker country|c <slug>
 * @desc  Cases for country associated with the <slug>
 */
program
  .command("country <slug>")
  .alias("c")
  .description("Cases for country associated with the <slug>")
  .action((slug) => {
    var countrySlug = slug.toLowerCase();
    cli.printCountrySummary(countrySlug);
  });

program.parse(process.argv);
