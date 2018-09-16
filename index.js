#!/usr/bin/env node

const _ = require('lodash');
const deepmerge = require('deepmerge');
const bufferReplace = require('buffer-replace');
const { execSync } = require('child_process');
const { resolve } = require('path');
const svg2png = require('svg2png');
const { readFile, writeFile } = require('pn/fs');
const { writeFileSync, mkdirSync, existsSync } = require('fs');

const package = require('./package');

const { VARIATIONS } = require('./lib/variations');
const manifestTemplate = require('./lib/manifest-template');

const DIST_FOLDER = resolve(__dirname, 'dist');
const RAW_ICON_FOLDER = resolve(__dirname, 'lib', 'material_design_camera.svg');
const ICONS_SIZES = [ 16, 48, 128 ];

const generateManifest = (manifestPatcher) => (
  deepmerge.all([
    manifestTemplate,
    manifestPatcher,
    { version: package.version }
  ])
);

const generateIcons = async (colorHex, targetFolder) => {
  const iconsPromises = _.map(ICONS_SIZES, (size) => (
    readFile(RAW_ICON_FOLDER)
      .then(svgIconBuffer => {
        const replacedBuffer = bufferReplace(svgIconBuffer, '#000000', colorHex);
        return svg2png(replacedBuffer, { width: size, height: size });
      })
      .then(pngIconBuffer => writeFile(resolve(targetFolder, `icon-${size}.png`), pngIconBuffer))
      .catch(error => {
        throw error;
      })
  ));

  return Promise.all(iconsPromises);
};

const mkdirIfAbsent = (path) => {
  if (existsSync(path)) {
    return;
  }

  mkdirSync(path);
};

const writeInDist = async ({ colorName, colorHex, manifest }) => {
  const targetFolder = resolve(DIST_FOLDER, `chrome-sober-${manifest.colorName}-theme`);
  execSync(`rm -rf ${targetFolder}`);
  mkdirSync(targetFolder);

  const targetManifestPath = resolve(targetFolder, 'manifest.json');
  writeFileSync(targetManifestPath, JSON.stringify(manifest, null, 2), 'utf8');

  await generateIcons(colorHex, targetFolder);
};

mkdirIfAbsent(DIST_FOLDER);
_(VARIATIONS)
  .map(variation => ({
    colorName: variation.colorName,
    colorHex: variation.colorHex,
    manifest: generateManifest(variation.manifestPatcher),
  }))
  .each(builtVariation => writeInDist(builtVariation));
