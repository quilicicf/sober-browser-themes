const { execSync } = require('child_process');
const { mkdirSync, existsSync } = require('fs');

module.exports = (path) => {
  if (existsSync(path)) { execSync(`rm -rf ${path}`); }
  mkdirSync(path);
};
