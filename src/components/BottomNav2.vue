<template>
  <div class="bottom_nav_zone2">
      <div class="bottom_nav2"><!--find_replace-->
              <router-link class="bottom_nav_btn_zone2" :to="{ path: '/trade?v=' + new Date().getTime()}">
                <div class="div1"> </div>
                <span>{{$t('BottomTab.Trade')}}</span>
              </router-link>
              <router-link class="bottom_nav_btn_zone2" :to="{ path: '/order?v=' + new Date().getTime()}">
                <!-- <mu-icon value="description" :size="2"/> -->
                <div class="div2"> </div>
                <span>{{$t('BottomTab.Order')}}</span>
              </router-link>
              <router-link class="bottom_nav_btn_zone2" :to="{ path: '/user?v=' + new Date().getTime()}">
                <div class="div3"> </div>
                <span style="color:#0A2463">{{$t('BottomTab.Mine')}}</span>
              </router-link>
      </div>
      
  </div>
</template>
<script>
export default {
  name: "BottomNav2",
  data() {
    return {};
  },
  created: function() {}
};
</script>
<style lang="scss" scope>
@import "../assets/css/bottomNav2.scss";
</style>