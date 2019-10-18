<template>
  <div class="content-bills_agent" style="padding-top:3em;background:#fff">
  <div class="top">
      <div class="center">商家账单</div>
      <div class="left" @click="goBack" />
    </div>
       <div class="tab-bills_ffc" >         
          <button class="button" :class="{tab1:this.tab==='tab1'}" @click="tabChange('tab1')">全部</button>
          <button class="button" :class="{tab2:this.tab==='tab2'}" @click="tabChange('tab2')">FFC收款</button>
          <button class="button" :class="{tab2:this.tab==='tab3'}" @click="tabChange('tab3')">FFC提现</button>
        </div>
        <div class="bills-ffc-content" v-show="tab=='tab1'">
          <div class="bills-ffc-detail-item"  v-for="(item) in this.lsit" :key="item.id">
              <p class="pay-detail-zone-p" @click="showDetail(item)">订单号：<span class="gray-span">{{item.id}}</span></p>
              <p class="pay-detail-zone-p" v-show="item.is_deposit"  @click="showDetail(item)">
                收款金额：<span  class="left-span green-span">{{item.amount}}&nbsp;CNY</span>
                </p>
                <p class="pay-detail-zone-p" v-show="!item.is_deposit"  @click="showDetail(item)">
                提现金额：
                <span   class="left-span red-span">{{item.amount}}&nbsp;CNY</span>
                </p>
                <p class="pay-detail-zone-p" >{{$t('Wallet_Detail.createTime')}}<span>{{item.created | getformatDate}}</span></p>
                <p class="pay-detail-zone-p">订单状态：<span>{{$t('Wallet_Detail.'+item.status)}}</span></p>
              <!-- <div v-show="item.isOpen"  @click="showDetail(item)">
              <div class="bills-ffc-content-divider-1px"></div>
              <p class="pay-detail-zone-p">订单类型：<span>{{item.is_deposit?'充值':'提现'}}</span></p>
              <p class="pay-detail-zone-p">订单状态：<span>{{$t('Wallet_Detail.'+item.status)}}</span></p>
              <p class="pay-detail-zone-p">手续费：<span>{{item.fee}}&nbsp;CNY</span></p>
              <p class="pay-detail-zone-p" v-show="item.status=='PENDING'">昵称：<span>{{item.user}}</span></p>
              <p class="pay-detail-zone-p" v-show="item.status=='PENDING'">手机号：<span >{{item.user_mobile}}</span></p>
              <p class="pay-detail-zone-p" >{{$t('Wallet_Detail.createTime')}}<span>{{item.updated | getformatDate}}</span></p>
              </div> -->
            <div class="bills-ffc-content-divider"></div>
            </div> 
        </div>
        <div class="bills-ffc-content" v-show="tab=='tab2'">
          <div class="bills-ffc-detail-item"  v-for="(item) in this.deposit_lsit" :key="item.id">
              <p class="pay-detail-zone-p" @click="showDetail(item)">订单号：<span class="gray-span">{{item.id}}</span></p>
              <p class="pay-detail-zone-p"  @click="showDetail(item)">收款金额：<span v-show="item.is_deposit" class="left-span green-span">{{item.amount}}&nbsp;CNY</span><span v-show="!item.is_deposit"  class="left-span red-span">{{item.amount}}&nbsp;CNY</span></p>
              <p class="pay-detail-zone-p">订单状态：<span>{{$t('Wallet_Detail.'+item.status)}}</span></p>
              <p class="pay-detail-zone-p" >{{$t('Wallet_Detail.createTime')}}<span>{{item.created | getformatDate}}</span></p>
              <!-- <div v-show="item.isOpen"  @click="showDetail(item)">
              <div class="bills-ffc-content-divider-1px"></div>
              <p class="pay-detail-zone-p">订单类型：<span>{{item.is_deposit?'收款':'提现'}}</span></p>
              <p class="pay-detail-zone-p">订单状态：<span>{{$t('Wallet_Detail.'+item.status)}}</span></p>
              <p class="pay-detail-zone-p">手续费：<span>{{item.fee}}&nbsp;CNY</span></p>
              <p class="pay-detail-zone-p" v-show="item.status=='PENDING'">昵称：<span>{{item.user}}</span></p>
              <p class="pay-detail-zone-p" v-show="item.status=='PENDING'">手机号：<span >{{item.user_mobile}}</span></p>
              <p class="pay-detail-zone-p" >{{$t('Wallet_Detail.createTime')}}<span>{{item.updated | getformatDate}}</span></p>
              </div> -->
            <div class="bills-ffc-content-divider"></div>
            </div> 
        </div>
        <div class="bills-ffc-content" v-show="tab=='tab3'">
          <div class="bills-ffc-detail-item"  v-for="(item) in this.withdraw_lsit" :key="item.id">
              <p class="pay-detail-zone-p" @click="showDetail(item)">订单号：<span class="gray-span">{{item.id}}</span></p>
              <p class="pay-detail-zone-p"  @click="showDetail(item)">提现金额：<span v-show="item.is_deposit" class="left-span green-span">{{item.amount}}&nbsp;CNY</span><span v-show="!item.is_deposit"  class="left-span red-span">{{item.amount}}&nbsp;CNY</span></p>
              <p class="pay-detail-zone-p">订单状态：<span>{{$t('Wallet_Detail.'+item.status)}}</span></p>
               <p class="pay-detail-zone-p" >{{$t('Wallet_Detail.createTime')}}<span>{{item.created | getformatDate}}</span></p>
              <!-- <div v-show="item.isOpen"  @click="showDetail(item)">
              <div class="bills-ffc-content-divider-1px"></div>
              <p class="pay-detail-zone-p">订单类型：<span>{{item.is_deposit?'收款':'提现'}}</span></p>
              <p class="pay-detail-zone-p">订单状态：<span>{{$t('Wallet_Detail.'+item.status)}}</span></p>
              <p class="pay-detail-zone-p">手续费：<span>{{item.fee}}&nbsp;CNY</span></p>
              <p class="pay-detail-zone-p" v-show="item.status=='PENDING'">昵称：<span>{{item.user}}</span></p>
              <p class="pay-detail-zone-p" v-show="item.status=='PENDING'">手机号：<span >{{item.user_mobile}}</span></p>
              <p class="pay-detail-zone-p" >{{$t('Wallet_Detail.createTime')}}<span>{{item.updated | getformatDate}}</span></p>
              </div> -->
            <div class="bills-ffc-content-divider"></div>
            </div> 
        </div>
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
import { formatDate } from "../common/js/data";
import {
  SET_CRYPTO_CURRENCY,
  CLEAN_USER,
  SET_USER
} from "../store/mutation-types";
import agent from "../models/agent";
export default {
  name: "wallet_detail",
  components: {},
  data() {
    return {
      offset: 0,
      limit: 15,
      scroller: null,
      loading: false,
      total: 1,
      lsit: [],
      deposit_lsit: [],
      withdraw_lsit: [],
      tab: "tab1"
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    Promise.all([agent.agent_agent_transfer("ALL", "QUERY_SUCCEEDED", 0, 15)])
      .then(values => {
        let lsit_result = values[0];
        let lsit = [];
        let offset = 0;
        let total = 0;

        if (lsit_result.code === 0 && lsit_result.data.total > 0) {
          total = lsit_result.data.total;
          for (let i = 0; i < lsit_result.data.list.length; i++) {
            lsit_result.data.list[i].isOpen = false;
          }
          lsit = lsit_result.data.list;
          offset = lsit_result.data.list.length;
        }
        next(vm => {
          vm.lsit = lsit;
          vm.offset = offset;
          vm.total = total;
        });
        nprogress.done();
      })
      .catch(e => {
        nprogress.done();
        HttpResultCode.validate(e.code);
      });
  },
  filters: {
    getformatDate(time) {
      if (time == undefined || time == "") return "";
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
    getOrderStateType(status) {
      if (undefined == status) return "";
      return HttpResultCode.orderStatusType(status);
    }
  },
  mounted() {
    this.scroller = this.$el;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    tabChange(tab) {
      this.tab = tab;
      this.offset = 0;
      this.total = 1;
      this.loadMore();
    },
    getHumanDate: function(timestamp) {
      return moment(timestamp).format("YYYY/MM/DD HH:mm");
    },

    showDetail(item) {
      item.isOpen = !item.isOpen;
    },

    //         enum QueryAgentTransferType {
    //     ALL = 0; // 全部
    //     DEPOSIT = 1; // 充值
    //     WITHDRAW = 2; // 提现
    // }

    // enum QueryAgentTransferStatus {
    //     QUERY_ALL = 0; // 全部
    //     QUERY_PENDING = 1; // 进行中
    //     QUERY_SUCCEEDED = 2; // 成功
    //     QUERY_FAILED = 3; // 失败
    // }
    // enum AgentTransferStatus {
    //     PENDING = 0; // 待处理
    //     SUCCEEDED = 1; // 成功
    //     FAILED = 2; // 失败
    // }
    //
    loadMore() {
      if ("/bills_agent" != this.$route.path) {
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
      if (this.tab == "tab1") {
        this.loadAllMore();
      } else if (this.tab == "tab2") {
        this.loadDepositMore();
      } else if (this.tab == "tab3") {
        this.loadWithdrawMore();
      }
    },
    loadAllMore() {
      if (this.loading) {
        return;
      }
      if (this.total <= this.offset) {
        this.loading = false;
        return;
      }
      this.loading = true;
      agent
        .agent_agent_transfer("ALL", "QUERY_SUCCEEDED", this.offset, this.limit)
        .then(data => {
          this.loading = false;
          if (this.offset == 0) this.lsit = [];

          if (data.code === 0 && data.data.total > 0) {
            this.total = data.data.total;
            for (let i = 0; i < data.data.list.length; i++) {
              data.data.list[i].isOpen = false;
            }
            this.lsit = this.lsit.concat(data.data.list);
            this.offset = this.offset + data.data.list.length;
          } else {
            this.lsit = [];
          }
        })
        .catch(e => {
          this.loading = false;
        });
    },
    loadDepositMore() {
      if (this.loading) {
        return;
      }
      if (this.total <= this.offset) {
        this.loading = false;
        return;
      }
      this.loading = true;
      agent
        .agent_agent_transfer(
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
    },
    loadWithdrawMore() {
      if (this.loading) {
        return;
      }
      if (this.total <= this.offset) {
        this.loading = false;
        return;
      }
      this.loading = true;
      agent
        .agent_agent_transfer(
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
};
</script>

<style  lang="scss"  scoped>
@import "../assets/css/bills_agent.scss";
</style>
