const zipper = require('zip-dir');
const { resolve: resolvePath } = require('path');

module.exports = async (colorName, targetFolder, version) => {
  const zipOptions = { saveTo: resolvePath(targetFolder, `chrome-sober-${colorName}-${version}.zip`) };

  return new Promise((resolve, reject) => {
    zipper(targetFolder, zipOptions, (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  })
};
