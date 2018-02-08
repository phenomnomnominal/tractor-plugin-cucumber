// Depencencies:
import { createDir } from '@tractor/file-structure';
import reporter from 'cucumber-html-reporter';
import path from 'path';
import rimraf from 'rimraf';

export function createReportsDir (cucumberConfig) {
    let tmpReportsDirPath = getTmpReportsDirPath(cucumberConfig);

    rimraf.sync(tmpReportsDirPath);
    return createDir(tmpReportsDirPath);
}

export function createReport (cucumberConfig) {
    let reportsDir = getReportsDirPath(cucumberConfig);
    let tmpReportsDirPath = getTmpReportsDirPath(cucumberConfig);

    return reporter.generateAsync({
        theme: 'bootstrap',
        jsonDir: tmpReportsDirPath,
        output: path.join(reportsDir, 'cucumber.html'),
        reportSuiteAsScenarios: true
    })
    .then(() => rimraf.sync(tmpReportsDirPath));
}

function getReportsDirPath (cucumberConfig) {
    return path.join(process.cwd(), cucumberConfig.reportsDirectory);
}

function getTmpReportsDirPath (cucumberConfig) {
    let reportsDirPath = getReportsDirPath(cucumberConfig);
    return path.join(reportsDirPath, 'tmp-json-reports');
}
