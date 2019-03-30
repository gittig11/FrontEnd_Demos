<template>
  <div>
    <div class="global-header">
      <div class="main-wrap">
        <a href="" target="_self" title="Zhihu Daily" class="web-logo"></a>
      </div>
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
.global-header {
  width: 100%;
  height: 60px; /*no*/
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: #009dd7;
  color: #fafcfe;
}
.main-wrap {
  max-width: 750px;
  min-width: 300px;
  margin: 0 auto;
  /*居中*/
  position: relative;
  height: 60px;
  line-height: 60px;
  /*让子元素垂直居中*/
}

>>> .global-header .main-wrap { 
  height: 60px; /*no*/
  line-height: 60px; /*no*/
}
.web-logo {
  margin-left: 20px;
  width: 126px; /*no*/
  height: 42px; /*no*/
  background-image: url('../../assets/Web_Logo.png');
  background-repeat: no-repeat;
  display: inline-block;
  vertical-align: middle;
  /*垂直居中*/
}
</style>
