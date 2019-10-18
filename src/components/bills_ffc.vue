<template>
  <div class="content-bills-ffc">
    <div class="top">
      <div class="right"  @click="toggle" v-show="false">{{$t('Menu.'+crypto_currency)}}</div>
      <mu-icon-menu class="icon-top"  @change="handleChange" :open="open" @open="handleOpen" @close="handleClose"  :value="crypto_currency" icon="more_vert"   v-show="false">
        <!-- <mu-menu-item v-for="label, value in crypto_currency_list" :title="label" :key="value"/> -->
        <mu-menu-item value="FFC" :title="$t('Menu.FFC')" />
        <!-- <mu-menu-item value="BTC" :title="$t('Menu.BTC')" />
        <mu-menu-item value="ETH" :title="$t('Menu.ETH')" />
        <mu-menu-item value="LTC" :title="$t('Menu.LTC')" />
        <mu-menu-item value="OSC" :title="$t('Menu.OSC')" />
        <mu-menu-item value="DGC" :title="$t('Menu.DGC')" />
        <mu-menu-item value="LBTC" :title="$t('Menu.LBTC')" /> -->
      </mu-icon-menu>
      <div class="img-arrow"  v-show="false"></div>

       <div class="center">火狐币账单</div>
      <div class="left" @click="goBack" />
    </div>
    <div class="tab-bills">
      <button class="button" :class="{tab1:this.tab==='tab1'}" @click="tabChange('tab1')">{{$t('Wallet_Detail.tradeBill')}}</button>
      <button class="button" :class="{tab2:this.tab==='tab2'}" @click="tabChange('tab2')">购买记录</button>
      <button class="button" :class="{tab3:this.tab==='tab3'}" @click="tabChange('tab3')">出售记录</button>
    </div>
      
    <div v-if="tab === 'tab1'" class="bill-trade-list" >
      <div class="bill-trade-list-item" v-for="(item ) in this.trade_list" :key="item.created" >
       <div class="bill-trade-list-item-content">
          <p class="p1"><span class="span-left">{{$t('Wallet_Detail.count')}} {{item.qty}}&nbsp;{{item.currency}}</span> <span class="span-right">{{$t('Wallet.'+item.type)}}</span></p>
          <p class="p2"><span class="span-left">{{$t('Wallet_Detail.balance')}} {{item.balance}}&nbsp;FFC</span> <span class="span-right span-time">{{item.created | getformatDate}}</span></p>
       </div>
      </div>
   </div>
   <div v-if="tab === 'tab2'" class="bill-trade-list" >
      <div class="bill-trade-list-item" v-for="(item ) in this.deposit_lsit" :key="item.updated" >
       <div class="bill-trade-list-item-content">
          <p class="p1"><span class="span-left">{{$t('Wallet_Detail.count')}} {{item.amount}}&nbsp;FFC</span> <span class="span-right">{{$t('Wallet_Detail.'+item.status)}}</span></p>
          <p class="p2"><span class="span-left">订单号：F{{item.id}}</span> <span class="span-right span-time">{{item.updated | getformatDate}}</span></p>
       </div>
      </div>
   </div>
    <!-- <div class="bills-ffc-content" v-show="tab=='tab2'">
          <div class="bills-ffc-detail-item"  v-for="(item) in this.deposit_lsit" :key="item.id">
          
              <p class="pay-detail-zone-p" @click="showDetail(item)">订单号：<span class="gray-span">{{item.id}}</span></p>
              <p class="pay-detail-zone-p"  @click="showDetail(item)">充值金额：<span v-show="item.is_deposit" class="left-span green-span">{{item.amount}}&nbsp;CNY</span><span v-show="!item.is_deposit"  class="left-span red-span">{{item.amount}}&nbsp;CNY</span></p>
              <div v-show="item.isOpen"  @click="showDetail(item)">
              <div class="bills-ffc-content-divider-1px"></div>
                <p class="pay-detail-zone-p">订单状态：<span>{{$t('Wallet_Detail.'+item.status)}}</span></p>
                <p class="pay-detail-zone-p">手续费：<span>{{item.fee}}&nbsp;CNY</span></p>
                <p class="pay-detail-zone-p" v-show="item.status=='PENDING'">昵称：<span>{{item.agent}}</span></p>
                <p class="pay-detail-zone-p" v-show="item.status=='PENDING'">手机号：<span >{{item.agent_mobile}}</span></p>
                <p class="pay-detail-zone-p" >{{$t('Wallet_Detail.createTime')}}<span>{{item.updated | getformatDate}}</span></p>
              </div>
            <div class="bills-ffc-content-divider"></div>
          
        </div>
    </div> -->
    <div v-if="tab === 'tab3'" class="bill-trade-list" >
      <div class="bill-trade-list-item" v-for="(item ) in this.withdraw_lsit" :key="item.updated" >
       <div class="bill-trade-list-item-content">
          <p class="p1"><span class="span-left">{{$t('Wallet_Detail.count')}} {{item.amount}}&nbsp;FFC</span> <span class="span-right"> <span style="color:#ff4d2d">(F{{item.id}})</span>{{$t('Wallet_Detail.'+item.status)}}</span></p>
          <p class="p2"><span class="span-left">手续费：{{item.fee}}&nbsp;FFC</span> <span class="span-right span-time">{{item.updated | getformatDate}}</span></p>
       </div>
      </div>
   </div>
    <!-- <div class="bills-ffc-content" v-show="tab=='tab3'">
          <div class="bills-ffc-detail-item"  v-for="(item) in this.withdraw_lsit" :key="item.id">
              <p class="pay-detail-zone-p" @click="showDetail(item)">订单号：<span class="gray-span">{{item.id}}</span></p>
              <p class="pay-detail-zone-p"  @click="showDetail(item)">提现金额：<span v-show="item.is_deposit" class="left-span green-span">{{item.amount}}&nbsp;CNY</span><span v-show="!item.is_deposit"  class="left-span red-span">{{item.amount}}&nbsp;CNY</span></p>
              <div v-show="item.isOpen"  @click="showDetail(item)">
              <div class="bills-ffc-content-divider-1px"></div>
              <p class="pay-detail-zone-p">订单状态：<span>{{$t('Wallet_Detail.'+item.status)}}</span></p>
              <p class="pay-detail-zone-p">手续费：<span>{{item.fee}}&nbsp;CNY</span></p>
              <p class="pay-detail-zone-p" v-show="item.status=='PENDING'">昵称：<span>{{item.agent}}</span></p>
              <p class="pay-detail-zone-p" v-show="item.status=='PENDING'">手机号：<span >{{item.agent_mobile}}</span></p>
              <p class="pay-detail-zone-p" >{{$t('Wallet_Detail.createTime')}}<span>{{item.updated | getformatDate}}</span></p>
              </div>
            <div class="bills-ffc-content-divider"></div>
            </div> 
    </div> -->

    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
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
import {
  SET_CRYPTO_CURRENCY,
  CLEAN_USER,
  SET_USER
} from "../store/mutation-types";
import agent from "../models/agent";
// import VueQrcode from '@xkeshi/vue-qrcode'
// Vue.component('qrcode',VueQrcode)
export default {
  name: "bills_ffc",
  components: {},
  data() {
    return {
      open: false,
      crypto_currency: "FFC",
      trade_list: [],
      deposit_lsit: [],
      withdraw_lsit: [],
      tab: "tab1",
      total: 0,
      scroller: null,
      loading: false,
      offset: 0,
      limit: 20
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    // 参数初始化
    let crypto_currency = "FFC";
    let offset = 0;
    let limit = 20;
    let total = 1;
    wallet
      .bill(crypto_currency, offset, limit)
      .then(result => {
        nprogress.done();
        let trade_list = [];
        if (result.code === 0) {
          if (result.data.total > 0) {
            trade_list = result.data.wallet_details;
            offset = offset + result.data.wallet_details.length;
            total = result.data.total;
          }
        }
        next(vm => {
          vm.trade_list = trade_list;
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
    }
  },
  mounted() {
    this.scroller = this.$el;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    toggle() {
      this.open = !this.open;
    },
    handleOpen() {
      this.open = true;
    },
    handleChange(val) {
      this.crypto_currency = val;
      if (val != "FFC")
        this.$store.commit(SET_CRYPTO_CURRENCY, this.crypto_currency);
      this.initData();
      this.tabChange(this.tab);
    },
    handleClose() {
      this.open = false;
    },
    showDetail(item) {
      item.isOpen = !item.isOpen;
    },
    initData() {
      this.trade_list = [];
      this.deposit_lsit = [];
      this.withdraw_lsit = [];
    },
    tabChange(tab) {
      this.offset = 0;
      this.total = 1;
      this.loading = false;
      this.tab = tab;
      this.initData();
      this.loadMore();
    },
    loadMore() {
      if ("/bills_ffc" != this.$route.path) {
        // console.log('this.$route.path = '+this.$route.path)
        return;
      }
      if (this.loading) {
        return;
      }
      if (this.total <= this.offset) {
        this.loading = false;
        return;
      }
      this.loading = true;
      if (this.tab == "tab1") {
        wallet
          .bill(this.crypto_currency, this.offset, this.limit)
          .then(result => {
            this.loading = false;
            if (this.offset == 0) this.trade_list = [];
            if (this.tab != "tab1") return;
            if (result.code === 0) {
              if (result.data.total > 0) {
                this.trade_list = this.trade_list.concat(
                  result.data.wallet_details
                );
                this.offset = this.offset + result.data.wallet_details.length;
                this.total = result.data.total;
              }
            }
          })
          .catch(function() {
            this.loading = false;
          });
      }
      if (this.tab == "tab2") {
        agent
          .agent_mine_transfer(
            "DEPOSIT",
            "QUERY_SUCCEEDED",
            this.offset,
            this.limit
          )
          .then(data => {
            this.loading = false;
            if (this.offset == 0) this.deposit_lsit = [];
            if (data.code === 0 && data.data.total > 0) {
              this.total = data.data.total;
              for (let i = 0; i < data.data.list.length; i++) {
                data.data.list[i].isOpen = false;
              }
              this.deposit_lsit = this.deposit_lsit.concat(data.data.list);
              this.offset = this.offset + data.data.list.length;
            } else {
              this.deposit_lsit = [];
            }
          })
          .catch(e => {
            this.loading = false;
          });
      }

      if (this.tab == "tab3") {
        agent
          .agent_mine_transfer(
            "WITHDRAW",
            "QUERY_SUCCEEDED",
            this.offset,
            this.limit
          )
          .then(data => {
            this.loading = false;
            if (this.offset == 0) this.withdraw_lsit = [];

            if (data.code === 0 && data.data.total > 0) {
              this.total = data.data.total;
              for (let i = 0; i < data.data.list.length; i++) {
                data.data.list[i].isOpen = false;
              }
              this.withdraw_lsit = this.withdraw_lsit.concat(data.data.list);
              this.offset = this.offset + data.data.list.length;
            } else {
              this.withdraw_lsit = [];
            }
          })
          .catch(e => {
            this.loading = false;
          });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss"  scoped>
@import "../assets/css/bills_ffc.scss";
</style>
