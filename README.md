# @tractor-plugins/cucumber

Plugin for [**tractor**](http://github.com/TradeMe/tractor) for running tests using Cucumber and Gherkin.

[![Greenkeeper badge](https://badges.greenkeeper.io/phenomnomnominal/tractor-plugin-cucumber.svg)](https://greenkeeper.io/)
[![npm version](https://img.shields.io/npm/v/@tractor-plugins/cucumber.svg)](https://www.npmjs.com/package/@tractor-plugins/cucumber)
[![bitHound Overall Score](https://www.bithound.io/github/phenomnomnominal/tractor-plugin-cucumber/badges/score.svg)](https://www.bithound.io/github/phenomnomnominal/tractor-plugin-cucumber)
[![Code Climate](https://codeclimate.com/github/phenomnomnominal/tractor-plugin-cucumber/badges/gpa.svg)](https://codeclimate.com/github/phenomnomnominal/tractor-plugin-cucumber)
[![Test Coverage](https://codeclimate.com/github/phenomnomnominal/tractor-plugin-cucumber/coverage.svg)](https://codeclimate.com/github/phenomnomnominal/tractor-plugin-cucumber/coverage)

## How to use:

This plugin combines two other plugins, [**@tractor-plugins/features**](http://github.com/phenomnomnominal/tractor-plugin-features) and [**@tractor-plugins/step-definitions**](http://github.com/phenomnomnominal/tractor-plugin-step-definitions)

### Features config:

You can add a `features` property to your "tractor.conf.js" file to specify where to save the feature files:

```javascript
module.exports = {
    features: {
        directory: './my-features-directory'
    }
};
```

### Step definition config:

You can add a `stepDefinition` property to your "tractor.conf.js" file to specify where to save the step definition files:

```javascript
module.exports = {
    stepDefinition: {
        directory: './my-step-definitions-directory'
    }
};
```
