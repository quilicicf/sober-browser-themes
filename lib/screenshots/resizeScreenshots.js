const _ = require('lodash');
const sharp = require('sharp');
const { resolve: resolvePath } = require('path');

const APP_ROOT = resolvePath(__dirname, '..', '..');
const screenshotsFolder = resolvePath(APP_ROOT, 'docs', 'images');

const resizeScreenshots = async ({ colorName }) => {
  const imagePath = resolvePath(screenshotsFolder, `sober-dark-${colorName}-overview.png`);
  const miniatureImagePath = resolvePath(screenshotsFolder, `sober-dark-${colorName}-overview_small.png`);
  await sharp(imagePath)
    .extract({ width: 930, height: 592, left: 0, top: 0 })
    .resize(440, 280)
    .toFile(miniatureImagePath);
};

module.exports = async (variations) => {
  await _.reduce(
    variations,
    (seed, variation) => seed.then(() => resizeScreenshots(variation)),
    Promise.resolve(),
  );
};
