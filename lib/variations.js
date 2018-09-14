const { map } = require('lodash');

const VARIATIONS_SETTINGS = [
  { colorName: 'red', colorRgb: [ 204, 62, 68 ] },
  { colorName: 'blue', colorRgb: [ 81, 154, 186 ] },
  { colorName: 'green', colorRgb: [ 141, 193, 73 ] },
  { colorName: 'yellow', colorRgb: [ 203, 203, 65 ] },
  { colorName: 'orange', colorRgb: [ 227, 121, 51 ] },
  { colorName: 'pink', colorRgb: [ 245, 83, 133 ] },
  { colorName: 'purple', colorRgb: [ 160, 116, 196 ] },
  { colorName: 'steel', colorRgb: [ 116, 148, 163 ] },
];

const createVariation = ({ colorName, colorRgb }) => {
  const name = `sober-dark-${colorName}`;

  return {
    colorName,
    manifestPatcher: {
      colorName,
      description: `A minimalistic dark theme with a touch of ${colorName}`,
      name,
      short_name: name,
      theme: {
        colors: {
          tab_background_text: colorRgb,
          tab_text: colorRgb,
        },
      },
    },
  };
};

module.exports = { VARIATIONS: map(VARIATIONS_SETTINGS, createVariation) };
