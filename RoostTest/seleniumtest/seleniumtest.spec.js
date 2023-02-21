// const assert = require('assert');
// const { remote } = require('webdriverio');

// describe('Microservices Demo Frontend', () => {
//   let browser;

//   before(async () => {
//     browser = await remote({
//       baseUrl: 'http://test-2.voter.18.144.89.58.nip.io/', // URL where the frontend is running
//       capabilities: {
//         browserName: 'chrome' // can be changed to other browsers if needed
//       }
//     });
//   });

//   after(async () => {
//     await browser.deleteSession();
//   });

//   it('should display the home page', async () => {
//     await browser.url('/');
//     const title = await browser.getTitle();
//     assert.strictEqual(title, 'Sock Shop');
//   });

//   it('should be able to add items to the cart', async () => {
//     await browser.url('/');
//     const addToCartButtons = await browser.$$('.shelf-item__buy-btn');
//     assert.ok(addToCartButtons.length > 0);

//     const firstAddToCartButton = addToCartButtons[0];
//     await firstAddToCartButton.click();

//     const cartItemCount = await browser.$('.bag__quantity');
//     assert.strictEqual(await cartItemCount.getText(), '1');
//   });
// });

const assert = require('assert');
const { Builder, By, Key, until } = require('selenium-webdriver');

describe('Frontend YAML File', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    await driver.quit();
  });

  it('should display the raw YAML content', async function () {
    // Navigate to the URL for the frontend.yaml file
    await driver.get('https://github.com/Yashupadhyaya/microservices-demo/blob/main/kustomize/base/frontend.yaml');

    // Verify that the page title contains the expected value
    const expectedTitle = 'GitHub';
    const title = await driver.getTitle();
    assert(title.includes(expectedTitle));

    // Find the "Raw" button and click it to view the raw file content
    const rawButton = await driver.findElement(By.css('.js-raw-url'));
    await rawButton.click();

    // Verify that the raw file content is displayed
    const expectedContent = '# Kubernetes manifest for the frontend service\n\napiVersion: v1\nkind: Service\nmetadata:\n  name: frontend\nspec:\n  selector:\n    app: frontend\n  ports:\n  - name: http\n    port: 80\n    targetPort: 3000\n---\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: frontend\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: frontend\n  template:\n    metadata:\n      labels:\n        app: frontend\n    spec:\n      containers:\n      - name: frontend\n        image: weaveworksdemos/frontend:0.4.6\n        ports:\n        - containerPort: 3000\n        env:\n        - name: REDIS_ENDPOINT\n          value: redis-master.default.svc.cluster.local\n        - name: CART_ENDPOINT\n          value: cart.default.svc.cluster.local\n        - name: USER_ENDPOINT\n          value: user.default.svc.cluster.local\n        - name: CATALOG_ENDPOINT\n          value: catalog.default.svc.cluster.local\n';
    const rawContent = await driver.findElement(By.css('body')).getText();
    assert.strictEqual(rawContent, expectedContent);
  });
});
