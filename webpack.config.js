/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = () => {
  const env = dotenv.config().parsed;
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    devServer: {
      historyApiFallback: {
        disableDotRule: true
      },
      port: 8000,
      contentBase: './build'
    },
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader']
        },
        {
          test: /.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /.(jpg|jpeg|png|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name]-[hash:8].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        favicon: path.join(__dirname, 'src', 'favicon.ico'),
        template: path.join(__dirname, 'src', 'index.html')
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      new ErrorOverlayPlugin()
    ],
    devtool: 'cheap-module-source-map'
  };
};
