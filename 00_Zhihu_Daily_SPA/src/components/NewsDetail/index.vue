<template>
  <div>
    <remote-css :href="cssurl"></remote-css>
    
    <v-header></v-header>

    <div class="main-wrap">
      <div class="headline">
        <div class="img-wrap">
          <h1 class="headline-title">{{story.title}}</h1>
          <span class="img-source">图片：{{story.image_source}}</span>
          <img v-lazy="image403(story.image)" alt="">
          <div class="img-mask"></div>
        </div>
      </div>
      
      <div class="content-inner">
         <div v-html="image403(story.body)"></div>
      </div>
    </div>

    <v-footer></v-footer>
    <!-- <div class="footer">
      <a href="http://www.zhihu.com">知乎网</a>
       · © 2019 知乎
    </div> -->
  </div>
</template>

<script>
import axios from 'axios'
import image403 from '../../utils/image403'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  data () {
    return {
      story: {},
      cssurl: '',
    }
  },
  components: {
    'v-header': Header,
    'v-footer': Footer,
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

    // DetailHeader: () => import('@/components/DetailHeader'),
    // ShareModal: () => import('@/components/ShareModal')
  },
  created () {
    this.getNews()
  },
  methods: {
    image403,
    getNews () {
      return axios.get(`/api/4/news/${this.$route.params.id}`).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.story = res.data
          this.cssurl = this.story.css[0]
          console.log(this.cssurl)
        }
      })
    },
  }
}
</script>

<style scoped>
>>> .main-wrap {
  max-width: 750px;
  min-width: 300px;
  margin: 0 auto;
}
>>> .img-wrap img {
  width: 750px;
}
>>> .headline-title {
  font-size: 32px;
  padding: 0 20px !important;
}
>>> .img-wrap .img-source{
  font-size: 24px;
}

>>> .content {
  font-size: 32px;
}
>>> .question {
  padding: 0 20px;
  overflow: hidden;
}
>>> .question .meta{
  font-size: 32px;
}
>>> .question .meta .avatar{
  width: 32px;
  height: 32px;
}

/*
.main-wrap{
  max-width: 600px;
  min-width: 300px;
  margin: 0 auto;
}
.img-wrap{
  position: relative;
  父元素相对定位
  max-height: 375px;
  控制图片的最大高度不超过375px
  overflow: hidden;
}*/
</style>
