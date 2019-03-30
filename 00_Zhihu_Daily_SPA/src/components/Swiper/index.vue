<template>
    <div class="partnerSwiper">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <!-- <swiper-slide v-for="item in stories"> -->
        <swiper-slide v-for="(item,index) in list" :key="index">
          <!-- <img :src="getImage(item.images)" /> -->
          <img :src="item.img" />
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-scrollbar"  slot="scrollbar"></div>
      </swiper>
    </div>
</template>

<script>
import Vue from 'vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css' //引入css
// import VueAwesomeSwiper from 'vue-awesome-swiper'; //挂载VueAwesomeSwiper
// Vue.use(VueAwesomeSwiper)
import image403 from '@/utils/image403'

export default {
  name: 'Swiper',
  data () {
    return {
      list:
      [
        {img: require('../../assets/slides/1.jpg')},
        {img: require('../../assets/slides/2.jpg')},
        {img: require('../../assets/slides/3.jpg')}
      ],
      swiperOption: {
        // 如果需要分页器
        pagination: {
          el:'.swiper-pagination',
          type: 'bullets',  
          clickable: true, //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
          hideOnClick: false, //默认分页器会一直显示。这个选项设置为true时点击Swiper会隐藏/显示分页器。
        },
        notNextTick: true,
        // 如果需要自动播放
        autoplay : {
          delay:2000,
          disableOnInteraction:false,  //用户操作swiper之后，是否禁止autoplay。
          reverseDirection: true,   //开启反向自动轮播。
        },
        loop: true, //可以同一个方向一直播放
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next', //前进按钮的css选择器或HTML元素。
          prevEl: '.swiper-button-prev', //后退按钮的css选择器或HTML元素。
          hideOnClick: true, //点击slide时显示/隐藏按钮
        },
        // 如果需要滚动条
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: true, //滚动条是否自动隐藏。默认：false，不会自动隐藏。
          draggable: false, //该参数设置为true时允许拖动滚动条。
          snapOnRelease: true, //如果设置为false，释放滚动条时slide不会自动贴合。
          dragSize: 10, //设置滚动条指示的尺寸。默认'auto': 自动，或者设置num(px)。
        },
        effect:"coverflow",
        grabCursor : true,
        setWrapperSize :true,
        mousewheelControl : true,
        observeParents:true,
      },
    }
  },
  components: {
    swiper,
    swiperSlide
  },
    // you can find current swiper instance object like this, while the notNextTick property value must be true
  // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
  // you can use current swiper instance object to do something(swiper methods)
  // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
  // console.log('this is current swiper instance object', this.swiper)
  // this.swiper.slideTo(0, 1000, false)
  //鼠标覆盖停止自动切换
    this.swiper.el.onmouseover = function () {
      this.swiper.autoplay.stop();
    };
    //鼠标离开开始自动切换
    this.swiper.el.onmouseout = function () {
      this.swiper.autoplay.start();
    };
  },
  methods: {
    // 解决访问api图片403禁止访问问题
    image403,
    toNewsDetail (id) {
      console.log(1)
      this.$router.push({ path: `newsDetail/${id}` })
    }
  }
}
</script>

<style>
.partnerSwiper{
  margin-top: 60px;
}
.partnerSwiper img{
  width: 100%;
  max-height: 300px;
}

</style>
