<template>
  <div class="bottom_nav_zone">
      <div class="bottom_nav"><!--find_replace-->
           <router-link class="bottom_nav_btn_zone" :to="{ path: '/index'}">
                <mu-icon value="home" :size="2"/>
                <span>首页</span>
              </router-link>
            <router-link class="bottom_nav_btn_zone" :to="{ name: 'options_trade'}">
                <mu-icon value="trending_up" :size="2"/>
                <span>交易</span>
              </router-link>
              <router-link class="bottom_nav_btn_zone" :to="{ name: 'options_order'}">
                <mu-icon value="description" :size="2"/>
                <span>{{$t('Tab.Tab2')}}</span>
              </router-link>
              <router-link class="bottom_nav_btn_zone" :to="{ name: 'user'}">
                <mu-icon value="person" :size="2"/>
                <span>{{$t('Tab.Tab4')}}</span>
              </router-link>
      </div>
  </div>
</template>
<script>
export default {
  name: "OptionsBottomNav",
  data() {
    return {};
  },
  created: function() {}
};
</script>
<style lang="scss" scope>
@import "../assets/css/bottomNav.scss";
</style>