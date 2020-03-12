
'use strict';

require('chromedriver');
var wd = require('selenium-webdriver'),
desiredCaps = {
    browserName: '',
    deviceName: 'Pixel_2_API_29',
    platformVersion: '10.0',
    platformName: 'Android',
    app: '/Users/rivkabeck/app-debug.apk'
}
const { Eyes, ClassicRunner, Target, RectangleSize, BatchInfo} = require('@applitools/eyes-selenium');

describe('DemoApp - ClassicRunner', function () {
  let runner, eyes, driver, batchInfo, batchId;

  beforeEach(async () => {

    // Initialize the eyes SDK (IMPORTANT: make sure your API key is set in the APPLITOOLS_API_KEY env variable).
    eyes = new Eyes();


    // Use Chrome browser
    driver = await new wd.Builder().usingServer("http://localhost:4723/wd/hub").withCapabilities(desiredCaps).build();
  });

  it('TeamCity Test', async () => {
    // Start the test by setting AUT's name, test name and viewport size (width X height)
    await eyes.open(driver, 'JS Appium APP', 'JS Appium Test');

    // Navigate the browser to the "ACME" demo app.
    // await driver.get("https://applitools.com/helloworld?diff1");

    // Visual checkpoint #2 - Check the app page.
    await eyes.check("App Window", Target.window());

    // End the test.
    await eyes.close();
  });

  afterEach(async () => {
    // Close the browser.
    await driver.quit();

    // If the test was aborted before eyes.close was called, ends the test as aborted.
    await eyes.abortIfNotClosed();

    // Wait and collect all test results
    // const allTestResults = await runner.getAllTestResults();
    // console.log(allTestResults);
  });
});