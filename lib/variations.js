const Color = require('color');
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
  const name = `Sober dark ${colorName}`;
  const short_name = `sober-dark-${colorName}`;
  const darkenedColor = Color(colorRgb)
    .darken(0.90)
    .rgb()
    .round()
    .array();

  return {
    colorName,
    manifestPatcher: {
      colorName,
      description: `A minimalistic dark theme with a touch of ${colorName}`,
      name,
      short_name,
      theme: {
        colors: {
          // Color
          tab_background_text: colorRgb,
          tab_text: colorRgb,

          // Background-color
          button_background: darkenedColor,
          control_background: darkenedColor,
          frame: darkenedColor,
          frame_incognito: darkenedColor,
          ntp_background: darkenedColor,
          ntp_header: darkenedColor,
          toolbar: darkenedColor,
        },
      },
    },
  };
};

module.exports = { VARIATIONS: map(VARIATIONS_SETTINGS, createVariation) };
