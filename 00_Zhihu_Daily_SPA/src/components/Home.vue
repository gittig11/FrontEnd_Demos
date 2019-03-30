<template>
  <div>
    <v-header></v-header>

    <v-swiper></v-swiper>

    <ul class="contain-wrap">

      <li class="newsTitle" v-for="item in stories">
        <router-link :to="'/news/'+item.id" tag="span" class="title"> {{item.title}} </router-link>
          <!-- <img :src="getImage(item.images)" alt=""> -->
        <img v-lazy="getImage(item.images)" alt="">
      </li>
    </ul>

    <v-footer></v-footer>
  </div>
</template>

<script>
import axios from 'axios'
import "lib-flexible"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
// 轮播图
import Swiper from '@/components/Swiper'


export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      stories: [],
      urls: [],
    }
  },
  components:{
    'v-header': Header,
    'v-footer': Footer,
    'v-swiper': Swiper,
  },
  created(){
    this.getNews()
  },
  methods: {
    getNews () {
      return axios.get(`/api/4/news/latest`).then(res => {
        // console.log(res.data)
        console.log(res.data.stories)
        this.stories = res.data.stories
      })
    },
    // 解决知乎图片403的问题
    getImage(url){
      // console.log(url);
      if(url !== undefined){
        return url[0].replace(/http\w{0,1}:\/\/p/g,'https://images.weserv.nl/?url=p');
        // https://pic2.zhimg.com/v2-208661906aa266236555b8407249fbf1.jpg
        // https://images.weserv.nl/?url=pic2.zhimg.com/v2-208661906aa266236555b8407249fbf1.jpg
      }
    }
    // https://news-at.zhihu.com/api/4/news/latest
    // https://news-at.zhihu.com/api/4/news/9708896
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
>>> .partnerSwiper {
  max-width: 750px;
  min-width: 300px;
  margin: 60px auto 0;/*no*/
}

.contain-wrap {
  max-width: 750px;
  min-width: 300px;
  margin: -5px auto 0; /*减去header绝对定位的高度60px*/
  text-align:center; /*子元素居中*/
  background-color: #fff;
}
.contain-wrap .newsTitle {
  height: 180px;
  width: 100%;
  position: relative;
  border-top: 5px solid #eee;
  padding: 20px;
  box-sizing: border-box;
  text-align: left;
  /*word-wrap: break-word;*/
  display: flex;
}
.contain-wrap .newsTitle .title {
  margin-right: 180px;
  font-size: 0.4rem;
  color: #000;
  background: #fff;
  cursor: pointer;
  align-self: center;
}
.contain-wrap .newsTitle img {
  /*绝对定位*/
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -80px;
  margin-right: 10px;
  display: inline-block;
  width: 160px;
  height: 160px;
}
</style>
