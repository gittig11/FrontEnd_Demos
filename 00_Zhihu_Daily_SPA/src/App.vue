<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
    
    <!-- 这里会被keepalive -->
    <!-- <keep-alive>
      <router-view v-if="$source.meta.keepAlive"></router-view>
    </keep-alive> -->

    <!-- 这里不会被 keepalive -->
    <!-- <router-view v-if="!$route.meta.keepAlive"></router-view>     -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Helvetica Neue',Helvetica,Arial,Sans-serif;
  /*font-size: 16px;*/
  background-color: #f6f6f6;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
</style>
