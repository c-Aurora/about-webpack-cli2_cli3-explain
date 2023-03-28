// utils提供工具函数，包括生成处理各种样式语言的loader，获取资源文件存放路径的工具函数。
// 1.计算资源文件存放路径
// 2.生成cssLoaders用于加载.vue文件中的样式
// 3.生成styleLoaders用于加载不在.vue文件中的单独存在的样式文件
// 4.处理程序在编译过程中出现的错误，并在桌面进行错误信息的提示


'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
// 导出文件的位置，根据环境判断开发环境和生产环境，为config文件中index.js文件中定义的build.assetsSubDirectory或dev.assetsSubDirectory
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
// Node.js path 模块提供了一些用于处理文件路径的小工具①
  return path.posix.join(assetsSubDirectory, _path)
}
// 资源存放的路径，区别在于生产环境和开发环境
exports.cssLoaders = function (options) {
  options = options || {}
// 使用了css-loader和postcssLoader，通过options.usePostCSS属性来判断是否使用postcssLoader中压缩等方法
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
      // 是否使用sourceMap
      // 传送门:https://webpack.js.org/loaders/css-loader/
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
      // 是否使用sourceMap,postcss-loader用来解决各浏览器的前缀问题
      // 传送门:https://webpack.js.org/loaders/postcss-loader/  
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    // 判断将cssLoader和postcssLoader推入loaders数组
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        // Object.assign是es6语法的浅复制，后两者合并后复制完成赋值
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      // ExtractTextPlugin可提取出文本，代表首先使用上面处理的loaders，当未能正确引入时使用vue-style-loader
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      // 返回vue-style-loader连接loaders的最终值
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),// 需要css-loader 和 vue-style-loader
    postcss: generateLoaders(),// 需要css-loader和postcssLoader  和 vue-style-loader
    less: generateLoaders('less'),// 需要less-loader 和 vue-style-loader
    sass: generateLoaders('sass', { indentedSyntax: true }),// 需要sass-loader 和 vue-style-loader
    scss: generateLoaders('sass'),// 需要sass-loader 和 vue-style-loader
    stylus: generateLoaders('stylus'),// 需要stylus-loader 和 vue-style-loader
    styl: generateLoaders('stylus')// 需要stylus-loader 和 vue-style-loader
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
// 将各种css,less,sass等综合在一起得出结果输出output
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  // 发送跨平台通知系统
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return
// 当报错时输出错误信息的标题，错误信息详情，副标题以及图标
    const error = errors[0]// 每次捕获第一个错误
    const filename = error.file && error.file.split('!').pop()// 错误文件的名称所在位置

    notifier.notify({
      title: packageConfig.name,// 错误提示项目名字
      message: severity + ': ' + error.name,// 错误提示类型
      subtitle: filename || '',// 错误提示副标题
      icon: path.join(__dirname, 'logo.png')// 错误提示图示标
    })
  }
}
