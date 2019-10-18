<template>
  <div class="banner">
    <el-carousel>
      <el-carousel-item v-for="item in banner_list" :key="item">
        <a href="#" v-lazy:background-image="item"></a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
  export default {
    name: 'Banner',
    data () {
      return {
        banner_list: [
          '//' + window.location.host + '/static/banner_default.png',
          '//' + window.location.host + '/static/banner_default.png'
        ]
      }
    },
    created: function () {

    }
  }
</script>
<style lang="scss" scoped>
@import "../assets/css/Banner.scss";
</style>