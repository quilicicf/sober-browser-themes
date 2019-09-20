#!/usr/bin/env node

const getVariations = require('../getVariations');

const takeScreenshots = require('./takeScreenshots');
const resizeScreenshots = require('./resizeScreenshots');

(async () => {
  const variations = getVariations();
  await takeScreenshots(variations);
  await resizeScreenshots(variations);
})();
