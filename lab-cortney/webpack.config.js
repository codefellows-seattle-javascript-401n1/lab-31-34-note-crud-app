'use strict';

const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');

const autoprefixer = require('autoprefixer');
const ExtractText = require('extract-text-webpack-plugin');

const production = process.env.NODE_ENV === 'production';
const apiURL = process.env.API_URL || 'http://localhost:3000';

var plugins = [
  new ExtractText('bundle.css'),
  new webpack.DefinePlugin({
    __API_URL__: JSON.stringify(apiURL),
    __DEBUG__: JSON.stringify(!production)
  })
];

if (production) {
  plugins = plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false
      }
    }),
    new CleanPlugin()
  ]);
}

module.exports = {
  entry: `${__dirname}/app/entry.js`,
  debug: !production,
  devTool: production ? false : 'eval',
  plugins: plugins,
  output: {
    path: 'build',
    filename: 'bundle.js'
  },
  // sassLoader: {
  //   includePaths: [`${__dirname}/app/scss/lib`]
  // },
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
