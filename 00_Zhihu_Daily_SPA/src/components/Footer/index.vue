<template>
  <div>
    <div class="footer">
      <a href="http://www.zhihu.com">知乎网</a>
      · © 2019 知乎
    </div>
  </div>
</template>
<script>
export default{
  name: 'Header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
}
</script>
<style scoped>
.footer {
  padding: 15px 0;
  text-align: center;
  color: #b8b8b8;
  font-size: 0.4rem;
  font-weight: 700;
}
.footer a {
  color: #b8b8b8;
  text-decoration: none;
}
</style>