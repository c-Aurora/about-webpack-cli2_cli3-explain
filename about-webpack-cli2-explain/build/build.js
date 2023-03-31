// 该文件作用，即构建生产版本。package.json中的scripts的build就是node build/build.js，输入命令行npm run build对该文件进行编译生成生产环境的代码，主要完成了下面几件事情。
// 1.进行node和npm的版本检查
// 2.打包时产生loading动画
// 3.删除目标文件夹
// 4.输出打包信息


'use strict'
require('./check-versions')()// check-versions：调用检查版本的文件。加（）代表直接调用该函数

process.env.NODE_ENV = 'production'// 设置当前是生产环境
//下面定义常量引入插件
const ora = require('ora')// ①加载动画
const rm = require('rimraf')// ②删除文件
const path = require('path')
const chalk = require('chalk')// ③对文案输出的一个彩色设置
const webpack = require('webpack')
const config = require('../config')// 默认读取下面的index.js文件
const webpackConfig = require('./webpack.prod.conf')// 引入webpack生产环境配置

const spinner = ora('building for production...')
spinner.start()// 调用start的方法实现加载动画，优化用户体验
// 先删除dist文件再生成新文件，因为有时候会使用hash来命名，删除整个文件可避免冗余 
// node.js将文件目录拼接起来，默认是/dist/static
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    // process.stdout.write这一串是控制打包后详细文件的输出情况
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    // 打包失败，显示错误信息，并退出程序
    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
	  // 打包成功在控制台上显示打包成功提示信息
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
