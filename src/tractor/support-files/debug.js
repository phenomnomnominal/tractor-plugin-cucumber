module.exports = function () {
    this.StepResult((step, callback) => {
        let browser = global.browser || {};
        let params = browser.params || {};
        if (params.debug === 'true' && step.getStatus() === 'failed') {
            browser.pause();
            browser.explore();
        }
        callback();
    });
}
