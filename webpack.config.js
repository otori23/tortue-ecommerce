const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const settings = {
  distPath: path.join(__dirname, 'dist'),
  srcPath: path.join(__dirname, 'src')
};

module.exports = {
  entry: path.join(settings.srcPath, 'js', 'index.js'),
  output: {
    path: settings.distPath,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')()]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(settings.srcPath, 'index.html')
    })
  ]
};
