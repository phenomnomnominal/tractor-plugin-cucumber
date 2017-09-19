// Utilities:
import fs from 'fs';
import path from 'path';

// Dependencies:
import { Listener } from 'cucumber';
import { getConfig } from 'tractor-config-loader';

module.exports = function () {
    let tmpReportsDirPath = getTmpReportsDirPath();
    this.registerListener(createReporter(tmpReportsDirPath));
}

function createReporter (tmpReportsDirPath) {
    let jsonFormatter = Listener.JsonFormatter();
    jsonFormatter.log = jsonReportWriter;
    return jsonFormatter;

    function jsonReportWriter (content) {
        if (content === JSON.stringify([])) {
            return null;
        }

        let reportName = `cucumber.${Date.now()}.json`;
        try {
            fs.writeFileSync(path.join(tmpReportsDirPath, reportName), content);
        } catch (e) {
            /* eslint-disable no-console */
            console.error('Failed to save test results to json file.');
            console.error(e.message);
            /* eslint-enable no-console */
            throw e;
        }
    }
}

function getTmpReportsDirPath () {
    let tractorConfig = getConfig();
    let reportsDirPath = path.join(process.cwd(), tractorConfig.cucumber.reportsDirectory);
    return path.join(reportsDirPath, 'tmp-json-reports');
}
