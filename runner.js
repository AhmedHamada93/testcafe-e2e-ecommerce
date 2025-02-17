const createTestCafe = require('testcafe');
let testcafe = null;
let runner = null;
const {exec} = require('child_process');


createTestCafe('localhost', 1335, 1336)
    .then(tc => {
        testcafe = tc;
        runner = testcafe.createRunner();

        return runner
        // list multiple test files
            .src('./tests/')
            .browsers(['chrome:headless'])
            .screenshots('reports/screenshots/', true)
            .reporter('cucumber-json', 'reports/report.json')
            .run({
                skipJsErrors: true,
                quarantineMode: false,
                selectorTimeout: 6000,
                assertionTimeout: 6000,
                pageLoadTimeout: 6000,
                speed: 1
            });
    })
    .then(failedCount => {
        console.log('############################');
        console.log('Tests failed: ' + failedCount);
        console.log('############################');
        exec('node utils/report-generator.js');
        testcafe.close();
    });