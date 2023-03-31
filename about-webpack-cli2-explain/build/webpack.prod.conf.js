// 构建的时候用到的webpack配置来自webpack.prod.conf.js，该配置同样是在webpack.base.conf基础上的进一步完善。主要完成下面几件事情：
// 1.合并基础的webpack配置
// 2.配置样式文件的处理规则，styleLoaders
// 3.配置webpack的输出
// 4.配置webpack插件
// 5.gzip模式下的webpack插件配置
// 6.webpack-bundle分析

'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')// 将基础配置和开发环境配置或者生产环境配置合并在一起的包管理
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  // 将webpack基本配置和生产环境配置合并在一起，生成css,postcss,less等规则，并进行模块转换，转换成webpack可识别的文件，进行解析
  // 将CSS提取到单独文件中去
  module: {
    // 调用utils.styleLoaders的方法
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,// 开启调试的模式。默认为true
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false, // 是否使用sourcemap
  output: {
    path: config.build.assetsRoot,// 文件打包的输出路径
    filename: utils.assetsPath('js/[name].[chunkhash].js'),// 主文件入口文件名字
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')// 非主文件入口文件名，可以存放cdn的地址
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    // DefinePlugin 允许创建一个在编译时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用。
    // https://doc.webpack-china.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({// 一个用来压缩优化JS大小的东西
      uglifyOptions: {
        compress: {// 压缩
          warnings: false// 警告：true保留警告，false不保留
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({// 抽取文本。比如打包之后的index页面有style插入，就是这个插件抽取出来的，减少请求
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({// 压缩优化css大小的插件
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({// html打包
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {// 压缩
        removeComments: true, // 删除注释
        collapseWhitespace: true,// 删除空格
        removeAttributeQuotes: true// 删除属性的引号  
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'// 模块排序，按照我们需要的顺序排序
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),// 该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),// 预编译所有模块到一个闭包中，提升你的代码在浏览器中的执行速度。
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({// 抽取公共的模块
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // 把webpack的runtime和manifest这些webpack管理所有模块交互的代码打包到[name].js文件中,防止build之后vendor的hash值被更新

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    new CopyWebpackPlugin([// 复制，比如打包完之后需要把打包的文件复制到dist里面
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
