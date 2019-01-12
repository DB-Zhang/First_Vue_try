'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,//导出文件绝对路径
    filename: '[name].js',//导出文件文件名
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath//作为开发模式下的公用路径
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],//自动解析后缀，使得导入模块时候不带拓展名
    alias: {//创建import 或者　require 时候的别名
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,//对该后缀进行检验
        loader: 'vue-loader',//进行vue检查，使用vue-loader进行处理
        options: vueLoaderConfig//对vue-loader做额外的选项配置
      },
      {
        test: /\.js$/,//对该后缀进行检验
        loader: 'babel-loader',//进行babel检查
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]//必须处理包含src , test 和…………的文件夹
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,//图片后缀
        loader: 'url-loader',//使用url-load 处理
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,//视频后缀
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,//字体文件
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
