// To run the tests :
// sudo webdriver-manager start    ** TO START A SELENIUM SERVER: CHROME IS DEFAULT **
// protractor conf.js

exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        'US1.spec.js',
        'US2.spec.js',
        'US3.spec.js',
        'US4.spec.js',
        'US17.spec.js'
    ]

}
