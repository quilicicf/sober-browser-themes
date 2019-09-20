const _ = require('lodash');
const { execSync, spawn } = require('child_process');
const { resolve: resolvePath } = require('path');

const APP_ROOT = resolvePath(__dirname, '..', '..');
const getBuiltThemePath = (themeFolderName) => resolvePath(APP_ROOT, 'dist', themeFolderName);
const getScreenshotTargetPath = (colorName) => resolvePath(APP_ROOT, 'docs', 'images', `sober-dark-${colorName}-overview.png`);

const takeScreenshot = (profilePath, { colorName, chromeFolderName }) => {
  const builtThemePath = getBuiltThemePath(chromeFolderName);
  const screenshotTargetPath = getScreenshotTargetPath(colorName);
  const arguments = [
    `--user-data-dir="${profilePath}"`,
    '--disable-sync',
    '--window-position=0,0',
    '--window-size=1280,800',
    `--load-extension=${builtThemePath}`,
    '--no-displaying-insecure-content',
    '--restore-last-session',
  ];

  const chromeProcess = spawn('/usr/bin/google-chrome', arguments, { detached: true });
  return new Promise(((resolve) => {
    setTimeout(() => {
      execSync(`shutter -w 'New Tab - Google Chrome' -o ${screenshotTargetPath} -e &> /dev/null`);
      process.kill(chromeProcess.pid);
      resolve();
    }, 1000);
  }));
};

module.exports = async (variations) => {
  const [ profilePath ] = process.argv.splice(2);
  await _.reduce(
    variations,
    (seed, variation) => seed.then(() => takeScreenshot(profilePath, variation)),
    Promise.resolve(),
  );
};
