// Utilities:
import Promise from 'bluebird';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

// Dependencies:
import { getConfig } from 'tractor-config-loader';
import { container } from 'tractor-dependency-injection';
import { getPlugins } from 'tractor-plugin-loader';

var di = container();
var plugins = getPlugins();
var config = getConfig();

module.exports = function () {
    let { browser } = global;

    di.constant({ browser, config });

    this.World = function () {
        return new CustomWorld();
    }

    return this.World;
};

class CustomWorld {
    constructor () {
        chai.use(chaiAsPromised);

        global.By = global.protractor.By;
        global.expect = chai.expect;
        global.Promise = Promise;

        plugins.map(plugin => {
            global[plugin.description.variableName] = di.call(plugin.create);
        });
    }
}
