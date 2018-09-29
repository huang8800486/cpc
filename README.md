# cpc

> 本项目是基于vue2移动端新手项目。代码简单易，实现了移动端基本下拉加载，图片懒加载，左右滑动。

# 项目技术架构
``` bash
vue
vue-router
vuex
cube-ui
stylus
webpack
```

![Image text](https://github.com/huang8800486/cpc/blob/master/cpc.gif)

## 目录结构
``` bash
├── build              // 构建服务和webpack配置
├── config             // 项目不同环境的配置
├── dist               // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── assets         // 图片资源
│   ├── common         // 公共的css js 资源
│   ├── components     // 各种组件
│   ├── App.vue        // 主页面 
│   ├── vuex           // vuex状态管理器
│   ├── router         // 路由配置器
│   └── main.js        // Webpack 预编译入口
```

## Build Setup
``` bash
# 通过npm安装本地服务第三方依赖模块
npm install

# 启动服务
npm run dev

# 发布代码
npm run build

# demo
```

![Image text](https://raw.githubusercontent.com/huang8800486/cpc/master/cpc.png)

