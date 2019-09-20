#!/usr/bin/env node

const _ = require('lodash');
const { resolve: resolvePath } = require('path');
const { writeFileSync } = require('fs');

const zipTheme = require('./lib/zipTheme');
const generateIcons = require('./lib/generateIcons');
const reCreateDir = require('./lib/reCreateDir');
const getVariations = require('./lib/getVariations');
const { DIST_FOLDER } = require('./lib/constants');

const generateFirefoxManifest = require('./lib/firefox/generateFirefoxManifest');
const generateChromeManifest = require('./lib/chrome/generateChromeManifest');

const writeInDist = async ({ version, colorName, hexColor, chromeManifest, chromeFolderName, firefoxManifest, firefoxFolderName }) => {
  const promises = _(
    [
      { folderName: chromeFolderName, manifest: chromeManifest, shouldAddIcons: true },
      { folderName: firefoxFolderName, manifest: firefoxManifest, shouldAddIcons: false },
    ])
    .map(({ folderName, manifest, shouldAddIcons }) => {
      const targetFolderPath = resolvePath(DIST_FOLDER, folderName);
      reCreateDir(targetFolderPath);
      const targetManifestPath = resolvePath(targetFolderPath, 'manifest.json');
      writeFileSync(targetManifestPath, JSON.stringify(manifest, null, 2), 'utf8');

      const iconsGenerator = shouldAddIcons ? generateIcons(hexColor, targetFolderPath) : Promise.resolve();
      return iconsGenerator.then(() => zipTheme(colorName, targetFolderPath, version));
    })
    .flatten()
    .value();

  return Promise.all(promises);
};

reCreateDir(DIST_FOLDER);

_(getVariations())
  .map(variation => ({
    ...variation,
    chromeManifest: generateChromeManifest(variation),
    firefoxManifest: generateFirefoxManifest(variation),
  }))
  .each(builtVariation => writeInDist(builtVariation));
