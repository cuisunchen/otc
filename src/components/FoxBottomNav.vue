<template>
  <div class="bottom_nav_zone">
      <div class="bottom_nav">
            <router-link class="bottom_nav_btn_zone" :to="{ name: 'game_fox_home'}">
                <mu-icon value="home" :size="2"/>
                <span >首页</span>
            </router-link>
              <router-link class="bottom_nav_btn_zone" :to="{ name: 'game_fox_market'}">
                <mu-icon value="store" :size="2"/>
                <span>青丘集市</span>
              </router-link>
              <router-link class="bottom_nav_btn_zone" :to="{ name: 'game_fox_center'}">
                <mu-icon value="pets" :size="2"/>
                <span>寻狐</span>
              </router-link>
              <router-link class="bottom_nav_btn_zone" :to="{ name: 'game_fox_my'}">
                <mu-icon value="face" :size="2"/>
              <span>我的</span>
              </router-link>
      </div>
  </div>
</template>
<script>
  export default {
    name: 'FoxBottomNav',
    data () {
      return {

      }
    },
    created: function () {

    }
  }
</script>
<style lang="scss" scope>
@import "../assets/css/bottomNav.scss";
</style>