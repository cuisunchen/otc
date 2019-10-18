<template>
  <div class="content" style="padding-top:3em;">
    <div class="top">
      <div class="center">{{$t('Text.jllb')}}</div>
      <div class="left" @click="goBack" />
    </div>
    <div class="share-div">
        <div class="share-div-left" >
          <div class="p1">{{inviteCounts}}</div>
          <div  class="p2">{{$t('Text.yqrs')}}</div>
          
        </div>
        <div class="share-div-line"></div>
        <div class="share-div-right">
          <div class="p1">{{usdtValue}}</div>
          <div  class="p2">{{$t('Text.ljjl')}}</div>
        </div>
    </div>
    <div 
     class="div-share-empty"
    ></div>

    <table  class="reward-table">
      <tbody><!--#FF4E586E -->
        <tr class="reward-table-head" style="color:#4E586E;     border-bottom: 1px solid #F3F5F7;"> 
          <td style="text-align: left;padding-left:1.5em;font-size:14px;line-height:3.5;color:#4E586E">{{$t('Invite.Created')}}</td>
          <td style="text-align: right;padding-right:1.5em;font-size:14px;line-height:3.5;color:#4E586E" >{{$t('Invite.Reward')}} USDT</td>
        </tr>
        <tr v-for="(item) in this.list" :key="item.id" class="reward-table-item"  style=" color:#4E586E;      border-bottom: 1px solid #F3F5F7;">
          <td class="reward-table-item-left" style="text-align: left;padding-left:1.5em;font-size:14px;line-height:3.5">{{item.created |getformatDate }}</td>
          <td class="reward-table-item-right">{{item.amount}}&nbsp;{{item.currency.toUpperCase()}}</td>
        </tr> 
      </tbody>
    </table>
    <div v-if="this.list.length === 0" style="margin-top:50px;">
      <img src="../assets/image/nobody.png" style="width:90px; height:90px;"/>
      <p style="color:#A9B2C3;font-size:14px;">{{$t('Invite.zwyq')}}</p>
    </div>
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
  </div>
</template>

<script>
import nprogress from "nprogress";
import wallet from '../models/wallet'
 import store from '../store'
 import storage from '../models/storage'
import user from "../models/user";
import lib from '../utils/lib'
import HttpResultCode from "../utils/HttpResultCode";
import { formatDate } from "../common/js/data";
import {SET_CRYPTO_CURRENCY,CLEAN_USER,SET_USER} from '../store/mutation-types'
export default {
  name: 'share_rewards',
  components:{},
     data () {
      return {
        scroller:null,
        loading:false,
        offset:0,
        limit:30,
        list:[],
        total:1,
        inviteCounts:0,
        usdtValue:0
      }
    },
    beforeRouteEnter (to, from, next) {
      nprogress.set(0.6);
      user.getInviteRewardDetail(0,30).then(result => {
        nprogress.done()
        let list = []
        let total = 0;
        if(result.code === 0 && result.data.total > 0){
          list = result.data.reward_details
          total = result.data.total
        }
        next(vm => {
          vm.list = list;
          vm.offset = list.length;
          vm.total = total;
        })
      }).catch((e) => {
         nprogress.done()
         HttpResultCode.validate(e.code)   
      })
    },
    filters: {
      getformatDate (time) {
        let date =new Date(parseInt(time));
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
   },
   mounted () {
    this.scroller = this.$el
   },
     created() {
      this.getSummary();
    },
   methods: {
    goBack() {
    this.$router.go(-1);
    },
  
    getSummary(){ 
     user
      .getInviteRewardSummary()
      .then(result => {
        let summary_result = result.data;
      
        let referral_code = 0;
        // let invite_count = 0;
        let reward_summary = summary_result.rewards;
        // alert(JSON.stringify(reward_summary))
        this.inviteCounts = summary_result.invite_count;
         var rewards = [];
        let mobile_invite = summary_result.mobile_invite;
        referral_code = summary_result.referral_code;
        if (typeof reward_summary != "undefined") {
            if(reward_summary.usdt)
             this.usdtValue = reward_summary.usdt.amount;
        }
      })
      .catch(e => {
        // alert(e.message)
      });
    },
    loadMore(){
      if('/share_rewards'!=this.$route.path ){
                // console.log('this.$route.path = '+this.$route.path)
                return;
      }
      if(this.loading){
        return;
      }
      if(this.total<=this.offset){
          this.loading = false
        return;
      }
      this.loading = true;
      user.getInviteRewardDetail(this.offset,this.limit).then(result => {
          this.loading = false;
        if(result.code === 0 && result.data.total > 0){
          this.list = this.list.concat(result.data.reward_details);
          this.total = result.data.total
          this.offset = this.list.length;
        }
      }).catch(function () {
         this.loading = false;
      });
    }
  }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss"  scoped>
    @import "../assets/css/share_rewards.scss";  
</style>
