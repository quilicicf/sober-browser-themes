#!/usr/bin/env node

const _ = require('lodash');
const deepmerge = require('deepmerge');
const { writeFileSync, mkdirSync } = require('fs');
const { execSync } = require('child_process');
const { resolve } = require('path');

const package = require('./package');

const { VARIATIONS } = require('./lib/variations');
const manifestTemplate = require('./lib/manifest-template');

const generateManifest = (manifestPatcher) => (
  deepmerge.all([
    manifestTemplate,
    manifestPatcher,
    { version: package.version }
  ])
);

const writeInDist = ({ colorName, manifest }) => {
  const targetFolder = resolve(__dirname, 'dist', `chrome-sober-${manifest.colorName}-theme`);
  execSync(`rm -rf ${targetFolder}`);
  mkdirSync(targetFolder);

  const targetPath = resolve(targetFolder, 'manifest.json');
  writeFileSync(targetPath, JSON.stringify(manifest, null, 2), 'utf8');
};

_(VARIATIONS)
  .map(variation => ({ colorName: variation.colorName, manifest: generateManifest(variation.manifestPatcher) }))
  .each(manifestAsJsObject => writeInDist(manifestAsJsObject));
