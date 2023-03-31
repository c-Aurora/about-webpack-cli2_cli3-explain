// 该文件的主要作用就是处理.vue文件，解析这个文件中的每个语言块（template、script、style),转换成js可用的js模块

'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production' // 判断是否为生产环境
const sourceMapEnabled = isProduction // 判定特定环境下sourceMap的值
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap// 是否将样式提取到单独的文件
// 处理项目中的css文件，生产环境和测试环境默认是打开sourceMap，而extract中的提取样式到单独文件只有在生产环境中才需要
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,// 是否开启cssSourceMap, 关闭可以避免 css-loader 的 some relative path related bugs 同时可以加快构建速度。
  cacheBusting: config.dev.cacheBusting,// 是否通过将哈希查询附加到文件名来生成具有缓存清除的源映射
    // 在模版编译过程中，编译器可以将某些属性，如 src 路径，转换为require调用，以便目标资源可以由 webpack 处理.
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
