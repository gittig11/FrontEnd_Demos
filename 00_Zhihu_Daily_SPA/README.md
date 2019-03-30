# Zhihu_Daily_SPA

> 使用 `Vue.js` + `Webpack` 开发的 知乎日报SPA

​	最近在学习使用`Vue-CLI` 和`Webpack`开发项目的流程，参照知乎日报APP小试牛刀，实现了基本的页面排版和数据展示功能。目前，只是实现了一部分功能，项目在逐步完善中。[Github地址]()

​	从使用`axios`解析`API`、解决跨域问题等入手，一步一步地完善项目。虽然看起来挺简单的界面，但是花了很长时间去思考和实践。这一次主要是从学习和需求的角度出发去实践，有些地方考虑不周，功能也没有完善，后续会继续完善项目。


## Build
    # install dependencies
    npm install
    # serve with hot reload at localhost:8080
    npm run dev
    # build for production with minification
    npm run build
    # build for production and view the bundle analyzer report
    npm run build --report

## 技术栈
* `Vue-CLI` + `Webpack` + `Vue Router`
* 插件：
  + `axios`(基于promise的HTTP客户端)
  + `lib-flexible`(手淘移动端适配方案)
  + `px2rem-loader`(px转rem)
  + `vue-awesome-swiper`(轮播图)
  + `vue-lazyload`(懒加载)

## 项目结构
* build  Webpack配置相关
* config  项目配置相关
* node_modules  node模块目录
* src  代码目录
    * 	assets  静态资源目录
    * 	components  组件目录
    * 	router  路由目录
    * 	utils  公用方法目录
    * 	App.vue  主组件
    * 	main.js  入口文件
* static  静态文件目录
* index.html
* package.json 
* README.md

## 项目截图


![项目截图1.png](https://i.loli.net/2019/03/29/5c9e395179b33.png)


![项目截图2.png](https://i.loli.net/2019/03/29/5c9e39523b3be.png)

## 知识点

1. 知乎日报API的使用：

   知乎日报API地址是：https://news-at.zhihu.com/api/4/news/latest

   具体文章的API地址是：https://news-at.zhihu.com/api/4/news/9708896

   有了API地址，下一步可以用`axios`去请求数据。由于`axios`不是`Vue`插件，无法直接`Vue.use()`，这里使用了`vue-axios`。

   ```
   import axios from 'axios'
   import VueAxios from 'vue-axios'
   Vue.use(VueAxios,axios);
     
   axios.get("https://news-at.zhihu.com/api/4/news/latest").then(res => {
       console.log(res.data)
   })
   ```

2. 跨域问题。由于浏览器的安全策略，我们无法直接通过`axios`请求到API数据，在`config/index.js`中配置`ProxyTable`实现跨域：

    ```
    proxyTable: {
      '/api': {
        target: 'http://news-at.zhihu.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    },
    ```

    `axios`请求：

    ```
    axios.get(`/api/4/news/latest`).then(res => {
      console.log(res.data)
    })
    ```

3. `Vue Router`

  `SPA`分为主页面`Home`和文章详情页`NewsDetail`，通过设置`Vue Router`实现路由跳转：

  ```
  import Vue from 'vue'
  import Router from 'vue-router'
  import Home from '@/components/Home'
  import Header from '@/components/Header'
  Vue.use(Router)
  export default new Router({
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
          path: '/news/:id',
          name: 'news',
          component: () => import('@/components/NewsDetail'),
      },
    ]
  })
  ```

4. 主页面

  在`components`目录下新建`Home.vue`文件，用来展示`axios`返回的数据。这里将`Home.vue`作为SPA的主页面，包含`header`、`swiper`轮播图、`content`和 `footer`。

  一个组件包括`template`、`script`、`style`三部分：

  * `template`中编写`HTML`代码，可以插入自定义的组件名。

  * `script`中可以`import`所需的插件，并导出：

    ```
    export default {
      name: 'Home',
      data () { return {} },
      components:{
        'v-header': Header,
        'v-footer': Footer,
        'v-swiper': Swiper,
      },
      methods: {}
    }
    ```

  * `style`中存放`CSS`代码，加`scoped`表示样式只对当前`.vue`文件有效，而不会影响其他`.vue`文件。

5. 文章详情页

  知乎日报API中文章内容是`HTML`代码，这里用到了`v-html`：

  ```
  <div v-html="image403(story.body)"></div>
  ```

  注：其中`image403()`可以解决知乎图片403的问题（下面有介绍到）。

  `v-html`的代码怎么自定义`CSS`样式，可以在样式前面添加`>>>`：

  ```
  >>> .partnerSwiper {
    max-width: 750px;
    min-width: 300px;
    margin: 60px auto 0;/*no*/
  }
  ```

6. 解决知乎图片403的问题

    使用`axios`获取的图片`url`直接放在`img`的`src`属性中，出现403的错误。

    解决方法：[【前端】解决访问api图片403禁止访问问题](https://segmentfault.com/a/1190000011628835)

    把 API 图片链接提取出来，使用下面方法过滤:
    ```
    <div>图片：<img :src="item.img" :alt="item.hero_title"></div>
    
    getImage(url){
      // 把现在的图片连接传进来，返回一个不受限制的路径
      if(url !== undefined){
        return url[0].replace(/http\w{0,1}:\/\/p/g,'https://images.weserv.nl/?url=p');
      }
    }
    ```

7. `vue-lazyload`

    ```
    import VueLazyload from 'vue-lazyload'
    Vue.use(VueLazyload,{
      error: require('../src/assets/404.jpg'),
      loading: require('../src/assets/Spinner-1s-200px.gif')
    })
    ```

8. `lib-flexible` 和 `px2rem-loader`

    这里引入手淘`lib-flexible`适配移动端，方案介绍：[使用Flexible实现手淘H5页面的终端适配](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)。

    `lib-flexble`的作用是：

    * 动态改写`<meta>`标签
    * 给`<html>`元素添加`data-dpr`属性，并且动态改写`data-dpr`的值
    * 给`<html>`元素添加`font-size`属性，并且动态改写`font-size`的值

    引入`px2rem-loader`将`CSS`中的`px`转换为`rem`的作用是：

       * 在`Webpack`打包项目文件时，会将项目中的`px`转换为`rem`单位。

    注：目前官方推荐使用`viewport`来替代此方案：[如何在Vue项目中使用vw实现移动端适配](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)


9. `vue-awesome-swiper`

   略。

10. 模块化开发

  模块化开发的代码容易维护。模块化的过程思考了很多，比如怎么写模块、怎么排版、怎么在`Home.vue`中导入等等。

  比如首页分为了`Header`、`Swiper`、`Content`、`Footer`几个模块，在`components`目录下分别建立对应的目录，使用的时候`import`进来并挂载在`components`上。

  ```
  import Header from '@/components/Header'
  import Footer from '@/components/Footer'
  import Swiper from '@/components/Swiper'
  
  components:{
    'v-header': Header,
    'v-footer': Footer,
    'v-swiper': Swiper,
  }
  ```

11. 自定义组件引入`CSS`文件

   文章详情页引入了API中的`CSS`样式文件，这里自定义了一个组件，使用时在`template`中插入：

   ```
   <remote-css :href="cssurl"></remote-css>
   ```

   自定义组件：

   ```
   'remote-css': {
     render: function(createElement){
       return createElement('link', { 
         attrs: { 
           rel: 'stylesheet', 
           href: "https://daily.zhihu.com/css/share.css?v=5956a",
           type: "text/css"
         }
       })
     },
     props: {
       href: {
         type: String,
         required: true,
       },
     },
   },
   ```

12. 项目完善

   页面：

   * 根据设计图去完善界面;

   * 添加返回按钮；

   * 添加功能区，比如收藏夹、分享按钮等；

   功能：

   * `Vue store`、`Vuex`的使用；
   * 使用`vw`替代`lib-flexible`实现移动端适配;
   * 

## 致谢

izzyleung 的 [知乎日报 API 分析](https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90)

andefine 的 [vue-zhihu-daily](https://github.com/andefine/vue-zhihu-daily)
