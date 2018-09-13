const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname),
  mode: process.env.NODE_ENV || 'development',
  entry: { 
    app: './src/app.js' 
  },
  output: {
    path: __dirname + '/src/',
    filename: 'bundle.js'
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 5000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  }
};