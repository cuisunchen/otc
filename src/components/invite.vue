<template>
  <div class="content-invite">
     <mu-toast v-if="toast" :message="message" @close="hideToast"/>
    <div class="top">
      <div class="center">{{$t('Text.jllb')}}</div>
      <div class="left" @click="goBack" />
      <!-- <div class="right" @click="shares">{{$t('Text.jllb')}}</div> -->
    </div>
    <img class="img-bananer" :src="share_pic">
    <div class="content-detail">
       <div class="content-detail-div">
         <p>
          <span class="span-left">{{$t('Invite.InviteCount')}}{{invite_count}}</span>  
          <span class="span-right" @click="rewards">{{$t('Invite.detail')}}</span>
         </p>
       </div>
       <div class="p2_zone">
         <div   v-for="(item) in this.rewards1" :key="item.currency"  >
         <p class="p2">
          <span class="span-left">{{item.currency}}</span> 
          <span class="span-right"><span>{{item.amount}}</span>{{item.currency}}</span>
         </p>
         <div class="item-dever"></div>
         </div>
         <!-- <p class="p2" >
          <span class="span-left">{{$t('Invite.ETH')}}</span> 
          <span class="span-right"><span>{{eth_qty}}</span>ETH</span>
         </p>
         <div class="item-dever"></div>
         <p class="p2" >
          <span class="span-left">{{$t('Invite.LTC')}}</span> 
          <span class="span-right"><span>{{ltc_qty}}</span>LTC</span>
         </p>
         <div class="item-dever"></div>
         <p class="p2" >
          <span class="span-left">{{$t('Invite.OSC')}}</span> 
          <span class="span-right"><span>{{osc_qty}}</span>OSC</span>
         </p>
         <div class="item-dever"></div>
         <p class="p2" >
          <span class="span-left">{{$t('Invite.DGC')}}</span> 
          <span class="span-right"><span>{{dgc_qty}}</span>DGC</span>
         </p>
         <div class="item-dever"></div>
         <p class="p2" >
          <span class="span-left">{{$t('Invite.CBC')}}</span> 
          <span class="span-right"><span>{{cbc_qty}}</span>CBC</span>
         </p>
         <div class="item-dever"></div>
         <p class="p2" >
          <span class="span-left">{{$t('Invite.LBTC')}}</span> 
          <span class="span-right"><span>{{lbtc_qty}}</span>LBTC</span>
         </p>
         <div class="item-dever"></div> -->
         <!-- <p class="p2 p2_bototm" >
          <span class="span-left">{{$t('Invite.XDAG')}}</span> 
          <span class="span-right"><span>{{xdag_qty}}</span>XDAG</span>
         </p> -->
       </div>
          <div class="share_btn_zone">
            <div class="share_btn bottom_border"  @click="invite_img">
              <mu-icon class="share_ico" value="card_giftcard" color="#f25c49" :size="1.5"/>
              <span>{{$t('Invite.InviteImgBtn')}}</span>
              <i class="go"></i>
            </div>
            <div class="share_btn"   v-clipboard:copy="share_url"
              v-clipboard:success="success"
              v-clipboard:error="error">
              <mu-icon class="share_ico" value="share" color="#3d9cee" :size="1.5"/>
              <span>{{$t('Invite.InviteLinkBtn')}}</span>
              <i class="go"></i>
            </div>
          </div>
    </div>
    <!--中间end-->
    <!-- <BottomNav></BottomNav>  -->
  </div>
</template>

<script>
import nprogress from "nprogress";
import BottomNav from "../components/BottomNav";
import store from "../store";
import storage from "../models/storage";
import { SET_USER } from "../store/mutation-types";
import HttpResultCode from "../utils/HttpResultCode";
import user from "../models/user";
import Clipboard from "clipboard";
import { IMG_BASE_URL } from "../models/url.js";
export default {
  name: "share",
  components: { BottomNav },
  data() {
    return {
      selected: "",
      toast: false,
      message: "",
      btc_qty: 0,
      osc_qty: 0,
      eth_qty: 0,
      ltc_qty: 0,
      dgc_qty: 0,
      cbc_qty: 0,
      lbtc_qty: 0,
      xdag_qty: 0,
      invite_count: 0,
      referral_code: "",
      share_url: "",
      rewards1:[],
      share_pic: IMG_BASE_URL + "share_pic.jpg"
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    user
      .getInviteRewardSummary()
      .then(result => {
        nprogress.done();
        let summary_result = result.data;
        // let btc_qty = 0;
        // let osc_qty = 0;
        // let eth_qty = 0;
        // let ltc_qty = 0;
        // let dgc_qty = 0;
        // let cbc_qty = 0;
        // let lbtc_qty = 0;
        // let xdag_qty = 0;
        let referral_code = 0;
        let invite_count = 0;
        let reward_summary = summary_result.rewards;

        invite_count = summary_result.invite_count;
         var rewards = [];
        let mobile_invite = summary_result.mobile_invite;
        referral_code = summary_result.referral_code;
        if (typeof reward_summary != "undefined") {
         
          for (var key in reward_summary)
            {
  
              var da = [reward_summary[key]]
              rewards = rewards.concat(da)
          //       alert(key); 	//Type, Height
       	//Coding, 100
            }
          // for (let i = 0; i < reward_summary.length; i++) {
          //   // console.log('reward_summary[i].currency = '+reward_summary[i].currency)
          //   //  console.log('reward_summary[i].qty = '+reward_summary[i].qty)
          //   switch (reward_summary[i].currency) {
          //     case "BTC":
          //       btc_qty = reward_summary[i].qty;
          //       break;
          //     case "OSC":
          //       osc_qty = reward_summary[i].qty;
          //       break;
          //     case "ETH":
          //       eth_qty = reward_summary[i].qty;
          //       break;
          //     case "LTC":
          //       ltc_qty = reward_summary[i].qty;
          //       break;
          //     case "DGC":
          //       dgc_qty = reward_summary[i].qty;
          //       break;
          //     case "CBC":
          //       cbc_qty = reward_summary[i].qty;
          //       break;
          //     case "LBTC":
          //       lbtc_qty = reward_summary[i].qty;
          //       break;
          //     case "XDAG":
          //       xdag_qty = reward_summary[i].qty;
          //       break;
          //   }
          // }
        }
        next(vm => {
          vm.rewards1  = rewards;
          // vm.btc_qty = btc_qty;
          // vm.osc_qty = osc_qty;
          // vm.eth_qty = eth_qty;
          // vm.ltc_qty = ltc_qty;
          // vm.dgc_qty = dgc_qty;
          // vm.cbc_qty = cbc_qty;
          // vm.lbtc_qty = lbtc_qty;
          // vm.xdag_qty = xdag_qty;
          // vm.invite_count = invite_count;
          // vm.referral_code = referral_code;

          vm.share_url =
            "https://m.firefoxotc.com/sign_up?referral_code=" +
            encodeURIComponent(referral_code);
          // vm.share_url =  document.location.protocol + '//' + document.location.host +'/sign_up?referral_code='+encodeURIComponent(referral_code)
          glob_share_url = vm.share_url;
        });
      })
      .catch(e => {
        nprogress.done();
        // HttpResultCode.validate(e.code);
      });
  },

  computed: {
    // share_link: function () {
    //   this.share_url =  document.location.protocol + '//' + document.location.host +'/trade?referral_code='+encodeURIComponent(this.referral_code)
    // },
    //     // img_share_link: function () {
    //     //   return  document.location.protocol + '//m.firefoxotc.com/?referral_code='+encodeURIComponent(this.referral_code)
    //     // }
  },
  methods: {
    rewards() {
      this.$router.push("/share_rewards");
    },
    goBack() {
      this.$router.go(-1);
    },
    invite_img() {
      this.$router.push("/invite_img");
    },
    shares(){

    },
    showToast(message) {
      this.toast = true;
      this.message = message;
      this.toastTimer = setTimeout(() => {
        this.toast = false;
      }, 2000);
    },
    hideToast() {
      this.toast = false;
      if (this.toastTimer) clearTimeout(this.toastTimer);
    },
    success: function(e) {
      //  this.showToast(this.$t('Invite.CopySuccessContent')+this.share_url)
      this.showToast(this.$t("Invite.CopySuccessContent"));
      shareSystem();
    },
    error: function(e) {
      this.showToast(this.$t("Invite.CopyErrorContent"));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "../assets/css/invite.scss";
</style>
