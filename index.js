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

program.parse(process.argv);
