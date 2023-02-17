const assert = require('assert');
const { remote } = require('webdriverio');

describe('Microservices Demo Frontend', () => {
  let browser;

  before(async () => {
    browser = await remote({
      baseUrl: 'http://localhost:8080', // URL where the frontend is running
      capabilities: {
        browserName: 'chrome' // can be changed to other browsers if needed
      }
    });
  });

  after(async () => {
    await browser.deleteSession();
  });

  it('should display the home page', async () => {
    await browser.url('/');
    const title = await browser.getTitle();
    assert.strictEqual(title, 'Sock Shop');
  });

  it('should be able to add items to the cart', async () => {
    await browser.url('/');
    const addToCartButtons = await browser.$$('.shelf-item__buy-btn');
    assert.ok(addToCartButtons.length > 0);

    const firstAddToCartButton = addToCartButtons[0];
    await firstAddToCartButton.click();

    const cartItemCount = await browser.$('.bag__quantity');
    assert.strictEqual(await cartItemCount.getText(), '1');
  });
});
