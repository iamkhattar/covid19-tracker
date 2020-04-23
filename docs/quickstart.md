# Quick Start

## Install

It is recommended to install the package globally, which helps using the CLI easily. To install the package run the following command:

```bash
npm install -g coronavirus-global
```

## Usage

If you want to use the CLI, you can see the options below:

```bash
covid19-tracker --help


Options:
-V, --version       output the version number
-h, --help          help display for command

Commands:
summary|s           A summary of new and total cases globally
countrysummary|cs   A summary of cases in all countries
slugs|slug          Slugs for each country
country|c <slug>    Cases for country associated with the <slug>
help [command]      display help for command

Examples:
coronavirus-global summary
coronavirus-global countrysummary
coronavirus-global slugs
coronavirus-global country united-kingdom
coronavirus-global help
```
