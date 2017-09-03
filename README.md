# tractor-plugin-cucumber

Plugin for [**tractor**](http://github.com/TradeMe/tractor) for running tests using Cucumber and Gherkin.

[![npm version](https://img.shields.io/npm/v/tractor-plugin-cucumber.svg)](https://www.npmjs.com/package/tractor-plugin-cucumber)

## How to use:

This plugin combines two other plugins, [**tractor-plugin-features**](http://github.com/phenomnomnominal/tractor-plugin-features) and [**tractor-plugin-step-definitions**](http://github.com/phenomnomnominal/tractor-plugin-step-definitions)

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
