const path = require('path');
const puppeteer = require('puppeteer');

const INDEX_HTML = `file://${path.resolve('index.html')}`;
const USER_AGENTS = {
  web: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 YaBrowser/19.7.0.2015 Yowser/2.5 Safari/537.36',
  ios: 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
  android: 'Mozilla/5.0 (Linux; U; Android 2.2) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
};

let browser, page;

before(async () => {
  browser = await puppeteer.launch({headless: true});
  page = await browser.newPage();
  page.on('error', e => console.error(e)); // eslint-disable-line no-console
  await page.setCacheEnabled(false);
});

it('should redirect on web', async () => {
  await page.setUserAgent(USER_AGENTS.web);
  await Promise.all([
    page.goto(INDEX_HTML),
    page.waitForRequest('https://vk.com/zakonchi_poslovitsu'),
  ]);
});

it('should redirect on ios', async () => {
  await page.setUserAgent(USER_AGENTS.ios);
  await Promise.all([
    page.goto(INDEX_HTML),
    page.waitForRequest('vk://vk.com/zakonchi_poslovitsu'),
  ]);
});

it('should redirect on android', async () => {
  await page.setUserAgent(USER_AGENTS.android);
  await Promise.all([
    page.goto(INDEX_HTML),
    // #-part is not sent to server
    page.waitForRequest('intent://vk.com/zakonchi_poslovitsu'),
  ]);
});

after(async () => {
  await browser.close();
});
