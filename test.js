const path = require('path');
const assert = require('chai').assert;
const puppeteer = require('puppeteer');

const INDEX_HTML = `file://${path.resolve('index.html')}`;
let browser, page;

before(async () => {
  browser = await puppeteer.launch({headless: true});
  page = await browser.newPage();
  page.on('error', e => console.error(e)); // eslint-disable-line no-console
  await page.setCacheEnabled(false);
});

it('should redirect to vk', async () => {
  await page.goto(INDEX_HTML);
  await page.waitFor(1000);
  assert.strictEqual(page.url(), 'https://vk.com/zakonchi_poslovitsu');
});

after(async () => {
  await browser.close();
});
