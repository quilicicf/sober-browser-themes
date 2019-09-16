const { resolve: resolvePath } = require('path');

const DIST_FOLDER = resolvePath(__dirname, '..', 'dist');
const RAW_ICON_FOLDER = resolvePath(__dirname, 'material_design_camera.svg');
const ICONS_SIZES = [ 16, 48, 128 ];

module.exports = {
  DIST_FOLDER,
  RAW_ICON_FOLDER,
  ICONS_SIZES,
};
