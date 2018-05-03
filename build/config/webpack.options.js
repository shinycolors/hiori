const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const appEnv = require('../app-env')
const packageJson = require('../../package.json')

module.exports = {
  mode: process.env.MODE || 'production',
  entry: [
    './src/entry/options.js'
  ],
  output: {
    filename: 'options.js'
  },
  resolve: {
    alias: {
      '@sdk': path.resolve(process.cwd(), 'src/sdk'),
      '@modules': path.resolve(process.cwd(), 'src/modules')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ 'babel-preset-env' ]
          }
        },
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.(png|jpg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify(appEnv)
    }),
    new HtmlWebpackPlugin({
      filename: 'html/options.html'
    })
  ]
}
