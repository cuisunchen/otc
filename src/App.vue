<template>
  <div id="app">
       <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
        </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
    </router-view>
      
  </div>
</template>

<script>
 import kStat from './utils/kStat'
 import detector from 'detector'
export default {
    name: 'app',
    mounted (){
    var o = document.getElementById("app");
    var h = o.offsetHeight; 
    var w = o.offsetWidth; 
      // if(w*0.04 > 16){
      // document.getElementById("app").style.fontSize=16 + "px";   
      // }
      // if(w*0.04 <= 16){
      document.documentElement.style.fontSize=w*0.04 + "px";   
      window.onresize = function(){
        document.documentElement.style.fontSize=w*0.04 + "px";   
      }
    },
    components: {

    },
    created(){
      kStat.push(['version_' + process.env.VERSION, detector.os.name, detector.browser.name + '_' + detector.browser.version, 1])
    }
  }
</script>

<style lang="scss">
@import "./assets/css/config/global.scss";  
</style>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  background: #FFFFFF;
  height: 100%; 
  overflow-y: scroll;
  /*-webkit-overflow-scrolling : touch;*/
  /* min-height: 100%; */
}
html,body{
   height: 100%; 
  background: #FFFFFF;
  width: 100%; 
}
</style>

