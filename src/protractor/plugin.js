// Dependencies:
import { getConfig } from '@tractor/config-loader';
import { TractorError } from '@tractor/error-handler';
import Promise from 'bluebird';
import path from 'path';
import { createReport, createReportsDir } from './reports';

export function plugin (protractorConfig) {
    let tractorConfig = getConfig();

    let featureGlob = path.join(process.cwd(), tractorConfig.features.directory, '**/*.feature');
    let stepDefinitionsGlob = path.join(process.cwd(), tractorConfig.stepDefinitions.directory, '**/*.step.js');
    let supportGlob = path.join(process.cwd(), tractorConfig.cucumber.supportDirectory, '**/*.js');

    protractorConfig.specs = protractorConfig.specs || [featureGlob];

    if (protractorConfig.framework) {
        throw new TractorError('Cannot configure `cucumber`. `framework` is already set in protractor config.');
    }

    protractorConfig.framework = 'custom';
    protractorConfig.frameworkPath = require.resolve('protractor-cucumber-framework');

    let cucumberOpts = protractorConfig.cucumberOpts || {};
    cucumberOpts.format = cucumberOpts.format || 'pretty';
    cucumberOpts.tags = cucumberOpts.tags || [];

    cucumberOpts.require = cucumberOpts.require || [];
    cucumberOpts.require = cucumberOpts.require.concat([stepDefinitionsGlob, supportGlob]);

    protractorConfig.cucumberOpts = cucumberOpts;

    let oldBeforeLaunch = protractorConfig.oldBeforeLaunch || (() => {});
    protractorConfig.beforeLaunch = function () {
        return Promise.resolve(oldBeforeLaunch.call(this, arguments))
        .then(() => {
            return createReportsDir(tractorConfig.cucumber);
        });
    }

    let oldAfterLaunch = protractorConfig.afterLaunch || (() => {});
    protractorConfig.afterLaunch = function () {
        return Promise.resolve(oldAfterLaunch.call(this, arguments))
        .then(() => {
            return createReport(tractorConfig.cucumber);
        });
    }

    return protractorConfig;
}
