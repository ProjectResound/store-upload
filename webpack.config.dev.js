const Dotenv = require("dotenv-webpack");
const commonConfig = require("./webpack.config.common");

commonConfig.mode = "development";
commonConfig.externals = {
  cheerio: "window",
  "react/lib/ExecutionEnvironment": true,
  "react/lib/ReactContext": true
};
commonConfig.devServer = {
  hot: true,
  inline: true,
  port: 7700,
  historyApiFallback: true
};
commonConfig.plugins = [
  new Dotenv({
    systemvars: true
  })
];

module.exports = commonConfig
