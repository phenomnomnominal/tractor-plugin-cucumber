/* global describe:true, it:true */

// Test setup:
import { expect, ineeda, NOOP, Promise, sinon } from '../../../test-setup';

// Dependencies:
import * as tractorLogger from 'tractor-logger';

// Under test:
import browserInfo from './browser-info';

describe('tractor-plugin-cucumber - browser-info:', () => {
    describe('browserInfo', () => {
        it('should do nothing if a test passes', () => {
            global.browser = ineeda();
            let scenario = ineeda({
                isFailed: () => false
            });
            let cucumber = ineeda({
                After: after => after(scenario)
            });

            sinon.spy(Promise, 'resolve');

            browserInfo.call(cucumber);

            expect(Promise.resolve).to.have.been.called();

            global.browser = null;
            Promise.resolve.restore();
        });

        describe('browser logs', () => {
            it('should retrieve the browser logs and report them', () => {
                let browserLog = [{ message: 'error' }];
                global.browser = ineeda({
                    manage: () => ({
                        logs: () => ({
                            get: () => Promise.resolve(browserLog)
                        })
                    }),
                    takeScreenshot: () => Promise.reject()
                });
                let scenario = ineeda({
                    isFailed: () => true
                });
                let cucumber;
                let browserInfoResult = new Promise((resolve => {
                    cucumber = ineeda({
                        After: after => resolve(after(scenario))
                    });
                }));

                sinon.stub(console, 'error');
                sinon.stub(tractorLogger, 'error');

                browserInfo.call(cucumber);
                return browserInfoResult
                .then(() => {
                    /* eslint-disable no-console */
                    expect(console.error).to.have.been.calledWith('error');
                    /* eslint-enable no-console */
                })
                .finally(() => {
                    /* eslint-disable no-console */
                    console.error.restore();
                    /* eslint-enable no-console */
                    tractorLogger.error.restore();
                });
            });

            it('should log an error if getting the logs fails', () => {
                global.browser = ineeda({
                    manage: () => ({
                        logs: () => ({
                            get: () => Promise.reject()
                        })
                    }),
                    takeScreenshot: () => Promise.reject()
                });
                let scenario = ineeda({
                    isFailed: () => true
                });
                let cucumber;
                let browserInfoResult = new Promise((resolve => {
                    cucumber = ineeda({
                        After: after => resolve(after(scenario))
                    });
                }));

                sinon.stub(tractorLogger, 'error');

                browserInfo.call(cucumber);
                return browserInfoResult
                .then(() => {
                    expect(tractorLogger.error).to.have.been.calledWith('Could not get browser log.');
                })
                .finally(() => {
                    tractorLogger.error.restore();
                });
            });
        });

        describe('browser screenshot', () => {
            it('should attach a screenshot to the scenario', () => {
                global.browser = ineeda({
                    manage: () => ({
                        logs: () => ({
                            get: () => Promise.reject()
                        })
                    }),
                    takeScreenshot: () => Promise.resolve('image')
                });
                let scenario = ineeda({
                    attach: NOOP,
                    isFailed: () => true
                });
                let cucumber;
                let browserInfoResult = new Promise((resolve => {
                    cucumber = ineeda({
                        After: after => resolve(after(scenario))
                    });
                }));

                sinon.stub(tractorLogger, 'error');

                browserInfo.call(cucumber);
                return browserInfoResult
                .then(() => {
                    expect(scenario.attach).to.have.been.called();
                })
                .finally(() => {
                    tractorLogger.error.restore();
                });
            });

            it('should log an error if taking the screenshot fails', () => {
                global.browser = ineeda({
                    manage: () => ({
                        logs: () => ({
                            get: () => Promise.reject()
                        })
                    }),
                    takeScreenshot: () => Promise.reject()
                });
                let scenario = ineeda({
                    attach: NOOP,
                    isFailed: () => true
                });
                let cucumber;
                let browserInfoResult = new Promise((resolve => {
                    cucumber = ineeda({
                        After: after => resolve(after(scenario))
                    });
                }));

                sinon.stub(tractorLogger, 'error');

                browserInfo.call(cucumber);
                return browserInfoResult
                .then(() => {
                    expect(tractorLogger.error).to.have.been.calledWith('Could not get browser log.');
                })
                .finally(() => {
                    tractorLogger.error.restore();
                });
            });
        });
    });
});
