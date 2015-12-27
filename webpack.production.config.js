var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: path.resolve(__dirname, 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
      new webpack.DefinePlugin({
          "process.env": {NODE_ENV: JSON.stringify("production")}
      }),
  ],
};

module.exports = config;