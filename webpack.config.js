const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["babel-polyfill", "./src/client/index.js"],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { 
            presets: ["@babel/preset-env", "@babel/react"],
            plugins: ["dynamic-import-node"] }
      },
      { 
        test: /\.js$/,
        loaders: 'babel-loader',
        options: { 
            presets: ["@babel/preset-env"]
        }
    },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: "./public/index.html"
      })]
};