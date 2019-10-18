<template>
  <div class="content-home">
    <div class="fix-progress" v-show="false">
      
    <mu-linear-progress color="#0A2463"/>
    </div>
      <div class="top-order">
      <div class="center-order">共 {{total}} 狐狸</div>
      <div class="left-order" @click="goBack" />
      <div class="paixu-zone" >
        <div style="display:inline-block;font-size:0.8em"   @click="drawLottery">桃花运</div>
        <div style="display:inline-block">
      <mu-icon-menu class="paixu" style="font-size:0.8em" :icon="asc" slot="right">
      <mu-menu-item title="寻宝↑" @click="startSort('寻宝↑','REWARD_ASC')"/>
      <mu-menu-item title="寻宝↓" @click="startSort('寻宝↓','REWARD_DESC')"/>
      <mu-menu-item title="能量↑" @click="startSort('能量↑','WEIGHT_ASC')"/>
      <mu-menu-item title="能量↓" @click="startSort('能量↓','WEIGHT_DESC')"/>
      <mu-menu-item title="代数↑" @click="startSort('代数↑','GENERATION_ASC')"/>
      <mu-menu-item title="代数↓" @click="startSort('代数↓','GENERATION_DESC')"/>
      </mu-icon-menu>
        </div>
      </div>
      
  </div>
   
    <mu-tabs :value="activeTab" style="background:#fff" @change="handleTabChange">
      <mu-tab value="tab1" @click="myFoxs" title="全部"/>
      <mu-tab value="tab2" @click="mySellFoxs" title="集市"/>
      <mu-tab value="tab3" @click="mainlove" title="桃❀"/>
      <mu-tab value="tab4" @click="mineDan" title="化丹"/>
      <mu-tab value="tab5" @click="myGodFox" title="神狐"/>
    </mu-tabs> 
    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
    <div v-if="activeTab === 'tab1'">
        <div   class="list-content-zone-home" style="padding-bottom:8em;">
        <div class="list-content-big-home" v-for="(item) in list_tab0" :key="item.id">
         
            <div class="foxid-zone-home">#{{item.id}} </div>
            <div class="foxid-zone-home-right" v-if="getGodFox(item)" @click="godFoxDialog(item)">神狐合成</div>
            <div class="foxid-zone-home-right-99" v-if="get99GodFox(item)" @click="godFox99Dialog(item)">75属性狐</div>
            <div class="foxzhuangtai-zone"> {{item|getFoxStatus}} </div>
          <router-link :to="'/game_fox/' + item.id">
          <div class="list-content-home">
            <div class="list-img-home" id="list-img" :style="item.bg">
                <div :class="'body'+item.appearance[1]"></div>
                <div :class="'hate'+item.appearance[2]"></div>
                <div :class="'erhuan'+item.appearance[3]"></div>
                <div :class="'yanjing'+item.appearance[4]"></div>
                <div :class="'weibo'+item.appearance[5]"></div>
                <div :class="'shiping'+item.appearance[6]"></div>
                <div :class="'mouth'+item.appearance[7]"></div>
                <div :class="'face'+item.appearance[8]"></div>
                <div :class="'level'+item.appearance[9]"></div>
              <div class="fox-msg">
                  {{item.grow}}/{{item.mate}}/{{item.dig}}
              </div>
            </div>
            <div class="list-content-right-home">
              <h4><span style="color:#3d9cee;margin-left:0px;">{{item.generation}}代</span><span>{{item.weight}}ERG</span></h4>
              <div class="right-content-zone">
               <p style="color:#808080">修炼进度：{{item.feed_today}}/5</p>
                <p style="color:#808080">修炼狐丹：{{item.feed_dan_today}}/8</p>
                <p>上次寻宝：<i>{{item.pre_dig_qty}}</i>OSC</p>
                <p style="color:#808080">萌狐诞生：{{item.next_mate_time | formatDate2}}</p>
              </div>
            </div>
          </div>
          <!-- <p  class="sex">萌狐诞生：{{item.next_mate_time | formatDate2}}
            <span style="float:right;display:inline-block;text-align:right;color:red"  >
            <i> {{item|getFoxStatus}}</i>
            </span>
          </p> -->
          </router-link>
        </div>
       
      </div>  
    </div>
  
  <!---->
      <div v-if="activeTab === 'tab2'">
        <div   class="list-content-zone-home" style="padding-bottom:8em;">
        <div class="list-content-big-home" v-for="(item) in list_tab1" :key="item.id">
          <router-link :to="'/game_fox/' + item.id">
             <div class="foxid-zone-home">#{{item.id}} </div>
            <div class="foxzhuangtai-zone"> {{item|getFoxStatus}} </div>
          <div class="list-content-home">
            <div class="list-img-home" id="list-img" :style="item.bg">
                <div :class="'body'+item.appearance[1]"></div>
                <div :class="'hate'+item.appearance[2]"></div>
                <div :class="'erhuan'+item.appearance[3]"></div>
                <div :class="'yanjing'+item.appearance[4]"></div>
                <div :class="'weibo'+item.appearance[5]"></div>
                <div :class="'shiping'+item.appearance[6]"></div>
                <div :class="'mouth'+item.appearance[7]"></div>
                <div :class="'face'+item.appearance[8]"></div>
                <div :class="'level'+item.appearance[9]"></div>
              <div class="fox-msg">
                  {{item.grow}}/{{item.mate}}/{{item.dig}}
              </div>
            </div>
            <div class="list-content-right-home">
              <h4><span style="color:#3d9cee;margin-left:0px;">{{item.generation}}代</span><span>{{item.weight}}ERG</span></h4>
              <div class="right-content-zone">
               <p style="color:#808080">修炼进度：{{item.feed_today}}/5</p>
                <p style="color:#808080">修炼狐丹：{{item.feed_dan_today}}/8</p>
                <p>上次寻宝：<i>{{item.pre_dig_qty}}</i>OSC</p>
                <p style="color:#808080">萌狐诞生：{{item.next_mate_time | formatDate2}}</p>
              </div>
            </div>
          </div>
          </router-link>
        </div>
       
      </div>  
    </div>
    <!---->
     <div v-if="activeTab === 'tab3'">
        <div   class="list-content-zone-home" style="padding-bottom:8em;">
        <div class="list-content-big-home" v-for="(item) in list_tab2" :key="item.id">
          <router-link :to="'/game_fox/' + item.id">
            <div class="foxid-zone-home">#{{item.id}} </div>
            <div class="foxzhuangtai-zone"> {{item|getFoxStatus}} </div>
          <div class="list-content-home">
            <div class="list-img-home" id="list-img" :style="item.bg">
                <div :class="'body'+item.appearance[1]"></div>
                <div :class="'hate'+item.appearance[2]"></div>
                <div :class="'erhuan'+item.appearance[3]"></div>
                <div :class="'yanjing'+item.appearance[4]"></div>
                <div :class="'weibo'+item.appearance[5]"></div>
                <div :class="'shiping'+item.appearance[6]"></div>
                <div :class="'mouth'+item.appearance[7]"></div>
                <div :class="'face'+item.appearance[8]"></div>
                <div :class="'level'+item.appearance[9]"></div>
              <div class="fox-msg">
                  {{item.grow}}/{{item.mate}}/{{item.dig}}
              </div>
            </div>
            <div class="list-content-right-home">
              <h4><span style="color:#3d9cee;margin-left:0px;">{{item.generation}}代</span><span>{{item.weight}}ERG</span></h4>
              <div class="right-content-zone">
               <p style="color:#808080">修炼进度：{{item.feed_today}}/5</p>
                <p style="color:#808080">修炼狐丹：{{item.feed_dan_today}}/8</p>
                <p>上次寻宝：<i>{{item.pre_dig_qty}}</i>OSC</p>
                <p style="color:#808080">萌狐诞生：{{item.next_mate_time | formatDate2}}</p>
              </div>
            </div>
          </div>
          </router-link>
        </div>
       
      </div>  
    </div>
    <div v-if="activeTab === 'tab4'">
      <div v-if="this.selectHuaDanList.length>0" style="display:table;width:100%">
     <div class="huadan-img-zone" v-for="(item) in selectHuaDanList" :key="item.id">
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
      </div>
       <mu-raised-button v-if="this.selectHuaDanList.length>0" @click="huaDanShowDialog"  :label="'化丹（'+this.selectHuaDanList.length+'）'" class="demo-raised-button" primary style="float:right;vertical-align: middle;margin-right: 5px;margin-top: 10px"/>
    </div>  
       <div class="list-content-zone-home" style="padding-bottom:8em;">
        <div class="list-content-big-home" v-for="(item) in list" :key="item.id">
          <!-- <router-link :to="'/game/fox/' + item.id"> -->
          <div class="foxid-zone-home">#{{item.id}} </div>
            <div class="foxzhuangtai-zone"> 
              <span style="width:5em;float:right;display:inline-block;text-align:right" class="mui-input-row mui-checkbox" >
               <mu-checkbox name="group" label="化丹" class="demo-checkbox huadan-checbox " v-model="selectHuaDanList"  :nativeValue="item"  labelLeft /><br/>
            </span>
           </div>
          <div class="list-content-home">
            <router-link :to="'/game_fox/' + item.id">
            <div class="list-img-home" id="list-img-home" :style="item.bg">
                <div :class="'body'+item.appearance[1]"></div>
                <div :class="'hate'+item.appearance[2]"></div>
                <div :class="'erhuan'+item.appearance[3]"></div>
                <div :class="'yanjing'+item.appearance[4]"></div>
                <div :class="'weibo'+item.appearance[5]"></div>
                <div :class="'shiping'+item.appearance[6]"></div>
                <div :class="'mouth'+item.appearance[7]"></div>
                <div :class="'face'+item.appearance[8]"></div>
                <div :class="'level'+item.appearance[9]"></div>
              <div class="fox-msg">
                  {{item.grow}}/{{item.mate}}/{{item.dig}}
              </div>
            </div>
             </router-link>
            <div class="list-content-right-home">
              <h4><i>{{item.generation}}</i>代<span>{{item.weight}}ERG</span></h4>
              <div class="right-content-zone">
               <p style="color:#808080">修炼进度：{{item.feed_today}}/5</p>
                <p style="color:#808080">修炼狐丹：{{item.feed_dan_today}}/8</p>
                <p>上次寻宝：<i>{{item.pre_dig_qty}}</i>OSC</p>
                <p style="color:#808080">萌狐诞生：{{item.next_mate_time | formatDate2}}</p>
              </div>
            </div>
          </div>
            
          <!-- </router-link> -->
        </div>
       
      </div>
    </div>

    <div v-if="activeTab === 'tab5'">
       <div class="list-content-zone-home" style="padding-bottom:8em;">
        <div class="list-content-big-home" v-for="(item) in list_tab5" :key="item.id">
          <router-link :to="'/game_fox/' + item.id"> 
          <div class="foxid-zone-home">#{{item.id}} </div>
          <div class="foxid-zone-home-right-godfox" > <span v-show="item.generation=='229'">二代神狐</span><span v-show="item.generation=='299'">一代神狐</span></div>
          <div class="list-content-home">
            <!-- <router-link :to="'/game_fox/' + item.id"> -->
            <div class="list-img-home" id="list-img-home" :style="item.bg">
                <div :class="'body'+item.appearance[1]"></div>
                <div :class="'hate'+item.appearance[2]"></div>
                <div :class="'erhuan'+item.appearance[3]"></div>
                <div :class="'yanjing'+item.appearance[4]"></div>
                <div :class="'weibo'+item.appearance[5]"></div>
                <div :class="'shiping'+item.appearance[6]"></div>
                <div :class="'mouth'+item.appearance[7]"></div>
                <div :class="'face'+item.appearance[8]"></div>
                <div :class="'level'+item.appearance[9]"></div>
              <div class="fox-msg">
                  {{item.grow}}/{{item.mate}}/{{item.dig}}
              </div>
            </div>
             <!-- </router-link> -->
            <div class="list-content-right-home">
              <h4><i>{{item.generation}}</i>代<span>{{item.weight}}ERG</span></h4>
              <div class="right-content-zone">
               <p style="color:#808080">修炼进度：{{item.feed_today}}/5</p>
                <p style="color:#808080">修炼狐丹：{{item.feed_dan_today}}/8</p>
                <p>上次寻宝：<i>{{item.pre_dig_qty}}</i>OSC</p>
                <p style="color:#808080">萌狐诞生：{{item.next_mate_time | formatDate2}}</p>
              </div>
            </div>
          </div>
            
          </router-link>
        </div>
       
      </div>
    </div>
 <mu-infinite-scroll :scroller="homeScroller" :loading="homeLoading" @load="loadMoreScrol"/>
    <div v-show="hua" class="hua-zone"></div>
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
    <mu-dialog :open="isOpenHuaDanDialog" title="化丹提示" @close="closeHuaDan">
        是否将以下编号的狐狸化为狐丹（<span style="color:#0A2463">化丹,化丹后，您的化丹狐狸将会消失变为一颗狐丹，此操作不可逆转</span>）：<br />
    
     <div  v-for="(item) in selectHuaDanList" :key="item.id" >
         <p class="choics_fox">{{item.generation}}代 <span>#ID{{item.id}} </span></p>
      </div>
        <mu-flat-button slot="actions" @click="closeHuaDan" primary label="取消"/>
        <mu-flat-button slot="actions" primary @click="huaDan" label="化丹"/>
    </mu-dialog>
      <!-- tipDialog.setTitle("桃花运抽奖提示");
                                    tipDialog.setMessage("桃花运抽奖需要从您的火狐狸平台账户扣除 "+value+" OSC，扣除成功后，系统随机抽取一只1到9代的狐狸给您。");
                                    tipDialog.getCancelTextView().setText("取消");
                                    tipDialog.getOkTextView().setText("抽奖"); -->
    <mu-dialog :open="openyun" title="桃花运抽奖提示" @close="closeHuaDan">
        桃花运抽奖需要从您的火狐狸平台账户扣除 {{yunvalue}} OSC，扣除成功后，系统随机抽取一只狐狸：
        
        <table  style=" border:1px solid #ccc;width:100%">
          <tbody >
            <tr >
              <td style="width:33%" align="center">代数</td>
              <td style="width:33%" align="center">抽奖概率</td>
              <td style="width:33%" align="center">狐丹奖励</td>
            </tr>
            
              <tr>
                <td style="width:33%" align="center">1</td>
                <td style="width:33%" align="center">0.0244%</td>
                <td style="width:33%" align="center">0颗</td>
              </tr>
              <tr>
                <td style="width:33%" align="center">2</td>
                <td style="width:33%" align="center">0.3906%</td>
                <td style="width:33%" align="center">0颗</td>
              </tr>
              <tr>
                <td style="width:33%" align="center">5</td>
                <td style="width:33%" align="center">87.0850%</td>
                <td style="width:33%;color:#0A2463" align="center">1颗</td>
              </tr>
              <tr>
                <td style="width:33%" align="center">91-99</td>
                <td style="width:33%" align="center">12.0000%</td>
                <td style="width:33%;color:#0A2463" align="center">1颗</td>
              </tr>
          </tbody>
        </table>
        
        
        
        <!-- （1、2、5、91-99代，其中抽中5代系统送一颗狐丹，91-99代凑齐9个可合成神狐，系统送一颗狐丹）给您。 -->
        <div style="padding:0.4em 0em;text-align:left">抽奖次数&nbsp;&nbsp;<span style="color:rgb(255, 64, 129);font-size:1.5em;">{{luckyDrawTip}}</span></div>
      <div style="text-align:left;padding:0.1em 1em;background:#fff;border:1px solid #eee">
          <input style="padding:0.3em 0.3em;border:0px;width:100%;outline:none" placeholder="请输入抽奖次数" type="number"   maxlength="2"  oninput="if(value.length>2)value=value.slice(0,2)"  v-model="luckyDrawFoxTime"  >
      </div>
        <mu-flat-button slot="actions" @click="closeHuaDan" primary label="取消"/>
        <mu-flat-button slot="actions" primary @click="luckyDraw" v-show="isLuckyDrawTip" label="抽奖"/>
    </mu-dialog>
    <mu-dialog :open="open99GodFox" title="75属性狐合成提示" @close="closeHuaDan">
          2-9代20能量以上的共8个狐狸，可合成一个2-9代狐，<span style="color:#0A2463" >属性75</span>，遵循寻宝掉属性规则。
        <mu-flat-button slot="actions" @click="closeHuaDan" primary label="取消"/>
        <mu-flat-button slot="actions" primary @click="godFox99" label="合成75狐"/>
    </mu-dialog>
    <mu-dialog :open="openGodFox" title="神狐合成提示" @close="closeHuaDan">
          
        1代+91-99代，共10个狐狸=299代，每天修炼可手动领取<span style="color:#0A2463" >两颗狐丹</span>，领取天数为<span style="color:#0A2463" >299天</span>。<br>
        2代+91-99代，共10个狐狸=229代，每天修炼可手动领取<span style="color:#0A2463" >一颗狐丹</span>，领取天数为<span style="color:#0A2463" >229天</span>。
        <mu-flat-button slot="actions" @click="closeHuaDan" primary label="取消"/>
        <mu-flat-button slot="actions" primary @click="godFox" label="合成神狐"/>
    </mu-dialog>
   <FoxBottomNav style="z-index:999"></FoxBottomNav>
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
import HttpResultCode from "../utils/HttpResultCode";
export default {
  name: "game_fox_home",
  components: { FoxBottomNav },
  data() {
    return {
      activeTab: "tab1",
      sell_type: "",
      order: "GENERATION_ASC",
      isFirstEnter: false, // 是否第一次进入，默认false
      offset: 0,
      offset_tab0: 0,
      offset_tab1: 0,
      offset_tab2: 0,
      offset_tab5: 0,
      list_tab0: [],
      list_tab1: [],
      list_tab2: [],
      list_tab5: [],
      limit: 10,
      list: [],
      asc: "代数↑",
      toast: false,
      message: "",
      yunfrom: "",
      yunto: "",
      yunvalue: "",
      openyun: false,
      hua: false,
      homeLoading: false,
      isLoading: false,
      progressShow: false,
      isShowData: false,
      isShowHuaDanItem: false,
      isOpenHuaDanDialog: false,
      selectHuaDanList: [],
      nothua: true,
      total: 0,
      homeScroller: null,
      refresh_timer: [],
      refreshing: false,
      open99GodFox: false,
      openGodFox: false,
      trigger: null,
      selectGodFox: null,
      luckyDrawFoxTime: 1,
      isStopLuckyDrawFox: false,
      refreshTime: new Date().getTime(),
      luckyDrawTip: "",
      isLuckyDrawTip: true
    };
  },
  mounted() {
    this.homeScroller = this.$el;
    this.trigger = this.$el;
  },
  filters: {
    formatDate2(time) {
      let date = new Date(parseInt(time) * 1000);
      if (Date.parse(new Date()) < date) {
        return formatDate(date, "yyyy-MM-dd hh:mm:ss");
      }
      return "准备就绪";
    },
    getFoxStatus: function(item) {
      if (item.status === "SELLING" || item.status === "MATING") {
        if (item.status === "SELLING") {
          return "出售中";
        } else {
          if (item.price === "0") {
            return "购买造狐权";
          } else {
            return "出售造狐权";
          }
        }
      } else {
        return "";
      }
    }
  },
  created: function() {
    // if (!this.isFirstEnter) {
    //   this.myFoxs();
    // }
    // this.isFirstEnter = true;
    if (this.list_tab0.length == 0) this.myFoxs();
  },
  methods: {
    getGodFox: function(item) {
      if (item == null || item == undefined) return false;
      if (item.status === "SELLING" || item.status === "MATING") {
        if (item.status === "SELLING") {
          return false;
        } else {
          if (item.price === "0") {
            return false;
          } else {
            return false;
          }
        }
      } else {
        if (item.generation == 1 || item.generation == 2) return true;
        return false;
      }
    },
    get99GodFox: function(item) {
      if (item == null || item == undefined) return false;
      if (item.status === "SELLING" || item.status === "MATING") {
        if (item.status === "SELLING") {
          return false;
        } else {
          if (item.price === "0") {
            return false;
          } else {
            return false;
          }
        }
      } else {
        if (item.generation == 2) return true;
        return false;
      }
    },
    godFox99: function() {
      this.open99GodFox = false;
      game
        .mergeFullFox(this.selectGodFox.id)
        .then(data => {
          console.log("data" + data);
          setTimeout(() => {
            this.$router.push("/game_fox/" + data.data.fire_fox_id);
          }, 1000);
        })
        .catch(e => {
          switch (e.code) {
            case 1624:
              this.showToast("需要91-99代共9只狐狸才能合成神狐。");
              break;
          }
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    godFox: function() {
      this.openGodFox = false;
      game
        .mergeGodFox(this.selectGodFox.id)
        .then(data => {
          console.log("data" + data);
          setTimeout(() => {
            this.$router.push("/game_fox/" + data.data.fire_fox_id);
          }, 1000);
        })
        .catch(e => {
          switch (e.code) {
            case 1624:
              this.showToast("需要2-9代，共8个狐狸+10颗狐丹才能合成75属性狐狸");
              break;
          }
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    godFox99Dialog: function(item) {
      this.selectGodFox = item;
      this.open99GodFox = true;
    },
    godFoxDialog: function(item) {
      this.selectGodFox = item;
      this.openGodFox = true;
    },
    refresh() {
      this.refreshing = true;
      // console.log('sldjfghlskdjfglskdjfghlsjkd')
      this.startSort(this.asc, this.order);
      //  this.refreshing = false
    },
    goBack() {
      this.$router.push("/user");
    },
    handleTabChange(val) {
      this.activeTab = val;
    },
    handleActive() {},
    hideToast() {
      this.toast = false;
      if (this.toastTimer) clearTimeout(this.toastTimer);
    },
    startSort: function(asc, order) {
      //排序
      this.asc = asc;
      this.list = [];
      this.order = order;
      // this.initData()
      if (this.activeTab === "tab5") {
        this.myGodFox();
      } else if (this.activeTab === "tab4") {
        this.mineDan();
      } else if (this.sell_type == "") {
        this.myFoxs();
      } else if (this.sell_type == "SELL_PROPERTY") {
        this.mySellFoxs();
      } else if (this.sell_type == "SELL_MATE") {
        this.mainlove();
      } else {
        this.initData();
      }
    },
    mySellFoxs: function() {
      this.selectHuaDanList = [];
      this.offset_tab1 = 0;
      this.total = 0;
      this.sell_type = "SELL_PROPERTY";
      game
        .foxMine(this.sell_type, this.order, this.offset_tab1, this.limit)
        .then(data => {
          this.refreshing = false;
          this.list_tab1 = [];
          if (data.code == 0 && data.data.total > 0) {
            this.dealData_tab1(data);
          }
        })
        .catch(e => {
          this.refreshing = false;
          this.initStatus();
        });
    },
    initStatus() {
      this.progressShow = false;
      this.isShowData = true;
      this.homeLoading = false;
      this.isLoading = false;
    },
    initStart() {
      this.progressShow = false;
      // this.isShowData=true
      this.homeLoading = true;
      this.isLoading = true;
    },
    closeyun: function() {
      this.openyun = false;
      this.yunvalue = false;
    },
    mainlove: function() {
      this.selectHuaDanList = [];
      this.sell_type = "SELL_MATE";
      this.total = 0;
      this.offset_tab2 = 0;
      game
        .foxMine("SELL_MATE", this.order, this.offset_tab2, this.limit)
        .then(data => {
          this.refreshing = false;
          this.list_tab2 = [];
          if (data.code == 0 && data.data.total > 0) {
            this.dealData_tab2(data);
          }
        })
        .catch(e => {
          this.refreshing = false;
          this.initStatus();
        });
    },
    mineDan: function() {
      this.selectHuaDanList = [];
      this.offset = 0;
      this.total = 0;
      this.list = [];
      game
        .foxMineDan(this.order, this.offset, this.limit)
        .then(data => {
          this.refreshing = false;
          this.dealData(data);
        })
        .catch(e => {
          this.refreshing = false;
        });
    },
    myGodFox: function() {
      this.selectHuaDanList = [];
      this.offset_tab5 = 0;
      this.total = 0;
      this.list = [];
      this.list_tab5 = [];
      if (this.refreshing) return;
      this.refreshing = true;
      game
        .foxMineGodFox(this.offset_tab5, this.limit)
        .then(data => {
          this.refreshing = false;
          this.dealData_tab5(data);
        })
        .catch(e => {
          this.refreshing = false;
        });
    },
    myFoxs: function() {
      this.selectHuaDanList = [];
      this.sell_type = "";
      this.total = 0;
      this.offset_tab0 = 0;
      game
        .foxMine(this.sell_type, this.order, this.offset_tab0, this.limit)
        .then(data => {
          this.refreshing = false;
          this.list_tab0 = [];
          if (data.code == 0 && data.data.total > 0) {
            this.dealData_tab0(data);
          }
        })
        .catch(e => {
          this.refreshing = false;
          this.initStatus();
        });
    },
    dealData_tab5(data) {
      //数据处理函数
      this.initStatus();
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
      this.offset_tab5 = this.offset_tab5 + data.data.list.length;
      this.total = data.data.total;
      this.list_tab5 = this.list_tab5.concat(data.data.list);
    },

    dealData_tab0(data) {
      //数据处理函数
      this.initStatus();
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
      this.offset_tab0 = this.offset_tab0 + data.data.list.length;
      this.total = data.data.total;
      this.list_tab0 = this.list_tab0.concat(data.data.list);
    },
    dealData_tab1(data) {
      //数据处理函数
      this.initStatus();
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
      this.offset_tab1 = this.offset_tab1 + data.data.list.length;
      this.total = data.data.total;
      this.list_tab1 = this.list_tab1.concat(data.data.list);
    },
    dealData_tab2(data) {
      //数据处理函数
      this.initStatus();
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
      this.offset_tab2 = this.offset_tab2 + data.data.list.length;
      this.total = data.data.total;
      this.list_tab2 = this.list_tab2.concat(data.data.list);
    },
    drawLottery: function() {
      this.progressShow = true;
      this.luckyDrawFoxTime = 1;
      game
        .foxDrawLottery()
        .then(data => {
          this.progressShow = false;
          this.yunfrom = data.data.from;
          this.yunto = data.data.to;
          this.yunvalue = data.data.value;
          this.openyun = true;
        })
        .catch(e => {
          switch (e.code) {
            case 1614:
              this.showToast("今日桃花暂未开放");
              break;
          }
        });
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
      this.list = [];
      if (this.homeLoading) {
        return;
      }
      this.homeLoading = true;
      this.progressShow = true;
      game
        .foxMine(this.sell_type, this.order, this.offset, this.limit)
        .then(data => {
          this.list = [];
          this.dealData(data);
        })
        .catch(e => {
          this.initStatus();
        });
    },
    huaDanShowDialog: function() {
      this.isOpenHuaDanDialog = true;
    },
    closeHuaDan() {
      this.isOpenHuaDanDialog = false;
      this.openyun = false;
      this.open99GodFox = false;
      this.openGodFox = false;
    },
    huaDan() {
      if (this.selectHuaDanList.length > 10) {
        this.showToast("每次最多只能化10只狐狸。");
        return;
      }
      this.isOpenHuaDanDialog = false;
      var ids = "";
      for (var i = 0; i < this.selectHuaDanList.length; i++) {
        ids = ids + this.selectHuaDanList[i].id + ",";
      }
      ids = ids.substring(0, ids.length - 1);
      game
        .foxHuaDan(ids)
        .then(data => {
          this.selectHuaDanList = [];
          setTimeout(() => {
            this.mineDan();
          }, 2000);
          this.showToast("化丹成功");
        })
        .catch(e => {
          switch (e.code) {
            case 1616:
              this.value = 100;
              clearInterval(this.timer);
              this.toast = true;
              this.msg = "当日化丹总量已达上限。";
              this.toastTimer = setTimeout(() => {
                this.toast = false;
              }, 2000);
              break;
          }
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    loadMoreScrol: function() {
      // console.log("this.$route.path.from.name = " + this.$route.path.from.name);
      // console.log("this.$route.path = " + this.$route.path);
      // console.log("new Date().getTime() = " + new Date().getTime());
      var tempTime = new Date().getTime();
      if (tempTime - this.refreshTime < 500) {
        return;
      }
      this.refreshTime = tempTime;
      if ("/game_fox_home" != this.$route.path) {
        // console.log('this.$route.path = '+this.$route.path)
        return;
      }
      if (this.activeTab === "tab4") {
        if (this.isLoading) {
          return;
        }
        if (this.offset >= this.total) {
          //加载完成
          return;
        }
        this.homeLoading = true;
        this.progressShow = true;
        game
          .foxMineDan(this.order, this.offset, this.limit)
          .then(data => {
            this.dealData(data);
          })
          .catch(e => {
            this.initStatus();
          });
      } else if (this.activeTab === "tab5") {
        if (this.isLoading) {
          return;
        }
        if (this.offset_tab5 >= this.total) {
          //加载完成
          return;
        }
        this.homeLoading = true;
        this.progressShow = true;
        game
          .foxMineGodFox(this.offset_tab5, this.limit)
          .then(data => {
            this.dealData_tab5(data);
          })
          .catch(e => {
            this.initStatus();
          });
      } else {
        if (this.sell_type == "" && this.activeTab === "tab1") {
          this.loadMoreTab0();
        } else if (
          this.sell_type == "SELL_PROPERTY" &&
          this.activeTab === "tab2"
        ) {
          this.loadMoreTab1();
        } else if (this.sell_type == "SELL_MATE" && this.activeTab === "tab3") {
          this.loadMoreTab2();
        }
      }
    },
    loadMoreTab0: function() {
      if (this.homeLoading || this.isLoading) {
        return;
      }

      if (this.offset_tab0 >= this.total) {
        //加载完成
        return;
      }
      this.initStart();
      game
        .foxMine("", this.order, this.offset_tab0, this.limit)
        .then(data => {
          this.initStatus();
          if (data.code == 0 && data.data.total > 0) this.dealData_tab0(data);
        })
        .catch(e => {
          this.initStatus();
        });
    },
    loadMoreTab1: function() {
      if (this.homeLoading || this.isLoading) {
        return;
      }
      if (this.offset_tab1 >= this.total) {
        //加载完成
        return;
      }
      this.initStart();
      game
        .foxMine("SELL_PROPERTY", this.order, this.offset_tab1, this.limit)
        .then(data => {
          this.progressShow = false;
          this.isShowData = true;
          this.homeLoading = false;
          if (data.code == 0 && data.data.total > 0) this.dealData_tab1(data);
        })
        .catch(e => {
          this.progressShow = false;
          this.isShowData = true;
          this.homeLoading = false;
        });
    },
    loadMoreTab2: function() {
      if (this.homeLoading || this.isLoading) {
        return;
      }
      if (this.offset_tab2 >= this.total) {
        //加载完成
        return;
      }
      this.initStart();
      game
        .foxMine("SELL_MATE", this.order, this.offset_tab2, this.limit)
        .then(data => {
          if (data.code == 0 && data.data.total > 0) this.dealData_tab2(data);
        })
        .catch(e => {
          this.initStatus();
        });
    },
    dealData(data) {
      //数据处理函数
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
      this.homeLoading = false;
    },
    luckyDraw() {
      // this.openyun = false;
      this.isStopLuckyDrawFox = false;
      // window.setInterval(() => {
      //   game
      //     .draw_fox()
      //     .then(result => {
      //       if (result.code === 0) {
      //         this.time_refresh();
      //       }
      //     })
      //     .catch(e => {
      //       switch (e.code) {
      //         case 1104:
      //           this.showToast("账户余额不足 " + this.active_amount + " OSC。");
      //           break;
      //       }
      //     });
      // }, 1000);
      var timeRefresh = 0;
      if (parseInt(this.luckyDrawFoxTime) > 1) {
        this.isLuckyDrawTip = false;
        for (var i = 0; i < parseInt(this.luckyDrawFoxTime); i++) {
          setTimeout(() => {
            this.drawFoxRequst();
            timeRefresh = timeRefresh + 1;
            this.luckyDrawTip = timeRefresh + " 次";
            if (i == timeRefresh) {
              this.isLuckyDrawTip = true;
              this.time_refresh();
              this.openyun = false;
              this.luckyDrawTip = "";
              this.showToast("恭喜您抽奖完成！");
            }
          }, i * 500);
        }
      } else {
        this.drawFoxRequst();
        this.isLuckyDrawTip = false;
        setTimeout(() => {
          this.isLuckyDrawTip = true;
          this.time_refresh();
          this.openyun = false;
          this.showToast("恭喜您抽到一只小狐！");
        }, 1000);
      }
    },
    drawFoxRequst: function() {
      if (this.isStopLuckyDrawFox) return;
      game
        .draw_fox()
        .then(result => {
          // if (result.code === 0) {
          //   this.time_refresh();
          // }
        })
        .catch(e => {
          this.isStopLuckyDrawFox = true;
          switch (e.code) {
            case 1104:
              this.showToast("账户余额不足 " + this.active_amount + " OSC。");
              break;
          }
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    time_refresh: function() {
      this.refresh_timer.push(
        window.setTimeout(() => {
          this.startSort(this.asc, this.order);
        }, 1000)
      );
    }
  }
};
</script>

<style lang="scss" scope>
@import "../assets/css/home.scss";
</style>
