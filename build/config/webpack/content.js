const path = require('path')
const webpack = require('webpack')
const env = require('../environment')

module.exports = {
  mode: env.name,
  entry: [
    './src/entry/content.js'
  ],
  output: {
    filename: 'content.js'
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
      ENV: JSON.stringify(env.appConfig)
    }),
  ]
}
