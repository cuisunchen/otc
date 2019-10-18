<template>
   <div class="activity-content"  >
    <div class="activity">
       
      <div class="activity1">
        <img :src="bg_url">
        <span class="count1" v-show="isShow">
          <router-link :to="{name:'exchange'}">
           跳过  {{refresh_txt}}
        </router-link>
         
        </span>
        <span class="count" v-show="!isShow">
        <router-link :to="{name:'exchange'}">
          ×
        </router-link>
        </span>
        <button class="recharge-btn" style="z-index: 999;" @click="recharge"  >{{btn_vaue}}</button>
        <div class="activity-content1">
          <p>活动一：<br />火狐币FFC充值<span style="color: #ffcb15;">10,000</span>金额以上的用户，按照时间先后排名前50的用户将获得一个月币币交易手续费用全免。</p>

         <p> 活动二：<br />火狐币FFC充值按照金额从高到低排名前50的用户将获得一个月的币币交易手续费用全免。</p>
         <div class="activity-content3">
            <p class="content2-title">活动规则</p>
            <p class="content2-ft">
              1.所有火狐狸的用户均可参加；<br />
              2.活动时间：<span style="color: #ffcb15;">2018.3.27 - 2018.4.14</span>；<br />
              3.优惠时间：<span style="color: #ffcb15;">2018.4.15 - 2018.5.15</span>；<br />
              4.同一用户只能享受活动一或活动二中的一个优惠；<br />
              5.如有疑问，请联系官方客服；<br />
              <br />
              本次活动最终解释权归火狐狸网所有。
              </p>
              
         </div>
        </div>
      </div>
      <!-- <div class="active23-zone">
          <div class="active2">
            <img src="../assets/image/active1.png">
            
          </div>
          <div class="active3">
            <img src="../assets/image/active1.png">
            
          </div>
        </div> -->
    </div>
   
    <div></div>
   </div>

</template>

<script>
import nprogress from "nprogress";
import user from "../models/user";
import validate from "../utils/validate";
import HttpResultCode from "../utils/HttpResultCode";
import { CAPTCHA_SIGNIN } from "../models/url";
import { IMG_BASE_URL } from "../models/url.js";

export default {
  name: "activity",
  components: {},
  data() {
    return {
      refresh_txt: "",
      isShow: true,
      refresh_timer: [],
      bg_url: IMG_BASE_URL + "recharge-active.png",
      btn_vaue: "去充值"
    };
  },
  // mounted: function () {
  //   let img=new Image()
  //   img.src="/static/invite.png"
  //   // img.src="https://m.firefoxotc.com/invite/invate_img.png"// http://p0rzqf3ny.bkt.clouddn.com/invite/invate_img.png

  //   img.crossOrigin = "anonymous"
  //   img.onload = () =>{
  //     this.canvas = document.createElement("canvas");
  //     this.canvas.width = 360
  //     this.canvas.height = 640
  //     let ctx = this.canvas.getContext("2d")
  //     let qr_src = this.$refs.qr.$el.toDataURL("image/jpeg")
  //     let qr = new Image()
  //     qr.src = qr_src
  //     qr.onload = () => {
  //       ctx.drawImage(img, 0, 0, 360, 640)
  //       ctx.drawImage(qr, 124, 351, 110, 110);
  //       this.invite_img =  this.canvas.toDataURL("image/jpeg")
  //     }
  //   }
  // },
  created: function() {
    if (
      this.$store.state.user.access_token.length > 0 &&
      this.$store.state.user.name.length > 0
    ) {
      this.btn_vaue = "去充值";
    } else {
      this.btn_vaue = "登录/注册";
    }
    this.time_refresh();
  },
  methods: {
    recharge() {
      if (
        this.$store.state.user.access_token.length > 0 &&
        this.$store.state.user.name.length > 0
      ) {
        this.$router.push("/wallet_detail_ffc");
      } else {
        this.$router.push("/sign_in");
      }
    },
    time_refresh: function() {
      for (let i = 0; i <= 5; i++) {
        this.refresh_timer.push(
          window.setTimeout(() => {
            if (i <= 4) {
              let count = 5 - i;
              this.refresh_txt = "" + count;
              //  alert('this.refresh_txt = '+this.refresh_txt)
            } else {
              this.isShow = false;
              this.clear_refresh();
            }
          }, i * 1000)
        );
      }
    },
    clear_refresh: function() {
      for (let i = 0; i < this.refresh_timer.length; i++) {
        clearTimeout(this.refresh_timer[i]);
      }
      this.refresh_timer = [];
      this.refresh_txt = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss"  scoped>
@import "../assets/css/activity.scss";
</style>
