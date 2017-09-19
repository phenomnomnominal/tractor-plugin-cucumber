// Dependencies:
import Promise from 'bluebird';
import { error } from 'tractor-logger';

module.exports = function () {
    this.After(scenario => {
        let browser = global.browser;
        if (browser && scenario.isFailed()) {
            return Promise.all([getBrowserLog(browser), takeScreenshot(browser, scenario)]);
        } else {
            return Promise.resolve();
        }
    });
}

function getBrowserLog (browser) {
    return browser.manage().logs().get('browser')
    .then(browserLog => {
        browserLog
        .forEach(log => {
            /* eslint-disable no-console */
            console.error(log.message);
            /* eslint-enable no-console */
        });
    })
    .catch(() => error('Could not get browser log.'))
}

function takeScreenshot (browser, scenario) {
    return browser.takeScreenshot()
    .then(base64png => {
        let decodedImage = new Buffer(base64png, 'base64');
        scenario.attach(decodedImage, 'image/png');
    })
    .catch(() => error('Could not take browser screenshot.'))
}
