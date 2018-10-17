const Dotenv = require('dotenv-webpack');
const commonConfig = require("./webpack.config.common");

commonConfig.mode = "production";
commonConfig.devtool = "source-map";
commonConfig.plugins = [
  new Dotenv({
    systemvars: true,
    path: '.env.production'
  })
];

module.exports = commonConfig
