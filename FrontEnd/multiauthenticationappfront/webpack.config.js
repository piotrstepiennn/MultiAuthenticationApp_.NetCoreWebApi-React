const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const jsDirs = [path.resolve(__dirname, "src")];

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".css", ".js", ".jsx", ".*"],
    modules: [...jsDirs, "node_modules"],
  },
  entry: {
    builder: ["./src/index.tsx"],
  },
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "",
    filename: "[name].bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Multiauthentication App",
      template: path.resolve(__dirname, "index.html"),
    }),
    new MiniCssExtractPlugin(),
    new NodePolyfillPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        include: jsDirs,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
    ],
  },
  mode: "development",
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "./public"),
    },
    open: true,
    compress: true,
    hot: true,
    port: 4000,
  },
};
