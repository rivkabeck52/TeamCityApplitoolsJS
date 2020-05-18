
'use strict';

require('chromedriver');
const { Builder, By } = require('selenium-webdriver');
const { Eyes, ClassicRunner, Target, RectangleSize, BatchInfo} = require('@applitools/eyes-selenium');

describe('DemoApp - ClassicRunner', function () {
  let runner, eyes, driver, batchInfo, batchId, apiKey;

  beforeEach(async () => {
    // Initialize the Runner for your test.
    runner = new ClassicRunner();

    // Initialize the eyes SDK (IMPORTANT: make sure your API key is set in the APPLITOOLS_API_KEY env variable).
    eyes = new Eyes(runner);

    batchInfo = new BatchInfo("TeamCity Batch")

    // batchId = process.env.APPLITOOLS_BATCH_ID
    // if (batchId != null) {
    //   batchInfo.setId(batchId)
    // }

    // eyes.setBatch(batchInfo)

    eyes.setBatch(process.env.APPLITOOLS_BATCH_NAME, process.env.APPLITOOLS_BATCH_ID);

    apiKey = process.env.APPLITOOLS_API_KEY

    console.log(apiKey)
    // console.log(eyes.)
    await eyes.setApiKey("8CJ9zSuUrOg67i461JMEgGrgFz4CuA0wOpVVxoBRcBc110")
  

    // Use Chrome browser
    driver = await new Builder()
      .forBrowser('chrome')
      // .setChromeOptions(new ChromeOptions().headless())
      .build();
  });

  it('TeamCity Test', async () => {
    // Start the test by setting AUT's name, test name and viewport size (width X height)
    await eyes.open(driver, 'TeamCity integration App', 'TeamCity Test', new RectangleSize(800, 600));

    // Navigate the browser to the "ACME" demo app.
    await driver.get("https://applitools.com/helloworld?diff1");

    // Visual checkpoint #2 - Check the app page.
    await eyes.check("App Window", Target.window().fully());

    // End the test.
    await eyes.closeAsync();
  });

  afterEach(async () => {
    // Close the browser.
    await driver.quit();

    // If the test was aborted before eyes.close was called, ends the test as aborted.
    await eyes.abortIfNotClosed();

    // Wait and collect all test results
    const allTestResults = await runner.getAllTestResults();
    console.log(allTestResults);
  });
});