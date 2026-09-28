# Playwright TypeScript Framework

Production-ready **Playwright + TypeScript** framework with Page Object Model, environment configs, sharded CI execution and Azure DevOps / GitHub Actions wiring.

> Related: [HTD2.0Azure](https://github.com/Avinash258/HTD2.0Azure) Â· [PlaywrightADO](https://github.com/Avinash258/PlaywrightADO) Â· [Portfolio](https://avinash258.github.io/Protfolio/)

## Overview

Enterprise-style UI/API automation scaffold used for Sauce Demoâ€“style demos and as a pattern for client framework rollouts. Emphasises typed page objects, smoke/regression packs, multi-browser runs and report merging for sharded pipelines.

## Features

- Enhanced Page Object Model with shared utilities
- Environment-based configuration (dev / staging / prod)
- Smoke, regression, API and mobile project tags
- Parallel shards with merge-reports flow
- Azure Pipelines YAML (PR, sharded, serial guides included)
- Lint, format and type-check scripts

## Stack

- TypeScript Â· Playwright
- Azure DevOps pipelines Â· GitHub Actionsâ€“friendly scripts
- ESLint Â· dotenv

## Getting started

```bash
npm install
npx playwright install
cp .env.example .env   # or env.example

npm test
npm run test:smoke
npm run test:regression
npm run test:headed
npm run test:ui
```

Sharded execution examples:

```bash
npm run test:shard:1
npm run test:sharded:all
npm run test:merge-reports
```

Azure-oriented runs: `npm run test:azure` Â· `npm run test:azure-smoke`.

## Docs in this repo

- `AZURE_SETUP.md` â€” Azure DevOps wiring
- `SERIAL_EXECUTION_GUIDE.md` / `TRUE_SERIAL_EXECUTION.md` â€” serial vs parallel strategies
- `TEST_EXECUTION_SUMMARY.md` â€” execution notes

## Author

**Avinash Sharma** â€” QA Automation Architect / Lead SDET  
[GitHub](https://github.com/Avinash258) Â· [LinkedIn](https://www.linkedin.com/in/p-avinash-sharma-8b0203b9/) Â· [Portfolio](https://avinash258.github.io/Protfolio/)
