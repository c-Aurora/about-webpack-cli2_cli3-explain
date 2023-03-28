# about-webpack-and-cli2-explain
### 关于cli2创建项目的说明，及config和build文件中文注释(注释在各个文件里)
> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### 目录说明及config和build文件中文注释(注释在各个文件里)
### vue init webpack projectName 创建
```
├─build                                // webpack配置文件(都已配好，一般不需要配置)
		│ ├─builds.js                           // 生产环境构建
		│ ├─check-versions.js           // 版本检查(node,npm)
		│ ├─utils.js                              // 构建相关工具
		│ ├─vue-loader.conf.js          //  css加载器配置
		│ ├─webpack.base.conf.js    //  webpack基础配置
		│ ├─webpack.dev.conf.js      //  webpack开发环境配置
		│ ├─webpack.prod.conf.js    //  webpack生产环境配置
	├─config                              // 项目打包路径(config内的文件其实是服务于build的，大部分是定义一个变量export出去)
		│ ├─dev.env.js                        //  项目开发环境配置
		│ ├─index.js                           //  项目主要配置(包括监听端口，打包路径等)
		│ ├─prod.env.js                     //  项目生产环境配置
	├─dist                                  // 打包文件
	├─node_modules                // 依赖包
	├─src                                   // 源码目录
		│ ├─assets                            // 静态资源 (样式类如css,less,scss,以及一些外部js文件)
		│ ├─components                  // 公共组件
		│ ├─router                            // 路由(配置项目路由)
		│ ├─App.vue                        // 页面入口文件(根组件)
		│ ├─main.js                         // 程序入口文件，加载各种公共组件
	├─static                              // 静态资源 (一般放图片类)
	├─.babelrc                          // ES6语法编译配置
	├─.editorconfig                  // 代码编写规格
	├─.gitignore                       // git上传需要忽略的文件配置
	├─.postcssrc.js                  // 转换css的工具
	├─index.html                      // 入口html文件(主页)
	├─package-lock.json
	├─package.json                 // 项目及工具的依赖配置文件
	└─README.md                  // 项目说明
```
