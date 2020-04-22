const chalk = require("chalk");
const Image = require("ascii-art-image");

var image = new Image({
  filepath: "./assets/logo.png",
  alphabet: "greyscale",
  width: 65,
  height: 65,
});

image.write(function (err, rendered) {
  console.log(rendered);
  console.log(
    "+----------------------------------------------------------------+"
  );
  console.log(
    "|                       " +
      chalk.bold.green("coronavirus-global") +
      "                       |"
  );
  console.log(
    "+----------------------------------------------------------------+"
  );
  console.log(
    chalk.italic(
      "|    A tool to view COVID-19 statistics from the command line    |"
    )
  );
  console.log(
    "+----------------------------------------------------------------+"
  );
  console.log(
    "|            Created by " +
      chalk.cyan.bold("Shivam Khattar") +
      " & " +
      chalk.cyan.bold("Saeed Khan") +
      "              |"
  );
  console.log(
    "+----------------------------------------------------------------+"
  );
});
