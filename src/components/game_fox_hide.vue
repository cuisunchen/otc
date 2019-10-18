<template>
  <div class="content-game-hide">
    <div style="position:relative;z-index:999;">
    <mu-appbar  :title="'第'+hide_id+'期寻狐'">
      <mu-flat-button color="white" label="规则？" slot="right" @click="tip"/>
    </mu-appbar>
    <mu-tabs style="background:#fff;" :value="activeTab" @change="handleTabChange">
    <mu-tab value="tab1" @click="hideFoxing" title="进行中"/>
    <mu-tab value="tab2" @click="hideFoxed" title="已结束"/>
    </mu-tabs>
    </div>
     <div v-if="activeTab === 'tab1'">
     <div  v-show="isRobShow" class="ongoing" style="width:100%;height:100%;max-width:640px;position:absolute;background-size:100%;background-position:0px -6em;">
      <!--抢庄-->
        <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee">
          
       <div style=" color:#333">狐丹数量：&nbsp;&nbsp;&nbsp;{{this.FFD}}</div>
        </div>
        <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div style=" color:#333">OSC余额：&nbsp;&nbsp;&nbsp;{{this.OSC}}</div>
      </div>
      <div style="padding:0.4em 1em;text-align:left">传统游戏</div>
      <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee">
          <input style="padding:0.5em 0.3em;border:0px;width:100%;outline:none" placeholder="请输入狐丹数量" type="number"   maxlength="3"  oninput="if(value.length>3)value=value.slice(0,3)"  v-model="bankerDans"  >
      </div>
      <div style="text-align:left;padding:0.6em 1em;margin-top:1.5em;">
          <button style="width:100%;background:#3d9cee;border:0px;color:#fff;padding:0.8em 0px;border-radius:0.2em;" @click="submit">抢庄</button>
      </div>
      </div>  
      <!--抢庄成功 庄-->
      <div v-show="isBankerBetShow"  style="width:100%;height:100%;background:#fff;position:absolute;padding:10px;overflow: scroll;padding-bottom:10em">
         <div style="display: flex;width:100%">
           <h4 style="background:#f5f5f5;padding: 0px;line-height:2.4;margin:0px;width:100%">
            <i style=" margin-left: 1.3em;float:left;color:#0A2463">#{{hide_fire_fox_id}}</i> 
            <i style="margin-right: 1.3em;float:right;color:#0A2463">{{time}}</i>
           </h4> 
         </div>
          <div class="list-content" style="margin-top:5px">
            <div class="list-img" id="list-img" style="position:relative;top:0.5em;" :style="bg">
                <div :class="'body'+appearance[1]"></div>
                <div :class="'hate'+appearance[2]"></div>
                <div :class="'erhuan'+appearance[3]"></div>
                <div :class="'yanjing'+appearance[4]"></div>
                <div :class="'weibo'+appearance[5]"></div>
                <div :class="'shiping'+appearance[6]"></div>
                <div :class="'mouth'+appearance[7]"></div>
                <div :class="'face'+appearance[8]"></div>
                <div :class="'level'+appearance[9]"></div>
            </div>
            <div class="list-content-right">
              <h4>藏丹数量：<i>{{hide_dan_qty}}</i>颗</h4>
              <div class="right-content-zone">
                <p>最大可寻狐丹数量：<i>{{max_bet_dan_qty}}</i>颗</p>
                <p>已寻狐丹数量：{{bet_dan_qty}}颗</p>
                <p>开始时间：{{created | formatDate}}</p>
                <p>开奖时间：{{deadline | formatDate}}</p>
              </div>
            </div>
         
          </div>
           <p style="word-break:break-all;padding-bottom:0px;margin-bottom:0px;text-align:left;font-size:0.8em;padding:0px 0.8em;color:#999;border-top:1px solid #eee;padding-top:0.6em;padding-bottom:0.2em;">随机数：{{random}}</p>
          <p style="word-break:break-all;padding-bottom:0px;margin-bottom:0px;text-align:left;font-size:0.8em;padding:0px 0.8em;margin-top:0px;color:#999;line-height:1.6">hash：{{hash}}</p>
        <div class="my-list-content-zone-game" v-show="bet_list.length>0">
          <div class="my-list-content-big-game" v-for="(bet,index) in bet_list" :key="index">
              <div class="my-list-content-game"  >
                  <p>#{{bet[0]}} 带着 {{bet[1]}} 颗狐丹去寻找 {{bet[2]}}代狐</p>
                </div>
          </div>
        </div> 
      </div>

      <!--闲家-->
     <div v-show="isBetShow"  style="width:100%;height:100%;max-width:640px;background:#fff;position:absolute;padding:10px;overflow: scroll;padding-bottom:10em">
          <div style="text-align: left;">
            <p class="bet-detail">藏丹数量：<i>{{hide_dan_qty}}颗</i></p>
            <p class="bet-detail">最大可寻狐丹数量：{{max_bet_dan_qty}}颗</p>
            <p class="bet-detail">已寻狐丹数量：{{bet_dan_qty}}颗</p>
            <p class="bet-detail">开始时间：{{created | formatDate}}</p>
            <p class="bet-detail">开奖时间：{{deadline | formatDate}}</p> 
            <p class="bet-detail">hash：{{hash}}</p>
          </div>
          <button   @click="betFox"  class="btn-bet-order" >寻狐</button>
          <div  class="bet-time" >{{time}}</div>
          <div class="my-list-content-zone-bet" v-show="bet_list.length>0">
            <div class="my-list-content-big-bet" v-for="(bet,index) in bet_list" :key="index">
                <div class="my-list-content-bet"  >
                    <p>#{{bet[0]}} 带着 {{bet[1]}} 颗狐丹去寻找 {{bet[2]}}代狐</p>
                  </div>
            </div>
        </div> 
     </div>  
    </div>
     <div v-if="activeTab === 'tab2'"  >
      <div class="my-list-content-zone">
        <div class="my-list-content-big" v-for="(item,index) in list" :key="index">
          <router-link :to="{path: '/game_fox_hide_detail',  query: {  dataObj: item} }">
            <div class="my-list-content"  >
                  <div >
                    <h4><span>#{{item.hide_fire_fox_id}}藏了{{item.hide_dan_qty}}颗狐丹。</span>
                    <span class="hint">第{{item.hide_id}}期寻狐 </span>
                    </h4>
                  </div>
                  <p><span></span>
                  <span class="time">开奖时间：{{item.updated | formatDate}}</span>
                  </p>
              </div>
        </router-link>
        </div>
      </div> 
    </div>
     <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
    <mu-dialog :open="isOpenHideFoxsDialog"   :title="'第'+hide_id+'期藏狐列表'">
        挑选一只链客狐，作为藏狐的幸运狐（<span style="color:#0A2463">选择后不能修改</span>）：<br />
    
     <div  v-for="(item) in selectHideFoxsList" :key="item.id" >
         <div style="display:flex;padding:15px;background:#fff;"  @click="robBanker(item)"  >
          <div class="select_list-img"  :style="item.bg" >
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
          <div class="list-content-right">
              <h4><i>{{item.generation}}</i>代</h4>
              <div class="right-content-zone">
               <p style="color:#808080">#ID:{{item.id}}</p>
              </div>
            </div>
   
      </div>
      <div style="width:100%;height: 0.5px;background:#ccc;"></div>
      </div>
       <mu-flat-button slot="actions" @click="nextPage" primary label="下一页"/>
       <mu-flat-button slot="actions" @click="close" primary label="关闭"/>
      
    </mu-dialog>

    <mu-dialog :open="isOpenBetFoxsDialog"   :title="'第'+hide_id+'期寻狐列表'">
        挑选一只链客狐，作为寻狐的幸运狐（<span style="color:#0A2463">选择后不能修改</span>）：<br />
    
     <div  v-for="(item) in selectHideFoxsList" :key="item.id" >
         <div style="display:flex;padding:15px;background:#fff;"  @click="betCommit(item)"  >
          <div class="select_list-img"  :style="item.bg">
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
          <div class="list-content-right">
              <h4><i>{{item.generation}}</i>代</h4>
              <div class="right-content-zone">
               <p style="color:#808080">#ID:{{item.id}}</p>
              </div>
            </div>
   
      </div>
      <div style="width:100%;height: 0.5px;background:#ccc;"></div>
      </div>
       <mu-flat-button slot="actions" @click="nextPage" primary label="下一页"/>
       <mu-flat-button slot="actions" @click="close" primary label="关闭"/>
      
    </mu-dialog>
     <!--寻狐下单-->
      <mu-dialog :open="isHideFoxTipDialog" title="寻狐规则介绍：" @close="close">
        <span class="main-min">抢庄：</span><br>准备90-900颗狐丹及0-9代当日修炼过的萌狐。寻狐页面出现庄字的时候即可抢庄。<br>
        <span class="main-min">寻狐：</span><br>准备1颗及以上狐丹、0-9代当日修炼过的萌狐。页面出现寻狐后，即可开始寻狐。<br>
        <span class="main-min">开奖：</span><br> 寻狐游戏开始后，如当期寻狐藏起了x颗狐丹，当寻找的狐狸累计消耗了x/9颗狐丹或者时间超过了10分钟，当期寻狐即开奖, 寻狐累计消耗狐丹s。<br>
        <span class="main-min">寻狐奖励：</span><br>如果萌狐寻找到了正确的代数，寻狐消耗的y颗狐丹会自动修炼，并奖励y*8颗狐丹。<br>
         寻狐奖励：如果萌狐寻找到了正确的代数，寻狐消耗的y颗狐丹会自动修炼，并奖励y*8颗狐丹。<br> 
         庄家奖励：藏狐会自动修炼 z=(1 + (s-1)/9)颗狐丹，x + s - y*9 - z 奖励给庄家。
        <mu-flat-button slot="actions" primary @click="close" label="我知道了"/>
      </mu-dialog>
      <!--order-->
      <mu-dialog :open="isBetFoxDialog"  :title="'第'+hide_id+'期寻狐'"  @close="close">
        <!-- <input class="ongoing-input" placeholder="请输入狐丹数量" v-bind="foxDanCounts[0]"  v-model="bankerDans"  @input="inputFoxDans($event)"> -->
          <!-- <input id="betFoxGenerationId" v-model="betFoxGeneration"  label="狐代数" class="input-zone"  @input="bet_Fox_Generation($event)"   p="狐代数（仅限0代到9代）"   fullWidth /> -->
          <input style="padding:0.5em 0px;border:0px;width:100%;border-bottom: 1px solid #0A2463;outline:none;" placeholder="狐代数（仅限0代到9代）"  type="number"   maxlength="3"  oninput="if(value.length>3)value=value.slice(0,3)"   v-model="betFoxGeneration"  >
          <input style="margin-top:1em;margin-bottom:0.5em;padding:0.5em 0px;border:0px;width:100%;border-bottom: 1px solid #0A2463;outline:none;"  placeholder="狐丹数量"  type="number"   maxlength="3"  oninput="if(value.length>3)value=value.slice(0,3)"   v-model="betFoxDanCount"  >       
          <div style="text-align:right">
          <mu-flat-button slot="actions" @click="close" primary label="取消"/>
          <mu-flat-button slot="actions" primary @click="openFoxList" label="寻狐"/>
          </div>
      </mu-dialog>
   <FoxBottomNav></FoxBottomNav>
  <mu-toast v-if="toast" :message="message" @close="hideToast"/>
  </div>
</template>

<script>
import nprogress from "nprogress";
import game from "../models/game";
import validate from "../utils/validate";
import moment from "../utils/moment";
import { CAPTCHA_SIGNIN } from "../models/url";
import { formatDate } from "../common/js/data";
import FoxBottomNav from "../components/FoxBottomNav";
export default {
  name: "game_fox_hide",
  components: { FoxBottomNav },
  data() {
    return {
      FFD: "",
      OSC: "",
      time: "",
      refresh_timer: [],
      bet_dan_qty: "",
      created: "1518095652",
      deadline: "1518095652",
      hide_dan_qty: "",
      hide_fire_fox_id: "",
      hide_id: "",
      max_bet_dan_qty: "",
      updated: "1518095652",
      random: "",
      hash: "",
      isRobShow: false, //抢庄UI控制器
      isBankerBetShow: false,
      isHideFoxTipDialog: false,
      isBetFoxDialog: false,
      isBetShow: false,
      // foxDanCounts:[],//抢庄狐丹数量
      activeTab: "tab1",
      sell_type: "SELL_MATE",
      order: "PRICE_DESC",
      offset: 0,
      offsetHide: 0,
      limit: 10,
      toast: false,
      list: [],
      scroller: null,
      timestamp: 0,
      isOpenHideFoxsDialog: false,
      isOpenBetFoxsDialog: false,
      loading: false,
      selectHideFoxsList: [],
      appearance: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      bg: "background:#f7dce1",
      total: 0,
      totalHide: 0,
      bankerDans: "", //抢庄狐丹数量
      bet_list: [],
      isFirst: true,
      betFoxGeneration: "",
      betFoxDanCount: ""
    };
  },
  mounted() {
    this.scroller = this.$el;
  },
  filters: {
    formatDate(time) {
      let date = new Date(time * 1000);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  created: function() {
    this.initFunction();
    this.time_refresh();
  },
  methods: {
    handleTabChange(val) {
      this.activeTab = val;
    },
    close() {
      this.isOpenHideFoxsDialog = false;
      this.isHideFoxTipDialog = false;
      this.isBetFoxDialog = false;
      this.isOpenBetFoxsDialog = false;
    },
    initFunction() {
      this.getBalance();
      this.getFoxHideInfo();
    },
    betFox() {
      this.isBetFoxDialog = true;
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
          console.log("e = " + e.code);
        });
    },
    getFoxHideInfo: function() {
      game
        .foxHideInfo()
        .then(data => {
          this.initUi(data.data);
          //  console.log(data.data);
        })
        .catch(e => {
          // console.log("e = "+e.code)
        });
    },
    initUi: function(data) {
      this.hide_id = data.hide_id;
      if (data.status === "ROBBING") {
        this.isRobShow = true;
        this.isBankerBetShow = false;
        this.isBetShow = false;
      } else {
        this.hide_dan_qty = data.hide_dan_qty;
        this.hash = data.hash;
        this.created = data.created;
        this.deadline = data.deadline;
        this.updated = data.updated;
        this.bet_dan_qty = data.bet_dan_qty;
        this.max_bet_dan_qty = data.max_bet_dan_qty;
        if (data.hasOwnProperty("bet_list")) {
          this.bet_list = data.bet_list;
        } else {
          this.bet_list = [];
        }
        if (data.is_banker) {
          this.hide_fire_fox_id = data.hide_fire_fox_id;
          this.random = data.random;
          this.isBankerBetShow = true;
          this.isRobShow = false;
          this.isBetShow = false;
          if (this.isFirst) {
            this.isFirst = false;
            this.getfox(this.hide_fire_fox_id);
          }
        } else {
          this.isBankerBetShow = false;
          this.isRobShow = false;
          this.isBetShow = true;
        }
      }
    },
    getfox: function(hide_fire_fox_id) {
      game
        .foxDetail(hide_fire_fox_id)
        .then(data => {
          this.appearance = data.data.appearance;
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
          this.bg = "background:" + colors[data.data.appearance[0] - 1];
        })
        .catch(e => {});
    },
    submit() {
      if (this.bankerDans === "undefined") {
        this.showToast("请输入狐丹数量");
        return;
      }
      if (this.bankerDans < 90 || this.bankerDans > 900) {
        this.showToast("狐丹数量为90到900");
        return;
      }

      if (parseInt(this.FFD) < parseInt("90")) {
        this.showToast("您的账户至少需要90颗狐丹，才发起寻狐。");
        return;
      }
      this.getHideFoxs();
      this.isOpenHideFoxsDialog = true;
    },
    betCommit(item) {
      //
      this.isOpenBetFoxsDialog = false;
      game
        .foxBetHide(
          this.hide_id,
          item.id,
          this.betFoxGeneration,
          this.betFoxDanCount
        )
        .then(data => {
          this.initFunction();
          this.betFoxGeneration = "";
          this.betFoxDanCount = "";
        })
        .catch(e => {
          switch (e.code) {
            case 1619:
              this.showToast("狐狸尚未修炼，请先修炼自己的狐狸。");
              break;
            case 1620:
              this.showToast("抢庄中。。。");
              break;
            case 1621:
              this.showToast("寻狐已开始");
              break;
            case 1622:
              this.showToast("本期寻狐已结束或未开始");
              break;
          }
        });
    },
    robBanker(item) {
      //抢庄提交
      this.isOpenHideFoxsDialog = false;
      game
        .foxRobHide(item.id, this.bankerDans)
        .then(data => {
          this.initFunction();
        })
        .catch(e => {
          switch (e.code) {
            case 1619:
              this.showToast("狐狸尚未修炼，请先修炼自己的狐狸。");
              break;
            case 1620:
              this.showToast("抢庄中。。。");
              break;
            case 1621:
              this.showToast("寻狐已开始");
              break;
            case 1622:
              this.showToast("本期寻狐已结束或未开始");
              break;
          }
        });
    },
    hideToast() {
      this.toast = false;
      if (this.toastTimer) clearTimeout(this.toastTimer);
    },
    showToast: function(msg) {
      this.toast = true;
      this.message = msg;
      this.toastTimer = setTimeout(() => {
        this.toast = false;
      }, 2000);
    },
    hideFoxing() {
      this.loading = false;
    },
    hideFoxed() {
      this.initData();
    },
    openFoxList() {
      let g = this.betFoxGeneration;
      let dan = this.betFoxDanCount;
      if (
        !(
          g === "0" ||
          g === "1" ||
          g === "2" ||
          g === "3" ||
          g === "4" ||
          g === "5" ||
          g === "6" ||
          g === "7" ||
          g === "8" ||
          g === "9"
        )
      ) {
        this.showToast("请输入代数（仅限0代到9代）");
        return;
      }
      if (dan.length > 3 || dan.length === 0) {
        this.showToast("请输入合适的狐丹数量");
        return;
      }
      if (parseInt(this.betFoxDanCount) <= 0) {
        this.showToast("狐丹数量必须大于0");
      }
      if (parseInt(this.FFD) < parseInt(this.betFoxDanCount)) {
        this.showToast(
          "您的账户至只有" +
            this.FFD +
            "颗狐丹，暂时不能用" +
            this.betFoxDanCount +
            "颗狐丹寻狐。"
        );
        return;
      }
      this.isBetFoxDialog = false;
      this.getHideFoxs();
      this.isOpenBetFoxsDialog = true;
    },
    getHideFoxs: function() {
      this.offsetHide = 0;
      this.selectHideFoxsList = [];
      game
        .foxMineHide(this.offsetHide, this.limit)
        .then(data => {
          if (parseInt(data.data.total) === 0) {
            this.isOpenHideFoxsDialog = false;
            this.isHideFoxTipDialog = false;
            this.showToast("狐狸尚未修炼，请先修炼自己的狐狸。");
            return;
          }
          this.selectHideFoxsList = [];
          this.dealData(data);
        })
        .catch(e => {
          this.isOpenHideFoxsDialog = false;
          this.isHideFoxTipDialog = false;
          switch (e.code) {
            case 1619:
              this.showToast("狐狸尚未修炼，请先修炼自己的狐狸。");
              break;
            case 1620:
              this.showToast("抢庄中。。。");
              break;
            case 1621:
              this.showToast("寻狐已开始");
              break;
            case 1622:
              this.showToast("本期寻狐已结束或未开始");
              break;
          }
        });
    },
    nextPage: function() {
      if (this.offsetHide >= this.totalHide) {
        //加载完成
        this.showToast("加载完成");
        return;
      }
      game
        .foxMineHide(this.offsetHide, this.limit)
        .then(data => {
          this.dealData(data);
        })
        .catch(e => {});
    },
    dealData(data) {
      //数据处理函数
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
      this.offsetHide = this.offsetHide + data.data.list.length;
      this.totalHide = data.data.total;
      this.selectHideFoxsList = this.selectHideFoxsList.concat(data.data.list);
    },
    initData: function() {
      this.offset = 0;
      if (this.loading) {
        return;
      }
      this.loading = true;
      game
        .foxHideList(this.offset, this.limit)
        .then(data => {
          this.list = [];
          this.loading = false;
          this.total = data.data.total;
          this.list = this.list.concat(data.data.list);
          this.offset = this.offset + data.data.list.length;
        })
        .catch(e => {});
    },
    loadMore: function() {
      if ("/game_fox_hide" != this.$route.path) {
        //  console.log('this.$route.path = '+this.$route.path)
        return;
      }
      if (this.loading) {
        return;
      }
      if (this.offset >= this.total) {
        //加载完成
        this.loading = false;
        return;
      }
      this.loading = true;
      game
        .foxHideList(this.offset, this.limit)
        .then(data => {
          this.loading = false;
          this.total = data.data.total;
          this.list = this.list.concat(data.data.list);
          this.offset = this.offset + data.data.list.length;
        })
        .catch(e => {});
    },
    tip() {
      this.isHideFoxTipDialog = true;
    },
    time_refresh: function() {
      let sec = 10;

      for (let i = 0; i <= 10; i++) {
        this.refresh_timer.push(
          window.setTimeout(() => {
            var time1 = Date.parse(new Date()) / 1000;
            let sec1 = this.deadline - time1;
            if (sec1 > 60) {
              let min = parseInt(sec1 / 60);
              let miao = sec1 % 60;
              if (min <= 9) {
                min = "0" + min;
              }
              if (miao <= 9) {
                miao = "0" + miao;
              }
              this.time = min + ":" + miao;
            } else {
              if (sec1 >= 0) {
                if (sec1 <= 9) {
                  this.time = "00:0" + sec1;
                } else {
                  this.time = "00:" + sec1;
                }
              }
            }
            if (sec !== 0) {
              sec--;
            } else {
              sec = 10;
              // this.deadline =0;
              // console.log("this.$route.path"+this.$route.path)
              if (
                "/game_fox_hide" == this.$route.path ||
                "/" == this.$route.path
              ) {
              } else {
                this.clear_refresh();
                return;
              }
              this.initFunction();
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
      this.time = "";
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
@import "../assets/css/hide.scss";
</style>


