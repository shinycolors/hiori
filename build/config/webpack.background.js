const path = require('path')

module.exports = {
  entry: [
    './src/background.js'
  ],
  output: {
    filename: 'background.js'
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
            // outputPath: 'assets',
            // name: '[sha256:hash:hex:64]'
            name: '[name].[ext]'
          }
        }
      }
    ]
  }
}
