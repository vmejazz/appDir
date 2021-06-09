const HtmlWebpackPlugin = require("html-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const webpack = require("webpack");
require("dotenv").config();

const ENV = process.env.APP_ENV;
const isTest = ENV === "test";
const isProd = ENV == "prod";

function setDevTool() {
  if (isTest) {
    return "inline-source-map";
  } else if (isProd) {
    return "source-map";
  } else {
    return "eval-source-map";
  }
}

const config = {
  entry: __dirname + "/src/app/index.js",
  output: {
    path: __dirname + "/build",
    filename: "bundle.js",
    publicPath: "/",
  },
  devtool: setDevTool(),
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html/,
        use: "raw-loader",
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/public/index.html",
      inject: "body",
    }),
    new DashboardPlugin(),
    new webpack.DefinePlugin({
      APP_ENV: JSON.stringify(process.env.APP_ENV),
    }),
  ],
  devServer: {
    contentBase: "./src/public",
    port: 3000,
  },
  performance: {
    hints: false,
  },
  mode: "development",
};

if (isProd) {
  config.plugins.push(
    new UglifyJSPlugin()
    // new CopyWebpackPlugin([
    //   {
    //     from: __dirname + "/src/public",
    //   },
    // ])
  );
  config.mode = "production";
}

module.exports = config;
