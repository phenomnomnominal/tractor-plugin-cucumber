/* global describe:true, it:true */

// Test setup:
import { expect, ineeda, NOOP } from '@tractor/unit-test';

// Under test:
import debug from './debug';

describe('tractor-plugin-cucumber - debug:', () => {
    describe('debug', () => {
        it(`should do nothing if the browser doesn't exist yet`, () => {
            global.browser = null;

            let step = ineeda({
                getStatus: NOOP
            });
            let cucumber = ineeda({
                StepResult: stepResult => stepResult(step, NOOP)
            });

            expect(() => {
                debug.call(cucumber);
            }).to.not.throw();
        });

        it('should do nothing if the debug param is not set', () => {
            global.browser = ineeda({
                pause: NOOP
            });
            let step = ineeda({
                getStatus: NOOP
            });
            let cucumber = ineeda({
                StepResult: stepResult => stepResult(step, NOOP)
            });

            debug.call(cucumber);

            expect(global.browser.pause).to.not.have.been.called();

            global.browser = null;
        });

        it('should enter debug mode if the step fails and the debug param is set', () => {
            global.browser = ineeda({
                params: {
                    debug: 'true'
                },
                expore: NOOP,
                pause: NOOP
            });
            let step = ineeda({
                getStatus: () => 'failed'
            });
            let cucumber = ineeda({
                StepResult: stepResult => stepResult(step, NOOP)
            });

            debug.call(cucumber);

            expect(global.browser.explore).to.have.been.called();
            expect(global.browser.pause).to.have.been.called();

            global.browser = null;
        });
    });
});
