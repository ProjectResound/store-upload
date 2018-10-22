const webpack = require("webpack");
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: "./src/scripts/app.jsx",
  output: {
    filename: "scripts/bundle.js"
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-react", "@babel/preset-env"]
        }
      },
      {
        test: /\.s[c|a]ss$/,
        loader: "style-loader!css-loader!sass-loader"
      }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js"]
  },
  plugins: [
    new Dotenv({
      systemvars: true
    })
  ]
};
