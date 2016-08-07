'use strict';

const webpack = require('webpack');

const autoprefixer = require('autoprefixer');
const ExtractText = require('extract-text-webpack-plugin');

const apiURL = process.env.API_URL || 'http://localhost:3000';

module.exports = {
  entry: `${__dirname}/app/entry.js`,
  plugins: [
    new ExtractText('bundle.css'),
    new webpack.DefinePlugin({
      __API_URL__: JSON.stringify(apiURL)
    })
  ],
  output: {
    path: 'build',
    filename: 'bundle.js'
  },
  postcss: function() {
    return [autoprefixer];
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractText.extract('style', 'css!postcss!sass!')
      },
      {
        test: /\.html$/,
        loader: 'html'
      }
    ]
  }
};
