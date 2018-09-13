const _ = require('lodash');

const dullColor = (colorRgb) => (
  _(colorRgb)
    .map(code => code * 0.8)
    .map(code => _.round(code))
    .value()
);

const createVariation = ({ colorName, colorRgb }) => {
  const name = `sober-dark-${colorName}`;
  const dulledColor = dullColor(colorRgb);

  return {
    colorName,
    manifestPatcher: {
      colorName,
      description: `A minimalistic dark theme with a touch of ${colorName}`,
      name,
      short_name: name,
      theme: {
        colors: {
          tab_background_text: dulledColor,
          tab_text: dulledColor,
        },
      },
    },
  };
};


module.exports = {
  VARIATIONS: [
    createVariation({ colorName: 'red', colorRgb: [ 231, 0, 65 ] }),
    createVariation({ colorName: 'blue', colorRgb: [ 73, 75, 255 ] }),
    createVariation({ colorName: 'green', colorRgb: [ 0, 182, 64 ] }),
    createVariation({ colorName: 'yellow', colorRgb: [ 255, 201, 0 ] }),
  ]
};
