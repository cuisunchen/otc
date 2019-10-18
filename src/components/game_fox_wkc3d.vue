<template>
  <div class="content-game-fast">
    <div style="position:relative;z-index:999;">
    <mu-appbar  title="OSC3D">
      <mu-flat-button color="white" label="规则？" slot="right" @click="tip"/>
    </mu-appbar>
     <div class="top-roll-fast" ><marquee>{{ marquee_tip}}</marquee></div>  
    <mu-tabs style="background:#fff;" :value="activeTab" @change="handleTabChange">
    <mu-tab value="tab1" title="大厅"/>
    <mu-tab value="tab2" @click="getMyKeys" title="我的key"/>
    </mu-tabs>
    </div>
    <div v-if="activeTab === 'tab1'">
      <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee">
          <div style=" color:#333">慈善：<span style="color:#0A2463;" > {{donate_pool}}</span> OSC</div>
      </div>
      <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee">
          <div style=" color:#333">本期：<span style="color:#0A2463;" > {{reward_pool}}</span> OSC</div>
      </div>
     <div style="background:#fff;margin-top:4px;"> 
          <div style="padding:0.4em 1em;text-align:left">选择组</div>
        <div style="height: 0.5rem;"></div>
        <div class="row-img" >
          <div class="col-3 team" @click="groupSelect(1)"> 
            <label class="teamselector"> 
                <input class="form-check-input form-radio teamsave" type="radio" autocomplete="off" name="teamselect" value="2" id="qinglongId" checked style="display:none;"> 
                <!-- <img src="../assets/image/qinglong-icon.png" alt="" class="img-icon" >  -->
                <h5  class="h5-title">青龙</h5> 
                <!-- <p  class="p1">孟章神君</p>  -->
            </label> <div> 
                <!-- <p class="p2">++ </p>  -->
            </div> 
        </div>

        <div class="col-3 team" @click="groupSelect(2)"> 
                <label class="teamselector"> 
                    <input class="form-check-input form-radio teamsave" type="radio" autocomplete="off" name="teamselect" value="2" id="baihuId" style="display:none;"> 
                    <!-- <img src="../assets/image/baihu-icon.png" alt="" class="img-icon" >  -->
                    <h5 class="h5-title">白虎</h5> 
                </label> <div> 
                </div> 
            </div>
            <div class="col-3 team" @click="groupSelect(3)"> 
                    <label class="teamselector"> 
                        <input class="form-check-input form-radio teamsave" type="radio" autocomplete="off" name="teamselect" value="2" id="zhuqueId" style="display:none;"> 
                        <!-- <img src="../assets/image/zhuque-icon.png" alt="" class="img-icon" >  -->
                        <h5  class="h5-title">朱雀</h5> 
                    </label> <div> 
                    </div> 
                </div>
              
                <div class="col-3 team" @click="groupSelect(4)"> 
                        <label class="teamselector"> 
                            <input class="form-check-input form-radio teamsave" type="radio" autocomplete="off" name="teamselect" value="2" id="xuanwuId" style="display:none;"> 
                            <!-- <img src="../assets/image/xuanwu-icon.png" alt="" class="img-icon" >  -->
                            <h5  class="h5-title">玄武</h5> 
                        </label> <div> 
                        </div> 
                    </div>
        </div>
     </div>
<div style="padding:0.4em 1em;text-align:left;margin-top:1px;">Key数量</div>
  <p style="color:#0A2463;margin:0em 1em 0.1em 1.4em;padding:0.5em 0 0 0;text-align: right;font-size:0.8em;">{{amountTip}}</p>
      <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee">
          <input style="padding:0.5em 0.3em;border:0px;width:100%;outline:none"  id="keyId"  type="number" maxlength="3" oninput="if(value.length>8)value=value.slice(0,3)" placeholder="请输入Keys数量" value="1"  @input="inputKeys()" onafterpaste="if(isNaN(value))execCommand('undo')" v-model="keys"  >
      </div>
   <div style="background:#fff">   
    <div role="group" class="btn-group d-flex" style="margin-top:0.8em;margin-bottom:0.5em;">
            <button id="addOne" class="btn btn-outline-yel w-100 increment"  @click="keySelect(1)" >+ 1 Key</button>
            <button id="addTwo" class="btn btn-outline-yel w-100 increment"   @click="keySelect(2)" >+ 2 Keys</button>
            <button id="addFive" class="btn btn-outline-yel w-40 increment"   @click="keySelect(5)" >+ 5</button>
            <button id="addTen" class="btn btn-outline-yel w-30 increment"   @click="keySelect(10)" >+ 10</button>
            <button id="addHundred" class="btn btn-outline-yel w-30 increment" style="margin-right: -1px;"   @click="keySelect(100)" >+ 100</button>
    </div>
   </div>
   <div style="background:#fff;">
     <p style="color:#0A2463;margin:1.5em 1em -1.5em 1.4em;padding:1em 0 0 0;text-align: right;font-size:0.8em;">{{OSC_BANANCE}}</p>
        <mu-circular-progress v-show="isProgressShow" class="demo-circular-progress" :size="20" style="margin-top:2em;margin-left:3.5em;z-index:999;position: absolute;"></mu-circular-progress>
        <button @click="openFoxList" style="background: #c0c;color:#fff;border: 0px;font-size:1em;line-height:2.4;width: 90%;margin:1.5em 1em 1.5em 1em;border-radius: 0.2em;">购买</button>
        <p style="color:#0A2463;margin:-1.5em 1em 1.5em 1.4em;padding:0 0 1em 0;text-align: left;font-size:0.8em;">{{randomPoolTip}}</p>
    </div>

<div class="fast-this-detail" style="text-align:left;padding: 1em 1em 4em 1em;background:#fff;">
         <table  style="padding-bottom: 3em;">
          <tbody>
              <tr v-for="(item) in this.keysList" :key="item.id" >
                <td >#{{item[0]}}</td>
                <td > 购买了 </td>  
                <td style="width:1.5em;text-align: right; color:#0A2463">{{item[1]}}</td>
                <td >个key</td>
              </tr>
          </tbody>
        </table>
          </div>



    </div>
    <div v-if="activeTab === 'tab2'" >
      
    </div>
   <mu-dialog :open="isOpenFoxsDialog"   title="选择狐狸">
        挑选一只链客狐，作为购买keys的标识（<span style="color:#0A2463">选择后不能修改</span>）：<br />
    
     <div  v-for="(item) in selectKeysFoxsList" :key="item.id" >
         <div style="display:flex;padding:15px;background:#fff;"  @click="buyKey(item)"  >
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
      <mu-dialog :open="isGuideTipDialog" title="OSC3D规则介绍：" @close="close">
       
        <mu-flat-button slot="actions" primary @click="close" label="我知道了"/>
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
  name: "game_fox_wkc3d",
  components: { FoxBottomNav },
  data() {
    return {
      time: "",
      toast: false,
      message: "",
      toastTimer: "",
      refresh_timer: null,
      activeTab: "tab1",
      order: "PRICE_DESC",
      offset: 0,
      offsetHide: 0,
      limit: 10,
      toast: false,
      list: [],
      scroller: null,
      selectKeysFoxsList: [],
      total: 0,
      marquee_tip: "欢迎体验OSC3D游戏！",
      OSC_BANANCE: "",
      isOpenFoxsDialog: false,
      isGuideTipDialog: false,
      keys: 1,
      groupValue: 1,
      price: 1,
      amountTip: "",
      isProgressShow: false,
      reward_pool: "",
      donate_pool: "",
      randomPoolTip: "",
      keysList: [
        [0, 1, 2],
        [0, 1, 2],
        [0, 1, 2],
        [0, 1, 2],
        [0, 1, 2],
        [0, 1, 2],
        [0, 1, 2],
        [0, 1, 2],
        [0, 1, 2],
        [0, 1, 2],
        [0, 1, 2]
      ]
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
      this.isGuideTipDialog = false;
      this.isOpenFoxsDialog = false;
    },
    initFunction() {
      this.getBalance();
    },

    getMyKeys() {},
    buyKey(item) {
      this.isOpenFoxsDialog = false;
      this.isProgressShow = true;
      console.log("item.id = " + item.id);
    },
    groupSelect(value) {
      this.groupValue = value;
      console.log("this.groupValue = " + this.groupValue);
    },
    keySelect(value) {
      if (this.keys.length == 0) {
        this.keys = 1;
        this.amountTip = "@ " + (this.keys * this.price).toFixed(4) + " OSC";
        return;
      }
      if (this.keys.length > 3) {
        this.keys = 999;
        this.amountTip = "@ " + (this.keys * this.price).toFixed(4) + " OSC";
        return;
      }
      if (parseInt(this.keys) < 1) {
        this.keys = 1;
        this.amountTip = "@ " + (this.keys * this.price).toFixed(4) + " OSC";
        return;
      }
      if (parseInt(this.keys) > 999) {
        this.keys = 999;
        this.amountTip = "@ " + (keys * price).toFixed(4) + " OSC";
        return;
      }
      this.keys = parseInt(this.keys) + parseInt(value);
      if (parseInt(this.keys) > 999) {
        this.keys = 999;
        this.amountTip = "@ " + (this.keys * this.price).toFixed(4) + " OSC";
        return;
      } else {
        this.amountTip = "@ " + (this.keys * this.price).toFixed(4) + " OSC";
      }
    },
    inputKeys() {
      if (this.keys.length == 0) {
        this.keys = 1;
        this.amountTip = "@ " + (this.keys * this.price).toFixed(4) + " OSC";
        return;
      }
      if (this.keys.length > 3) {
        this.keys = 999;
        this.amountTip = "@ " + (this.keys * this.price).toFixed(4) + " OSC";
        return;
      }
      if (parseInt(this.keys) < 1) {
        this.keys = 1;
        this.amountTip = "@ " + (this.keys * this.price).toFixed(4) + " OSC";
        return;
      }
      if (parseInt(this.keys) > 999) {
        this.keys = 999;
        this.amountTip = "@ " + (this.keys * this.price).toFixed(4) + " OSC";
        return;
      }
      this.amountTip = "@ " + (this.keys * this.price).toFixed(4) + " OSC";
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

    openFoxList() {
      if (this.isProgressShow) {
        this.showToast("请稍后");
        return;
      }
      if (parseInt(this.keys) < 1 || parseInt(this.keys) > 999) {
        this.showToast("OSC投入范围1-999 OSC");
        return;
      }
      this.isOpenFoxsDialog = true;
      this.getMyFoxs();
    },

    getMyFoxs: function() {
      this.offsetHide = 0;
      this.selectKeysFoxsList = [];
      game
        .foxMine("", "GENERATION_ASC", this.offsetHide, this.limit)
        .then(data => {
          if (parseInt(data.data.total) === 0) {
            this.isGuideTipDialog = false;
            this.showToast("狐狸尚未修炼，请先修炼自己的狐狸。");
            return;
          }
          this.selectKeysFoxsList = [];
          this.dealData(data);
        })
        .catch(e => {
          this.isGuideTipDialog = false;
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
      this.selectKeysFoxsList = this.selectKeysFoxsList.concat(data.data.list);
    },

    tip() {
      this.isGuideTipDialog = true;
    },

    time_refresh: function() {
      if ("game_fox_OSC3d" == this.$route.name) {
      } else {
        return;
      }
      this.refresh_timer = window.setInterval(() => {
        if ("/game_fox_OSC3d" == this.$route.name) {
          game
            .summary()
            .then(data => {})
            .catch(e => {});
        } else {
          window.clearInterval(this.refresh_timer);
          return;
        }
      }, 10000);
    }
  },
  beforeDestroy: function() {
    if (this.refresh_timer != null) {
      window.clearInterval(this.refresh_timer);
    }
  }
};
</script>


<style lang="scss" scope>
@import "../assets/css/wkc3d.scss";
</style>


