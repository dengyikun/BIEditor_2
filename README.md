#### 技术栈
[react](https://reactjs.org/)

[dva1](https://github.com/dvajs/dva)

[antd](https://ant.design/index-cn)
#### 目录结构
    ├── dist        // 打包资源
    ├── public      // 公共资源
    ├── src
    │   ├── assets          // 静态资源
    │   ├── components      // 公共组件
    │   │   ├── Bases       // 基础组件
    │   │   ├── Charts      // 图表组件
    │   │   ├── Item        // 组件壳
    │   │   ├── ItemList    // 组件渲染
    │   │   └── ValueSelect // 数值选择器
    │   ├── data            // 组件数据注册
    │   ├── editor.js       // 编辑器入口
    │   └── render.js       // 渲染器入口
    └── README.md           // 项目说明
#### 使用
    $ npm i          // 安装
    $ npm start      // 启动
    $ npm run build  // 构建
#### 组件设计流程
首先明确组件类型为 `base` 或 `chart` ，于指定目录设计对应组件，应完善 `onEvent` （返回值在 `data` 注册时 `eventValues` 中指定）和 `onChange` （通常需要操作 `option` ，`option` 默认值在 `data` 注册时 `optionText` 中指定）方法，完成组件后在 `data` 中进行组件数据注册，即可完成基础功能，更多自定义功能需参考相似组件进行设计
