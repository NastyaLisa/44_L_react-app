const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TreserPlugin = require("terser-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
  },
  devServer: {
    watchFiles: path.resolve(__dirname, "src"),
    port: 3000,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        include: path.resolve(__dirname, './src/scss'),
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          },
      {
        test: /\.module\.s[ac]ss$/,
        exclude: path.resolve(__dirname, './src/scss'),
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]_[local]__[hash:base64:5]",
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  optimization: {
    minimizer: isProd ? [new CssMinimizerPlugin(), new TreserPlugin()] : [],
  },
};
