<template>
  <div class="content">
    <div class="fix-progress" v-show="false">
    <mu-linear-progress color="#0A2463"/>
    </div>

    <mu-appbar  title="个人中心" style="z-index: 999; position:relative;">
      <mu-flat-button color="white" label="登出" slot="right"  @click="exit" v-show="false"/>
    </mu-appbar>
     <mu-tabs style="background:#fff" :value="activeTab" @change="handleTabChange">
       <mu-tab value="tab4" @click="foxMineAll" title="我的狐狸"/>
    <mu-tab value="tab1" @click="foxMateDig" title="造狐记录"/>
    <mu-tab value="tab2" @click="foxTradeDig" title="交易记录"/>
    <mu-tab value="tab3" @click="luckyDraw" title="抽奖记录"/>
    
    </mu-tabs>
 
 <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
     <div v-if="activeTab === 'tab1'">
      <div class="my-list-content-zone">
        <div class="my-list-content-big" v-for="(item,index) in mateList" :key="index">
         <div class="my-list-content"  @click="goPaiMate(index)">
                <div >
                <h4><span>{{item|isbuy}} #{{item!=undefined? item.sell_fire_fox_id:''}} 造狐权至 #{{item!=undefined? item.buy_mate_id:''}}</span>
                <span class="hint">{{item|status}} </span>
                </h4>
              </div>
              <p><span>价格 {{item!=undefined?item.price:''}} OSC</span>
              <span class="time">{{item | formatDate}}</span>
              </p>
          </div>
        </div>
       
      </div> 
    </div>
     <div v-if="activeTab === 'tab2'">
      <div class="my-list-content-zone">
         <div class="my-list-content-big" v-for="(item,index) in tradeList" :key="index">
         <div class="my-list-content"  @click="goPaiTrade(index)">
                <div >
                <h4><span>{{item|isbuy}} #{{item!=undefined? item.sell_fire_fox_id:''}}</span>
                <span class="hint">{{item|status}} </span>
                </h4>
              </div>
              <p><span>价格 {{item!=undefined?item.price:''}} OSC</span>
              <span class="time">{{item | formatDate}}</span>
              </p>
          </div>
        </div>
      </div> 
    </div>

    <div v-if="activeTab === 'tab3'">
      <div   class="draws-list-content-zone" style="padding-bottom:8em;">
        <div class="draws-list-content-big" v-for="(item) in drawList" :key="item.id">
          <router-link :to="'/game_fox/' + item.id">
            <div class="foxid-zone">#{{item.id}} </div>
          <div class="draws-list-content">
            <div class="draws-list-img" id="list-img" :style="item.bg">
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
            <div class="draws-list-content-right">
              <h4><i>{{item.generation}}</i>代</h4>
              <div class="draws-right-content-zone">
               <p style="color:#808080">修炼：{{item.birth_grow}}</p>
                <p style="color:#808080">造狐：{{item.birth_mate}}</p>
               <p style="color:#808080">寻宝：{{item.birth_dig}}</p>
                <p  style="color:#808080">抽奖时间：{{item | formatDate1}}</p>
              </div>
            </div>
          </div>
          </router-link>
        </div>
      </div>  
    </div>
    <div v-if="activeTab === 'tab4'">
      <div class="my-list-content-zone">
       <div  v-for="(item,g,index1) in myFoxAllList" :key="index1">
         <div @click="openList('a'+g)" style="width:100%;height:3.5em;background: #ede7f6;text-align: left;color: #404040;padding-left:1em;padding-top:0.77em; line-height: 2;font-size:1em;">{{g}}代 &nbsp;&nbsp;{{item.length}}只 <span style="float:right;margin-right:1em;">></span></div>  
        <table  style="width:100%" v-show="jsonVisiable['a'+g] " >  
          <tbody>
              <tr  v-for="(firefoxId ,value ) in item" :key="value" v-show="item.length>value*3"  style="height:3em;">
          <!--border-bottom:1px solid #ccc;-->
                    <td style="width:33.33%;text-decoration:underline;color:#3d9cee" v-show="item.length>value*3" @click="goFoxDetail(item[value*3])">#{{item[value*3]}}</td> 
          
                   <td style="width:33.33%;text-decoration:underline;color:#3d9cee"   @click="goFoxDetail(item[value*3+1])">{{item.length>value*3+1? '#' +item[value*3+1]:''}}</td>
               
                   <td style="width:33.33%;text-decoration:underline;color:#3d9cee"  @click="goFoxDetail(item[value*3+2])">{{item.length>value*3+2?'#' +item[value*3+2]:''}}</td>
             
              </tr>
          </tbody>
        </table> 
        <div style="width:100%;height:1px;background: #f5f5f5;"></div>
      </div> 
      </div>
    </div>
     <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
   <FoxBottomNav></FoxBottomNav>
    <mu-dialog :open="dialog" title="转账说明" @close="close">
    请用您的绑定钱包地址<br />
    {{this.fromadd}}<br /><br/>
    一次性向卖方转账<br />
    {{this.toadd}}<br />
     请在<i class="hint">{{refresh_txt}}</i>内完成,超时订单将被自动取消<br />
   <br />
    
    转账<i class="hint">{{this.price}} OSC</i><br /><br />

    <br />
   <p class="min-hint"> *务必使用账号绑定钱包，进行交易，否则会钱狐双无哦！</p>
   <p class="min-hint"> *转账时请仔细核对金额，无比与上方金额完全一致</p>
   <p class="min-hint"> *请在倒计时结束前完成转账，否则将无法获取小狐</p>
    <mu-flat-button slot="actions" @click="close" primary label="取消"/>
    <mu-flat-button slot="actions" primary @click="paid" label="我已付款"/>
  </mu-dialog>
  <mu-toast v-if="toast" :message="message" @close="hideToast"/>
    <mu-dialog :open="isSignOutDialog" title="登出提示" >
        请确认是否退出登录!
        <mu-flat-button slot="actions" @click="closeDialog" primary label="关闭"/>
        <mu-flat-button slot="actions" primary @click="signOUt" label="登出"/>
  </mu-dialog>
  </div>
</template>

<script>
import nprogress from "nprogress";
import game from "../models/game";
import validate from "../utils/validate";
import user from "../models/user";
import moment from "../utils/moment";
import HttpResultCode from "../utils/HttpResultCode";
import { CAPTCHA_SIGNIN } from "../models/url";
import { formatDate } from "../common/js/data";
import FoxBottomNav from "../components/FoxBottomNav";
export default {
  name: "game_fox_my",
  components: { FoxBottomNav },
  data() {
    return {
      activeTab: "tab4",
      sell_type: "SELL_MATE",
      offset: 0,
      offset_trade: 0,
      offset_mate: 0,
      limit: 10,
      isShowData: true,
      loading: false,
      selected: "",
      selectedlist: "",
      loadable: "",
      dialog: false,
      fromadd: "",
      toadd: "",
      toast: false,
      message: "",
      price: "",
      progressShow: false,
      id: "",
      mateList: [],
      tradeList: [],
      myFoxAllList: [],
      refresh_txt: "",
      refresh_timer: [],
      scroller: null,
      timestamp: 0,
      total: 0,
      isLuckyDraw: false,
      drawList: [],
      isSignOutDialog: false,
      refreshing: false,
      trigger: null,
      jsonVisiable: {}
    };
  },
  mounted() {
    this.scroller = this.$el;
    this.trigger = this.$el;
  },
  filters: {
    formatDate1(item) {
      if (item == undefined) return "";
      let date = new Date(item.created * 1000);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    formatDate(item) {
      if (item == undefined) return "";
      let date = new Date(item.updated * 1000);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    formatDate2(time) {
      let date = Date.parse(new Date(parseInt(time) * 1000));
      if (Date.parse(new Date()) < date) {
        return formatDate(date, "yyyy-MM-dd hh:mm:ss");
      }
      return "准备就绪";
    },
    isbuy(item) {
      if (item == undefined) return "";
      if (item.is_buy == false) {
        return "出售";
      }
      if (item.is_buy == true) {
        return "购买";
      }
    },
    status(item) {
      if (item == undefined) return "";
      if (item.status == "TAKEN") {
        if (item.is_buy) {
          return "去转账";
        } else {
          return "已拍下，等待收款";
        }
      } else if (item.status == "PAID") {
        return "已完成";
      } else {
        return "已取消";
      }
    }
  },
  created: function() {
    // this.foxMateDig();
    this.foxMineAll();
  },
  methods: {
    openList(status) {
      // alert(status + this.jsonVisiable[status]);
      this.jsonVisiable[status] = !this.jsonVisiable[status];
      var datas = this.myFoxAllList;
      this.myFoxAllList = null;
      this.myFoxAllList = datas;
      // alert(status + this.jsonVisiable[status]);
    },
    goFoxDetail(id) {
      if (id != null) {
        this.$router.push("/game_fox/" + id);
      }
    },
    refresh() {
      this.refreshing = true;
      if (this.activeTab == "tab1") {
        this.foxMateDig();
      } else if (this.activeTab == "tab2") {
        this.foxTradeDig();
      } else if (this.activeTab == "tab3") {
        this.luckyDraw();
      } else if (this.activeTab == "tab4") {
        this.foxMineAll();
      }
    },
    handleTabChange(val) {
      this.activeTab = val;
    },
    handleActive() {},
    goPaiMate(index) {
      this.selected = index;
      this.selectedlist = this.mateList[index];
      if (
        this.selectedlist.status == "TAKEN" &&
        this.selectedlist.is_buy == true
      ) {
        this.fromadd = this.selectedlist.from;
        this.toadd = this.selectedlist.to;
        this.price = this.selectedlist.price;
        this.id = this.selectedlist.id;
        this.initTime(this.selectedlist);
        this.time_refresh();
        this.dialog = true;
      }
    },
    goPaiTrade(index) {
      this.selected = index;
      this.selectedlist = this.tradeList[index];
      if (
        this.selectedlist.status == "TAKEN" &&
        this.selectedlist.is_buy == true
      ) {
        this.fromadd = this.selectedlist.from;
        this.toadd = this.selectedlist.to;
        this.price = this.selectedlist.price;
        this.id = this.selectedlist.id;
        this.initTime(this.selectedlist);
        this.time_refresh();
        this.dialog = true;
      }
    },
    close() {
      this.dialog = false;
    },
    paid: function() {
      this.progressShow = true;
      game
        .foxMarkPaid(this.id)
        .then(data => {
          this.value = 100;
          clearInterval(this.timer);
          this.progressShow = false;
          this.value = 0;
          this.dialog = false;
        })
        .catch(e => {
          switch (e.code) {
            case 1615:
              this.value = 100;
              clearInterval(this.timer);
              this.progressShow = false;
              this.value = 0;
              this.dialog = false;
              this.toast = true;
              this.message = "稍后重试";
              this.toastTimer = setTimeout(() => {
                this.toast = false;
              }, 2000);
              break;
          }
        });
    },
    hideToast() {
      this.toast = false;
      if (this.toastTimer) clearTimeout(this.toastTimer);
    },
    getFirseDate: function(deadline) {
      return new Date(parseInt(deadline) * 1000)
        .toLocaleString()
        .replace(/年|月/g, "-")
        .replace(/日/g, " ");
    },
    foxMineAll: function() {
      game
        .foxMineAll()
        .then(data => {
          this.refreshing = false;
          this.loading = false;
          var isFirst = true;
          for (var a in data.data.generation_ids) {
            var name = "a" + a;
            if (isFirst) {
              this.jsonVisiable[name] = true;
            } else {
              this.jsonVisiable[name] = false;
            }
            isFirst = false;
          }
          this.myFoxAllList = data.data.generation_ids;
        })
        .catch(e => {
          this.refreshing = false;
          this.loading = false;
        });
    },
    foxTradeDig: function() {
      this.isLuckyDraw = false;
      this.sell_type = "SELL_PROPERTY";
      this.tradeList = [];
      this.offset_trade = 0;
      this.loading = true;
      game
        .foxTradeList("SELL_PROPERTY", this.offset_trade, this.limit)
        .then(data => {
          this.refreshing = false;
          this.loading = false;
          this.tradeList = [];
          this.total = data.data.total;
          if (this.total > 0) {
            this.tradeList = this.tradeList.concat(data.data.list);
            this.offset_trade = this.offset_trade + data.data.list.length;
          }
        })
        .catch(e => {
          this.refreshing = false;
          this.loading = false;
        });
    },
    foxMateDig: function() {
      this.isLuckyDraw = false;
      this.sell_type = "SELL_MATE";
      this.mateList = [];
      this.offset_mate = 0;
      this.loading = true;
      game
        .foxTradeList("SELL_MATE", this.offset_mate, this.limit)
        .then(data => {
          this.refreshing = false;
          this.loading = false;
          this.mateList = [];
          this.total = data.data.total;
          if (this.total > 0) {
            this.mateList = this.mateList.concat(data.data.list);
            this.offset_mate = this.offset_mate + data.data.list.length;
          }
        })
        .catch(e => {
          this.refreshing = false;
          this.loading = false;
        });
    },
    luckyDraw() {
      this.isLuckyDraw = true;
      this.drawList = [];
      this.initData();
    },
    showToast: function(msg) {
      this.toast = true;
      this.message = msg;
      this.toastTimer = setTimeout(() => {
        this.toast = false;
      }, 2000);
    },
    initData: function() {
      this.offset = 0;
      if (this.loading) {
        this.showToast("正在加载");
        return;
      }
      this.loading = true;
      if (!this.isLuckyDraw)
        game
          .foxTradeList(this.sell_type, this.offset, this.limit)
          .then(data => {
            this.refreshing = false;
            this.loading = false;
            this.list = [];
            this.total = data.data.total;
            if (this.total > 0) {
              this.list = this.list.concat(data.data.list);
              this.offset = this.offset + data.data.list.length;
            }
          })
          .catch(e => {
            this.refreshing = false;
            this.loading = false;
          });
      if (this.isLuckyDraw)
        game
          .foxMineDraw(this.offset, this.limit)
          .then(data => {
            this.refreshing = false;
            this.loading = false;
            this.total = data.data.total;
            if (this.total > 0) {
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
              this.drawList = this.drawList.concat(data.data.list);
              this.offset = this.offset + data.data.list.length;
            }
          })
          .catch(e => {
            this.refreshing = false;
            this.loading = false;
          });
    },
    loadMore: function() {
      if ("/game_fox_my" != this.$route.path) {
        // console.log('this.$route.path = '+this.$route.path)
        return;
      }
      if (this.loading) {
        return;
      }
      if (this.activeTab == "tab4") {
        return;
      }
      if (!this.isLuckyDraw) {
        if (this.sell_type == "SELL_PROPERTY") {
          this.loadMoreTrade();
        } else {
          this.loadMoreMate();
        }
      }
      if (this.offset >= this.total) {
        //加载完成
        return;
      }
      if (this.isLuckyDraw) {
        this.loading = true;
        game
          .foxMineDraw(this.offset, this.limit)
          .then(data => {
            this.refreshing = false;
            this.loading = false;
            this.total = data.data.total;
            if (this.total > 0) {
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
              this.drawList = this.drawList.concat(data.data.list);
              this.offset = this.offset + data.data.list.length;
            }
          })
          .catch(e => {
            this.refreshing = false;
            this.loading = false;
          });
      }
    },
    loadMoreTrade: function() {
      if (this.loading) {
        return;
      }
      if (this.offset_trade >= this.total) {
        //加载完成
        return;
      }
      this.loading = true;
      game
        .foxTradeList("SELL_PROPERTY", this.offset_trade, this.limit)
        .then(data => {
          this.loading = false;
          this.total = data.data.total;
          if (this.total > 0) {
            this.tradeList = this.tradeList.concat(data.data.list);
            this.offset_trade = this.offset_trade + data.data.list.length;
          }
        })
        .catch(e => {
          this.loading = false;
        });
    },
    loadMoreMate: function() {
      if (this.loading) {
        return;
      }
      if (this.offset_mate >= this.total) {
        //加载完成
        return;
      }
      this.loading = true;
      game
        .foxTradeList("SELL_MATE", this.offset_mate, this.limit)
        .then(data => {
          this.loading = false;
          this.total = data.data.total;
          if (this.total > 0) {
            this.mateList = this.mateList.concat(data.data.list);
            this.offset_mate = this.offset_mate + data.data.list.length;
          }
        })
        .catch(e => {
          this.loading = false;
        });
    },
    initTime: function(item) {
      this.deadline = item.deadline;
    },
    time_refresh: function() {
      var time = Date.parse(new Date()) / 1000;
      let sec = this.deadline - time;
      for (let i = 0; i <= sec; i++) {
        this.refresh_timer.push(
          window.setTimeout(() => {
            if (sec !== 0) {
              if (sec > 60) {
                this.refresh_txt = parseInt(sec / 60) + "分" + sec % 60 + "秒";
              } else {
                this.refresh_txt = sec + "";
              }

              sec--;
            } else {
              sec = 0;
              this.refresh_txt = "";
              clear_refresh();
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
      this.refresh_txt = "";
    },
    closeDialog() {
      this.isSignOutDialog = false;
    },
    exit() {
      this.isSignOutDialog = true;
    },
    signOUt() {
      this.isSignOutDialog = false;
      user
        .signOut()
        .then(result => {
          this.$router.push("/sign_in");
        })
        .catch(e => {});
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
@import "../assets/css/my.scss";
</style>


