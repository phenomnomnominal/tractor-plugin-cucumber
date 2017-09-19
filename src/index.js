// Config:
import { getConfig } from 'tractor-config-loader';
import { config } from './tractor/config';

config(getConfig());

// Plugin:
export { plugin } from './protractor/plugin';

export { init } from './tractor/server/init';

// Promisify:
import Promise from 'bluebird';
Promise.promisifyAll(require('graceful-fs'));
Promise.promisifyAll(require('cucumber-html-reporter'));
