const path = require('path')
const webpack = require('webpack')
const appEnv = require('../app-env')

module.exports = {
  mode: process.env.MODE || 'production',
  entry: [
    './src/entry/injects.js'
  ],
  output: {
    filename: 'injects.js'
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
          loader: 'url-loader',
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify(appEnv)
    })
  ]
}
