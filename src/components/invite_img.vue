<template>
  <div style="max-width:640px;background:#0F163F">
    <div class="top">
      <div class="center">{{$t('Text.mine_tab4')}}</div>
      <div class="left" @click="goBack" />
      <div class="right" @click="shares">{{$t('Text.jllb')}}</div>
    </div>

    <div class="divBg">
      <div
        style=" font-size: 1.5em;
      color: #FFCE2E;
      text-align: center;
      padding-top: 3em;font-weight:800"
      > {{$t('Text.yyhyj')}}
        <span style="font-size:2.2em">{{ reward_ratio }}%</span>
       
      </div>

      <div
        style=" font-size: 12px;
      color: #FFCE2E;
      text-align: center;
      margin-top: 0.1em;font-weight: 500;"
      >
        <!--{{$t('Text.yyhyjTip1')}}-->
        <span>{{$t('Text.yyhyjTip1_1')}}</span><span>{{ reward_ratio }}%</span><span>{{$t('Text.yyhyjTip1_2')}}</span>
      </div>

      <div style="width:100%;height:7.6em;"></div>

      <div >
        <div
          style="width:80%;margin: 0 auto; border-radius: 0.5rem; background: #ffffff;"
        >
          <div
            style="text-align: center;color:#6D778B;font-size:1.2rem;z-index:999;padding-top:10px"
          >{{$t('Text.wdyqm')}}</div>
          <div
            style="text-align: center;color:#005EE4;font-size:1.4rem;z-index:999;margin-top:0.1em;font-weight:bold"
          >{{referral_code}}</div>
          <qrcode ref="qr" :value="share_url" :options="{ size: 150 }" v-show="true"></qrcode>
          <div style="width:100%;height:95px;background:#0040EC;border:0px;line-height:95px;border-radius: 0.5rem;">
            <mu-raised-button
              style="margin-top:0px;margin-bottom:0px;height: 50px;"
              :label="$t('Text.fzyqm')"
              v-clipboard:copy="referral_code"
              v-clipboard:success="success"
              class="btn"
              fullWidth
              primary
            />
          </div>
        </div>

        
      </div>
    </div>

    <mu-toast v-if="toast" :message="message"  />
  </div>
</template>

<script>
import nprogress from "nprogress";
import wallet from "../models/wallet";
import store from "../store";
import storage from "../models/storage";
import user from "../models/user";
import lib from "../utils/lib";
import HttpResultCode from "../utils/HttpResultCode";
import { formatDate } from "../common/js/data";
import Clipboard from "clipboard";
import {
  SET_CRYPTO_CURRENCY,
  CLEAN_USER,
  SET_USER
} from "../store/mutation-types";
import { IMG_BASE_URL } from "../models/url.js";
export default {
  name: "invite_img",
  components: {},
  data() {
    return {
      trade_t: null,
      toast: false,
      message: "",
      invite_img: "url('../../static/invite.png')",
      referral_code: "",
      reward_levels: [0.1],
      share_url: "",
      reward_ratio:0.2
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    user
      .getInviteRewardSummary()
      .then(result => {
        nprogress.done();
        next(vm => {
          vm.share_url =
            document.location.protocol +
            "//" +
            document.location.host +
            "/sign_up?referral_code=" +
            encodeURIComponent(result.data.referral_code);
          vm.referral_code = result.data.referral_code;
        });
      })
      .catch(e => {
        nprogress.done();
        HttpResultCode.validate(e.code);
      });
  },

  created() {
    this.getAbout();
  },
  mounted: function() {
  	this.reward_ratio = this.$route.query.reward_ratio;
    let img = new Image();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    shares() {
      //  this.$router.push("/invite");
      this.$router.push("/share_rewards");
    },

    getAbout() {
      user
        .aboutAs()
        .then(result => {
          if (result.code === 0) {
            this.reward_levels = result.data.reward_levels;
          }
        })
        .catch(e => {});
    },
    showToast(message) {
      this.toast = true;
      this.message = message;
      this.toastTimer = setTimeout(() => {
        this.toast = false;
      }, 2000);
    },
    success: function(e) {
      // alert("sdf")
      this.showToast(this.$t("Invite.CopySuccessContent"));
    },
    error: function(e) {
      this.showToast(this.$t("Invite.CopyErrorContent"));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss"  scoped>
.top {
  height: 3em;
  width: 100%;
  position: relative;
  position: fixed;

  top: 0px;
  z-index: 999;
  max-width: 640px;
  .center {
    position: absolute;
    width: 100%;
    top: 1em;
    color: #fff;
    font-size: 1.2em;
    text-align: center;
    line-height: 1;
  }
  .left {
    position: absolute;
    top: 0.8em;
    left: 1em;
    width: 1.35em;
    height: 1.35em;
    background: url("../assets/image/arrow_left_white.png") no-repeat center;
    background-size: cover;
  }
  .right {
    position: absolute;
    right: 1em;
    top: 1em;
    color: rgba(255, 255, 255, 0.59);
    font-size: 1em;
    line-height: 1;
  }
}
.divBg {
  background: url("../assets/image/invite.png");
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
  bottom: 0;
}
.count {
  position: absolute;
  top: 0.8em;
  right: 0.85em;
  font-size: 1.8;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.65);
  display: inline-block;
  width: 1.8em;
  height: 1.8em;
  line-height: 1.8em;
  border-radius: 100%;
  text-align: center;
  background: rgba(0, 0, 0, 0.25);
  a {
    color: rgba(255, 255, 255, 0.65);
  }
}
.btn {
  line-height: 2.5;
  font-size: 1.12em;
  height: auto;
  margin-top: 3em;
  background: #ffa100;
  border-radius: 3em;
  width: 90%;
  // margin: 1em auto 1em auto;
  // position: fixed;
  // bottom: 4em;
  margin: 4em auto;
  // margin-left: 2%;
}
.circle {
  width: 2em;
  height: 2em;
  border-radius: 2em;
  background: #ffffff;

  margin: 0 auto;
  margin-bottom: -1.7em;
}
 .mu-toast{
    width:200px;
    height:auto;
    background:rgba(0,0,0,1);
    border-radius:10px;
    opacity:0.6;
    line-height: normal;
    white-space: normal;
    bottom: auto;
    padding: 1em 2em;
    color: #fff;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    margin: 0 auto;
    font-size: 1em;
}
</style>
