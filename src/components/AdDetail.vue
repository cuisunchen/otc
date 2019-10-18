<template>
  <div class="content-ad-detail">
    <div class="top">
      <!-- <div class="center"> {{item.is_buy ?$t('Trade.Buy.Title') : $t('Trade.Sell.Title')}} {{item.symbol|coinchange0}}</div>  -->
       <div class="center"> {{$t('Text.ggxq') }}</div> 
      <div class="left" @click="goBack" />
    </div>
  
      <div style="padding-left:1em;font-size:1em;line-height:2;color:#4E586E;padding-top:3.5em;text-align: left">{{$t('Text.wtdh')}}{{item.id}}</div>




<div class="order_item-list-content-big-content-zone1"  >
        <div class="titile-zone">
          <p>

                <span v-show="item.is_buy" style=" padding: 0.2em 0.4em 0.2em 0.2em ;color: #FFFFFF;font-size: 0.8em;border-radius: 0.2em; background-color:#005ee4;">{{$t('Text.buy')}}</span>
                <span v-show="!item.is_buy" style=" padding: 0.2em 0.4em 0.2em 0.2em ;color: #FFFFFF;font-size: 0.8em;border-radius: 0.2em; background-color:#FF183A;">{{$t('Text.sell')}}</span>
                <span style="color:#3180D0;font-size: 12px;font-weight:500">&nbsp;{{item.symbol|pricechange2}}</span>
                <span style="color:#4E586E;font-size: 12px;font-weight:500">/{{item.symbol|pricechange1}}</span>
                <span style="color:#4E586E;font-size:0.8em;">&nbsp;&nbsp;&nbsp;{{item.created | getformatDate1}}</span>
                <!-- <span class="OrderStateType" style="color:#FFA100" v-show="item.status=='PUBLISHING'">{{$t('Text.'+ item.status)}}</span> -->
                <!-- <span class="OrderStateType" style="color:#ABABAB" v-show="item.status=='CANCELLED'||item.status=='EXPIRED'">{{$t('Text.'+ item.status)}}</span> -->
                <span class="OrderStateType"
                  :style="getStateColor(item.status)">
                  {{$t('Text.'+ item.status)}}
                </span>
                
          </p>
        </div>
        <div class="order_item-list-content-big-content">
                    <div class="order_item-list-content-big-content-center1" >
                    <p>{{$t('Text.wtjg')}}：{{item.price}}&nbsp;{{item.symbol | pricechange1}} 
                      <span style="color:#FF183A">{{item.expired1}}</span>
                    </p>
                    <p>{{$t('Text.wtzl')}}：{{item.limit_qty}}&nbsp;{{item.symbol| pricechange2}}</p>
                    <p>{{$t('Order.Traded')}}：{{item.traded_qty}}</p>
                    <p>{{$t('Text.xe')}}：&nbsp;&nbsp;{{item.min_qty +"-"+item.max_qty }}&nbsp;{{item.symbol | pricechange2}}</p>

                    <!-- <p  v-show="item.open">{{$t('Text.sj')}}&nbsp;&nbsp;{{item.created | getformatDate }}  
                       <span v-show="!item.isExpired" @click="cancelAd(item)" style="background-color: #00cc66;padding: 0.2em 0.4em; color: #fff;font-size: 12px; border-style: solid;
                          border-width: 1px; border-color: #00cc66; border-radius: 0.2em;">{{$t('Text.cancel') }}</span>
                     </p>  -->

                     <!-- <p v-show="item.open">{{$t('Text.xe')}}&nbsp;&nbsp;{{item.min_qty +"-"+item.max_qty }}{{item.symbol | pricechange2}} </p>  -->

                    <!-- <p  style="margin-bottom:1em;margin-top:0.2em;">{{$t('Wallet_Detail.count')}}&nbsp;&nbsp;{{item.limit_qty}}&nbsp;{{item.symbol | pricechange2}} 
              
                    </p> -->
                    <!-- <div class="titile-zone1" style="padding-left:1em;">
               <p style="padding-left:2em;">{{$t('Text.wtzl')}} {{item.limit_qty}}&nbsp;{{item.symbol| pricechange2}}</p></div>
              
                   <div class="titile-zone1" style="padding-bottom:0.5em;padding-left:1em;">
               <p style="padding-left:2em;">{{$t('Text.xe')}}&nbsp;&nbsp;{{item.min_qty +"-"+item.max_qty }}&nbsp;{{item.symbol | pricechange2}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></div> -->
                </div>
              </div>
        </div>




        <!-- <div class="buy-item-info-order">
          <div class="item-list-content-big-content-center">
              <p style="padding-left:0.5em;margin-top:1em">{{$t('Text.wtdID')}}<span class="left_space">{{item.id}} </span> </p>
              <p style="padding-left:0.5em">{{$t('Text.sl')}}<span class="left_space">{{item.min_qty}}-{{item.max_qty}} {{item.symbol| pricechange2}} </span> </p>
              <p style="padding-left:0.5em">{{$t('Text.gqsj')}}<span class="left_space">{{item.expired|getformatDate}} </span> </p>
              <p style="padding-left:0.5em">{{$t('Trade.Publish.maximumLimit')}}<span class="left_space">{{item.limit_qty}} {{item.symbol| pricechange2}} </span> </p>
              </div>
              <div class="item-list-content-big-content-right">
                <p  v-show="!item.is_buy" ><span  style="color:#00cc66;font-size:2em">{{item.price}}</span> {{crypto_currency}}</p>
                 <p  v-show="item.is_buy" ><span  style="color:#0A2463;font-size:2em">{{item.price}}</span> {{crypto_currency}}</p>
            
                <p ><span v-show="!item.isExpired" @click="cancelAd(item)" style="background-color: #00cc66;
                  padding: 0.2em 0.4em;
                    color: #fff;
                    font-size: 12px;
                    border-style: solid;
                    border-width: 1px;
                    border-color: #00cc66;
                      border-radius: 0.2em;">{{$t('Text.cancel') }}</span></p>
                 
              </div>
        </div> -->
<!-- amount: 2.6
buyer_fee: 0.03
created: 1565374765062
deadline: 1565374825062
disp_id: "10008"
id: 10008
is_buy: true
is_buyer_taking: false
price: 1.23
qty: 2.11
seller_fee: 0.03
status: "PB_DISPUTED"
symbol: "btc_usdt -->
      
    <!-- <div  class="bill-trade-list" >
      <div class="bill-trade-list-item" v-for="(item ) in this.trade_list" :key="item.created" >
       <div class="bill-trade-list-item-content">
          <p class="p1"><span class="span-left">{{item.title}}</span></p>
          <p class="p2">{{item.content}}</p>
       </div>
      </div>
   </div> -->
 
 <div class="order_item-list-content-zone" style="margin-top:0.5em;" >

        <div style=" text-align: left;
            font-size: 12px;
            line-height: 2.5;
            color: #333333;padding-left: 1em;
          background-color: #fff;" v-show="item.is_buy&&this.trade_list.length>0">{{$t('Text.jyjl')}}</div>  
          
          <div style=" text-align: left;
            font-size: 12px;
            line-height: 2.5;
            color: #333333;padding-left: 1em;
          background-color: #fff;" v-show="!item.is_buy&&this.trade_list.length>0">{{$t('Text.jyjl')}}</div>  
        <div style="border-bottom: 1px solid #f5f5f5;"></div>
       
        <div class="order_item-list-content-big" v-for="(item) in this.trade_list" :key="item.id" @click="goOrderDetail(item)">
           <!-- <router-link :to="'/trade'"> selldd-->
         
           <div class="order_item-list-content-big-content-zone">


             <div class="titile-zone">
               <p>
                  <span v-show="item.is_buy" style=" padding: 0.2em 0.4em 0.2em 0.2em ;color: #FFFFFF;font-size: 0.8em;border-radius: 0.2em; background-color:#005ee4;">{{$t('Text.buy')}}</span>
                   <span v-show="!item.is_buy" style=" padding: 0.2em 0.4em 0.2em 0.2em ;color: #FFFFFF;font-size: 0.8em;border-radius: 0.2em; background-color:#FF183A;">{{$t('Text.sell')}}</span>
                <span style="color:#3180D0;font-size: 12px;">&nbsp;{{item.symbol|pricechange2}}</span>
                 <span style="color:#4E586E;font-size: 12px;">/{{item.symbol|pricechange1}}</span>
                
                   <span style="color:#4E586E;font-size:12px;">&nbsp;&nbsp;&nbsp;{{item.created | getformatDate1}}</span>

                 <!-- <span class="OrderStateType" style="color:#4E586E" v-show="item.status=='TAKEN'">{{$t('Text.'+ item.status)}}</span>

                 <span class="OrderStateType" style="color:#4E586E" v-show="item.status=='OVERTIME'||item.status=='PB_CANCELLED'">{{$t('Text.'+ item.status)}}</span>
                <span class="OrderStateType" style="color:#4E586E" v-show="item.status=='RELEASED'||item.status=='PAID'||item.status=='TAKEN'||item.status=='BUYER_WON'||item.status=='SELLER_WON'">{{$t('Text.'+ item.status)}}</span>
                <span class="OrderStateType" style="color:#4E586E" v-show="item.status=='PS_DISPUTED'||item.status=='PB_DISPUTED'">{{$t('Text.'+ item.status)}}</span> -->
                 <span class="OrderStateType"
                  :style="getStateColor(item.status)">
                  {{$t('Text.'+ item.status)}}
                </span>
               </p>
             </div>
             
             <div class="titile-zone1" style="padding-left:1em;">
               <!-- <p>{{$t('Order.OrderId')}}<span>{{item.disp_id}}</span><span class="OrderStateType">{{$t('Text.price')+": "}}{{item.price}}&nbsp;{{item.symbol|pricechange1}}</span>
              </p> -->
               <p style="padding-left:2em;">{{$t('Text.price')+": "}}{{item.price}}&nbsp;{{item.symbol|pricechange1}}</p>
            </div>
                 <!-- <span v-show="item.is_buy" style="color:#00cc66">{{$t('Text.price')+": "}}{{item.price}}&nbsp;{{item.symbol|pricechange1}}</span></p></div> -->
             <div class="titile-zone1" style="padding-bottom:0.5em;padding-left:1em;">
               <p style="padding-left:2em;">{{$t('Wallet_Detail.count')}}<span>&nbsp;&nbsp;{{item.qty}}&nbsp;{{item.symbol|pricechange2}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t('Text.amount')}}&nbsp;&nbsp;{{item.amount}}&nbsp;{{item.symbol|pricechange2}}</p></div>
                <!-- <div class="titile-zone1" style="padding-bottom:0.5em;">
              <p>{{$t('Text.amount')}}<span>&nbsp;&nbsp;{{item.amount}}&nbsp;{{item.symbol|pricechange2}}</span><span class="OrderStateType">{{item.created | getformatDate }}</span></p></div> -->
            
               
           </div>
          <div style=" background: #F3F5F7;width: 100%;height: 0.4em;"></div>
        </div> 



 <mu-raised-button style="margin-top:3em;height:50px;font-size:18px" v-show="'PUBLISHING'===item.status"  :label="$t('Text.qxwt')" @click="openDialog" class="btn btn-default" fullWidth primary/>


      </div>

 <!-- <mu-toast v-if="toast" :message="message" @close="hideToast"/>
    <mu-infinite-scroll :scroller="scroller" :loading="loading1" @load="loadMore"/>
    <mu-dialog :open="dialog" @close="dialog=false">
      <p class="dialog-content">{{$t('Order.CONFIRMATION_DELEGATION')}}?</p>
    <p class="dialog-btn">
      <button class="dialog-left" @click="dialog=false">{{$t('options.cancel')}}</button>
      <button class="dialog-right" @click="cancelAd">{{$t('options.ok')}}</button>
    </p>
  </mu-dialog> -->
  <PopupDialog
      v-if="dialog"
      :confirm="cancelAd"
      :content="$t('Order.CONFIRMATION_DELEGATION')"
      :cancel="closeDialog"
  ></PopupDialog>
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
import order from "../models/order";
import PopupDialog from "../common/PopupDialog";
import {
  SET_CRYPTO_CURRENCY,
  CLEAN_USER,
  SET_USER
} from "../store/mutation-types";
// import VueQrcode from '@xkeshi/vue-qrcode'
// Vue.component('qrcode',VueQrcode)
export default {
  name: "AdDetail",
  components: {PopupDialog},
  data() {
    return {
      dialog: false,
      open: false,
      toast:false,
        message:'',
      id:this.$route.params.id ,
      crypto_currency: "USDT", // this.$store.state.user.crypto_currency,
      trade_list: [],
      deposits_list: [],
      weithdraw_list: [],
      tab: "tab1",
      total: 0,
      loading1:false,
      scroller: null,
      loading: false,
      item:{},
      offset: 0,
      limit: 20
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);

    let offset = 0;
    let limit = 20;
    let total = 1;
     let id = to.params.id;

    let params = {
      "ad_id":id,
      "offset":offset,
	    "limit":limit
    }
    order.USER_otc_ad_detail(params)
      .then(result => {
        nprogress.done();
        let trade_list = [];
        let ad = {};
        if (result.code === 0) {
  
            trade_list = result.data.trades;
            ad = result.data.ad;
            offset = offset + result.data.trades.length;
            total = result.data.total;
       

        
        }
        next(vm => {
          vm.trade_list = trade_list;
          vm.item = ad;
          vm.offset = offset;
          vm.total = total;
        });
      })
      .catch(e => {
        nprogress.done();
        HttpResultCode.validate(e.code);
      });
  },
  filters: {
    getformatDate(time) {
      let date = new Date(parseInt(time));
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    getformatDate1(time) {
      let date = new Date(parseInt(time));
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
    stringSplice(name) {
      if (undefined == name) return "";
      if (name.length > 10) {
        return name.substring(0, 10);
      } else {
        return name;
      }
    },
    namechange(name) {
      if (undefined == name) return "";
      return name.substring(0, 1).toUpperCase();
    },
    coinchange(symbol) {
      if (undefined == symbol) return "USDT";
      return symbol.split("_")[1].toUpperCase();
    },
    coinchange0(symbol) {
      if (undefined == symbol) return "USDT";
      return symbol.split("_")[0].toUpperCase();
    },
     pricechange1(coin) {
      if (undefined == coin) return "";
      return coin.split("_")[1].toUpperCase();
    },
    pricechange2(coin) {
      if (undefined == coin) return "";
      return coin.split("_")[0].toUpperCase();
    },
  },
  mounted() {
    this.scroller = this.$el;
  },
  created() {
    this.tabChange();
  },
  methods: {
    getStateColor(state) {
      switch (state) {
        // 已成交、已取消#A9B2C3 
        // 待转币、待确认#005EE4 
        // 申诉中 #E31E1E
        case "TAKEN":
        case "PAID":
        case "PUBLISHING":
          return { color: "#005EE4" };
        case "OVERTIME":
        case "PB_CANCELLED":
        case "TB_CANCELLED":
        case "RELEASED":
        case "BUYER_WON":
        case "SELLER_WON":
        case "CANCELLED":
        case "EXPIRED":
          return { color: "#A9B2C3" };
        case "PS_DISPUTED":
        case "PB_DISPUTED":
          return { color: "#E31E1E" };
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    hideToast () {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    },
    showToast (message) {
      this.toast=true
      this.message=message
      this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
    },
    toggle() {
      this.open = !this.open;
    },
    handleOpen() {
      this.open = true;
    },
    handleChange(val) {
      this.crypto_currency = val;
      this.$store.commit(SET_CRYPTO_CURRENCY, this.crypto_currency);
      this.initData();
      // this.tabChange(this.tab);
    },
    handleClose() {
      this.open = false;
    },
    initData() {
      this.trade_list = [];

    },
    closeDialog() {
      this.dialog = false
    },
    openDialog() {
      this.dialog = true
    },
      cancelAd() {
      let params = {
        symbol: this.item.symbol,
        ad_id: this.item.id
      };
      order
        .CancelAd(params)
        .then(values => {
          this.tabChange(this.isBuy);
          this.dialog = false;
        })
        .catch(e => {
          this.showToast(e.message);
          this.dialog = false;
            //  HttpResultCode.validate(e.code);
        });
    },
    tabChange() {
      this.offset = 0;
      this.total = 1;
      this.loading = false;

      this.initData();
      this.loadMore();
    },
    loadMore() {
      // if ("/AdDetail" != this.$route.path) {
      //   // console.log('this.$route.path = '+this.$route.path)
      //   return;
      // }


      if (this.loading) {
        return;
      }
      if (this.total <= this.offset) {
        this.loading = false;
        return;
      }
      let thatThis = this;
      this.loading = true;
        let params = {
         "ad_id":this.id,
         "offset":this.offset,
	       "limit": this.limit
         }
        order.USER_otc_ad_detail(params)
          .then(result => {
            thatThis.loading = false;

            thatThis.trade_list = thatThis.trade_list.concat(result.data.trades);
            let ad = result.data.ad;
            thatThis.offset = this.offset + result.data.trades.length;
            thatThis.total = result.data.total;
            let date = new Date(parseInt(ad.expired));
            let currentTime = new Date();

            if (currentTime.getTime() > date.getTime()) {
              ad.isExpired = true;
              ad.expired1 = "";//thatThis.$t("Text.EXPIRED");
            } else {
              ad.isExpired = false;
              ad.expired1 =
                formatDate(date, "yyyy-MM-dd hh:mm") + thatThis.$t("Text.gq");
            }
            if (ad.status == "CANCELLED") {
              ad.expired1 = "";
              ad.isExpired = true;
            }
            thatThis.item = ad;
            if(result.data.trades.length==0){
              thatThis.loading = true;
            }
          })
          .catch(e => {
             HttpResultCode.validate(e.code);
             this.loading1 = false;
        });
          // .catch(function() {
          //   
          // });
      
    },
    // cancelAd(item) {
    //   let params = {
    //     symbol: item.symbol,
    //     ad_id: item.id
    //   };
    //   order
    //     .CancelAd(params)
    //     .then(values => {
    //       this.tabChange(this.isBuy);
    //     })
    //     .catch(e => {});
    // },
    goOrderDetail: function(item) { 
      if (item.is_buy) {
        this.$router.push({
          name: "order_buy",
          params: {
            id: item.id,
            symbol: item.symbol.toLowerCase()
          }
        });
      } else {
        this.$router.push({
          name: "order_sell",
          params: {
            id: item.id,
            symbol: item.symbol.toLowerCase(),
            v: new Date().getTime()
          }
        });
      }
    },
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss"  scoped>
@import "../assets/css/ad_detail.scss";
</style>
<style lang="scss">
.content{
  .mu-dialog{
    width: 85%;
    border-radius: toRem(8)
  }
}
</style>
