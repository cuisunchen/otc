<template>
<div class="content market-content">
  <div class="fix-progress" v-show="false">
    <mu-linear-progress color="#0A2463"/>
    </div>
    <div class="fixed-top">
    <mu-appbar style="text-align:left" :title="total+'狐狸'">
      <mu-flat-button label="找狐狸" @click="open" slot="right"/>
      <mu-icon-menu class="paixu" :icon="asc" slot="right">
      <mu-menu-item title="价格↑" @click="startSort('价格↑','PRICE_ASC')"/>
      <mu-menu-item title="价格↓" @click="startSort('价格↓','PRICE_DESC')"/>
      <mu-menu-item title="寻宝↓" @click="startSort('寻宝↓','REWARD_DESC')"/>
      <mu-menu-item title="寻宝↑" @click="startSort('寻宝↑','REWARD_ASC')"/>
      <mu-menu-item title="代数↓" @click="startSort('代数↓','GENERATION_DESC')"/>
      <mu-menu-item title="代数↑" @click="startSort('代数↑','GENERATION_ASC')"/>
    </mu-icon-menu>
    
    </mu-appbar>
    <mu-tabs style="background:#fff" :value="activeTab" @change="handleTabChange">
    <mu-tab value="tab1" title="青丘集市" @click="marketChange('tab1','SELL_PROPERTY')" />
    <mu-tab value="tab2" title="十里桃❀"   @click="marketChange('tab2','SELL_MATE')" />
    <mu-tab value="tab3" title="狐仙秘境"  @click="tradeTab('tab3')"/>
    </mu-tabs>
    </div>
    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
<div v-if="activeTab === 'tab1'">
  <div  class="list-content-zone" >
  <div class="list-row3" v-for="(item) in this.tradeList" :key="item.created" >
  <router-link :to="'/game_fox/' + item.id">
          <div class="content-zone">
            <div class="content-zone-img" :style="item.bg">
               <div :class="'body'+item.appearance[1]"></div>  
               <div :class="'hate'+item.appearance[2]"></div>
                <div :class="'erhuan'+item.appearance[3]"></div>
                <div :class="'yanjing'+item.appearance[4]"></div>
                <div :class="'weibo'+item.appearance[5]"></div>
                <div :class="'shiping'+item.appearance[6]"></div>
                <div :class="'mouth'+item.appearance[7]"></div>
                <div :class="'face'+item.appearance[8]"></div>
                <div :class="'level'+item.appearance[9]"></div>
            </div>
              <div class="g">
              <i class="g1">{{item.generation}}</i>代
              </div>
            <div class="fox-id">
                # {{item.id}}
            </div>
            <div class="content-title">
              <div class="fox-msg">
                {{item.mate_count}}次<br />
              {{item.grow}}/{{item.mate}}/{{item.dig}}
              </div>
              <i>{{item.price}}</i><span>OSC</span>
            </div>
          </div>
  </router-link>
</div>

</div>
</div>
<div v-if="activeTab === 'tab2'">
  <div  class="list-content-zone">
  <div class="list-row3" v-for="(item) in this.mateList" :key="item.created" >
  <router-link :to="'/game_fox/' + item.id">
          <div class="content-zone">
            <div class="content-zone-img" :style="item.bg">
               <div :class="'body'+item.appearance[1]"></div>
               <div :class="'hate'+item.appearance[2]"></div>
                <div :class="'erhuan'+item.appearance[3]"></div>
                <div :class="'yanjing'+item.appearance[4]"></div>
                <div :class="'weibo'+item.appearance[5]"></div>
                <div :class="'shiping'+item.appearance[6]"></div>
                <div :class="'mouth'+item.appearance[7]"></div>
                <div :class="'face'+item.appearance[8]"></div>
                <div :class="'level'+item.appearance[9]"></div>
            </div>
              <div class="g">
              <i class="g1">{{item.generation}}</i>代
              </div>
            <div class="fox-id">
                # {{item.id}}
            </div>
            <div class="content-title">
              <div class="fox-msg">
                {{item.mate_count}}次<br />
              {{item.grow}}/{{item.mate}}/{{item.dig}}
              </div>
              <i>{{item.price}}</i><span>OSC</span>
            </div>
          </div>
  </router-link>
</div>

</div>
</div>
<div v-if="activeTab === 'tab3'">
  <div class="mijing-zone">
    <div class="mijing-tilte"> <span style="float:left">狐丹数量:{{FFD}} 颗</span> <span class="all-price">{{OSC}} OSC</span></div>
    <div class="mijing-table-zone">
      <div class="table-zoneleft">
        <div style="background: #ede7f6;">
        <table class="mijin-table">
          <tbody>
            <tr>
              <td class="td-gray ft-left">卖1</td>
              <td class="td-red">{{asks.length>=1?asks[0][0]:0}}</td>
              <td class="td-gray">{{asks.length>=1?asks[0][1]:0}}</td>
            </tr>
            <tr>
              <td class="td-gray ft-left">卖2</td>
              <td class="td-red">{{asks.length>=2?asks[1][0]:0}}</td>
              <td class="td-gray">{{asks.length>=2?asks[1][1]:0}}</td>
            </tr>
            <tr>
              <td class="td-gray ft-left">卖3</td>
              <td class="td-red">{{asks.length>=3?asks[2][0]:0}}</td>
              <td class="td-gray">{{asks.length>=3?asks[2][1]:0}}</td>
            </tr>
             <tr>
              <td class="td-gray ft-left">卖4</td>
              <td class="td-red">{{asks.length>=4?asks[3][0]:0}}</td>
              <td class="td-gray">{{asks.length>=4?asks[3][1]:0}}</td>
            </tr>
             <tr>
              <td class="td-gray ft-left">卖5</td>
              <td class="td-red">{{asks.length>=5?asks[4][0]:0}}</td>
              <td class="td-gray">{{asks.length>=5?asks[4][1]:0}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
      <div class="table-zoneright">
        <div style="background: #ede7f6;">
        <table class="mijin-table">
          <tbody>
            <tr>
              <td class="td-gray">买1</td>
              <td class="td-green">{{bids.length>=1?bids[0][0]:0}}</td>
              <td class="td-gray">{{bids.length>=1?bids[0][1]:0}}</td>
            </tr>
            <tr>
              <td class="td-gray">买2</td>
              <td class="td-green">{{bids.length>=2?bids[1][0]:0}}</td>
              <td class="td-gray">{{bids.length>=2?bids[1][1]:0}}</td>
            </tr>
            <tr>
              <td class="td-gray">买3</td>
              <td class="td-green">{{bids.length>=3?bids[2][0]:0}}</td>
              <td class="td-gray">{{bids.length>=3?bids[2][1]:0}}</td>
            </tr>
             <tr>
              <td class="td-gray">买4</td>
              <td class="td-green">{{bids.length>=4?bids[3][0]:0}}</td>
              <td class="td-gray">{{bids.length>=4?bids[3][1]:0}}</td>
            </tr>
             <tr>
              <td class="td-gray">买5</td>
              <td class="td-green">{{bids.length>=5?bids[4][0]:0}}</td>
              <td class="td-gray">{{bids.length>=5?bids[4][1]:0}}</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
    <div class="buy-sell-zone">
      <div class="buy-sell-btn-zone">
        <button class="buy-change-btn"  :class="{disable:this.isSell}"    @click="tradeChange(false)">限价买</button>
        <button class="sell-change-btn" :class="{disable:!(this.isSell)}"  @click="tradeChange(true)">限价卖</button>
      </div>
      <div class="choise-input-zone" style="margin-top:1em;">
        <i class="remove-btn" :class="{red_btn: isSell}"><mu-icon value="remove" :size="2"/></i>
        <input class="add-control" :class="{border_red: isSell}" placeholder="价格（OSC）" v-model="price"  @input="change_price($event)" type="number" >
        <i class="add-btn" :class="{red_btn: isSell}"><mu-icon value="add" :size="2"/></i>
      </div> 
      <div class="choise-input-zone">
        <i class="remove-btn" :class="{red_btn: isSell}"><mu-icon value="remove" :size="2"/></i>
        <input class="add-control" :class="{border_red: isSell}" placeholder="狐丹数量"  v-model="qty"  @input="change_qty($event)" type="number" >
        <i class="add-btn" :class="{red_btn: isSell}"><mu-icon value="add" :size="2"/></i>
      </div>
      <button v-show="!(this.isSell)" class="buy-big-btn" @click="limitTrade" :class="{disable:this.btnBuyStatus}" >购买</button>
      <button v-show="this.isSell" class="sell-big-btn" @click="limitTrade" >出售</button>
    </div>
    <div>
      <div class="table-history">
        <div class="history_btn_zone">
          <button :class="{active: this.isHistory}" @click="orderedHistory(true)">未完成</button><button :class="{active: !(this.isHistory)}" @click="orderedHistory(false)">已完成</button>
        </div>
        <table v-show="(this.isHistory)" class="history-table">
          <tbody>
            <tr>
              <td style="width:25%">时间</td>
              <td style="width:20%">类型</td>
              <td style="width:20%">价格（OSC）</td>
              <td style="width:20%">狐丹数量</td>
              <td style="width:15%">操作</td>
            </tr>
              <tr v-for="(item) in this.orderList" :key="item.id" >
                <td class="td-time" >{{item.updated |formatDate2 }}</td>
                <td >{{item.order_type|getOrderType}}</td>
                <td >{{item.price}}</td>
                <td >{{item|getQty}}</td>
                <td  @click="showCancelOrderDialog(item.id)"><u style="color:red">撤销</u></td>
              </tr>
          </tbody>
        </table>
        <table v-show="!(this.isHistory)" class="history-table">
          <tbody>
            <tr>
              <td >时间</td>
              <td >类型</td>
              <td >狐丹成交量</td>
              <td >链克成交量</td>
            </tr>
            
              <tr v-for="(item) in this.orderList" :key="item.id">
                <td class="td-time">{{item.updated |formatDate2 }}</td>
                <td >{{item.order_type|getOrderType}}</td>
                <td >{{item.excuted_qty}}</td>
                <td >{{item.excuted_amount}}</td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
<!-- 找狐狸 -->
    <mu-dialog :open="dialog" :title="find+'找狐狸'" >
      <!-- <mu-text-field v-model="findid" label="ID" @focus="focusid" hintText="输入ID查询"/><br/> -->
      <!-- <mu-text-field v-model="findgee" label="代数" @focus="focusgee" hintText="输入代数查询"/><br/> -->

<input style="width: 100%; margin-bottom: 0.5em; padding: 0.3em 0.5em;height: 3em;border-radius: 0.2em; border: 1px solid #ececec;"  @focus="focusid"   placeholder="输入ID查询" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"  v-model="findid"/>
<input style="width: 100%; margin-bottom: 0.5em; padding: 0.3em 0.5em;height: 3em;border-radius: 0.2em;border: 1px solid #ececec;"  @focus="focusgee" placeholder="输入代数查询" type="number"   maxlength="3"  oninput="if(value.length>3)value=value.slice(0,3)"  v-model="findgee"/>
      <mu-flat-button slot="actions" @click="closeDialog" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="findfox" label="找一圈"/>
    </mu-dialog>
<!--交易密码输入框-->
    <mu-dialog :open="isPasswordDialog" title="交易密码" >
      <div >
        <mu-text-field  v-model="passwordValue"  label="交易密码" class="input-zone" hintText="请输入交易密码"  type="password" maxLength='16' fullWidth />
        <span style="font-size:12px">请输入火狐狸平台交易密码</span>
        <div style="text-align:right">
          <mu-flat-button slot="actions" @click="closeDialog" primary label="取消"/>
          <mu-flat-button slot="actions" primary @click="exchangeLimitOrder" :label="this.isSell?'出售':'购买'"/>
        </div>
      </div>
    </mu-dialog>
      <mu-toast v-if="toast" :message="message" @close="hideToast"/>
    <!--订单取消接口-->
    <mu-dialog :open="isOrderCancelDialog" title="订单取消提示" >
      <div >
        <span style="font-size:12px">请确认是否撤销订单。</span>
        <div style="text-align:right">
          <mu-flat-button slot="actions" @click="closeDialog" primary label="取消"/>
          <mu-flat-button slot="actions" primary @click="cancelOrder" label="撤销"/>
        </div>
      </div>
    </mu-dialog>
<FoxBottomNav></FoxBottomNav>
</div>

</template>
<script>
import nprogress from "nprogress";
import game from "../models/game";
import validate from "../utils/validate";
import moment from "../utils/moment";
import { formatDate } from "../common/js/data";
import { CAPTCHA_SIGNIN } from "../models/url";
import FoxBottomNav from "../components/FoxBottomNav";
import { IMG_BASE_URL } from "../models/url.js";
export default {
  name: "game_fox_market",
  components: { FoxBottomNav },
  data() {
    return {
      activeTab: "tab1",
      sell_type: "SELL_PROPERTY",
      order: "PRICE_DESC",
      offset: 0,
      offset_mate: 0,
      offset_trade: 0,
      limit: 30,
      list: [],
      mateList: [],
      tradeList: [],
      market: "",
      asc: "价格↓",
      meessage: "",
      toast: false,
      hideToast: false,
      hua: false,
      isShowData: false,
      isHistory: false,
      nothua: true,
      dialog: false,
      progressShow: false,
      findfoxbtn: true,
      find: "",
      findid: "",
      findgee: "",
      isbuy: true,
      total: 0,
      bids: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
      asks: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
      refresh_timer: [],
      btnBuyStatus: false,
      btnSellStatus: false,
      isPrice: false,
      isQty: false,
      price: "",
      qty: "",
      isSell: false,
      isPasswordDialog: false,
      isOrderCancelDialog: false,
      orderId: "",
      orderList: [],
      passwordValue: "",
      scroller: null,
      loading: false,
      OSC: "0",
      FFD: "0",
      body: IMG_BASE_URL + "body.png",
      refreshing: false,
      trigger: null
    };
  },
  mounted() {
    this.scroller = this.$el;
    this.trigger = this.$el;
  },
  filters: {
    formatDate2(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    getOrderType(type) {
      if (type === "LIMIT_BUY") {
        return "限价买";
      } else if (type === "LIMIT_SELL") {
        return "限价卖";
      } else if (type === "MARKET_BUY") {
        return "市价买";
      } else if (type === "MARKET_SELL") {
        return "市价卖";
      }
    },

    getQty(item) {
      return item.limit_qty - item.excuted_qty;
    }
  },
  created: function() {
    this.isHistory = false;
    this.initDataTrade();
    this.getBalance();
    this.orderedHistory("TRADING");
    this.getExchangeDepth();
  },
  beforeDestroy: function() {
    for (let i = 0; i < this.refresh_timer.length; i++) {
      clearTimeout(this.refresh_timer[i]);
    }
  },
  methods: {
    refresh() {
      if (this.activeTab == "tab3") {
        setTimeout(() => {
          this.refreshing = false;
        }, 2000);
        return;
      }
      this.refreshing = true;
      this.marketChange(this.activeTab, this.sell_type);
    },
    showToast: function(msg) {
      this.toast = true;
      this.message = msg;
      this.toastTimer = setTimeout(() => {
        this.toast = false;
      }, 2000);
    },
    focusid() {
      this.findgee = "";
      this.find = "ID";
    },
    focusgee() {
      this.findid = "";
      this.find = "代数";
    },
    open() {
      this.findid = "";
      this.findgee = "";
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.isPasswordDialog = false;
      this.isOrderCancelDialog = false;
    },
    tradeChange(isSell) {
      this.isSell = isSell;
    },
    limitTrade() {
      if (!(this.isPrice && this.isQty)) {
        this.showToast("输入不正确");
        return;
      }
      //对比自己账户数据
      this.passwordValue = "";
      this.isPasswordDialog = true;
    },
    showCancelOrderDialog(orderId) {
      this.isOrderCancelDialog = true;
      this.orderId = orderId;
    },
    cancelOrder() {
      this.isOrderCancelDialog = false;
      game
        .exchangeCancelOrder("FFD_OSC", this.orderId)
        .then(data => {
          setTimeout(() => {
            this.orderedHistory(true);
          }, 2000);
        })
        .catch(e => {});
    },
    orderedHistory(history) {
      this.isHistory = history;
      this.offset = 0;
      if (this.isHistory) {
        this.exchangeMyOrder("TRADING");
      } else {
        this.exchangeMyOrder("TRADED");
      }
    },
    exchangeMyOrder(status) {
      game
        .foxExchangeMyOrder("FFD_OSC", status, this.offset, this.limit)
        .then(data => {
          if (data.code == 0 && data.data.total > 0) {
            this.orderList = data.data.orders;
            this.getBalance();
          } else {
            this.orderList = [];
          }
        })
        .catch(e => {
          this.orderList = [];
        });
    },
    exchangeLimitOrder() {
      if (this.passwordValue === "") {
        this.showToast("请输入交易密码");
        return;
      }
      this.isPasswordDialog = false;
      game
        .exchangeLimitOrder(
          "FFD_OSC",
          this.qty,
          !this.isSell,
          this.price,
          this.passwordValue
        )
        .then(data => {
          this.qty = "";
          this.price = "";
          this.passwordValue = "";
          this.getBalance();
          this.showToast("下单成功");
        })
        .catch(e => {
          if (1023 === e.code) {
            this.showToast("密码输入有误");
          } else if (1104 === e.code) {
            this.showToast("账号余额不足");
          }
        });
    },

    change_price: function(e) {
      let val = e.target.value;
      if (/^\d{1,5}(\.\d{1,2})?$/.test(val)) {
        this.isPrice = true;
        this.price = val;
      } else {
        this.isPrice = false;
        // this.price='';
      }
      if (
        val === "" ||
        val === "0" ||
        val === "0." ||
        val === "0.0" ||
        val === "0.00"
      ) {
        this.isPrice = false;
        //  this.price='';
      }
      if (this.isPrice && this.isQty) {
        this.btnBuyStatus = false;
        this.btnSellStatus = false;
      } else {
        this.btnBuyStatus = true;
        this.btnSellStatus = true;
      }
    },
    change_qty: function(e) {
      let val = e.target.value;
      if (/^\d{1,5}?$/.test(val)) {
        this.isQty = true;
        this.qty = val;
      } else {
        this.isQty = false;
        this.qty = "";
      }
      if (val === "" || val === "0") {
        this.isQty = false;
        this.qty = "";
      }
      if (this.isPrice && this.isQty) {
        this.btnBuyStatus = false;
        this.btnSellStatus = false;
      } else {
        this.btnBuyStatus = true;
        this.btnSellStatus = true;
      }
    },
    time_refresh: function() {
      let sec = 10;
      for (let i = 0; i <= 10; i++) {
        this.refresh_timer.push(
          window.setTimeout(() => {
            if (sec !== 0) {
              sec--;
            } else {
              sec = 10;
              // console.log('this.$route.path = '+this.$route.path)
              if (
                "/game_fox_market" == this.$route.path ||
                "/" == this.$route.path
              ) {
              } else {
                this.clear_refresh();
                return;
              }

              this.getExchangeDepth();
              if (this.isHistory) this.orderedHistory(this.isHistory);
              setTimeout(() => {
                this.time_refresh();
              }, 1000);
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
    },
    getExchangeDepth() {
      game
        .exchangeDepth("FFD_OSC", "5")
        .then(data => {
          if (data.data.depths.hasOwnProperty("bids"))
            this.bids = data.data.depths.bids;
          if (data.data.depths.hasOwnProperty("asks"))
            this.asks = data.data.depths.asks;
        })
        .catch(e => {});
    },
    getBalance: function() {
      game
        .balance()
        .then(data => {
          let list = data.data.list;
          for (let i = 0; i < list.length; i++) {
            if (list[i].currency === "OSC") {
              this.OSC = list[i].available;
            }

            if (list[i].currency === "FFD") {
              this.FFD = list[i].available;
            }
          }
        })
        .catch(e => {
          // console.log("e = "+e.code)
        });
    },
    findfox: function() {
      if (this.findid != "") {
        game
          .foxDetail(this.findid)
          .then(data => {
            this.dialog = false;
            this.$router.push("/game_fox/" + this.findid);
          })
          .catch(e => {
            switch (e.code) {
              case 1604:
                this.showToast("米有这只狐狸呢");
                break;
            }
          });
      }
      if (this.findgee != "") {
        this.dialog = false;
        this.findfoxbtn = false;
        this.$router.push({
          name: "game_fox_generation",
          params: { generation: this.findgee, sell_type: this.sell_type }
        });
      }
    },
    handleTabChange(val) {
      this.activeTab = val;
    },
    // handleActive () {},
    initData: function() {
      this.offset = 0;
      this.list = [];
      if (this.loading) {
        this.showToast("正在加载");
        return;
      }
      this.loading = true;
      this.progressShow = true;
      game
        .foxMarketList(this.sell_type, this.order, this.offset, this.limit)
        .then(data => {
          this.refreshing = false;
          this.loading = false;
          this.list = [];
          this.dealData(data);
        })
        .catch(e => {
          this.refreshing = false;
          this.loading = false;
        });
    },
    initDataTrade: function() {
      this.offset_trade = 0;
      this.total = 0;
      this.tradeList = [];
      game
        .foxMarketList(
          "SELL_PROPERTY",
          this.order,
          this.offset_trade,
          this.limit
        )
        .then(data => {
          this.refreshing = false;
          this.loading = false;
          this.tradeList = [];
          this.isShowData = true;
          this.dealDataTrade(data);
        })
        .catch(e => {
          this.refreshing = false;
          this.loading = false;
        });
    },
    dealDataTrade(data) {
      var colors = [
        "#f7dce1",
        "#f7dcf4",
        "#e7dbee",
        "#e2e6ff",
        "#dff9ff",
        "#ebfff4",
        "#edffdf",
        "#fff8dc",
        "#ffebdc"
      ];
      for (var i = 0; i < data.data.list.length; i++) {
        var item = data.data.list[i];
        item.bg = "background:" + colors[item.appearance[0] - 1];
        data.data.list[i] = item;
      }
      this.offset_trade = this.offset_trade + data.data.list.length;
      this.total = data.data.total;
      this.tradeList = this.tradeList.concat(data.data.list);
      this.loading = false;
    },
    initDataMate: function() {
      this.offset_mate = 0;
      this.mateList = [];
      this.total = 0;
      game
        .foxMarketList("SELL_MATE", this.order, this.offset_mate, this.limit)
        .then(data => {
          this.refreshing = false;
          this.loading = false;
          this.mateList = [];
          this.progressShow = false;
          this.isShowData = true;
          this.dealDataMate(data);
        })
        .catch(e => {
          this.refreshing = false;
          this.loading = false;
        });
    },
    dealDataMate(data) {
      var colors = [
        "#f7dce1",
        "#f7dcf4",
        "#e7dbee",
        "#e2e6ff",
        "#dff9ff",
        "#ebfff4",
        "#edffdf",
        "#fff8dc",
        "#ffebdc"
      ];
      for (var i = 0; i < data.data.list.length; i++) {
        var item = data.data.list[i];
        item.bg = "background:" + colors[item.appearance[0] - 1];
        data.data.list[i] = item;
      }
      this.offset_mate = this.offset_mate + data.data.list.length;
      this.total = data.data.total;
      this.mateList = this.mateList.concat(data.data.list);
      this.progressShow = false;
      this.loading = false;
    },
    loadMore: function() {
      if ("/game_fox_market" != this.$route.path) {
        // console.log('this.$route.path = '+this.$route.path)
        return;
      }
      if (this.loading) {
        return;
      }
      if (this.sell_type == "SELL_PROPERTY") {
        if (this.offset_trade >= this.total) return;
        this.loading = true;
        this.progressShow = true;
        game
          .foxMarketList(
            "SELL_PROPERTY",
            this.order,
            this.offset_trade,
            this.limit
          )
          .then(data => {
            if (data.code == 0 && data.data.total > 0) {
              this.dealDataTrade(data);
            }
          })
          .catch(e => {
            this.loading = false;
          });
      }
      if (this.sell_type == "SELL_MATE") {
        if (this.offset_mate >= this.total) return;
        this.loading = true;
        this.progressShow = true;
        game
          .foxMarketList("SELL_MATE", this.order, this.offset_mate, this.limit)
          .then(data => {
            if (data.code == 0 && data.data.total > 0) {
              this.dealDataMate(data);
            }
          })
          .catch(e => {
            this.loading = false;
          });
      }
    },
    dealData(data) {
      this.progressShow = false;
      this.isShowData = true;
      var colors = [
        "#f7dce1",
        "#f7dcf4",
        "#e7dbee",
        "#e2e6ff",
        "#dff9ff",
        "#ebfff4",
        "#edffdf",
        "#fff8dc",
        "#ffebdc"
      ];
      for (var i = 0; i < data.data.list.length; i++) {
        var item = data.data.list[i];
        item.bg = "background:" + colors[item.appearance[0] - 1];
        data.data.list[i] = item;
      }
      this.offset = this.offset + data.data.list.length;
      this.total = data.data.total;
      this.list = this.list.concat(data.data.list);
      this.progressShow = false;
      this.loading = false;
    },
    startSort: function(asc, order) {
      this.asc = asc;
      this.offset = 0;
      this.order = order;
      // this.initData()
      this.marketChange(this.activeTab, this.sell_type);
    },
    marketChange: function(tab, sell_type) {
      this.scroller = this.$el;
      this.findfoxbtn = true;
      this.activeTab = tab;
      this.sell_type = sell_type;
      this.offset = 0;
      this.total = 0;
      if (this.sell_type == "SELL_PROPERTY") {
        this.initDataTrade();
      }
      if (this.sell_type == "SELL_MATE") {
        this.initDataMate();
      }
      for (let i = 0; i < this.refresh_timer.length; i++) {
        clearTimeout(this.refresh_timer[i]);
      }
    },
    tradeTab: function(tab) {
      this.scroller = this.$el;
      this.activeTab = tab;
      for (let i = 0; i < this.refresh_timer.length; i++) {
        clearTimeout(this.refresh_timer[i]);
      }
      this.time_refresh();
      this.getBalance();
      this.total = 0;
    }
  },
  beforeDestroy: function() {
    for (let i = 0; i < this.refresh_timer.length; i++) {
      clearTimeout(this.refresh_timer[i]);
    }
  }
};
</script>

<style lang="scss" scope>
@import "../assets/css/market.scss";
</style>

