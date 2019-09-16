const _ = require('lodash');
const svg2png = require('svg2png');
const bufferReplace = require('buffer-replace');
const { resolve: resolvePath } = require('path');
const { readFile, writeFile } = require('pn/fs');

const { ICONS_SIZES, RAW_ICON_FOLDER } = require('./constants');

module.exports = async (hexColor, targetFolder) => {
  const iconsPromises = _.map(ICONS_SIZES, (size) => (
    readFile(RAW_ICON_FOLDER)
      .then(svgIconBuffer => {
        const replacedBuffer = bufferReplace(svgIconBuffer, '#000000', hexColor);
        return svg2png(replacedBuffer, { width: size, height: size });
      })
      .then(pngIconBuffer => writeFile(resolvePath(targetFolder, `icon-${size}.png`), pngIconBuffer))
      .catch(error => {
        throw error;
      })
  ));

  return Promise.all(iconsPromises);
};
