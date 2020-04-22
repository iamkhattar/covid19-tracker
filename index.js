const program = require("commander");
const cli = require("./cli");

program
  .version("1.0.0")
  .description("A tool to view COVID-19 statistics from the command line.");

program
  .command("summary")
  .alias("s")
  .description("A summary of new and total cases globally")
  .action(() => {
    cli.printSummary();
  });

program
  .command("slugs")
  .alias("sg")
  .alias("slug")
  .description("Slugs for each country")
  .action(() => {
    cli.printSlugs();
  });

program
  .command("country <slug>")
  .alias("c")
  .description("Cases for country associated with the <slug>")
  .action((slug) => {
    const countrySlug = slug.toLowerCase();
    cli.printCountrySummary(countrySlug);
  });

program
  .command("country-live <slug>")
  .alias("cl").alias("live")
  .description("Returns live covid information for <slug>")
  .action((slug)=>{
    const countrySlug = slug.toLowerCase();
    cli.printCountryLive(countrySlug);
  });


program.parse(process.argv);
