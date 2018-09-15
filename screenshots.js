const _ = require('lodash');

const ls = require('ls');
const { resolve } = require('path');
const puppeteer = require('puppeteer-core');
const { execSync } = require('child_process');

const appRoot = __dirname;
const newTabPath = resolve(__dirname, 'docs', 'images', 'new_tab.png');
const screenshotPath = resolve(__dirname, 'dist', 'example.png');

const soberExtensions = _(ls(`${__dirname}/dist/*`))
  .map(folder => folder.full)
  .value()[ 2 ];
// .first();
// .join(', ');

const browserOptions = {
  // headless: true,
  headless: false,
  executablePath: '/usr/bin/google-chrome',
  defaultViewport: null,
  userDataDir: '/home/cyp/.config/google-chrome/Default',
  args: [
    `--disable-extensions-except=${soberExtensions}`,
    `--load-extension=${soberExtensions}`,
    `--disable-infobars=true`,
  ],
};

(async () => {
  const browser = await puppeteer.launch(browserOptions);
  await browser.newPage();
  const pages = await browser.pages();

  await pages[ 0 ].goto('chrome://extensions');
  await pages[ 1 ].goto(`file://${newTabPath}`);

  // execSync('shutter --window \'about:blank - Google Chrome\' -o /tmp/titi.png -e', { stdio: 'inherit' });

  // await browser.close();
})();
