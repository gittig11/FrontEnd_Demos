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
      meta: {
    		keepAlive: true, //此组件需要被缓存
    		isBack: false, //用于判断上一个页面是哪个
    	}
    },
    {
    	path: '/news/:id',
    	name: 'news',
    	component: () => import('@/components/NewsDetail'),
    	meta: {
    		keepAlive: true, //此组件需要被缓存
    		isBack: false, //用于判断上一个页面是哪个
    	}
    },
  ]
})
