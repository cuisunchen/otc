<template>
  <div class="bottom_nav_zone">
      <div class="bottom_nav"><!--find_replace-->
              <router-link class="bottom_nav_btn_zone" :to="{ path: '/trade?v=' + new Date().getTime()}">
                <!-- <mu-icon value="euro_symbol" :size="2"/> -->
                 <!-- display: inline-block;
        width: 2em;
        height: 3em;
        background: url("../assets/image/icon_hot.png") no-repeat center;
        background-size: 100%; -->
                <!-- <mu-icon value="description" :size="2"/> -->
                <div class="div1"> </div>
                <span style="color:#0A2463;padding-left: 3px;">{{$t('BottomTab.Trade')}}</span>
              </router-link>
              <router-link class="bottom_nav_btn_zone" :to="{ path: '/order?v=' + new Date().getTime()}">
                <!-- <mu-icon value="description" :size="2"/> -->
                <div class="div2"> </div>
                <span >{{$t('BottomTab.Order')}}</span>
              </router-link>
              <router-link class="bottom_nav_btn_zone" :to="{ path: '/user?v=' + new Date().getTime()}">
                <!-- <mu-icon value="person" :size="2"/> -->
                <div class="div3"> </div>
                <span>{{$t('BottomTab.Mine')}}</span>
              </router-link>
           <!-- <router-link class="bottom_nav_btn_zone" :to="{ path: '/index'}">
                <mu-icon value="home" :size="2"/>
                <span>首页</span>
              </router-link>
            <router-link class="bottom_nav_btn_zone" :to="{ name: 'exchangeList'}">
                <mu-icon value="trending_up" :size="2"/>
                <span>币币</span>
              </router-link>
            <router-link class="bottom_nav_btn_zone" :to="{ name: 'trade'}">
                <mu-icon value="euro_symbol" :size="2"/>
                <span >{{$t('Tab.Tab1')}}</span>
            </router-link>
              <router-link class="bottom_nav_btn_zone" :to="{ name: 'order'}">
                <mu-icon value="description" :size="2"/>
                <span>{{$t('Tab.Tab2')}}</span>
              </router-link>
        
              
              <router-link class="bottom_nav_btn_zone" :to="{ name: 'user'}">
                <mu-icon value="person" :size="2"/>
                <span>{{$t('Tab.Tab4')}}</span>
              </router-link> -->
      </div>
      
  </div>
</template>
<script>
export default {
  name: "BottomNav",
  data() {
    return {};
  },
  created: function() {}
};
</script>
<style lang="scss" scope>
@import "../assets/css/bottomNav.scss";
</style>