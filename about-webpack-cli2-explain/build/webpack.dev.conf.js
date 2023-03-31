// 当执行npm run dev时，我们执行的就是该js文件，该文件主要完成以下任务：
// 1.引入相关插件和配置
// 2.生成处理各种样式的规则
// 3.配置开发环境，如热更新、监听端口号，是否自动打开浏览器等都在webpack中的devServer中配置完成
// 4.寻找可利用的端口和添加显示程序编译运行时的错误信息

'use strict'
const utils = require('./utils') // utils提供工具函数，包括生成处理各种样式语言的loader，获取资源文件存放路径的工具函数。
const webpack = require('webpack')// 引入webpack模块
const config = require('../config')// 引入config文件夹
const merge = require('webpack-merge')// 通过webpack-merge实现webpack.dev.conf.js对wepack.base.config.js的继承
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 文件名及时更改，自动打包并且生成响应的文件在index.html里面
// 传送门:https://webpack.js.org/plugins/html-webpack-plugin/
// 美化webpack的错误信息和日志的插件①
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// Friendly-errors-webpack-plugin可识别某些类型的webpack错误并清理，汇总和优先化它们以提供更好的开发者体验。
// 传送门:http://npm.taobao.org/package/friendly-errors-webpack-plugin
const portfinder = require('portfinder')// 查看空闲端口位置，默认情况下搜索8000这个端口②

const HOST = process.env.HOST// ③processs为node的一个全局对象获取当前程序的环境变量，即host
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // 规则是工具utils中处理出来的styleLoaders，生成了css，less,postcss等规则
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,// 增强调试，上文有提及

  // these devServer options should be customized in /config/index.js
  // 此处的配置都是在config的index.js中设定好了
  devServer: {
    clientLogLevel: 'warning',// 控制台显示的选项有none, error, warning 或者 info
    // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,// 启动模块热更新特性
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,// 一切服务都启动用gzip方式进行压缩代码
    host: HOST || config.dev.host,// 指定使用一个host,默认是localhost,获取HOST地址，该文件定义或config中index里的dev配置里获取
    port: PORT || config.dev.port,// 指定要监听的端口号
    open: config.dev.autoOpenBrowser,// 调试时是否自动打开浏览器
    overlay: config.dev.errorOverlay// 当出现编译器错误或警告时，在浏览器中显示全屏叠加,覆盖到浏览器的项目页面的上方。{warning:false,errors:true}这个选项为 显示错误和警告
      ? { warnings: false, errors: true }
      : false,// warning 和 error 都要显示
      // 服务器假设运行在http://localhost:8080并且output.filename被设置为bundle.js默认。publicPath是"/"，所以你的包（束）通过可以http://localhost:8080/bundle.js访问。
    // 比如将config中的index.js dev对象的中的assertsPublicPath设置为"/asserts/"那么文件打开后将通过http://localhost:8080/asserts/来进行访问
    publicPath: config.dev.assetsPublicPath,//
    proxy: config.dev.proxyTable,//如果你有单独的后端开发服务器API，并且希望在同域名下发送API请求，那么代理某些URL将很有用.简称就是API代理,中间件  需引入 http-proxy-middleware
    quiet: true, //控制台是否禁止打印警告和错误,若用FriendlyErrorsPlugin 此处为 true
    watchOptions: {
      poll: config.dev.poll,// 文件系统检测改动
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),// ⑤模块热替换插件，修改模块时不需要刷新页面
    new webpack.NamedModulesPlugin(), //显示文件的正确名字 HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),// 当webpack编译错误的时候，来中端打包进程，防止错误代码打包到文件中
    // https://github.com/ampedandwired/html-webpack-plugin
    // 该插件可自动生成一个 html5 文件或使用模板文件将编译好的代码注入进去⑥
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([// 复制插件
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']// 忽略.*的文件
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  // 由于portfinder这个插件本身是从8000开始查找，这里设置查找的默认端口号
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      // 端口被占用时就重新设置evn和devServer的端口
      process.env.PORT = port// 如果端口被占用就对进程设置端口
      // add port to devServer config
      devWebpackConfig.devServer.port = port// 如果端口被占用就设置devServer的端口

      // Add FriendlyErrorsPlugin
      // 友好地输出信息
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {// 添加提示信息，所在域名和端口的提示信息
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors// 窗口提示信息,调用utils工具函数的createNotifierCallBack()方法
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)// 如果找到能用的端口号，就把配置信息提示抛出去
    }
  })
})
