const program = require("commander");

program
  .version("1.0.0")
  .description("A tool to view COVID-19 statistics from the command line.");

program.parse(process.argv);
