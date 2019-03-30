// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios);

// import store from './store'

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
	error: require('../src/assets/404.jpg'),
	loading: require('../src/assets/Spinner-1s-200px.gif')
})

import 'normalize.css' // A modern alternative to CSS resets
import 'lib-flexible'
// import '@/styles/common.scss' // 全局公共样式

// VueAwesomeSwiper
import VueAwesomeSwiper from 'vue-awesome-swiper'; 
import 'swiper/dist/css/swiper.css' //引入css
Vue.use(VueAwesomeSwiper)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // components: { App }, //vue1.0的写法
  // template: '<App/>',
  render: h => h(App), //vue2.0的写法
})

