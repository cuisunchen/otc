<template>
  <div class="content-game-hght-hide">
    <div style="position:relative;z-index:999;margin-bottom:0.5em;">
    <mu-appbar  :title="'第 '+HIDDEN_hide_id+' 期寻狐'">
      <mu-flat-button color="white" label="规则？" slot="right" @click="fox_rules"/>
    </mu-appbar>
    <div class="top-roll" ><marquee>{{ marquee_tip}}</marquee></div>  <!--v-show="isMarqueeShow"-->
    <mu-tabs :value="activeTab" @change="handleTabChange">
    <mu-tab value="tab1" title="进行中"/>
    <mu-tab value="tab2"  title="已结束"/>
    </mu-tabs>
    </div>
     <div v-if="activeTab === 'tab1'&&HIDDEN_status=='HIDDEN'" >
     <div  class="ongoing" style="width:100%;height:100%;max-width:640px;position:absolute;background-size:100%;background-position:0px -6em;">
    
        <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee">

       <div style=" color:#333">本期总奖池数：&nbsp;&nbsp;&nbsp;<i class="mark-ft">{{HIDDEN_hide_osc_qty}}</i>&nbsp;&nbsp;OSC</div>
        </div>
        <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div style=" color:#333">本期寻狐次数：&nbsp;&nbsp;&nbsp;<i class="mark-ft">{{HIDDEN_bet_count}}</i>&nbsp;&nbsp;次</div>
      </div>
       <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div style=" color:#333">本期截止时间：&nbsp;&nbsp;&nbsp;<span class="mark-time-ft">{{HIDDEN_deadline | formatDate}}</span></div>
      </div>
      <div @click="hide_fox_show" style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div style=" color:#333;width:100%">寻&nbsp;&nbsp;狐&nbsp;&nbsp;&nbsp;详&nbsp;&nbsp;情：&nbsp;&nbsp;&nbsp;<span class="mark-ft">{{generation_bet_list_hide_count}}</span>&nbsp;&nbsp;OSC<i class="i_next"></i></div>
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
      <div class="high-game-btn-zone">
        <button class="high-game-btn" @click="openzhuang">注入奖池<br /><span>({{HIDDEN_inject_qty}} OSC)</span></button>
        <button class="high-game-btn" @click="openwan" style="float:right">寻狐<br /><span>({{HIDDEN_bet_osc_qty}} OSC)</span></button>
      </div>
      <div class="my-record">
        <div class="my-record-title">我的本期记录</div>
        <div class="my-record-content">
        <table  style="padding-bottom: 3em;">
          <tbody>
              <tr v-for="(item) in this.recordingList" :key="item.id"  >
                <td >#{{item[0]}}</td>
                <td > 带着 </td>  
                <td style="width:1.5em;text-align: right; color:#0A2463">{{item[1]}}</td>
                <td > OSC  去寻找 </td>
                <td style="width:1.5em;text-align: right; color:#0A2463" >{{item[2]}}</td>
                <td > 代</td>
              </tr>
          </tbody>
        </table>
          <!-- <div  v-for="(item) in recordingList" :key="item.id" >
            <div>
             <span style="color:#0A2463">#{{item[0]}}</span> 带着&nbsp;&nbsp;<span style="color:#0A2463">{{item[1]}}</span> OSC  去寻找<span class="game-gase-ft mark-time-ft">{{item[2]}}</span>代

            </div>
          </div>     -->
        </div>
      </div>
      </div>   
      <!-- <p>尚未开始，尽情期待</p> -->
    </div>
    <div v-if="activeTab === 'tab1'&&HIDDEN_status=='ROBBING'" >
      <p class="p1">游戏规则：</p>
      <p class="p2">每期游戏开始后，用户可以在截止时间前注入奖池、寻狐。</p>
       <p class="p3"> 1.注入奖池数量每次1000 - 50000，注入奖池的用户在扣掉寻狐奖励后按注入比例分配剩余的奖池。<br>
        2.寻狐数量每次1 - 1000，寻到正确代数将获得43倍奖励，上级推荐人奖励1倍。<br>
        3.平台不抽水，注入奖池、寻狐每次仅收取0.01OSC。<br>
        4.每周二/四/六晚上10点开奖，开奖狐狸代数，按香港6神特码为准。<br></p>
    </div>
     <div v-if="activeTab === 'tab2'"  >
      <div class="last_time-zone">
        <div class="time_serch_zone">
          <mu-icon value="search" :size="1.5"/>
          <input class="search-input" type="number" placeholder="输入您想查询的期数" v-model="searchId"/>
          <button class="search-btn" @click="search('id')">搜索</button>
        </div>
      </div>
            <!-- FINISHED_hide_id:'',
      FINISHED_hide_generation:'',
      FINISHED_hide_osc_qty:'',
      FINISHED_created:'',
      FINISHED_deadline:'',
      FINISHED_status:'',
      FINISHED_inject_qty:'',
      FINISHED_bet_osc_qty:'',
      FINISHED_award_qty:'',
      FINISHED_bet_count:'', -->
      <div class="last_time-zone-content-zone">
      <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div style=" color:#0A2463;">第{{FINISHED_hide_id}}期</div>
      </div>
      <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div style=" color:#333">开奖狐狸：&nbsp;&nbsp;&nbsp;<i class="mark-ft">{{FINISHED_hide_generation}}</i>&nbsp;&nbsp;代</div>
      </div>
       <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div style=" color:#333">奖池总额：&nbsp;&nbsp;&nbsp;<i class="mark-ft">{{FINISHED_hide_osc_qty}}</i>&nbsp;&nbsp;OSC</div>
      </div>
        <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div style=" color:#333">寻狐次数：&nbsp;&nbsp;&nbsp;<i class="mark-ft">{{FINISHED_bet_count}}</i>&nbsp;&nbsp;次</div>
      </div>
       <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div style=" color:#333">截止时间：&nbsp;&nbsp;&nbsp;<span class="mark-time-ft">{{FINISHED_deadline| formatDate}}</span></div>
      </div>
      <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div style=" color:#333;width:100%" @click="finsh_fox_detail">寻狐详情：&nbsp;&nbsp;&nbsp;<span class="mark-ft">{{generation_bet_list_finsh_count}}</span>&nbsp;&nbsp;OSC<i class="i_next"></i></div>
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
      <div style="text-align:right;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div style="display: flex">
       <button class="time-serch-choise-btn"  @click="search('new')">最新期</button>
       <button class="time-serch-choise-btn"  @click="search('last')">上一期</button>
       <button class="time-serch-choise-btn"  @click="search('pre')">下一期</button>
       </div>
      </div>
      </div>
      <p class="my-record-title">我的获奖记录</p>
      <div class="my-record-content" style="padding-top:0px;">
          <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div style=" color:#333">奖池注入：&nbsp;&nbsp;&nbsp;<i class="mark-ft-green">{{FINISHED_inject_qty}}</i>&nbsp;&nbsp;OSC</div>
      </div>
        <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div style=" color:#333">寻狐花费：&nbsp;&nbsp;&nbsp;<i class="mark-ft-green">{{FINISHED_bet_osc_qty}}</i>&nbsp;&nbsp;OSC</div>
      </div>
      <div style="text-align:left;padding:0.6em 1em;background:#fff;border-bottom:1px solid #eee"> 
       <div style=" color:#333">本期收益：&nbsp;&nbsp;&nbsp;<i class="mark-ft">{{FINISHED_award_qty}}</i>&nbsp;&nbsp;OSC</div>
      </div>
          <!-- <div  v-for="(item) in recordedList" :key="item.id" >
            <div style="padding:1em;line-hright:2;">
              #24564带着&nbsp;&nbsp;520 OSC  去寻找<span class="game-gase-ft mark-time-ft">4</span>代
              </div>
          </div> -->
          <!-- <div  v-for="(item) in recordedList" :key="item.id" >
            <div>
             <span style="width:100px; text-align:center;  color:#0A2463">#{{item[0]}}</span> 带着&nbsp;&nbsp;<span style="color:#0A2463">{{item[1]}}</span> OSC  去寻找<span class="game-gase-ft mark-time-ft">{{item[2]}}</span>代
            </div>
          </div>   -->
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
     <!-- <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/> -->

     <!-- <mu-dialog :open="dialog" title="Dialog" @close="close">
    这是一个简单的弹出框
    <mu-flat-button slot="actions" @click="close" primary label="取消"/>
    <mu-flat-button slot="actions" primary @click="close" label="确定"/>
  </mu-dialog> -->

    <mu-dialog :open="dialog" title="选择注入奖池的OSC"  @close="close" >
    <div class="dialog-title">OSC余额： {{OSC}} OSC</div>
    <div class="dialog-zone">
      <button class="choise-btn choise-btn1"  @click="inject_osc(1000)"><span>1000 OSC</span></button>
      <button class="choise-btn choise-btn2"  @click="inject_osc(2000)"><span>2000 OSC</span></button>
      <button class="choise-btn choise-btn3"  @click="inject_osc(5000)"><span>5000 OSC</span></button>
    </div>
    <div class="dialog-zone">
      <button class="choise-btn choise-btn1"  @click="inject_osc(10000)"><span>10000 OSC</span></button>
      <button class="choise-btn choise-btn2"  @click="inject_osc(20000)"><span>20000 OSC</span></button>
      <button class="choise-btn choise-btn3"  @click="inject_osc(50000)"><span>50000 OSC</span></button>
    </div>
  </mu-dialog>
  <mu-dialog :open="dialog2" title="选择你猜的代数">
    <div class="dialog-title">OSC余额： {{OSC}} OSC</div>
    <div class="dialog-zone">
      <input class="choise-input"  placeholder="猜1~49代" type="number"   maxlength="2"  oninput="if(value.length>2)value=value.slice(0,2)"  v-model="betGerneration"/>
      <button class="choise-btn choise-btn-input" @click="RndNum(1,49)" ><span>随机猜</span></button>
    </div>
    <div class="dialog-zone">
     
      <input class="choise-input" placeholder="猜1~1000 OSC"  type="number"   maxlength="4"  oninput="if(value.length>4)value=value.slice(0,4)"  v-model="betOscCounts"/>
      <button class="choise-btn choise-btn-input" @click="RndNum(1,1000)" ><span>随机投</span></button>
    </div>
    <div class="dialog-zone">
      <button class="choise-btn cancel-btn"  @click="close"><span>取消</span></button>
      <button class="choise-btn  sure-btn"  @click="betOpenBetFoxsDialog"><span>确定</span></button>
    </div>
  </mu-dialog>
  <mu-dialog :open="isOpenBetFoxsDialog"   :title="'第'+HIDDEN_hide_id+'期寻狐列表'">
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
    <mu-dialog :open="isRulesHelpDialog" title="寻狐规则介绍：" @close="close">
        每期游戏开始后，用户可以在截止时间前注入奖池、寻狐。<br>
        1.注入奖池数量每次1000 - 50000，注入奖池的用户在扣掉寻狐奖励后按注入比例分配剩余的奖池。<br>
        2.寻狐数量每次1 - 1000，寻到正确代数将获得43倍奖励，上级推荐人奖励1倍。<br>
        3.平台不抽水，注入奖池、寻狐每次仅收取0.01OSC。<br>
        4.每周二/四/六晚上10点开奖，开奖狐狸代数，按香港6神特码为准。<br> 
        <mu-flat-button slot="actions" primary @click="close" label="我知道了"/>
    </mu-dialog>
    <mu-dialog :open="isInjectOSCSureDialog"  title="提示"  @close="close">
          请确认是否注入 {{injectOscValue}} OSC到奖池。
          <div style="text-align:right">
          <mu-flat-button slot="actions" @click="close" primary label="取消"/>
          <mu-flat-button slot="actions" primary @click="inject_rob" label="注入奖池"/>
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
import moment from '../utils/moment';
import { CAPTCHA_SIGNIN } from "../models/url";
import { formatDate } from "../common/js/data";
import FoxBottomNav from '../components/FoxBottomNav';
import HttpResultCode from "../utils/HttpResultCode";
export default {
  name: 'game_fox_high',
  components: {FoxBottomNav},
  data () {
    return {
       toast:false,
       message:'',
       toastTimer:'',
      isRobShow:false,//抢庄UI控制器
      activeTab: 'tab1',
      dialog: false,
      dialog2: false,
      time:'',
      OSC:'',
      hide_id:'',
      fire_fox_id:'',
      // generation:'',
      // osc_qty:'',ROBBING
      refresh_timer: [],
      offsetHide:0,
      limit:10,
      totalHide:0,
      selectHideFoxsList:[],
      isOpenBetFoxsDialog:false,
      betGerneration:'',
      betOscCounts:'',
      isRulesHelpDialog:false,
      marquee_tip: "高级寻狐，马上开始！" ,   
      isMarqueeShow:false,
      created:'',
      recorddeadline:'',
      recordId:0,
      searchId:'',
      recordingList:[],
      recordedList:[],
      injectOscValue:'',
      isInjectOSCSureDialog:false,
      hide_info:{},
      HIDDEN_hide_id:'',
      HIDDEN_hide_generation:'',
      HIDDEN_hide_osc_qty:'',
      HIDDEN_created:'',
      HIDDEN_deadline:'',
      HIDDEN_status:'',
      HIDDEN_inject_qty:'',
      HIDDEN_bet_osc_qty:'',
      HIDDEN_award_qty:'',
      HIDDEN_bet_count:'',

      FINISHED_hide_id:'',
      FINISHED_hide_generation:'',
      FINISHED_hide_osc_qty:'',
      FINISHED_created:'',
      FINISHED_deadline:'',
      FINISHED_status:'',
      FINISHED_inject_qty:'',
      FINISHED_bet_osc_qty:'',
      FINISHED_award_qty:'',
      FINISHED_bet_count:'',
      scroller:null,
      loading:false,
      isHttp:false,
      isInit:true,
      generation_bet_list_hiding:[],
      generation_bet_list_finsh:[],
      generation_bet_list_finsh_count:'',
      generation_bet_list_hide_count:'',
      isDetailFinshShow:false,
      isDetailHideShow:false,
      
    }
  },
  mounted () {
    this.scroller = this.$el
  },
  filters: {
    formatDate (time) {
      if(time==''||undefined==time)return '';
      let date = new Date(parseFloat(time) *1000)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  created:function(){
      this.osc_hide_info();
      this.osc_hide_record();
       this.getBalance();
      this.time_refresh();
  },
  methods: {
    RndNum:function(start,end){
      if(end==49){
        this.betGerneration = Math.floor(Math.random()*parseInt(end)+ parseInt(start));
      }else if(end==1000){
        this.betOscCounts = Math.floor(Math.random()*parseInt(end)+ parseInt(start));
      }  
    },  
    finsh_fox_detail(){
      this.isDetailFinshShow =  !this.isDetailFinshShow;
    },       
    hide_fox_show(){
      this.isDetailHideShow =  !this.isDetailHideShow;
    }, 
    showToast:function(msg){
      this.toast=true
      this.message=msg
      this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
    },
    hideToast () {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    },
     openzhuang () {
      this.dialog = true
      this.getBalance();
    },
    openwan () {
      this.getBalance();
      this.dialog2 = true
      this.betGerneration =''
      this.betOscCounts = ''
      this.getHideFoxs();
    },
    close () {
      this.dialog = false;
      this.dialog2 = false;
      this.isOpenBetFoxsDialog = false;
      this.isRulesHelpDialog = false;
      this.isInjectOSCSureDialog = false;
      
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    fox_rules(){
      this.isRulesHelpDialog = true; 
    },
    handleActive () {
      // window.alert('tab active')
    },
    search(type){
      if(type=="id"){
        if(this.searchId==''){
          this.showToast("查询期数值需要大于0的整数")
        } else if(/^[1-9]\d*|0$/.test(this.searchId)){
             this.recordId =  parseInt(this.searchId)
             this.osc_hide_record();
        }else{
          this.showToast("查询期数值需要大于0的整数")
        }
      }else if(type=="last"){
        if(this.recordId>0){
          this.recordId = this.recordId-1;
          this.osc_hide_record();
        }else{
          this.recordId = 0;
          this.osc_hide_record();
        }
      }else if(type=="pre"){
         this.recordId = this.recordId+1;
          this.osc_hide_record();
      }else if(type=="new"){
          this.recordId =0;
          this.osc_hide_record();
      }
    },
    osc_hide_info(){
      game.osc_hide_info().then((data) =>{
        if(data.code==0){
           this.hide_info = data.data;
           if(this.hide_info.status=='HIDDEN'){
             this.HIDDEN_hide_id = this.hide_info.hide_id;
             this.HIDDEN_hide_generation = this.hide_info.hide_generation;
             this.HIDDEN_hide_osc_qty = this.hide_info.hide_osc_qty;
             this.HIDDEN_created = this.hide_info.created;
             this.HIDDEN_deadline = this.hide_info.deadline;
             this.HIDDEN_status = this.hide_info.status;
             this.HIDDEN_inject_qty = this.hide_info.inject_qty;
             this.HIDDEN_bet_osc_qty = this.hide_info.bet_osc_qty;
             this.HIDDEN_award_qty = this.hide_info.award_qty;
             this.HIDDEN_bet_count = this.hide_info.bet_count;
             if(this.hide_info.hasOwnProperty('bet_list')){
                this.recordingList = this.hide_info.bet_list
             }else{
                 this.recordingList = []
             }
             if(this.hide_info.hasOwnProperty('last_bet')){
                  let last_bet=    this.hide_info.last_bet
                  // this.isMarqueeShow = true;
                   let m = '#'+last_bet[0]+' 带着 '+last_bet[1]+' OSC 去寻找 '+last_bet[2]+' 代';
                  this.marquee_tip = m
             }else{
                // this.isMarqueeShow = false;
             }
            if(this.hide_info.hasOwnProperty('generation_bet_list')){
                let strs  = this.hide_info.generation_bet_list
                this.generation_bet_list_hiding = [];
                let count = 0;
                for(let i=0;i<strs.length;i++){
                  if(parseInt(strs[i])>0){
                    var strs_value = new Array(2);
                    strs_value[0] = i+1 ;
                    strs_value[1] = strs[i] ;
                    this.generation_bet_list_hiding.push(strs_value);
                    count = count+ parseInt(strs_value[1]);
                    // generation_bet_list_finsh_count
                  }
                  this.generation_bet_list_hide_count = count;
               }
             }else{
               this.generation_bet_list_hiding = [];
             }
           }else{
              // this.isMarqueeShow = false;
              this.generation_bet_list_hiding = [];
              this.HIDDEN_hide_id = this.hide_info.hide_id;
             this.HIDDEN_hide_generation = '';
             this.HIDDEN_hide_osc_qty ='';
             this.HIDDEN_created = '';
             this.HIDDEN_deadline = '';
             this.HIDDEN_status = this.hide_info.status;
             this.HIDDEN_inject_qty = '';
             this.HIDDEN_bet_osc_qty = '';
             this.HIDDEN_award_qty = '';
             this.HIDDEN_bet_count = '';
             this.recordingList =[]
             this.marquee_tip = "高级寻狐，马上开始！"    

           }
        }
      }).catch((e) => {
          this.showToast(HttpResultCode.validate(e.code));
      })
    },
    osc_hide_record(){
      game.osc_hide_record(this.recordId).then((data) =>{
        if(data.code==0){
          let finsh_hide_info = data.data;
             if(finsh_hide_info.status=='ROBBING'){
               if(this.isInit){
                  this.isInit = false;
               }else{
                 this.showToast('暂未开始！')
               }  
               return
             }
             this.generation_bet_list_finsh = [];
             this.recordId = finsh_hide_info.hide_id;
             this.FINISHED_hide_id = finsh_hide_info.hide_id;
             this.FINISHED_hide_generation = finsh_hide_info.hide_generation;
             this.FINISHED_hide_osc_qty = finsh_hide_info.hide_osc_qty;
             this.FINISHED_created = finsh_hide_info.created;
             this.FINISHED_deadline = finsh_hide_info.deadline;
             this.FINISHED_status = finsh_hide_info.status;
             this.FINISHED_inject_qty = finsh_hide_info.inject_qty;
             this.FINISHED_bet_osc_qty = finsh_hide_info.bet_osc_qty;
             this.FINISHED_award_qty = finsh_hide_info.award_qty;
             this.FINISHED_bet_count = finsh_hide_info.bet_count;
              this.recordedList = [];
             if(finsh_hide_info.hasOwnProperty('bet_list'))
                this.recordedList = finsh_hide_info.bet_list
             if(finsh_hide_info.hasOwnProperty('generation_bet_list')){
               let strs  = finsh_hide_info.generation_bet_list
               let count = 0;
               this.generation_bet_list_finsh = [];
               for(let i=0;i<strs.length;i++){
                  if(parseInt(strs[i])>0){
                    var strs_value = new Array(2);
                    strs_value[0] = i+1 ;
                    strs_value[1] = strs[i] ;
                    this.generation_bet_list_finsh.push(strs_value);
                    count = count+ parseInt(strs_value[1]);
                    // generation_bet_list_finsh_count
                  }
                  this.generation_bet_list_finsh_count = count;
               }
             }             
        }
      }).catch((e) => {
        this.showToast(HttpResultCode.validate(e.code));
      })
    },
    betCommit(item){
      if(this.isHttp){
        return
      }
      this.isHttp = true;
      this.isOpenBetFoxsDialog = false;
      game.bet_osc_hide(this.HIDDEN_hide_id,item.id,this.betGerneration,this.betOscCounts).then((data) =>{
          this.isHttp = false;
          if(data.code==0)
        setTimeout(()=> {
            this.init_data()
          },1000)
      }).catch((e) => {
        this.isHttp = false;
       this.showToast(HttpResultCode.validate(e.code));
      })
    },
    inject_osc_hide(){
      if(this.isHttp){
        return
      }
      this.isHttp = true;
      game.inject_osc_hide(this.HIDDEN_hide_id,this.injectOscValue).then((data) =>{
        this.isHttp = false;
        if(data.code==0)
        setTimeout(()=> {
            this.init_data()
          },1000)
      }).catch((e) => {
        this.isHttp = false;
        this.showToast(HttpResultCode.validate(e.code));
      })
    },
    init_data(){
      this.osc_hide_info();
      // this.getBalance();
    },
    betOpenBetFoxsDialog(){
      if(this.betGerneration.length==0){
        this.showToast("请输入1-49代数")
        return
      }
      if(this.betOscCounts.length==0){
        this.showToast("请输入1-1000 OSC数量")
        return
      }
      if(!(/^[1-9]\d*|0$/.test(this.betGerneration))){
           this.showToast("请输入1-49代数")
        return
      }
      if(!(/^[1-9]\d*|0$/.test(this.betOscCounts))){
          this.showToast("请输入1-1000 OSC数量")
        return
      }
      if(!(parseInt(this.betGerneration)<=49&&parseInt(this.betGerneration)>=1)){
          this.showToast("请输入1-49代数")
          return
      }
      if(!(parseInt(this.betOscCounts)<=1000&&parseInt(this.betOscCounts)>=1)){
          this.showToast("请输入1-1000 OSC数量")
          return
      }
      this.dialog2 = false;
      this.isOpenBetFoxsDialog = true;
    },
    inject_osc(counts){
      this.injectOscValue = counts;
      this.dialog = false;
      this.isInjectOSCSureDialog = true;
    },
    inject_rob(){
      this.isInjectOSCSureDialog = false;
      this.inject_osc_hide();
    },
    getHideFoxs:function (){
      this.offsetHide=0
      this.selectHideFoxsList=[]
      game.foxMine('','GENERATION_ASC', this.offsetHide,this.limit).then((data) =>{
         if(parseInt(data.data.total)===0){
            this.isOpenHideFoxsDialog = false;
            this.isHideFoxTipDialog = false; 
          this.showToast("狐狸尚未修炼，请先修炼自己的狐狸。");
          return
        }
        this.selectHideFoxsList=[];
        this.dealData(data);
        }).catch((e) => {
            this.isOpenHideFoxsDialog = false;
            this.isHideFoxTipDialog = false; 
          switch(e.code){
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
      })
    },
    nextPage:function (){
      if(this.offsetHide>=this.totalHide){//加载完成
        this.showToast("加载完成");
        return
      }
      game.foxMine('','GENERATION_ASC', this.offsetHide,this.limit).then((data) => {
        this.dealData(data);
        }).catch((e) => {
      })
    }, 
    dealData(data){//数据处理函数
      var colors=["#f7dce1","#f7dcf4","#e7dbee","#e2e6ff","#dff9ff","#ebfff4","#edffdf","#fff8dc","#ffebdc"];
      for(var i=0;i<data.data.list.length;i++){
            var item = data.data.list[i];
            item.bg = 'background:'+colors[(item.appearance[0]-1)];
            data.data.list[i] = item;
        }
        this.offsetHide = this.offsetHide+data.data.list.length;
        this.totalHide = data.data.total;
        this.selectHideFoxsList = this.selectHideFoxsList.concat(data.data.list);
    },
    getBalance:function(){
      game.balance().then((data) =>{
        let list = data.data.list
        for(let i = 0; i < list.length; i++){
          if(list[i].currency === 'OSC'){
            this.OSC = list[i].available
          }
        }
      }).catch((e) => {
        console.log("e = "+e.code)
      })
    },
    loadMore(){

    },
    time_refresh:function () {
    this.clear_refresh();
    let sec = 10
    for (let i = 0; i <= 10; i++) {
      this.refresh_timer.push(window.setTimeout(() => {
        if (sec !== 0) {
          sec--
        } else {
          sec = 10
          if('game_fox_high'!=this.$route.name){
              this.clear_refresh();
              return;
          }
         this.init_data();
          setTimeout(()=> {
            this.time_refresh()
          },1000)
        }
      }, i * 1000))
    }
  },
  clear_refresh: function () {
    for(let i = 0; i < this.refresh_timer.length; i++){
      clearTimeout(this.refresh_timer[i])
    }
    this.refresh_timer = []
  },  
  },
  beforeDestroy: function () {
    for(let i = 0; i < this.refresh_timer.length; i++){
      clearTimeout(this.refresh_timer[i])
    }
 }

}
</script>

<style lang="scss" scope>
@import "../assets/css/high.scss";
</style>


