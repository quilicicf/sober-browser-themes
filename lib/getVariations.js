const { rgb } = require('color');
const { map } = require('lodash');

const packageFile = require('../package');

const lightenBaseColor = ({ baseColor }) => rgb(baseColor).lighten(0.15).rgb().round().array();
const createTintedWhite = ({ baseColor }) => rgb(baseColor).lighten(0.80).rgb().round().array();
const createTintedGray = ({ baseColor }) => rgb(baseColor).mix(rgb([ 60, 60, 60 ]), 0.90).rgb().round().array();
const createTintedBlack = ({ baseColor }) => rgb(baseColor).darken(0.90).rgb().round().array();
const baseColorToHex = ({ baseColor }) => rgb(baseColor).hex();
const getDescription = ({ colorName }) => `A minimalistic dark theme with a touch of ${colorName}`;
const getName = ({ colorName }) => `Sober dark ${colorName}`;
const getShortName = ({ colorName }) => `sober-dark-${colorName}`;
const getChromeFolderName = ({ colorName }) => `chrome-sober-${colorName}-theme`;
const getFirefoxFolderName = ({ colorName }) => `firefox-sober-${colorName}-theme`;

const VARIATIONS_SETTINGS = [
  { colorName: 'red', baseColor: [ 204, 62, 68 ] },
  { colorName: 'green', baseColor: [ 141, 193, 73 ] },
  { colorName: 'blue', baseColor: [ 81, 154, 186 ] },
  { colorName: 'yellow', baseColor: [ 203, 203, 65 ] },
  { colorName: 'orange', baseColor: [ 227, 121, 51 ] },
  { colorName: 'purple', baseColor: [ 160, 116, 196 ] },
  { colorName: 'steel', baseColor: [ 116, 148, 163 ] },
  { colorName: 'pink', baseColor: [ 245, 83, 133 ] },
];

module.exports = () => map(VARIATIONS_SETTINGS, variationSettings => ({
  ...variationSettings,
  color: lightenBaseColor(variationSettings),
  tintedBlack: createTintedBlack(variationSettings),
  tintedGray: createTintedGray(variationSettings),
  tintedWhite: createTintedWhite(variationSettings),
  hexColor: baseColorToHex(variationSettings),
  description: getDescription(variationSettings),
  name: getName(variationSettings),
  shortName: getShortName(variationSettings),
  chromeFolderName: getChromeFolderName(variationSettings),
  firefoxFolderName: getFirefoxFolderName(variationSettings),
  version: packageFile.version,
}));
