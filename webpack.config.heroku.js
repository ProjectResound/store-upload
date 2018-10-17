const Dotenv = require("dotenv-webpack");
const commonConfig = require("./webpack.config.common");

commonConfig.mode = "production";
commonConfig.externals = {
  cheerio: "window",
  "react/lib/ExecutionEnvironment": true,
  "react/lib/ReactContext": true
};

commonConfig.plugins = [
  new Dotenv({
    systemvars: true
  })
];

module.exports = commonConfig

