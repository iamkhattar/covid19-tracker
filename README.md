# covid19-tracker

covid19-tracker is a npm module to view COVID-19 statistics from the command line.

# Install

```
npm install covid19-tracker
```

# Usage

```
covid19-tracker --help

Options:
    -V, --version output the version number
    -h, --help display help for command

Commands:
    summary|s           A summary of new and total cases globally
    countrysummary|cs   A summary of cases in all countries
    slugs|slug          Slugs for each country
    country|c <slug>    Cases for country associated with the <slug>
    help [command]      display help for command

Examples:
    covid19-tracker summary
    covid19-tracker slug
    covid19-tracker country united-kingdom
    covid19-tracker help
```

# License

MIT
