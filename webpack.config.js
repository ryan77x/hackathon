const path = require('path');
//var nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'web',

  //externals: [nodeExternals()],
  // externals: {
  //   fs: require('fs'),
  //   net: require('net'),
  //   tls: require('tls'),
  // },
  
  context: path.join(__dirname, '/src'),

  entry: {
    javascript: './index'
  },

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist'),
  },

  resolve: {
    alias: {
      react: path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
    ],
  },
};
