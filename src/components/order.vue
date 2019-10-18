<template>
  <div class="content-order-otc">
    <div class="top">
      <div class="exchange-input-btn-zone">
        <button
          class="buy-left-btn fs-14"
          :class="{disable:!isBuy}"
          @click="buyTabChange(true)"
        >{{$t('Text.orderName')}}</button>
        <button
          class="buy-right-btn fs-14"
          :class="{disable:isBuy}"
          @click="buyTabChange(false)"
        >{{$t('Text.wtd')}}</button>
      </div>
      <!-- <div class="right"  @click="toggle" >{{crypto_currency}}</div>
      <mu-icon-menu   class="icon-top"  @change="handleChange" :open="open" @open="handleOpen" @close="handleClose"  :value="crypto_currency" icon="more_vert" >
        <mu-menu-item value="ETH" :title="$t('Menu.ETH')" />
        <mu-menu-item value="OSC" :title="$t('Menu.OSC')" />
        <mu-menu-item value="DGC" :title="$t('Menu.DGC')" />
        <mu-menu-item value="XDAG" :title="$t('Menu.XDAG')" />
        <mu-menu-item value="FFC" :title="$t('Menu.FFC')" />
      </mu-icon-menu>
      <div  class="img-arrow"></div>-->
    </div>

    <!-- <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/> -->
    <div v-if="this.isBuy == true">
      <mu-tabs
        :value="active"
        class="m-mu-tabs"
        color="green"
        indicator-color="yellow"
        @change="oderTabChange"
      >
        <mu-tab value="1" class="m-mu-tab-link fs-14">{{ $t('Text.order_all') }}</mu-tab>
        <mu-tab value="2" class="m-mu-tab-link fs-14">{{ $t('Publish.PUBLISHING') }}</mu-tab>
        <mu-tab value="3" class="m-mu-tab-link fs-14">{{ $t('Text.order_yqx') }}</mu-tab>
        <!-- <mu-tab
          value="4"
          class="m-mu-tab-link fs-12"
        >{{$t('Text.order_ycj')}}</mu-tab>
        <mu-tab
          value="5"
          class="m-mu-tab-link fs-12"
        >{{ $t('Text.order_yqx') }}</mu-tab>
        <mu-tab
          value="6"
          class="m-mu-tab-link fs-12"
        >{{ $t('Text.order_ssz') }}</mu-tab>-->
      </mu-tabs>
      <div class="order_item-list-content-zone">
        <img
          src="../assets/image/icon_nodata.png"
          style="margin: 10em auto 0.5em auto;
                height:3em;
                width: 4.05em;"
          v-show="isLeftShow"
        />
        <div
          style="margin: 0px auto 0.5em auto;
                font-size:1em;
                color:#A9B2C3"
          v-show="isLeftShow"
        >{{$t('Text.zwsj') }}</div>

        <div style=" background: #f7f7f7;width: 100%;" class="item-content"></div>
        <div
          class="order_item-list-content-big"
          v-for="(item) in this.tradings"
          :key="item.id"
          @click="goOrderDetail(item)"
        >
          <!-- <router-link :to="'/trade'"> -->

          <div class="order_item-list-content-big-content-zone">
            <div class="titile-zone">
              <p>
                <span
                  v-show="item.is_buy"
                  style=" padding: 0.2em 0.4em 0.2em 0.2em ;color: #fff;border-radius: 0.2em; background-color:rgba(0, 94, 228, 1);"
                  class="fs-12"
                >{{$t('Text.buy')}}</span>
                <span
                  v-show="!item.is_buy"
                  style=" padding: 0.2em 0.4em 0.2em 0.2em ;color: #fff;border-radius: 0.2em; background-color:rgba(227, 30, 30, 1);"
                  class="fs-12"
                >{{$t('Text.sell')}}</span>
                <span
                  style="color:rgba(0, 94, 228, 1);font-size: 1em;font-weight:400"
                >&nbsp;{{item.symbol|pricechange2}}</span>
                <span
                  style="color:#4E586E;font-size: 1em;font-weight:400"
                >/{{item.symbol|pricechange1}}</span>

                <span
                  style="color:rgb(169, 178, 195);"
                  class="OrderStateType fs-12"
                >&nbsp;&nbsp;&nbsp;{{item.created | getformatDate1}}</span>
              </p>
            </div>

            <div class="titile-zone1" style="padding-left:1em; clear: both; overflow: hidden">
              <p style="padding-left:1.5em; font-weight:400" class="fs-17">
                <span
                  style="color:rgba(0, 94, 228, 1);float:left; width:13em"
                  class="OrderStateType item-status"
                >{{item.amount}}&nbsp;{{item.symbol|pricechange1}}</span>

                <!-- <span
                  style="color:#FFA100"
                  class="item-status"
                  v-show="item.status=='TAKEN'||item.status=='PAID'"
                >{{$t('Text.'+ item.status)}}</span>
                <span
                  class="OrderStateType item-status"
                  style="color: rgba(169, 178, 195, 1)"
                  v-show="item.status=='OVERTIME'||item.status=='PB_CANCELLED'||item.status=='TB_CANCELLED'"
                >{{$t('Text.'+ item.status)}}</span>
                <span
                  class="OrderStateType item-status"
                  style="color:rgba(169, 178, 195, 1)"
                  v-show="item.status=='RELEASED'||item.status=='BUYER_WON'||item.status=='SELLER_WON'"
                >{{$t('Text.'+ item.status)}}</span>-->
                <!-- <span
                  class="OrderStateType item-status"
                  style="color:rgba(227, 30, 30, 1)"
                  v-show="item.status=='PS_DISPUTED'||item.status=='PB_DISPUTED'"
                >{{$t('Text.'+ item.status)}}</span>-->
                <span
                  class="OrderStateType item-status"
                  :style="getStateColor(item.status)"
                >{{$t('Text.'+ item.status)}}</span>
              </p>
            </div>

            <!-- "TAKEN": "已拍下",
    "PAID": "已转币",
    "RELEASED": "已释放",
    "TB_CANCELLED": "卖家已取消",

    "OVERTIME": "超时取消",
    "PB_CANCELLED": "卖家已取消",
    "PB_CANCELLED_old": "卖家标记为已转币，但卖家取消了交易。",
    "PS_DISPUTED": "申诉中",
    "PS_DISPUTED_old": "已付款状态下的纠纷 （卖家投诉买家未转币）",
    "PB_DISPUTED_old": "已付款状态下的纠纷 （买家投诉，已经转币很长时间未收到钱）",
    "PB_DISPUTED": "申诉中",
    "BUYER_WON": "判定买家赢",
            "SELLER_WON": "判定卖家赢",-->

            <div class="titile-zone1" style="padding:0 0 .5em 1em; ">
              <!-- <p>{{$t('Order.OrderId')}}<span>{{item.disp_id}}</span><span class="OrderStateType">{{$t('Text.price')+": "}}{{item.price}}&nbsp;{{item.symbol|pricechange1}}</span>
              </p>-->
              <p style="padding-left:2em;">
                {{$t('Text.price')+": "}}{{item.price}}&nbsp;{{item.symbol|pricechange1}}
                <span
                  style="padding-left: 1em;width:13em"
                >{{$t('Wallet_Detail.count')+": "}}&nbsp;&nbsp;{{item.qty}}&nbsp;{{item.symbol|pricechange2}}</span>
              </p>
            </div>
            <!-- <span v-show="item.is_buy" style="color:#00cc66">{{$t('Text.price')+": "}}{{item.price}}&nbsp;{{item.symbol|pricechange1}}</span></p></div> -->
            <!-- <div class="titile-zone1" style="padding-bottom:0.5em;padding-left:1em;"> -->
            <!-- <p style="padding-left:2em;"><span  style="float:left; width:13em">{{$t('Wallet_Detail.count')}}&nbsp;&nbsp;{{item.qty}}&nbsp;{{item.symbol|pricechange2}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{$t('Text.amount')}}&nbsp;&nbsp;{{item.amount}}&nbsp;{{item.symbol|pricechange1}}</span></p></div> -->
            <!-- <div class="titile-zone1" style="padding-bottom:0.5em;">
            <p>{{$t('Text.amount')}}<span>&nbsp;&nbsp;{{item.amount}}&nbsp;{{item.symbol|pricechange2}}</span><span class="OrderStateType">{{item.created | getformatDate }}</span></p></div>-->
          </div>
          <div style=" background: #F3F5F7;width: 100%;height: 0.4em;"></div>
        </div>
        <!-- <div class="no-more-data fs-12" v-if="!isLeftShow">{{loading?'':$t('Trade.LoadFinish')}}</div> -->
      </div>
    </div>
    <div v-if="this.isBuy == false">
      <mu-tabs
        :value="active2"
        class="m-mu-tabs"
        color="green"
        indicator-color="yellow"
        @change="oderTab2Change"
      >
        <mu-tab value="1" class="m-mu-tab-link fs-14">{{ $t('Text.order_all') }}</mu-tab>
        <mu-tab value="2" class="m-mu-tab-link fs-14">{{ $t('Publish.PUBLISHING') }}</mu-tab>
        <mu-tab value="3" class="m-mu-tab-link fs-14">{{ $t('Text.order_yqx') }}</mu-tab>
      </mu-tabs>
      <div class="order_item-list-content-zone">
        <img
          src="../assets/image/icon_nodata.png"
          style="margin: 10em auto 0.5em auto;
                height:3em;
                width: 4.05em;"
          v-show="isRightShow"
        />
        <div
          style="margin: 0px auto 0.5em auto;
                font-size:1em;
                color:#A9B2C3"
          v-show="isRightShow"
        >{{$t('Text.zwsj') }}</div>
        <div style=" background: #F3F5F7;width: 100%; "></div>
        <div class="order_item-list-content-big" v-for="(item) in this.tradeds" :key="item.id">
          <div class="order_item-list-content-big-content-zone" @click="showDetail(item)">
            <!-- <span style="color: rgb(255, 24, 58);
                  position: absolute;
                  right: 10px;
                  top: 26px;
                  font-size: 0.8rem;">{{item.expired1}}</span> -->
            <div class="titile-zone">
              <p>
                <span
                  v-show="item.is_buy"
                  style=" padding: 0.2em 0.4em 0.2em 0.2em ;color: #FFFFFF;border-radius: 0.2em; background-color: rgb(0, 94, 228); font-weight:bold"
                  class="fs-12"
                >{{$t('Text.buy')}}</span>
                <span
                  v-show="!item.is_buy"
                  style=" padding: 0.2em 0.4em 0.2em 0.2em ;color: #FFFFFF;border-radius: 0.2em; background-color:#FF183A;"
                  class="fs-12"
                >{{$t('Text.sell')}}</span>
                <span style="color:#3180D0;" class="fs-15">&nbsp;{{item.symbol|pricechange2}}</span>
                <span style="color:#4E586E;" class="fs-15">/{{item.symbol|pricechange1}}</span>
                <span
                  style="color:rgb(169, 178, 195)"
                  class="OrderStateType fs-12"
                >&nbsp;&nbsp;&nbsp;{{item.created | getformatDate1}}</span>
                <!-- <span v-show="item.is_buy" style="color:#00cc66">{{$t('Text.publishTip3')}}</span> 
            <span  style="color:#0A2463" v-show="!item.is_buy">{{$t('Text.publishTip4')}}</span>
            <span>{{item.symbol | coinchange}}</span>
                <span class="OrderStateType">{{$t('Text.'+item.status)}} </span>-->
              </p>
            </div>

            <div class="titile-zone1" style="padding-left:1em;">
              <p style="padding-left:2em; padding-left: 1.5em; font-weight:400" class="fs-17">
                {{item.price}}&nbsp;{{item.symbol | pricechange1}}
                
                <span
                  class="OrderStateType item-status"
                  :style="getStateColor(item.status)"
                >{{$t('Text.'+ item.status)}}</span>
                <!-- <span
                  class="OrderStateType item-status"
                  style="color:rgba(0, 94, 228, 1)"
                  v-show="item.status=='PUBLISHING'"
                >{{$t('Text.'+ item.status)}}</span> -->

                <!-- <span
                  class="OrderStateType item-status"
                  style="color:#ABABAB"
                  v-show="item.status=='CANCELLED'||item.status=='EXPIRED'"
                >{{$t('Text.'+ item.status)}}</span> -->
              </p>
            </div>
            <!-- <p  v-show="item.open">{{$t('Text.sj')}}&nbsp;&nbsp;{{item.created | getformatDate }}  
                       <span v-show="!item.isExpired" @click="cancelAd(item)" style="background-color: #00cc66;padding: 0.2em 0.4em; color: #fff;font-size: 1em; border-style: solid;
                          border-width: 1px; border-color: #00cc66; border-radius: 0.2em;">{{$t('Text.cancel') }}</span>
            </p>-->

            <!-- <p v-show="item.open">{{$t('Text.xe')}}&nbsp;&nbsp;{{item.min_qty +"-"+item.max_qty }}{{item.symbol | pricechange2}} </p>  -->

            <!-- <p  style="margin-bottom:1em;margin-top:0.2em;">{{$t('Wallet_Detail.count')}}&nbsp;&nbsp;{{item.limit_qty}}&nbsp;{{item.symbol | pricechange2}} 
              
            </p>-->
            <div class="titile-zone1" style="padding-bottom:0.5em;padding-left:1em;">
              <p style="padding-left:2em;">
                <span
                  style="float:left;"
                >{{$t('Text.xe') + ':'}}&nbsp;&nbsp;{{item.min_qty +"-"+item.max_qty }}&nbsp;{{item.symbol | pricechange2}}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t('Wallet_Detail.count') + ':'}}&nbsp;&nbsp;{{item.limit_qty}}&nbsp;{{item.symbol|pricechange2}}
              </p>
            </div>
          </div>
          <div style=" background: #F3F5F7;width: 100%;height: 0.4em;"></div>
        </div>
        <!-- <div class="no-more-data fs-12" v-if="!isRightShow">{{loading?'':$t('Trade.LoadFinish')}}</div> -->
      </div>
    </div>

    <mu-infinite-scroll :scroller="scroller" :loading="loading1" @load="loadMore" />

    <div
      style="  width: 100%;
        height: 100%;
        position: fixed;
        background-color: rgba(0,0,0,0.1);
        top: 0px;z-index:999;"
      v-show="isProgressDialog"
      @click="closeDialog"
    >
      <img @click="closeDialog" src="../assets/image/icon_progress.png" class="progress" />
    </div>
    <!--中间end-->
    <BottomNav1></BottomNav1>
  </div>
</template>

<script>
import nprogress from "nprogress";
import BottomNav1 from "../components/BottomNav1";
import order from "../models/order";
import lib from "../utils/lib";
import HttpResultCode from "../utils/HttpResultCode";
import { formatDate } from "../common/js/data";
import user from "../models/user";
import {
  SET_CRYPTO_CURRENCY,
  CLEAN_USER,
  SET_USER
} from "../store/mutation-types";
export default {
  name: "order",
  components: { BottomNav1 },
  data() {
    return {
      myItems: [
        "PAID",
        "RELEASED",
        "TB_CANCELLED",
        "OVERTIME",
        "PB_CANCELLED",
        "PS_DISPUTED",
        "PB_DISPUTED",
        "BUYER_WON",
        "SELLER_WON"
      ],
      myItems2: ["EXPIRED", "CANCELLED", "PUBLISHING"],
      active: "1",
      active2: "1",
      is_trading: true,
      tab: "tab1",
      offset_trading: 0,
      offset_traded: 0,
      limit: 20,
      crypto_currency: this.$store.state.user.crypto_currency,
      tradings: [],
      tradeds: [],
      scroller: null,
      loading: false,
      loading1: false,
      total_trading: 1,
      total_traded: 1,
      open: false,
      refreshing: false,
      trigger: null,
      isBuy: true,
      a: this.$t("Trade.Buy.Title"),
      isProgressDialog: false,
      isLeftShow: false,
      isRightShow: false,
      coinList: []
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   // nprogress.set(0.6);
  //   let offset_trading = 0;
  //   let total_trading = 0;
  //   let tradings = [];
  //   let isLeftShow = false;
  //   let params = {
  //     is_trading: null,
  //     symbol: null,
  //     is_buy: null,
  //     offset: offset_trading,
  //     limit: 20
  //   };

  //   order
  //     .USER_otc_my_trade(params)
  //     .then(values => {
  //       nprogress.done();
  //       total_trading = values.data.total;
  //       if (total_trading > 0) {
  //         offset_trading = values.data.trades.length;
  //         tradings = values.data.trades;
  //       }
  //       if (tradings.length == 0) isLeftShow = true;

  //       next(vm => {
  //         vm.offset_trading = offset_trading;
  //         vm.total_trading = total_trading;
  //         vm.tradings = tradings;
  //         vm.isLeftShow = isLeftShow;
  //       });
  //     })
  //     .catch(e => {
  //       nprogress.done();
  //       HttpResultCode.validate(e.code);
  //     });
  // },
  filters: {
    getExpiredformatDate(exporeTime) {
      if (undefined == exporeTime) return "";
      // let a = exporeTime.split("_")[1];
      // exporeTime = exporeTime.split("_")[0];
      let date = new Date(parseInt(exporeTime));
      let currentTime = new Date();
      if (currentTime.getTime() > date.getTime()) {
        return "";
      }
      return formatDate(date, "hh:mm");
    },
    getformatDate1(time) {
      if (undefined == time) return "";
      let date = new Date(parseInt(time));
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
    getformatDate(time) {
      if (undefined == time) return "";
      let date = new Date(parseInt(time));
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
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
      return name.substring(0, 2).toUpperCase();
    },
    coinchange(coin) {
      if (undefined == coin) return "";
      return coin.replace("_", "/").toUpperCase();
    },
    pricechange1(coin) {
      if (undefined == coin) return "";
      return coin.split("_")[1].toUpperCase();
    },
    pricechange2(coin) {
      if (undefined == coin) return "";
      return coin.split("_")[0].toUpperCase();
    },

    getOrderStateType(status) {
      if (undefined == status) return "";
      return HttpResultCode.orderStatusType(status);
    }
  },
  mounted() {
    this.scroller = this.$el;
    this.trigger = this.$el;
  },
  created: function() {
    if (this.$route.query.type === 2) {
      this.buyTabChange(false);
    }
    // this.tabChange(this.tab);
    this.getDatass();
    // this.handleChange(this.crypto_currency);
    // this.is_trading = true;
    // this.getCoins();
    // this.refresh();
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
    closeDialog() {
      this.isProgressDialog = false;
    },
    aswDISPUTE: function(id) {
      order
        .USER_OTC_AWS_UPLOAD_DISPUTE(id)
        .then(result => {})
        .catch(function() {
          // TODO 异常处理
        });
    },
    getDatass(){
    let offset_trading = 0;
    let total_trading = 0;
    let tradings = [];
    let isLeftShow = false;
    let params = {
      is_trading: null,
      symbol: null,
      is_buy: null,
      offset: offset_trading,
      limit: 20
    };

    order
      .USER_otc_my_trade(params)
      .then(values => {
        total_trading = values.data.total;
        if (total_trading > 0) {
          offset_trading = values.data.trades.length;
          tradings = values.data.trades;
        }
        if (tradings.length == 0) isLeftShow = true;
          this.offset_trading = offset_trading;
          this.total_trading = total_trading;
          this.tradings = tradings;
          this.isLeftShow = isLeftShow;
      })
      .catch(e => {
        HttpResultCode.validate(e.code);
      });
    },
    buyTabChange(val) {
      this.isBuy = val;
      this.tradeds = [];
      this.tradings = [];
      this.offset_trading = 0;
      this.offset_traded = 0;
      this.loading = false;
      this.total_trading = 1;
      this.total_traded = 1;

      this.loadMore();
    },
    refresh() {
      this.refreshing = true;
      this.tabChange(this.isBuy);
    },
    number_format(num) {
      return lib.toFixed(num, 3);
    },
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
    tabChange(tab) {
      this.isBuy = tab;
      this.tradeds = [];
      this.tradings = [];
      this.offset_trading = 0;
      this.offset_traded = 0;
      // if (isBuy === true) {
      //   this.is_trading = true;
      // } else if (isBuy === false) {
      //   this.is_trading = false;
      // }
      this.loading = false;
      this.total_trading = 1;
      this.total_traded = 1;
      this.loadMore();
    },
    // goOrderDetail(item){
    //   this.getOrder(item.symbol,item.id);
    // },
    getOrder(symbol, id) {
      // let params = {
      //       "symbol":symbol,
      //       "tid":id
      //     }
      //   order.USER_otc_get_trade(params)
      //         .then(result => {
      //           if (result.code === 0) {
      //           }
      //         })
      //         .catch(e => {
      //         });
    },

    getCoins() {
      user
        .USER_otc_my_supported_otc_symbols()
        .then(result => {
          if (result.code === 0) {
            var dd = [];
            var i = 0;
            result.data.symbols.forEach(element => {
              var d = [
                { name: element.split("_")[0], value: element.split("_")[0] }
              ];
              dd = dd.concat(d);
              if (i == 0) {
                this.publishCryptoCurrency = element.split("_")[0];
                i = 2;
              }
            });
            this.coinList = dd;
          }
        })
        .catch(e => {});
    },
    loadMore(type) {
      if ("/order" != this.$route.path) {
        // console.log('this.$route.path = '+this.$route.path)
        return;
      }
      this.isLeftShow = false;
      this.isRightShow = false;
      if (this.isBuy) {
        this.loadTradingMore(type);
      } else {
        this.loadTradedMore(type);
      }
    },
    loadTradingMore(type) {
      if (this.loading) {
        return;
      }
      if (this.total_trading <= this.offset_trading) {
        this.loading = false;
        return;
      }
      let is_trading = null;
      if (type === 1) {
        is_trading = true;
      } else if (type === 2) {
        is_trading = false;
      }
      this.loading = true;
      let params = {
        is_trading: is_trading,
        symbol: null,
        is_buy: null,
        offset: this.offset_trading,
        limit: this.limit
      };
      if (this.offset_trading == 0) this.isProgressDialog = true;
      order
        .USER_otc_my_trade(params)
        .then(values => {
          this.isProgressDialog = false;
          this.refreshing = false;
          this.loading = false;
          if (this.offset_trading == 0) {
            this.tradings = [];
          }
          this.total_trading = values.data.total;
          if (this.total_trading > 0) {
            this.offset_trading =
              this.offset_trading + values.data.trades.length;
            if (this.tradings.length > 0 && values.data.trades.length > 0) {
              var t = this.tradings[0];
              var tt = values.data.trades[0];
              if (t.id != tt.id) {
                this.tradings = this.tradings.concat(values.data.trades);
              }
            } else {
              this.tradings = this.tradings.concat(values.data.trades);
            }
          }
          if (this.tradings.length == 0) {
            this.isLeftShow = true;
          } else {
            this.isLeftShow = false;
          }
        })
        .catch(e => {
          this.isProgressDialog = false;
          HttpResultCode.validate(e.code);
          this.refreshing = false;
          this.loading = false;
        });
    },
    loadTradedMore(type) {
      if (this.loading) {
        return;
      }
      if (this.total_traded <= this.offset_traded) {
        this.loading = false;
        return;
      }
      let is_publishing = null;
      if (type === 1) {
        is_publishing = true;
      } else if (type === 2) {
        is_publishing = false;
      }
      this.loading = true;
      let params = {
        is_publishing: is_publishing,
        symbol: null,
        is_buy: null,
        offset: this.offset_traded,
        limit: this.limit
      };
      let thatHits = this;
      if (this.offset_traded == 0) this.isProgressDialog = true;
      order
        .ads(params)
        .then(values => {
          this.isProgressDialog = false;
          this.refreshing = false;
          this.loading = false;
          this.total_traded = values.data.total;
          if (this.total_traded > 0) {
            if (this.offset_traded == 0) {
              this.tradeds = [];
            }
            this.offset_traded = this.offset_traded + values.data.ads.length;
            values.data.ads.forEach(element => {
              element.open = false;
              let date = new Date(parseInt(element.expired));
              let currentTime = new Date();

              if (currentTime.getTime() > date.getTime()) {
                element.isExpired = true;
                element.expired1 = "";
              } else {
                element.isExpired = false;
                element.expired1 =
                  formatDate(date, "yyyy-MM-dd hh:mm") + this.$t("Text.gq");
              }
              if (element.status == "CANCELLED") {
                element.expired1 = "";
                element.isExpired = true;
              }
            });

            if (this.tradeds.length > 0 && values.data.ads.length > 0) {
              var t = this.tradeds[0];
              var tt = values.data.ads[0];
              if (t.id != tt.id) {
                this.tradeds = this.tradeds.concat(values.data.ads);
              }
            } else {
              this.tradeds = this.tradeds.concat(values.data.ads);
            }

            // this.tradeds = this.tradeds.concat(values.data.ads);
          }
          if (this.tradeds.length == 0) {
            this.isRightShow = true;
          } else {
            this.isRightShow = false;
          }
        })
        .catch(e => {
          this.isProgressDialog = false;
          this.refreshing = false;
          this.loading = false;
        });
    },
    cancelAd(item) {
      let params = {
        symbol: item.symbol,
        ad_id: item.id
      };
      order
        .CancelAd(params)
        .then(values => {
          this.tabChange(this.isBuy);
        })
        .catch(e => {});
    },

    showDetail(item) {
      // item.open = !item.open;
      this.$router.push({
        name: "AdDetail",
        params: {
          id: item.id
        }
      });
    },
    // dealData(data){//数据处理函数
    //     if(this.offset==0){
    //        this.tradeds = [];
    //        this.tradings = [];
    //     }
    //     //  console.log(" this.tradeds ="+ this.tradeds.length+" this.tradings="+this.tradings.length);
    //     // if(undefined != data.data.trades)

    //       this.offset = this.offset+data.data.trades.length;
    //     if(this.is_trading){
    //        this.tradings = this.tradings.concat( data.data.trades);
    //     }else{
    //       this.tradeds = this.tradeds.concat( data.data.trades);
    //     }
    // },
    handleChange(val) {
      this.crypto_currency = val;
      this.$store.commit(SET_CRYPTO_CURRENCY, this.crypto_currency);
      this.tradeds = [];
      if (!this.is_trading) {
        this.total_traded = 1;
        this.offset_traded = 0;
        this.loading = false;
        this.loadTradedMore();
      }
    },
    toggle() {
      this.open = !this.open;
    },
    handleOpen() {
      this.open = true;
    },
    handleClose() {
      this.open = false;
    },
    oderTabChange(name) {
      this.active = name;
      // this.isBuy = val;
      this.tradeds = [];
      this.tradings = [];
      this.offset_trading = 0;
      this.offset_traded = 0;
      this.loading = false;
      this.total_trading = 1;
      this.total_traded = 1;
      this.loadMore(+name - 1);
      // this.active = name;
      // switch (+name) {
      //   case 1:
      //     this.myItems = [
      //       "PAID",
      //       "RELEASED",
      //       "TB_CANCELLED",
      //       "OVERTIME",
      //       "PB_CANCELLED",
      //       "PS_DISPUTED",
      //       "PB_DISPUTED",
      //       "BUYER_WON",
      //       "SELLER_WON"
      //     ];
      //     break;
      //   case 2:
      //     this.myItems = ["PAID"];
      //     break;
      //   case 3:
      //     this.myItems = [];
      //     break;
      //   case 4:
      //     this.myItems = ["BUYER_WON", "SELLER_WON"];
      //     break;
      //   case 5:
      //     this.myItems = ["TB_CANCELLED", "OVERTIME", "PB_CANCELLED"];
      //     break;
      //   case 6:
      //     this.myItems = ["PS_DISPUTED", "PB_DISPUTED"];
      //     break;
      //   default:
      //     break;
      // }
      // let k = 0;
      // this.tradings.forEach(el => {
      //   if(this.myItems.includes(el.status)){
      //     k++
      //   }
      // })
      // if(k === 0) {
      //   this.isLeftShow = true
      // } else{
      //   this.isLeftShow = false
      // }
    },
    oderTab2Change(name) {
      console.log(name);
      this.active2 = name;
      this.tradeds = [];
      this.tradings = [];
      this.offset_trading = 0;
      this.offset_traded = 0;
      this.loading = false;
      this.total_trading = 1;
      this.total_traded = 1;
      this.loadMore(+name - 1);
      // switch (+name) {
      //   case 1:
      //     this.myItems2 = ["EXPIRED", "CANCELLED", "PUBLISHING"];
      //     break;
      //   case 2:
      //     this.myItems2 = ["EXPIRED"];
      //     break;
      //   case 3:
      //     this.myItems2 = ["CANCELLED"];
      //     break;
      //   default:
      //     break;
      // }
      // let k = 0;
      // this.tradings.forEach(el => {
      //   if(this.myItems2.includes(el.status)){
      //     k++
      //   }
      // })
      // console.log(k)
      // if(k === 0) {
      //   this.isRightShow = true
      // } else{
      //   this.isRightShow = false
      // }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss"  scoped>
@import "../assets/css/order.scss";
</style>
<style lang="scss">
.content-order-otc {
  .mu-tab-active {
    color: rgba(0, 94, 228, 0.7) !important;
    // &:nth-child(1){
    //   border-bottom: 2px solid rgba(0, 94, 228, 0.7);
    //   padding-bottom: 1px;
    // }
  }
  .mu-tab-link-highlight {
    background-color: rgba(0, 94, 228, 0.7);
    max-width: toRem(60) !important;
  }
  .mu-tab-link {
    max-width: toRem(60) !important;
  }
  .mu-tabs {
    justify-content: flex-start;
    height: 50px !important;
  }
  // .mu-tab{
  //   min-width: 72px;
  //   max-width: 264px;
  // }
}
</style>
