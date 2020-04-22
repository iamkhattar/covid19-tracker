# 🦠 - coronavirus-global

coronavirus-global is tool to view COVID-19 statistics from the command line.

# Install

```bash
npm install coronavirus-global
```

# Usage

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

# License

MIT
