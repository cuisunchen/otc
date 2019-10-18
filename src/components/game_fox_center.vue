<template>
  <div class="content-game-center">
   <mu-appbar  title="寻狐中心">
    </mu-appbar>
    <div class="game-choise-zone">
      <router-link :to="{ name: 'game_fox_wkc3d'}" v-show="false">

        <div class="game0-shoudong">
          <div class="list-img" >
                <div class="body0"></div>
                <div class="hate0"></div>
                <div class="erhuan0"></div>
                <div class="yanjing0"></div>
                <div class="weibo0"></div>
                <div class="shiping0"></div>
                <div class="mouth0"></div>
                <div class="face0"></div>
            </div>
          <div class="game-font-zone">
            <h4>OSC3D</h4>
            <p>好玩，刺激，快来体验吧！</p>
            <i class="go_game"></i>
          </div>
        </div>
      </router-link>
    <router-link :to="{ name: 'game_fox_fast'}">
      <div class="game1-shoudong">
        <div class="game-font-zone">
          <h4>快速模式</h4>
          <p>无需等待，进来就能玩！！</p><!--无需等待，进来就能玩！！-->
          <i class="go_game"></i>
        </div>
      </div>
      </router-link>
      <router-link :to="{ name: 'game_fox_hide'}">
      <div class="game2-shoudong">
        <div class="game-font-zone">
          <h4>传统模式</h4>
          <p>手动抢庄，乐趣无穷！！</p>
          <i class="go_game"></i>
        </div>
      </div>
      </router-link>
      <router-link :to="{ name: 'game_fox_high'}">
      <div class="game3-shoudong">
        <div class="game-font-zone">
          <h4>高级模式</h4>
          <p>赢到你手抽筋!！</p><!--赢到你手抽筋！！-->
          <i class="go_game"></i>
        </div>
      </div>
      </router-link>
    </div>
    <FoxBottomNav></FoxBottomNav>
  </div>
</template>

<script>
import nprogress from "nprogress";
import game from "../models/game";
import validate from "../utils/validate";
import FoxBottomNav from "../components/FoxBottomNav";
import { CAPTCHA_SIGNIN } from "../models/url";
export default {
  name: "game_fox_center",
  components: { FoxBottomNav },
  data() {
    return {};
  },
  created: function() {},
  methods: {}
};
</script>

<style lang="scss" scope>
@import "../assets/css/gameCenter.scss";
</style>
