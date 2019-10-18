<template>
   <div class="index1-content" >
    <div class="index-div-head">
    <div class="h4">资产透明公开，收入返还用户</div>
    <div class="h4-content">拥有200FFT以上资产，坐享平台90%收入！</div>
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
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">FFTS</div>
            <div class="div-content-detail-item-middle-right">{{pre_shares.hasOwnProperty("FFTS")?pre_shares.FFTS.toFixed(2):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle">
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
            <div class="div-content-detail-item-middle-right">{{pre_shares.hasOwnProperty("ETH")?pre_shares.ETH.toFixed(2):'0'}}</div>
          </div>
          <div class="div-content-detail-item-middle">
            <div class="div-content-detail-item-middle-left">FFC</div>
            <div class="div-content-detail-item-middle-right">{{pre_shares.hasOwnProperty("FFC")?pre_shares.FFC.toFixed(2):'0'}}</div>
          </div>
          </div>
    </div>
    <div class="div-1px"></div>
     <div style="display:flex;">
     <div> 
      <div class="div-fft-all">FFT未分红 &nbsp;<span >{{total_fft ,pre_total_fft | fft_share}}</span></div>
      <div class="div-fft-all">FFT流通量 &nbsp;<span >{{total_fft.toFixed(2)}}</span></div>
   </div> 
     <!-- <img class="div-reward shake"  @click="showReward" src="../assets/image/ffc_reward.png"> -->
     </div> 
    </div>
    <div class="circle"></div>
    <!-- <div class="index-content-announce" @click="notice_detail(notice)" >
          <img src="../assets/image/icon-horn.png">【公告】{{notice.title}}
    </div> -->
    <!-- <div style=" margin-left: 1em; margin-right: 1em; margin-top: 1em;">
    <div class="wrap">
       <div class="index_content">
        <p @click="notice_detail(notice)">【公告】{{notice.title}} </p>
        <p @click="notice_detail(notice1)">【公告】{{notice1.title}} </p>
        </div>
      </div>
    </div> -->
     <div class="marquee">
      <div>
        <p ><span @click="notice_detail(notice)">【公告】{{notice.title}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span  @click="notice_detail(notice1)">【公告】{{notice1.title}}</span></p>
      </div>
     </div> 
        <!-- </router-link> -->
    <div class="index-content-gridview-prarent" style="margin-top:1.2em;">
      <div class="index-content-gridview-prarent-item"  @click="redirect('notices')">
        <img :src="icon_menu_gonggao"><!--../assets/image/icon_menu_gonggao.png-->
        <p>官方公告</p>
      </div>
      
      <div class="index-content-gridview-prarent-item"  @click="redirect('options_trade')">
        <img :src="icon_menu_bibi">
        <p>期权交易</p>
      </div>
       <div class="index-content-gridview-prarent-item"  @click="redirect('share')">
        <img :src="icon_menu_share" >
        <p>邀请奖励</p>
      </div>
    </div>
    <div class="index-content-gridview-prarent" >
      
     <div class="index-content-gridview-prarent-item" @click="redirect('help_center')">
        <img :src="icon_menu_otc">
        <p>帮助中心</p>
      </div>
      <div class="index-content-gridview-prarent-item"  @click="redirect('wallet_detail_ffc')">
        <img :src="icon_menu_more" >
        <p>FFC兑换</p>
      </div>
      <div class="index-content-gridview-prarent-item" @click="redirect('game_fox_bound_add')"> 
        <img :src="icon_menu_game"  >
        <p>链克游戏</p>
      </div> 
       <!-- <div class="index-content-gridview-prarent-item" @click="redirect('quantitative')"> 
        <img :src="icon_menu_game"  >
        <p>链克游戏</p>
      </div>   -->
    </div>
    <p class="index-content-p" v-show="false">最新成交</p>

    <div class="index-content-market-div" v-show="false">
     OSC 
     <div class="index-content-market-div-right">
       {{osc_last}}&nbsp;FFC
       <span class="up"  v-show="osc_last>=osc_open">+{{osc_last ,osc_open|osc_filters}}&nbsp;%</span> 
       <span class="down"  v-show="osc_last<osc_open">{{osc_last ,osc_open|osc_filters}}&nbsp;%</span>
     </div>
    </div>
    <div class="index-content-market-div-dever" v-show="false"></div>
    <div class="index-content-market-div" v-show="false">
     DGC 
     <div class="index-content-market-div-right">
       <!-- 0.11 FFC <span> + 1.82% </span> -->
        {{dgc_last}}&nbsp;FFC
       <span class="up"  v-show="dgc_last>=dgc_open">+{{dgc_last ,dgc_open|dgc_filters}}&nbsp;%</span> 
       <span class="down"  v-show="dgc_last<dgc_open">{{dgc_last ,dgc_open|dgc_filters}}&nbsp;%</span>
     </div>
    </div>
    <div class="index-content-market-div-dever" style="margin-left:0px;"></div>

      <!-- <mu-dialog :open="isProfitDialog" title="寻宝" @close="close" >
        <div style="color:#404040">1.用户可以在当天<span>18:00-22:00</span>手动领取分红，一天只能领取一次<br>
        2.系统在<span>22:00-23:00</span>自动结算当天未领取分红的部分<br>
        3.分红期间<span>18:00-23:00</span>，关闭FFT交易功能</div><br><br>
         <mu-flat-button slot="actions" @click="close" primary label="关闭"/>
        <mu-flat-button slot="actions" primary @click="fft_get" label="领取分红"/>
      </mu-dialog> -->

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
import { IMG_BASE_URL } from "../models/url.js";
import HttpResultCode from "../utils/HttpResultCode";
import { formatDate } from "../common/js/data";
import {
  SET_CRYPTO_CURRENCY,
  CLEAN_USER,
  SET_USER
} from "../store/mutation-types";
export default {
  name: "index",
  components: { BottomNav },
  data() {
    return {
      banners: [],
      //  isLoaded:false,
      ticker_timer: null,
      osc_amount: "",
      osc_buy: "",
      osc_high: "",
      osc_low: "",
      osc_sell: "",
      osc_volume: "",
      osc_last: 1,
      osc_open: 1,
      dgc_amount: "",
      dgc_buy: "",
      dgc_high: "",
      dgc_low: "",
      dgc_sell: "",
      dgc_volume: "",
      dgc_last: 1,
      dgc_open: 1,
      notice: { id: "", title: "" },
      notice1: { id: "", title: "" },
      isProfitDialog: false,
      pre_total_fft: 0,
      total_fft: 0,
      user_fft: 0,
      pre_shares: {},
      shares: {},
      share_error: "",

      icon_menu_gonggao: IMG_BASE_URL + "icon_menu_gonggao.png",
      icon_menu_bibi: IMG_BASE_URL + "icon_menu_bibi.png",
      icon_menu_share: IMG_BASE_URL + "icon_menu_share.png",
      icon_menu_otc: IMG_BASE_URL + "icon_menu_otc.png",
      icon_menu_more: IMG_BASE_URL + "icon_menu_more.png",
      icon_menu_game: IMG_BASE_URL + "icon_menu_game.png"
    };
  },
  created: function() {
    // this.getBanner();
    // this.getTicker_list();
    setTimeout(() => {
      this.getAccount();
    }, 1000);
    this.load_list();
    if (this.ticker_timer != null) {
      window.clearInterval(this.ticker_timer);
    }
    this.fft_summary();
  },
  filters: {
    fft_share(total, pre) {
      return (total - pre).toFixed(2);
    },
    osc_filters(last, osc_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == osc_open || osc_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(osc_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(osc_open)) /
        parseFloat(osc_open) *
        100
      ).toFixed(2);
    },
    dgc_filters(last, dgc_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == dgc_open || dgc_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(dgc_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(dgc_open)) /
        parseFloat(dgc_open) *
        100
      ).toFixed(2);
    }
  },
  beforeDestroy: function() {
    if (this.ticker_timer != null) {
      window.clearInterval(this.ticker_timer);
    }
  },
  methods: {
    showReward() {
      this.$router.push("/index_draw");
    },

    notice_guide() {
      this.$router.push("/notice/14");
    },
    notice_detail(notice) {
      this.$router.push("/notice/" + notice.id);
    },
    redirect(redirect) {
      // if(this.isLoaded)
      this.$router.push("/" + redirect);
    },
    getBanner() {
      user
        .banner_list()
        .then(result => {
          if (result.code == 0) {
            this.banners = result.data.banners;
          }
        })
        .catch(e => {});
    },
    isIos() {
      //判断是否是安卓还是ios
      var u = navigator.userAgent,
        app = navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      return isiOS == true ? true : false;
    },
    getAccount() {
      var u = navigator.userAgent,
        app = navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
      if (isAndroid) {
        let account = pluginGetString();
        if (account != "") {
          let accounts = account.split("-firefox-"); //字符分割
          let access_token = accounts[0];
          let name = accounts[1];
          let has_payment_password = accounts[2];
          let mobile = accounts[3];
          storage.set("at", access_token);
          storage.set("name", name);
          storage.set("hpp", has_payment_password);
          storage.set("mobile", mobile);
          store.commit(SET_USER, {
            name: name,
            access_token: access_token,
            has_payment_password:
              has_payment_password === true || has_payment_password === "true"
                ? true
                : false,
            mobile: mobile
          });
        }
      }
    },
    getTicker_list() {},
    load_list() {
      notice1
        .list()
        .then(result => {
          if (result.code == 0) {
            this.notice = result.data.notices[0];
            if (result.data.notices[1] != null)
              this.notice1 = result.data.notices[1];
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
            }
            if (data.hasOwnProperty("shares")) {
              this.shares = data.shares;
            }
          }
        })
        .catch(e => {});
      this.ticker_timer = window.setInterval(() => {
        if ("/index" == this.$route.path || "/" == this.$route.path) {
          notice1
            .fft_share_summary()
            .then(result => {
              if (result.code == 0) {
                var data = result.data;
                if (data.hasOwnProperty("pre_total_fft"))
                  this.pre_total_fft = data.pre_total_fft;
                if (data.hasOwnProperty("total_fft"))
                  this.total_fft = data.total_fft;
                if (data.hasOwnProperty("user_fft"))
                  this.user_fft = data.user_fft;
                if (data.hasOwnProperty("pre_shares")) {
                  this.pre_shares = data.pre_shares;
                }
                if (data.hasOwnProperty("shares")) {
                  this.shares = data.shares;
                }
              }
            })
            .catch(e => {});
        } else {
          window.clearInterval(this.ticker_timer);
          return;
        }
      }, 10000);

      // clearTimeout(this.ticker_timer);
      // if ("/index" == this.$route.path || "/" == this.$route.path) {
      // } else {
      //   return;
      // }
      // notice1
      //   .fft_share_summary()
      //   .then(result => {
      //     this.ticker_timer = setTimeout(this.fft_summary, 10000);
      //     if (result.code == 0) {
      //       var data = result.data;
      //       if (data.hasOwnProperty("pre_total_fft"))
      //         this.pre_total_fft = data.pre_total_fft;
      //       if (data.hasOwnProperty("total_fft"))
      //         this.total_fft = data.total_fft;
      //       if (data.hasOwnProperty("user_fft")) this.user_fft = data.user_fft;
      //       if (data.hasOwnProperty("pre_shares")) {
      //         this.pre_shares = data.pre_shares;
      //       }
      //       if (data.hasOwnProperty("shares")) {
      //         this.shares = data.shares;
      //       }
      //     }
      //   })
      // .catch(e => {
      //   this.ticker_timer = setTimeout(this.fft_summary, 10000);
      // });
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
            this.isShowRewardDialog = false;
            // alert("今日FFT分红", "今日FFT分红已成功领取，请查看明细。", {
            //   confirmButtonText: $t("钱包"),
            //   callback: () => {
            //     this.$router.push("/wallet/balance");
            //   }
            // });
          }
        })
        .catch(e => {
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
@import "../assets/css/index1.scss";
</style>
