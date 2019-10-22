const assert = require('chai').assert;
const puppeteer = require('puppeteer');

let browser, page;

before(async () => {
  browser = await puppeteer.launch({headless: true});
  page = await browser.newPage();
  page.on('error', e => console.error(e)); // eslint-disable-line no-console
  await page.setCacheEnabled(false);
});

it('zakonchi-poslovitsu.vitalets.xyz', async () => {
  await page.goto('https://zakonchi-poslovitsu.vitalets.xyz');
  await page.waitFor(1000);
  assert.strictEqual(page.url(), 'https://vk.com/zakonchi_poslovitsu');
});

after(async () => {
  await browser.close();
});
