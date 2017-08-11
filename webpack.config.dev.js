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
          presets: ["react", "es2015", "stage-0"]
        }
      },
      {
        test: /\.s[c|a]ss$/,
        loader: "style-loader!css-loader!sass-loader"
      },
      {
        test: require.resolve("wavesurfer.js"),
        loader: "expose-loader?WaveSurfer"
      }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js"]
  },
  devServer: {
    hto: true,
    inline: true,
    port: 7700,
    historyApiFallback: true
  },
  externals: {
    cheerio: "window",
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": true
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        AUTH0_DOMAIN: JSON.stringify(process.env.AUTH0_DOMAIN),
        AUTH0_CLIENT_ID: JSON.stringify(process.env.AUTH0_CLIENT_ID),
        AUTH0_CALLBACK_URL: JSON.stringify(process.env.AUTH0_CALLBACK_URL),
        AUTH0_AUDIENCE: JSON.stringify(process.env.AUTH0_AUDIENCE)
      }
    })
  ]
};
