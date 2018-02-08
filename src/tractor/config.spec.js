/* global describe:true, it:true */

// Test setup:
import { expect } from '@tractor/unit-test';

// Under test:
import { config } from './config';

describe('@tractor/plugin-cucumber - tractor/config:', () => {
    describe('addConfig', () => {
        it('should create the default config object', () => {
            let tractorConfig = {};

            let processed = config(tractorConfig);

            expect(processed.reportsDirectory).to.equal('./tractor/reports');
            expect(processed.supportDirectory).to.equal('./tractor/support');
        });

        it('should allow for a custom reports directory to be set', () => {
            let tractorConfig = {
                cucumber: {
                    reportsDirectory: './reports'
                }
            };

            let processed = config(tractorConfig);

            expect(processed.reportsDirectory).to.equal('./reports');
        });

        it('should allow for a custom support directory to be set', () => {
            let tractorConfig = {
                cucumber: {
                    supportDirectory: './support'
                }
            };

            let processed = config(tractorConfig);

            expect(processed.supportDirectory).to.equal('./support');
        });
    });
});
