# about-webpack-and-cli3-explain
### 关于cli3创建项目的说明，及src件中文注释(注释在各个文件里)


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### 目录说明
### vue create projectName 创建

```javascript
初始目录

    ├─dist                                // 打包文件
    ├─node_modules                        // 依赖包
	├─public                              // public文件夹是用于存放项目使用到的一些静态资源（图片）等，在最后webpack打包时会直接放入dist文件夹内，和 vue-cli2 的static文件夹一样。
	├─src                                 // 源码目录(以后就在这里写)
		│ ├─assets                        // assets一般用于放置src里的组件所使用的静态资源（在webpack打包时会被当成一个模块打包到js文件夹里
		│ ├─components                    // 一般放置非路由组件（全局组件）
        │ │  └── HelloWorld.vue                 // 这是一个名叫HelloWorld.vue组件
		│ ├─router                        // 路由(配置项目路由)，路由配置文件
        │ ├─store                         // 存放vuex相关文件，里面的index.js是vuex的封装文件，用来设置通用变量和方法
        │ ├─views                         // 项目中各模块主要功能的存放文件夹，一般在这里添加新功能
		│ ├─App.vue                       // 页面入口文件(根组件)
		│ ├─main.js                       // 程序入口文件，加载各种公共组件
	├─babel.config.js                     // ES语法转换，比如把ES6相关语法转化为ES5，兼容性更好
	├─jsconfig.json                       //
	├─package-lock.json                   // 包版本控制文件，记录真实安装的包版本
	├─package.json                        // 项目及工具的依赖配置文件
	├─vue.config.js                       // 
	└─README.md                           // 项目说明

配置目录


├── 'node_modules'     // npm下载包都在这个文件夹
├── 'public'                
│   ├── 'favicon.ico'
│   └── 'index.html'  // 作为入口模板,最后打包文件所在地，也是main,js 绑定的 dom
├── 'src'             // 整个工程文件目录
│   ├── 'api'         // 创建用来管理接口的文件夹
│   │   └── 'index.js'    // axios 入口使用
│   ├── 'assets'      // 静态资源管理负责管理图片文字一类的
│   │   ├── 'font'    // 存放字体库文件夹
│   │   └── 'img'     // 存放图片的文件夹
│   ├── 'components'  // 存放组件(全局)文件夹
│   │   └── 'HelloWorld.vue'     // 这是一个名叫HelloWorld.vue组件
│   ├── 'config'      // 项目配置的文件夹
│   │   └──  'index.js'          // 利用node 找包特性 起名index.js 可以快速导包
│   ├── 'directive'   // 自定义指令文件夹
│   │   └── 'index.js'           // 利用node 找包特性 起名index.js 可以快速导包
│   ├── 'lib'         //工具包
│   │   ├── 'tools.js'           // 存放和业务无关工具性质的js代码
│   │   └── 'util.js'            //存放和业务相关工具性质的js代码
│   │   └── 'axios.js'            //ajax 异步封装
│   ├── 'mixins'      //混入mixin文件夹            
│   │   └── 'mixin.js'            //mixin
│   ├── 'pages'      //页面组件 文件夹           
│   ├── 'plugin'     //插件文件夹 
│   ├── 'styles'     //样式文件夹            
│   ├── 'mock'        // 模拟返回数据文件夹
│   │   └── 'index.js'           // 利用node 找包特性 起名index.js 可以快速导包
│   ├── 'router'      // 路由相关
│   │   ├── 'index.js'            // 利用node 找包特性 起名index.js 可以快速导包
│   │   └── 'router.js'           // 路由配置
│   ├── 'store'        // Vuex状态管理文件夹
│   │   ├── 'plugin'   // Vuex配置文件夹
│   │   │   └── 'saveInLocal.js'         // vuex 文件内容本地化储存
│   │   ├── 'module'   // 提取的特定模块的文件夹
│   │   │   └── 'user.js'         // 保存user模块的vuex js
│   │   ├── 'actions.js'          // 提取出vuex actions模块
│   │   ├── 'index.js'            // 利用node 找包特性 起名index.js 可以快速导包
│   │   ├── 'mutations.js'        // 提取出vuex mutations模块
│   │   ├── 'getters.js'          // 提取出vuex getters模块
│   │   └── 'state.js'            // 提取出vuex state模块
│   ├── 'views'        // 视图组件 和 公共组件
│   │   ├── 'About.vue'
│   │   └── 'Home.vue'
│   ├── App.vue     // 由于render 特性 所以需要一个被渲染的vue文件
│   ├── main.js     // 项目入口，文件打包会找这个文件，并且将这个文件的内容打包
├── .browserslistrc      //目标浏览器配置表
├── .editorconfig        // 编辑器配置
├── .gitignore           // 忽略用git提交省略的提交目录
├── babel.config.js      //  高级语法转低级语法
├── package.json
├── package-lock.json    // 锁版本包
├── postcss.config.js    //CSS预处理器
├── README.md
└── vue.config.js        // 项目自定义配置
```
```javascript
配置隐藏
原本的webpack.config.js值vue cli3是隐藏起来的，具体目录在
node_nodules/@vue/cli-serve/webpack.config.js

vue.config.js
vue.config.js 是一个可选的配置文件（我们需要自己创建），如果项目的 (和 package.json 同级的) 根目录中存在这个文件，那么它会被 @vue/cli-service 自动加载


vue.config.js基础配置代码

module.exports = {
    publicPath: "./", // 公共路径 默认为"/"，建议使用"./"相对路径
    devServer: {   // 本地服务器配置(npm run serve)
      port: 8080, // 端口
      host: "localhost", // 域名
      https: false, // 是否开启https
      open: true	// 是否在开启服务器后自动打开浏览器访问该服务器
    },
    lintOnSave: false,  // 取消lint语法检测，此处可不配置
    outputDir:"dist", // build打包输出目录
    assetsDir:"assets", // 静态文件输出目录，基于dist
    indexPath: "index.html",  // 输出html文件名
    productionSourceMap: false, // 取消.map文件的打包，加快打包速度
    configureWebpack: (config) => {
      // process.env为环境变量，分别对应.env.development文件和.env.production文件 此处表示加快开发环境打包速度
      if (process.env.NODE_ENV !== 'production') return;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;	//生产环境去掉console.log
      return {  // 此处配置webpack.config.js的相关配置
        plugins: [],
        performance: {}
      };
    }
};

补充说明：

devServer： 所有 webpack-dev-server 的选项都支持。注意： 有些值像 host、port 和 https
可能会被命令行参数覆写。 有些值像 publicPath 和 historyApiFallback
不应该被修改，因为它们需要和开发服务器的 publicPath 同步以保障正常的工作。
devServer.proxy： 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到
API 服务器。这个问题可以通过 vue.config.js 中的 devServer.proxy
选项来配置。devServer.proxy 可以是一个指向开发环境 API 服务器的字符串
pluginOptions： 这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项

```