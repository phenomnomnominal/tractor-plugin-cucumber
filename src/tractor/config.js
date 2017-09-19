// Constants:
const DEFAULT_REPORT_DIRECTORY = './tractor/reports';
const DEFAULT_SUPPORT_DIRECTORY = './tractor/support';

export function config (tractorConfig) {
    tractorConfig.cucumber = tractorConfig.cucumber || {};
    let { cucumber } = tractorConfig;
    cucumber.reportsDirectory = cucumber.reportsDirectory || DEFAULT_REPORT_DIRECTORY;
    cucumber.supportDirectory = cucumber.supportDirectory || DEFAULT_SUPPORT_DIRECTORY;
    return cucumber;
}
