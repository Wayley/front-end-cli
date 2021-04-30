const path = require('path');
const { engines, name, version } = require('../../../package.json');
const generatorBasePath = path.resolve(
  __dirname,
  '../../cli-service/generator/template'
);
// Configs of CLI
module.exports = {
  engines, // CLI Expected Node Engines
  name, // CLI Name
  version, // CLI Version
  copyright: `Copyright © Fih-Cloud-Team 2019-${new Date().getFullYear()}`, // CLI Copyright

  generatorBasePath, // CLI Generator Base Path
};
