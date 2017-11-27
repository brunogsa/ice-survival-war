const path = require('path');

const webpack            = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const BrowserSyncPlugin  = require('browser-sync-webpack-plugin');

const folderPaths              = {};
folderPaths.src                = path.join(__dirname, '/src');
folderPaths.dist               = path.join(__dirname, '/dist');
folderPaths.phaserCustomBuilds = path.join(__dirname, '/node_modules/phaser-ce/build/custom');

const filePaths  = {};
filePaths.main   = path.join(folderPaths.src, '/main.js');
filePaths.phaser = path.join(folderPaths.phaserCustomBuilds, '/phaser-split.js');
filePaths.pixi   = path.join(folderPaths.phaserCustomBuilds, '/pixi.js');
filePaths.p2     = path.join(folderPaths.phaserCustomBuilds, '/p2.js');

module.exports = {
  entry: {
    game: filePaths.main,

    engine: [
      filePaths.pixi,
      filePaths.p2,
      filePaths.phaser
    ]
  },

  output: {
    path: folderPaths.dist,
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        include: folderPaths.src,
        test: /\.js$/,
        use: ['babel-loader']
      },

      {
        include: folderPaths.phaserCustomBuilds,
        test: /pixi\.js/,
        use: ['expose-loader?PIXI']
      },

      {
        include: folderPaths.phaserCustomBuilds,
        test: /phaser-split\.js$/,
        use: ['expose-loader?Phaser']
      },

      {
        include: folderPaths.phaserCustomBuilds,
        test: /p2\.js/,
        use: ['expose-loader?p2']
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin([
      folderPaths.dist
    ]),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'engine',
      filename: 'engine.js'
    }),

    new HtmlWebpackPlugin({
      filename: path.join(folderPaths.dist, '/index.html'),
      template: path.join(folderPaths.src, '/index.html'),

      chunks: ['engine', 'game'],
      chunksSortMode: 'manual',

      hash: false
    }),

    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: folderPaths.dist }
    })
  ],

  devtool: 'eval-source-map',
  watch: true,

  resolve: {
    alias: {
      phaser: filePaths.phaser,
      pixi: filePaths.pixi,
      p2: filePaths.p2
    }
  }
};
