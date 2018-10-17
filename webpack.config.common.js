module.exports = {
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
      },
      {
        test: require.resolve("wavesurfer.js"),
        loader: "expose-loader?WaveSurfer"
      }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js"]
  }
};
