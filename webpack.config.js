'use strict'
const config = require('config');
const fs = require('fs')
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default

// Taken from https://github.com/lorenwest/node-config/wiki/Webpack-Usage
// This is to integrate node-config with webpack
fs.writeFileSync(
  path.resolve(__dirname, './built-config.json'),
  JSON.stringify(config, null, '  ')
)

module.exports = {
  entry: './src/index.js',
  mode: config.devMode ? 'development' : 'production',
  output: {
    filename: 'builds/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: config.devMode ? {
    contentBase: '.',
    historyApiFallback: true,
    hot: true,
    port: 4044
  } : undefined,
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    alias: {
      config: path.resolve(__dirname, './built-config.json')
    }
  },
  node: { global: true },
  devtool: config.devMode ? 'inline-source-map' : undefined,
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    // Javascript Specific
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        config.devMode ? 'development' : 'production'
      )
    }),
    config.devMode ? new webpack.HotModuleReplacementPlugin() : null,
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new CopyWebpackPlugin([
    //   { from: './styles', to: 'styles' },
    //   { from: './resources', to: 'resources' }
    // ]),
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true
      }
    }),
    !config.devMode
      ? new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
      : null
  ].filter(Boolean),
  optimization: {
    minimizer: [new MinifyPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader', 'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              '@babel/preset-env'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader', 'url-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader', 'url-loader'
        ]
      }
    ]
  }
}