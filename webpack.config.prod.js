const webpack = require("webpack");

module.exports = {
  entry: "./src/scripts/app.jsx",
  output: {
    filename: "./dist/scripts/bundle.js"
  },
  module: {
    loaders: [
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
          presets: ["react", "es2015"]
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
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        HONEYBADGER_CLIENT_KEY: JSON.stringify(
          process.env.HONEYBADGER_CLIENT_KEY
        ),
        AUTH0_DOMAIN: JSON.stringify("MAGICSTRING_AUTH0_DOMAIN"),
        AUTH0_CLIENT_ID: JSON.stringify("MAGICSTRING_AUTH0_CLIENT_ID"),
        AUTH0_CALLBACK_URL: JSON.stringify("MAGICSTRING_AUTH0_CALLBACK_URL"),
        AUTH0_AUDIENCE: JSON.stringify("MAGICSTRING_AUTH0_AUDIENCE"),
        CMS_URL: JSON.stringify(process.env.CMS_URL)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    })
  ]
};
