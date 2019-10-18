<template>
  <div class="content">
    <mu-appbar  :title="'第'+item.hide_id+'期寻狐'">
       <mu-icon-button style="font-size:3em;width:1em;" icon="keyboard_arrow_left" slot="left"  @click="goBack" />
    </mu-appbar>
     <div v-show="isShow">
         <div style="display: flex;width:100%"><h4 style="background:#f5f5f5;padding: 0px;line-height:2.4;margin:0px;width:100%"><i style=" margin-left: 1.3em;float:left;color:#0A2463">#{{item.hide_fire_fox_id}}</i> <i style="margin-right: 1.3em;float:right;color:#0A2463">{{generation}}代</i></h4> </div>
         <div class="list-content-big" >
          <div class="list-content">
            <div class="list-img" id="list-img" :style="appearance[0]" style="margin-top:0.5em;">
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
              <h4 style="margin-top:0px;">藏丹数量：<i>{{item.hide_dan_qty}}</i>颗</h4>
              <div class="right-content-zone">
                <p>最大可寻狐丹数量：<i>{{item.max_bet_dan_qty}}</i>颗</p>
                <p>已寻狐丹数量：<i>{{item.bet_dan_qty}}</i>颗</p>
                <p>开始时间：<i>{{item.created | formatDate}}</i></p>
               <p>开奖时间：<i>{{item.updated | formatDate}}</i></p>
              </div>
              <!-- <div class="sell-btn-zone" v-show="!ismy">
                  <mu-raised-button v-show="othersell" label="立即购买" @click="buyfoxhint" class="demo-raised-button" secondary/>
                  <mu-raised-button v-show="othersellmate" label="立即造狐" @click="buyfoxhint2" class="demo-raised-button" secondary/>
              </div> -->
            </div>

          </div>
            <p style="text-align: left;font-size: 0.8em;padding-bottom: 0px;margin-bottom: 0px;word-break:break-all;">随机数：<i>{{item.random}}</i></p>
            <p style="text-align: left;font-size: 0.8em;padding-bottom: 0px;padding-top: 0px;margin-top: 0px;margin-bottom: 0px;word-break:break-all;">hash：<i>{{item.hash}}</i></p>
        </div> 
              <!-- {{item}} -->
    <div class="list-content-big" style="margin-top: 0.6em;">
      <div style="display:flex;" > 
          <button class="hide-change-btn"  :class="{disable:isHide}"  @click="changeTab(false)" >寻狐</button>
          <button class="hide-change-btn"  :class="{disable:!(isHide)}"  @click="changeTab(true)" >开奖</button>
          <!-- <button class="sell-change-btn" :class="{disable:!(this.isSell)}"  @click="tradeChange(true)">限价卖</button>//:class="{disable:this.isSell}"    @click="tradeChange(false)" -->
      </div>
      <!--寻狐-->
        <div class="my-list-content-zone-game" v-show="!isHide">
        <div class="my-list-content-big-game" v-for="(bet,index) in item.bet_list" :key="index">
            <div class="my-list-content-game"  >
                <p>
                  #{{bet[0]}} 带着 {{bet[1]}} 颗狐丹去寻找 <span v-if="bet[2]===generation" style="color:#0A2463">{{bet[2]}}</span> <span v-if="bet[2]!=generation" >{{bet[2]}}</span>代狐
                  </p>
              </div>
        </div>
      </div> 
      <!--开奖-->
      <mu-table multiSelectable enableSelectAll ref="table" class="fox-table" :showCheckbox="false" v-show="isHide">
        <mu-tbody>
          <mu-tr  v-for="(settle,index) in item.settle_list" :key="index">
            <mu-td class="list-time" style="padding-left:5px" @click="hashDialog(settle[5])">#{{settle[0]}}</mu-td>
            <mu-td class="list-left" @click="hashDialog(settle[5])">+{{settle[1]}}+{{settle[2]}}+{{settle[3]}}</mu-td>
            <mu-td class="list-right" @click="hashDialog(settle[5])">+{{settle[4]}}颗</mu-td>
            <mu-td class="list-right-ico" style="padding-right:5px"  @click="hashDialog(settle[5])"><mu-icon  v-if="true" value="help"   :size="1.2"/></mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
      
    </div>
    <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="danHashPopup" @close="close('danHash')">
              <mu-appbar title="hash">
                <mu-flat-button slot="right" label="关闭" color="white" @click="close()"/>
              </mu-appbar>
              <mu-content-block>
                <p><br />hash = </p>
                <p>{{this.hash}}</p>
              </mu-content-block>
      </mu-popup>
      </div>
  </div>
</template>

<script>
import nprogress from "nprogress";
import game from "../models/game";
import validate from "../utils/validate";
import moment from '../utils/moment';
import { CAPTCHA_SIGNIN } from "../models/url";
import { formatDate } from "../common/js/data";
// import BottomNav from '../components/BottomNav';
export default {
  name: 'game_fox_hide_detail',
  components: {},
  data () {
    return {
      isShow:false,
      bet_dan_qty:'',
      created:'1518095652',
      deadline:'1518095652',
      hide_dan_qty:'',
      hide_fire_fox_id:'',
      hide_id:'',
      max_bet_dan_qty:'',
      updated:'1518095652',
      item:'',
      appearance:[],
      generation:'',
      isHide:false,
      danHashPopup:false,
      hash:'',
      bet:[],
      bg:'',
    }
  },

  filters: {
  formatDate (time) {
    let date = new Date(time*1000)
    return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
  }
},
  created:function(){
    this.getParams();
    this.getfox();

    
  },
  methods: {
   goBack() {
      this.$router.go(-1);
      },
    getParams() {
        // 取到路由带过来的参数 
       this.item = this.$route.query.dataObj
        // 将数据放在当前组件的数据内
      },
      hashDialog:function(h){
        this.hash = h;
       this.danHashPopup = true;
      },
      close:function(){
         this.danHashPopup = false;
      },
     getfox: function (){
      game.foxDetail(this.item.hide_fire_fox_id).then((data) => {
        this.appearance =   data.data.appearance
        this.generation =   data.data.generation
        var colors=["#f7dce1","#f7dcf4","#e7dbee","#e2e6ff","#dff9ff","#ebfff4","#edffdf","#fff8dc","#ffebdc"];
        this.bg = 'background:'+colors[( data.data.appearance[0]-1)]; 
        this.isShow = true;
      }).catch((e) => {
      })
    },
    changeTab:function(hide){
      this.isHide = hide;
    },
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    }

}
</script>

<style lang="scss" scope>
@import "../assets/css/hideDetail.scss";
</style>


