var webpack = require("webpack");
var path = require("path");

module.exports = {
  entry: {
    index: [ "./src/index" ]
  },
  devtool: "source-map",
  output: {
    path: __dirname + "/public",
    filename: "[name].js"
  },
  module: {
    preLoaders: [],
    loaders: [
      { test: /\.json$/, loader: "json" }
    ]
  },
  plugins: []
};
