# about-webpack-and-cli2_cli3-explain
## 关于cli2和cli3创建项目的说明

### cli2创建项目
### vue init webpack projectName 创建

### cli3创建项目
### vue create projectName 创建

```javascript
vue-cli 3 是基于 webpack 4 打造，vue-cli 2 还是 webapck 3
vue-cli 3 的设计原则是“0配置”，移除的配置文件根目录下的，build和config等目录
vue-cli 3 提供了 vue ui 命令，提供了可视化配置，更加人性化
移除了static文件夹，新增了public文件夹，并且index.html移动到public中
```