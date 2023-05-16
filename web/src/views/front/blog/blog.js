export default `# 技术
本博客采用前后端分离的技术来实现的。具体使用的主要技术框架大致如下表格所示。

|位置|主要技术|
|:-:|:-:|
|前端|[Vue](https://vuejs.org)、[Element-UI](https://element.eleme.io)、[markdown-it](https://github.com/markdown-it/markdown-it)、[Three.js](https://threejs.org/)|
|后端|[Node](https://nodejs.org/en/)、[koa2](https://koajs.com)|
|服务器|[Nginx](https://nginx.org/en/)、[pm2](https://pm2.keymetrics.io)|
|数据库|[Mysql](https://www.mysql.com/cn/)|

# 简单说下各个框架都在本博客中担任了什么样的角色
## Vue
这个是整个博客使用的前端框架。
## Element-UI
这个是基于Vue的一个UI框架。
## markdown-it
这个主要是文章使用的，写文章的时候用markdown-it的格式写，最终能够转换成html的格式显示。
## Three.js
看到博客的星空宇宙背景了吗，在不停地动，这就是用Three.js来实现的3D效果，小玩具中听雨轩、方块城市的背景也是用Three.js实现的。
## Node
后端使用的nodejs来实现的。
## koa2
这是基于nodejs的后端web框架。
## Nginx
这是服务器上面部署的web服务器，本博客中提供了反向代理到koa2服务的功能，以及展示Vue打包后页面的功能。
## pm2
这是node的进程管理工具，能够管理koa2的服务，比如自动重启等功能。
## Mysql
数据库，提供博客文章的存储功能。

# 开源
整个博客的全部代码，都是自己一点一点码出来的。目前来说，功能还比较简单，后续会慢慢的增加更多的功能。

现在整个博客源码已经上传到[github](https://github.com/flywo/blog)上面，全部开源了，感兴趣的朋友可以自取。有问题可以联系我的QQ，联系方式在右上角。当然，**如果你有赚钱的项目，更加欢迎联系我**。😄
`