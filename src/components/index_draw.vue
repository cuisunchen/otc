<template>
   <div class="index1-draw" >
    <div class="index-div-head">
      <span class="count" @click="goBack">
        X
        </span>
      <div class="index-div-head-tip">
        1.用户可以在当天08:00-10:00手动领取分红，一天只能领取一次<br>
        2.系统在10:00-11:00自动结算当天未领取分红的部分<br>
        3.分红期间07:00-11:00，关闭FFT交易功能
      </div>
      
    <div class="div-fft-all" style="margin-top:1em;">FFT未分红&nbsp;&nbsp;&nbsp;<span>{{total_fft ,pre_total_fft | fft_share}}</span></div>
    <div class="div-fft-all">FFT流通量&nbsp;&nbsp;&nbsp;<span>{{total_fft.toFixed(2)}}</span></div>
    <div class="div-content-detail">
          <div class="div-content-detail-item">
          <div class="div-content-detail-item-title">本期待分配收入</div>
          <div class="div-content-detail-item-middle" style="margin-top:0.4em;">
            <div class="div-content-detail-item-middle-left">FFT</div>
            <div class="div-content-detail-item-middle-right">{{shares.hasOwnProperty("FFT")?shares.FFT.toFixed(2):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle" >
            <div class="div-content-detail-item-middle-left">OSC</div>
            <div class="div-content-detail-item-middle-right">{{shares.hasOwnProperty("OSC")?shares.OSC.toFixed(2):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle" >
            <div class="div-content-detail-item-middle-left">FFTS</div>
            <div class="div-content-detail-item-middle-right">{{shares.hasOwnProperty("FFTS")?shares.FFTS.toFixed(2):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle" >
            <div class="div-content-detail-item-middle-left">DNA</div>
            <div class="div-content-detail-item-middle-right">{{shares.hasOwnProperty("DNA")?shares.DNA.toFixed(2):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">XDAG</div>
            <div class="div-content-detail-item-middle-right">{{shares.hasOwnProperty("XDAG")?shares.XDAG.toFixed(2):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">EGD</div>
            <div class="div-content-detail-item-middle-right">{{shares.hasOwnProperty("EGD")?shares.EGD.toFixed(4):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">DGC</div>
            <div class="div-content-detail-item-middle-right">{{shares.hasOwnProperty("DGC")?shares.DGC.toFixed(2):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">CBC</div>
            <div class="div-content-detail-item-middle-right">{{shares.hasOwnProperty("CBC")?shares.CBC.toFixed(2):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">ETH</div>
            <div class="div-content-detail-item-middle-right">{{shares.hasOwnProperty("ETH")?shares.ETH.toFixed(4):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">FFC</div>
            <div class="div-content-detail-item-middle-right">{{shares.hasOwnProperty("FFC")?shares.FFC.toFixed(2):'0'}}</div>
          </div>
          </div>
          <div class="div-content-detail-item">
          <div class="div-content-detail-item-title">下期待分配收入</div>
          <div class="div-content-detail-item-middle" style="margin-top:0.4em;">
            <div class="div-content-detail-item-middle-left">FFT</div>
            <div class="div-content-detail-item-middle-right">{{pre_shares.hasOwnProperty("FFT")?pre_shares.FFT.toFixed(2):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle" >
            <div class="div-content-detail-item-middle-left">OSC</div>
            <div class="div-content-detail-item-middle-right">{{pre_shares.hasOwnProperty("OSC")?pre_shares.OSC.toFixed(2):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle" >
            <div class="div-content-detail-item-middle-left">FFTS</div>
            <div class="div-content-detail-item-middle-right">{{pre_shares.hasOwnProperty("FFTS")?pre_shares.FFTS.toFixed(2):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle" >
            <div class="div-content-detail-item-middle-left">DNA</div>
            <div class="div-content-detail-item-middle-right">{{pre_shares.hasOwnProperty("DNA")?pre_shares.DNA.toFixed(2):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">XDAG</div>
            <div class="div-content-detail-item-middle-right">{{pre_shares.hasOwnProperty("XDAG")?pre_shares.XDAG.toFixed(2):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">EGD</div>
            <div class="div-content-detail-item-middle-right">{{pre_shares.hasOwnProperty("EGD")?pre_shares.EGD.toFixed(4):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">DGC</div>
            <div class="div-content-detail-item-middle-right">{{pre_shares.hasOwnProperty("DGC")?pre_shares.DGC.toFixed(2):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">CBC</div>
            <div class="div-content-detail-item-middle-right">{{pre_shares.hasOwnProperty("CBC")?pre_shares.CBC.toFixed(2):'0'}}</div>
          </div>
           <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">ETH</div>
            <div class="div-content-detail-item-middle-right">{{pre_shares.hasOwnProperty("ETH")?pre_shares.ETH.toFixed(4):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">FFC</div>
            <div class="div-content-detail-item-middle-right">{{pre_shares.hasOwnProperty("FFC")?pre_shares.FFC.toFixed(2):'0'}}</div>
          </div>
          </div>
    </div>
    <div class="div-1px"></div>
    <div class="div-fft-all" style="margin-top:1em;">系统待分红FFT数量&nbsp;&nbsp;&nbsp;<span>{{total_fft ,pre_total_fft |fft_share}}</span> </div>
    <div class="div-fft-all">我待分红的FFT数量&nbsp;&nbsp;&nbsp;<span>{{user_fft.toFixed(2)}}</span></div>
    <div class="div-content-detail">
          <div class="div-content-detail-item">
          <div class="div-content-detail-item-title">待分配收入</div>
          <div class="div-content-detail-item-middle" style="margin-top:0.4em;">
            <div class="div-content-detail-item-middle-left">FFT</div>
            <div class="div-content-detail-item-middle-right">{{shares.hasOwnProperty("FFT")?shares.FFT.toFixed(2):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">OSC</div>
            <div class="div-content-detail-item-middle-right">{{shares.hasOwnProperty("OSC")?shares.OSC.toFixed(2):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">FFTS</div>
            <div class="div-content-detail-item-middle-right">{{shares.hasOwnProperty("FFTS")?shares.FFTS.toFixed(2):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">DNA</div>
            <div class="div-content-detail-item-middle-right">{{shares.hasOwnProperty("DNA")?shares.DNA.toFixed(2):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">XDAG</div>
            <div class="div-content-detail-item-middle-right">{{shares.hasOwnProperty("XDAG")?shares.XDAG.toFixed(2):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">EGD</div>
            <div class="div-content-detail-item-middle-right">{{shares.hasOwnProperty("EGD")?shares.EGD.toFixed(4):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">DGC</div>
            <div class="div-content-detail-item-middle-right">{{shares.hasOwnProperty("DGC")?shares.DGC.toFixed(2):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">CBC</div>
            <div class="div-content-detail-item-middle-right">{{shares.hasOwnProperty("CBC")?shares.CBC.toFixed(2):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">ETH</div>
            <div class="div-content-detail-item-middle-right">{{shares.hasOwnProperty("ETH")?shares.ETH.toFixed(4):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">FFC</div>
            <div class="div-content-detail-item-middle-right">{{shares.hasOwnProperty("FFC")?shares.FFC.toFixed(2):'0'}}</div>
          </div>
          </div>
          <div class="div-content-detail-item"  v-show="!isGetReward" >
          <div class="div-content-detail-item-title">我大约可领取</div>
          <div class="div-content-detail-item-middle" style="margin-top:0.4em;">
            <div class="div-content-detail-item-middle-left">FFT</div>
            <div class="div-content-detail-item-middle-right">{{user_fft>=200 && total_fft>pre_total_fft && shares.hasOwnProperty("FFT") ? ((user_fft/(total_fft - pre_total_fft))*0.45 * shares.FFT).toFixed(2):0}} </div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">OSC</div>
            <div class="div-content-detail-item-middle-right">{{user_fft>=200 && total_fft>pre_total_fft && shares.hasOwnProperty("OSC") ? ((user_fft/(total_fft - pre_total_fft))*0.45 * shares.OSC).toFixed(2):0}} </div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">FFTS</div>
            <div class="div-content-detail-item-middle-right">{{user_fft>=200 && total_fft>pre_total_fft && shares.hasOwnProperty("FFTS") ? ((user_fft/(total_fft - pre_total_fft))*0.45 * shares.FFTS).toFixed(2):0}} </div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">DNA</div>
            <div class="div-content-detail-item-middle-right">{{user_fft>=200 && total_fft>pre_total_fft && shares.hasOwnProperty("DNA") ? ((user_fft/(total_fft - pre_total_fft))*0.45 * shares.DNA).toFixed(2):0}} </div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">XDAG</div>
            <div class="div-content-detail-item-middle-right"> {{user_fft>=200 && total_fft>pre_total_fft && shares.hasOwnProperty("XDAG") ? ((user_fft/(total_fft - pre_total_fft))*0.45 * shares.XDAG).toFixed(2):0}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">EGD</div>
            <div class="div-content-detail-item-middle-right">{{user_fft>=200 && total_fft>pre_total_fft && shares.hasOwnProperty("EGD") ? ((user_fft/(total_fft - pre_total_fft))*0.45 * shares.EGD).toFixed(4):0}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">DGC</div>
            <div class="div-content-detail-item-middle-right">{{user_fft>=200 && total_fft>pre_total_fft && shares.hasOwnProperty("DGC") ? ((user_fft/(total_fft - pre_total_fft))*0.45 * shares.DGC).toFixed(2):0}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">CBC</div>
            <div class="div-content-detail-item-middle-right">{{user_fft>=200 && total_fft>pre_total_fft && shares.hasOwnProperty("CBC") ? ((user_fft/(total_fft - pre_total_fft))*0.45 * shares.CBC).toFixed(2):0}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">ETH</div>
            <div class="div-content-detail-item-middle-right">{{user_fft>=200 && total_fft>pre_total_fft && shares.hasOwnProperty("ETH") ? ((user_fft/(total_fft - pre_total_fft))*0.45 * shares.ETH).toFixed(4):0}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">FFC</div>
            <div class="div-content-detail-item-middle-right"> {{user_fft>=200 && total_fft>pre_total_fft && shares.hasOwnProperty("FFC") ? ((user_fft/(total_fft - pre_total_fft))*0.45 * shares.FFC).toFixed(2):0}}</div>
          </div>
          </div>
          <div class="div-content-detail-item"  v-show="isGetReward" >
          <div class="div-content-detail-item-title">已领取分红</div>
          <div class="div-content-detail-item-middle" style="margin-top:0.4em;">
            <div class="div-content-detail-item-middle-left">FFT</div>
            <div class="div-content-detail-item-middle-right" style="color:#ff4d2d">{{myShares.hasOwnProperty("FFT")?myShares.FFT.toFixed(2):0}} </div>
          </div>
          <div class="div-content-detail-item-middle" >
            <div class="div-content-detail-item-middle-left">OSC</div>
            <div class="div-content-detail-item-middle-right" style="color:#ff4d2d">{{myShares.hasOwnProperty("OSC")?myShares.OSC.toFixed(2):0}} </div>
          </div>
          <div class="div-content-detail-item-middle" >
            <div class="div-content-detail-item-middle-left">FFTS</div>
            <div class="div-content-detail-item-middle-right" style="color:#ff4d2d">{{myShares.hasOwnProperty("FFTS")?myShares.FFTS.toFixed(2):0}} </div>
          </div>
          <div class="div-content-detail-item-middle" >
            <div class="div-content-detail-item-middle-left">DNA</div>
            <div class="div-content-detail-item-middle-right" style="color:#ff4d2d">{{myShares.hasOwnProperty("DNA")?myShares.DNA.toFixed(2):0}} </div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">XDAG</div>
            <div class="div-content-detail-item-middle-right"  style="color:#ff4d2d">{{myShares.hasOwnProperty("XDAG")?myShares.XDAG.toFixed(2):0}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">EGD</div>
            <div class="div-content-detail-item-middle-right"  style="color:#ff4d2d">{{myShares.hasOwnProperty("EGD")?myShares.EGD.toFixed(4):0}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">DGC</div>
            <div class="div-content-detail-item-middle-right"  style="color:#ff4d2d">{{myShares.hasOwnProperty("DGC")?myShares.DGC.toFixed(2):0}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">CBC</div>
            <div class="div-content-detail-item-middle-right"  style="color:#ff4d2d">{{myShares.hasOwnProperty("CBC")?myShares.CBC.toFixed(2):0}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">ETH</div>
            <div class="div-content-detail-item-middle-right"  style="color:#ff4d2d">{{myShares.hasOwnProperty("ETH")?myShares.ETH.toFixed(4):0}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">FFC</div>
            <div class="div-content-detail-item-middle-right"  style="color:#ff4d2d">{{myShares.hasOwnProperty("FFC")?myShares.FFC.toFixed(2):0}}</div>
          </div>
          </div>
    </div>

    <!-- <div class="div-reward"></div> -->
     <mu-raised-button label="查看分红明细" class="btn" v-show="isGetReward"  @click="reward_tip" fullWidth primary/>
     <mu-raised-button label="领取分红" class="btn" v-show="user_fft>=200 && !isGetReward"  @click="fft_get" fullWidth primary/>
    <mu-raised-button label="领取分红" class="btn1"  v-show="user_fft<200 &&  !isGetReward"  fullWidth primary/>
     <p class="div-p">{{share_error}}</p>
      <p v-show="user_fft<200 && !isGetReward" class="div-p">拥有200FFT以上资产，才能享受分红福利！</p>
    </div>
    <BottomNav></BottomNav> 
   </div>
</template>
<script>
import BottomNav from "../components/BottomNav";
import nprogress from "nprogress";
import market from "../models/market";
import notice1 from "../models/notice1";
import store from "../store";
import storage from "../models/storage";
import user from "../models/user";
import lib from "../utils/lib";
import HttpResultCode from "../utils/HttpResultCode";
import { formatDate } from "../common/js/data";
import {
  SET_CRYPTO_CURRENCY,
  CLEAN_USER,
  SET_USER,
  CURRENCY_TO_CURRENCY
} from "../store/mutation-types";
export default {
  name: "index_draw",
  components: { BottomNav },
  data() {
    return {
      pre_total_fft: 0,
      total_fft: 0,
      user_fft: 0,
      pre_shares: {},
      shares: {},
      share_error: "",
      isGetReward: false,
      myShares: {}
    };
  },
  created: function() {
    // this.getTicker_list();

    this.fft_summary();
  },
  filters: {
    fft_share(total, pre) {
      return (total - pre).toFixed(2);
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    reward_tip() {
      this.$router.push("/wallet");
    },
    load_list() {
      notice1
        .list()
        .then(result => {
          if (result.code == 0) {
            this.notice = result.data.notices[0];
          }
        })
        .catch(e => {});
    },
    fft_summary() {
      notice1
        .fft_share_summary()
        .then(result => {
          if (result.code == 0) {
            var data = result.data;
            if (data.hasOwnProperty("pre_total_fft"))
              this.pre_total_fft = data.pre_total_fft;
            if (data.hasOwnProperty("total_fft"))
              this.total_fft = data.total_fft;
            if (data.hasOwnProperty("user_fft")) this.user_fft = data.user_fft;
            if (data.hasOwnProperty("pre_shares")) {
              this.pre_shares = data.pre_shares;
            } else {
              this.pre_shares = {};
            }
            if (data.hasOwnProperty("shares")) {
              this.shares = data.shares;
            } else {
              this.shares = {};
            }
          }
        })
        .catch(e => {});
    },
    fft_get() {
      if (
        this.$store.state.user.access_token.length > 0 &&
        this.$store.state.user.name.length > 0
      ) {
      } else {
        this.$router.push("/sign_in");
        return;
      }
      notice1
        .fft_share_get()
        .then(result => {
          if (result.code == 0) {
            this.fft_summary();
            this.isGetReward = true;
            this.myShares = result.data.shares;
            this.share_error = "本期FFT分红已成功领取，请查看明细。";
          }
        })
        .catch(e => {
          this.fft_summary();
          switch (e.code) {
            case 1110:
              this.share_error = "fft不足200";
              break;
            case 1111:
              this.share_error = "一天只能领取一次分红";
              break;
            case 1112:
              this.share_error = "分红暂未开放";
              break;
          }
        });
    }
  }
};
</script>
<style  lang="scss"  scoped>
@import "../assets/css/index_draw.scss";
</style>
