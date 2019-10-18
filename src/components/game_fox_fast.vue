<template>
  <div class="content-game-fast">
    <div style="position:relative;z-index:999;">
    <mu-appbar  :title="'第'+hide_id+'期寻狐'">
      <mu-flat-button color="white" label="规则？" slot="right" @click="tip"/>
    </mu-appbar>
     <div class="top-roll-fast" ><marquee>{{ marquee_tip}}</marquee></div>  
    <mu-tabs style="background:#fff;" :value="activeTab" @change="handleTabChange">
    <mu-tab value="tab1" @click="hideFoxing" title="进行中"/>
    <mu-tab value="tab2" @click="hideFoxed" title="已结束"/>
    </mu-tabs>
    </div>
     <div v-if="activeTab === 'tab1'">
     <div   class="ongoing" style="width:100%;height:100%;max-width:640px;background-size:100%;background-position:0px -6em;">
        <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee">
          <div style=" color:#333">奖池数量：<span class="text_color_p" v-show="isChange"> {{bet_osc_qty}}</span><span class="text_color_n"  v-show="!isChange"> {{bet_osc_qty}}</span> OSC</div>
        </div>
        
        <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div v-show="false" style=" color:#333;word-break: break-all;font-size:0.8em;line-height:2.4">随机数：&nbsp;{{random}}</div>
       <div style=" color:#333;word-break: break-all;font-size:0.8em">Hash：&nbsp;{{hash}}</div>
      </div>
      <div @click="hide_fox_show" style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div style=" color:#333;width:100%">寻狐详情：&nbsp;&nbsp;&nbsp;<span class="text_color_p" v-show="isChange"> {{generation_bet_list_hide_count}}</span><span class="text_color_n"  v-show="!isChange"> {{generation_bet_list_hide_count}}</span>&nbsp;&nbsp;OSC<img src="../assets/image/more.png" style="float:right; width: 2em; height:1.5em;" ></div>
     
      </div>

 <div style="padding-left:1em;" v-show="isDetailHideShow">
        <table>
          <tbody>
            	<!--  v-for="(bet,index) in item.bet_list" :key="index" "generation_bet_list": [0, 12, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] -->
              <tr v-for="(item,index) in this.generation_bet_list_hiding" :key="index"  >
                <td style="width:1.5em;text-align: right; color:#0A2463" >{{item[0]}}</td>
                <td > 代：</td>
                <td style="width:1.5em;text-align: right; color:#0A2463">{{item[1]}}</td>
                <td > OSC   </td>
              </tr>
          </tbody>
        </table>
      </div>
      <!-- <div style="padding:0.4em 1em;text-align:left">快速游戏</div> -->
      <div v-show="false" style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee">
       <div style=" color:#333">OSC余额： {{OSC}} OSC</div>
        </div>
        <div >
        <div class="fast_choise_btn_zone" style="padding-top:2em;">
          <div class="fast_choise_btn_zone_one">
            <span class="num" @click="openXiaZhu(0)">0</span>
          </div>
          <div class="fast_choise_btn_zone_one">
            <span class="num" @click="openXiaZhu(1)">1</span> 
          </div>
          <div class="fast_choise_btn_zone_one">
            <span class="num" @click="openXiaZhu(2)">2</span>
          </div>
          <div class="fast_choise_btn_zone_one">
            <span class="num" @click="openXiaZhu(3)">3</span>
          </div>
          <div class="fast_choise_btn_zone_one">
            <span class="num" @click="openXiaZhu(4)">4</span>
          </div>
        </div>
        <div class="fast_choise_btn_zone" style="padding-bottom:2em">
          <div class="fast_choise_btn_zone_one">
            <span class="num" @click="openXiaZhu(5)">5</span>
          </div>
          <div class="fast_choise_btn_zone_one">
            <span class="num" @click="openXiaZhu(6)">6</span>
          </div>
          <div class="fast_choise_btn_zone_one">
            <span class="num" @click="openXiaZhu(7)">7</span>
          </div>
          <div class="fast_choise_btn_zone_one">
            <span class="num" @click="openXiaZhu(8)">8</span>
          </div>
          <div class="fast_choise_btn_zone_one">
            <span class="num" @click="openXiaZhu(9)">9</span>
          </div>
        </div>
        </div>
        <div style="padding:0.4em 1em;text-align:left">本期记录</div>
      <div class="fast-this-detail" style="text-align:left;padding: 1em 1em 4em 1em;background:#fff;">
        <table  style="padding-bottom: 3em;">
          <tbody>
              <tr v-for="(item) in this.bet_list" :key="item.id"  >
                <td >#{{item[0]}}</td>
                <td > 带着 </td>  
                <td style="width:1.5em;text-align: right; color:#0A2463">{{item[1]}}</td>
                <td > OSC  去寻找 </td>
                <td style="width:1.5em;text-align: right; color:#0A2463" >{{item[2]}}</td>
                <td > 代</td>
              </tr>
          </tbody>
        </table>
        </div> 
      </div>
    </div>
       <div v-if="activeTab === 'tab2'"  >
      <div class="last_time-zone">
        <div class="time_serch_zone">
          <mu-icon value="search" :size="1.5" />
          <input class="search-input" type="number" placeholder="输入您想查询的期数" v-model="searchId" />
          <button class="search-btn"  @click="search('id')">搜索</button>
        </div>
      </div>
      <div class="last_time-zone-content-zone">
      <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div style=" color:#0A2463;">第{{FINISHED_hide_id}}期</div>
      </div>
      <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div style=" color:#333">开奖代数：&nbsp;&nbsp;&nbsp;<i class="mark-ft">{{FINISHED_hide_generation}}</i>&nbsp;&nbsp;代</div>
      </div>
       <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div style=" color:#333">奖池总额：&nbsp;&nbsp;&nbsp;<i  style="color:#0A2463">{{FINISHED_bet_osc_qty}}</i>&nbsp;&nbsp;OSC</div>
      </div>
       <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div style=" color:#333">开始时间：&nbsp;&nbsp;&nbsp;<span class="mark-time-ft">{{FINISHED_created|formatDate}}</span></div>
      </div>
      <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div style=" color:#333;width:100%" @click="finsh_fox_detail">寻狐详情：&nbsp;&nbsp;&nbsp;<span  style="color:#0A2463">{{generation_bet_list_finsh_count}}</span>&nbsp;&nbsp;OSC
       <img src="../assets/image/more.png" style="float:right; width: 2em; height:1.5em;" >
       
       <!-- <i style="float:right;
         width: 2em;
        height:1.5em;
        background: url('../../assets/image/more.png') no-repeat center;
        background-size: 100%;"></i> -->
        </div>
      </div>
      <div style="padding-left:1em;" v-show="isDetailFinshShow">
        <table  >
          <tbody>
            	<!--  v-for="(bet,index) in item.bet_list" :key="index" "generation_bet_list": [0, 12, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] -->
              <tr v-for="(item,index) in this.generation_bet_list_finsh" :key="index"  >
                <td style="width:1.5em;text-align: right; color:#0A2463" >{{item[0]}}</td>
                <td > 代：</td>
                <td style="width:1.5em;text-align: right; color:#0A2463">{{item[1]}}</td>
                <td > OSC   </td>
              </tr>
          </tbody>
        </table>
      </div>
      <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div style=" color:#333;word-break: break-all;font-size:0.8em;line-height:2.4">随机数：&nbsp;&nbsp;&nbsp;{{FINISHED_random}}</div>
       <div style=" color:#333;word-break: break-all;font-size:0.8em">Hash：&nbsp;&nbsp;&nbsp;{{FINISHED_hash}}</div>
      </div>
      <div style="text-align:right;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div style="display: flex">
       <button class="time-serch-choise-btn" @click="search('new')">最新期</button>
       <button class="time-serch-choise-btn" @click="search('last')">上一期</button>
       <button class="time-serch-choise-btn"  @click="search('pre')">下一期</button>
       </div>
      </div>
      </div>
      <!-- <p style="text-align: left;
        font-size: 1em;
        padding:0px 1em;
        margin:0 0;
        line-height: 2.5;
        border-bottom: 1px solid #eee;">我的获奖记录</p> -->
      <div class="my-record-content" style="padding-top:0px;">
        <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div style=" color:#333">我的投入：&nbsp;&nbsp;&nbsp;<i class="mark-ft-green">{{FINISHED_my_bet_qty}}</i>&nbsp;&nbsp;OSC</div>
      </div>
      <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div style=" color:#333">我的收益：&nbsp;&nbsp;&nbsp;<i class="mark-ft">{{FINISHED_my_award_qty}}</i>&nbsp;&nbsp;OSC</div>
      </div>
      <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee" v-show="settle_list != null"> 
       <div style=" color:#333">狐丹奖励：&nbsp;&nbsp;&nbsp;<i class="mark-ft">{{settle_list!=null?'  #'+settle_list[0][0] +'   +'+settle_list[0][1]+'+'+settle_list[0][2]+'+'+settle_list[0][3]+' ' :''}}</i></div>
      </div>
          <div class="fast-this-detail" style="text-align:left;padding: 1em 1em 4em 1em;background:#fff;">
         <table  style="padding-bottom: 3em;">
          <tbody>
              <tr v-for="(item) in this.recordedList" :key="item.id" >
                <td >#{{item[0]}}</td>
                <td > 带着 </td>  
                <td style="width:1.5em;text-align: right; color:#0A2463">{{item[1]}}</td>
                <td > OSC  去寻找 </td>
                <td style="width:1.5em;text-align: right; color:#0A2463" v-show="FINISHED_hide_generation==item[2]">{{item[2]}}</td>
                <td style="width:1.5em;text-align: right; color:#ccc" v-show="FINISHED_hide_generation!=item[2]">{{item[2]}}</td>
                <td > 代</td>
              </tr>
          </tbody>
        </table>
          </div>
      </div>
    </div>
 


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
      <div style="width:100%;height: 1px;background:#ccc;"></div>
      </div>
       <mu-flat-button slot="actions" @click="nextPage" primary label="下一页"/>
       <mu-flat-button slot="actions" @click="close" primary label="关闭"/> 
    </mu-dialog>
     <!--寻狐下单-->
      <mu-dialog :open="isHideFoxTipDialog" title="寻狐规则介绍：" @close="close">
        1.系统随机藏起0-9代，将代数与随机数进行hash，公开hash值（由于hash值的不可逆特性，可以有效防止系统作弊）。<br>
        2.用户可以选择0-9代进行寻狐，寻满300链克即开奖，寻到正确代数将按比例分配150链克，寻狐消耗链克最多的狐狸奖励一狐丹修炼。<br>
        3.每期游戏结束后，如有寻到正确代数，系统回收6链克用于回购狐丹，无寻到正确代数系统回收126链克用于回购狐丹。<br>
        4.平台不抽水，寻狐每次仅收取0.01链克。
        <mu-flat-button slot="actions" primary @click="close" label="我知道了"/>
      </mu-dialog>
      <mu-dialog :open="GoXiaZhu"  @close="close"> <!--:title="OSC_BANANCE"-->
        <p style="margin-top:0px">{{OSC_BANANCE}}</p>
        <div class="xiazhu-zone">
            <button class="jian-btn" @click="reduction">-</button>
            <input class="xiazhu-input" type="number"     maxlength="3"  oninput="if(value.length>3)value=value.slice(0,3)"  v-model="betOSCCount">
             <button class="jian-btn" @click="add">+</button>
        </div>
        <!-- <div >已有 {{generation_bet_list[parseInt(bet_generation)]}} OSC 开始寻狐。</div> -->
        <div style="text-align:right;padding-top:2em;">
          <mu-flat-button slot="actions" @click="closeGoXiaZhu" primary label="取消"/>
          <mu-flat-button slot="actions" primary  @click="openFoxList" :label="'寻狐 '+bet_generation+' 代'"/>
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
  name: "game_fox_fast",
  components: { FoxBottomNav },
  data() {
    return {
      OSC: "",
      time: "",
      toast: false,
      message: "",
      toastTimer: "",
      created: "1518095652",
      hide_id: "",
      hide_generation: "",
      random: "",
      hash: "",
      bet_osc_qty: "",
      generation_bet_list: [0],
      bet_list: [],
      my_bet_qty: "",
      status: "",
      my_award_qty: "",
      bet_generation: "0",
      betOSCCount: "5",

      isBankerBetShow: false,
      isHideFoxTipDialog: false,
      isBetFoxDialog: false,
      isBetShow: false,

      refresh_timer: [],
      searchId: "",
      // limit:10,
      totalHide: 0,
      selectHideFoxsList: [],
      isOpenBetFoxsDialog: false,

      generation_bet_list_finsh: [],
      recordId: 0,
      FINISHED_hide_id: "",
      FINISHED_hide_generation: "",
      FINISHED_random: "",
      FINISHED_hash: "",
      FINISHED_created: "1518095652",
      FINISHED_bet_osc_qty: "",
      FINISHED_my_bet_qty: "",
      FINISHED_my_award_qty: "",
      recordedList: [],
      settle_list: null,

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
      marquee_tip: "快速寻狐，马上开始！",
      isHttp: false,
      isFirst: true,
      betFoxGeneration: "",
      betFoxDanCount: "",
      GoXiaZhu: false,
      isInit: true,
      generation_bet_list_finsh_count: "0",
      generation_bet_list_hide_count: "0",
      isDetailFinshShow: false,
      isDetailHideShow: false,
      generation_bet_list_hiding: [],
      OSC_BANANCE: "",
      isChange: true,
      time_count: 4
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
    showToast: function(msg) {
      this.toast = true;
      this.message = msg;
      this.toastTimer = setTimeout(() => {
        this.toast = false;
      }, 2000);
    },
    hideToast() {
      this.toast = false;
      if (this.toastTimer) clearTimeout(this.toastTimer);
    },
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
    hide_fox_show() {
      this.isDetailHideShow = !this.isDetailHideShow;
    },
    finsh_fox_detail() {
      this.isDetailFinshShow = !this.isDetailFinshShow;
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
              this.OSC_BANANCE = "可用余额：" + this.OSC + " OSC";
            }
          }
        })
        .catch(e => {
          console.log("e = " + e.code);
        });
    },
    getFoxHideInfo: function() {
      game
        .osc_auto_hide_info()
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
        this.isBankerBetShow = false;
        this.isBetShow = false;
      } else {
        this.hide_generation = data.hide_generation;
        this.random = data.random;
        this.hash = data.hash;
        this.created = data.created;
        this.status = data.status;
        if (
          this.bet_osc_qty.length != 0 &&
          this.bet_osc_qty != data.bet_osc_qty
        ) {
          this.time_count = 4;
          this.text_refresh();
        }

        this.bet_osc_qty = data.bet_osc_qty;
        this.my_bet_qty = data.my_bet_qty;
        this.my_award_qty = data.my_award_qty;
        if (data.hasOwnProperty("bet_list")) {
          this.bet_list = data.bet_list.reverse();
          let last_bet = this.bet_list[0];
          let m =
            "#" +
            last_bet[0] +
            " 带着 " +
            last_bet[1] +
            " OSC 去寻找 " +
            last_bet[2] +
            " 代";
          this.marquee_tip = m;
        } else {
          this.bet_list = [];
        }

        if (data.hasOwnProperty("generation_bet_list")) {
          let strs = data.generation_bet_list;
          this.generation_bet_list = data.generation_bet_list;
          this.generation_bet_list_hiding = [];
          let count = 0;
          for (let i = 0; i < strs.length; i++) {
            if (parseInt(strs[i]) > 0) {
              var strs_value = new Array(2);
              strs_value[0] = i;
              strs_value[1] = strs[i];
              this.generation_bet_list_hiding.push(strs_value);
              count = count + parseInt(strs_value[1]);
              // generation_bet_list_finsh_count
            }
            this.generation_bet_list_hide_count = count;
          }
        } else {
          this.generation_bet_list_hiding = [];
        }
      }
    },
    search(type) {
      if (type == "id") {
        if (this.searchId == "") {
          this.showToast("查询期数值需要大于0的整数");
        } else if (/^[1-9]\d*|0$/.test(this.searchId)) {
          this.recordId = parseInt(this.searchId);
          this.osc_hide_record();
        } else {
          this.showToast("查询期数值需要大于0的整数");
        }
      } else if (type == "last") {
        if (this.recordId > 0) {
          this.recordId = this.recordId - 1;
          this.osc_hide_record();
        } else {
          this.recordId = 0;
          this.osc_hide_record();
        }
      } else if (type == "pre") {
        this.recordId = this.recordId + 1;
        this.osc_hide_record();
      } else if (type == "new") {
        this.recordId = 0;
        this.osc_hide_record();
      }
    },
    reduction: function() {
      if (parseInt(this.betOSCCount) > 200) {
        this.betOSCCount = 200;
      }
      if (parseInt(this.betOSCCount) > 1) {
        this.betOSCCount = parseInt(this.betOSCCount) - 1;
      }
    },
    add: function() {
      if (parseInt(this.betOSCCount) > 200) {
        this.betOSCCount = 200;
      }
      if (parseInt(this.betOSCCount) < 200) {
        this.betOSCCount = parseInt(this.betOSCCount) + 1;
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
    betCommit(item) {
      this.closeGoXiaZhu();
      if (this.isHttp) {
        return;
      }

      this.isHttp = true;
      this.isOpenBetFoxsDialog = false;
      game
        .bet_osc_auto_hide(
          this.hide_id,
          item.id,
          this.bet_generation,
          this.betOSCCount
        )
        .then(data => {
          this.isHttp = false;
          if (data.code == 0)
            setTimeout(() => {
              this.init_data();
            }, 1000);
        })
        .catch(e => {
          this.isHttp = false;
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    init_data() {
      this.getFoxHideInfo();
    },
    hideFoxing() {
      this.loading = false;
    },
    hideFoxed() {
      this.recordId = 0;
      this.osc_hide_record();
    },
    openFoxList() {
      if (parseInt(this.betOSCCount) < 1 || parseInt(this.betOSCCount) > 200) {
        this.showToast("OSC投入范围1-200 OSC");
        return;
      }
      this.isBetFoxDialog = false;
      this.getHideFoxs();
      this.isOpenBetFoxsDialog = true;
    },
    openXiaZhu(val) {
      this.getBalance();
      this.OSC_BANANCE = "可用余额：" + this.OSC + " OSC";
      this.betOSCCount = 5;
      this.bet_generation = val;
      this.GoXiaZhu = true;
    },
    closeGoXiaZhu() {
      this.GoXiaZhu = false;
    },
    getHideFoxs: function() {
      this.offsetHide = 0;
      this.selectHideFoxsList = [];
      game
        .foxMine("", "GENERATION_ASC", this.offsetHide, this.limit)
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
        .foxMine("", "GENERATION_ASC", this.offsetHide, this.limit)
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
    osc_hide_record() {
      game
        .osc_auto_hide_record(this.recordId)
        .then(data => {
          if (data.code == 0) {
            let finsh_hide_info = data.data;
            if (finsh_hide_info.status == "ROBBING") {
              if (this.isInit) {
                this.isInit = false;
              } else {
                this.showToast("暂未开始！");
              }
              return;
            }

            this.generation_bet_list_finsh = [];
            this.recordId = finsh_hide_info.hide_id;
            this.FINISHED_hide_id = finsh_hide_info.hide_id;
            this.FINISHED_hide_generation = finsh_hide_info.hide_generation;
            this.FINISHED_random = finsh_hide_info.random;
            this.FINISHED_hash = finsh_hide_info.hash;
            this.FINISHED_created = finsh_hide_info.created;
            this.FINISHED_bet_osc_qty = finsh_hide_info.bet_osc_qty;
            this.FINISHED_my_bet_qty = finsh_hide_info.my_bet_qty;
            this.FINISHED_my_award_qty = finsh_hide_info.my_award_qty;

            this.recordedList = [];
            this.settle_list = null;
            if (finsh_hide_info.hasOwnProperty("settle_list"))
              this.settle_list = finsh_hide_info.settle_list;
            if (finsh_hide_info.hasOwnProperty("bet_list"))
              this.recordedList = finsh_hide_info.bet_list;
            if (finsh_hide_info.hasOwnProperty("generation_bet_list")) {
              let strs = finsh_hide_info.generation_bet_list;
              let count = 0;
              this.generation_bet_list_finsh = [];
              for (let i = 0; i < strs.length; i++) {
                if (parseInt(strs[i]) > 0) {
                  var strs_value = new Array(2);
                  strs_value[0] = i;
                  strs_value[1] = strs[i];
                  this.generation_bet_list_finsh.push(strs_value);
                  count = count + parseInt(strs_value[1]);
                  // generation_bet_list_finsh_count
                }
                this.generation_bet_list_finsh_count = count;
              }
            }
          }
        })
        .catch(e => {
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    tip() {
      this.isHideFoxTipDialog = true;
    },
    time_refresh: function() {
      this.clear_refresh();
      let sec = 5;
      for (let i = 0; i <= 5; i++) {
        this.refresh_timer.push(
          window.setTimeout(() => {
            if (sec !== 0) {
              sec--;
            } else {
              sec = 5;
              if ("game_fox_fast" != this.$route.name) {
                this.clear_refresh();
                return;
              }
              this.init_data();
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
    text_refresh: function() {
      if ("game_fox_fast" != this.$route.name || this.time_count < 0) {
        this.isChange = true;
        return;
      }
      this.time_count = this.time_count - 1;
      this.isChange = !this.isChange;
      setTimeout(() => {
        this.text_refresh();
      }, 500);
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
@import "../assets/css/fast.scss";
</style>


