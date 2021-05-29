<img src="assets/logo.png" alt="Placeholder ETM12 logo" />

![Travis (.com)](https://img.shields.io/travis/com/stuf/circuiteer?label=master)
![Travis (.com) branch](https://img.shields.io/travis/com/stuf/circuiteer/development?label=development)
![Codecov](https://img.shields.io/codecov/c/github/stuf/circuiteer)
![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability-percentage/stuf/circuiteer)
![Code Climate issues](https://img.shields.io/codeclimate/issues/stuf/circuiteer)
![Code Climate technical debt](https://img.shields.io/codeclimate/tech-debt/stuf/circuiteer)

# `circuiteer`

Experimental webapp for planning Astroneer bases, basically.

> Try it out [here](https://circuiteer.etm12.moe) (alpha)

![Screenshot](./assets/circuiteer-202105.png)

## Getting started

```sh
git clone https://github.com/stuf/circuiteer.git
cd circuiteer
npm install
npm start
```

Currently due to funny business because of Tailwind's version requirements Yarn for some reason installs things wrong.

## Available scripts

- `start` — run application locally with development server, browser auto-open disabled by default
- `test` — run unit tests
- `test:cov` — generate code coverage report
- `test:e2e` — run Cypress tests
- `deps:run` — runs [`dependency-cruiser`][]; most likely not the script you want to run as-is, it's used as a base for rest of `deps:` scripts
- `deps:validate` — validate application dependencies with a non-zero exit on error; see [`.dependency-cruiser.js`][] for configuration
- `deps:save-cruise` — run [`dependency-cruiser`][] for the application source and save the generated cruise
- `deps:report-html` — create HTML file containing found violations of dependency validation

[`dependency-cruiser`]: https://github.com/sverweij/dependency-cruiser
[`.dependency-cruiser.js`]: ./.dependency-cruiser.js
