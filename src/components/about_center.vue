<template>
  <div class="content" style="background:#F3F5F7;">
    <div class="top">
      <div class="center">{{$t('Text.mine_tab6')}}</div>
      <div class="left" @click="goBack" />
    </div>
   <div class="share_btn_zone_user" style="margin:0px;">
    <div class="share_btn_zone" style="background:#F3F5F7;padding-top:3.8em">
            <div class="share_btn bottom_border" @click="go" >
                <!-- <i class="wallet"></i> -->
                <span style="color:#4E586E">{{$t('Text.sxfsm')}}</span>
                <i   class="go" style="width: 1.5em;"></i> 
            </div>
    </div>
  </div>
  <div v-show="isSHow" style="padding:0.5em;">
          <div style="padding:0.5em;text-align: left; font-size: 0.8em; color: #808080;"   v-for="(item) in this.user_levels" :key="item.amount"  >
              {{item.value}}
          </div>
        </div>
    <div class="share_btn_zone_user" style="margin-top:1px;">
    <div class="share_btn_zone">
            <div class="share_btn bottom_border"  >
                <!-- <i class="wallet"></i> -->
                <span style="color:#4E586E">{{$t('Text.dqbb')}}</span>
                <!-- <i style="margin-top:1em;margin-right:1em;color:#4E586E">{{version}}</i>  -->
                 <span style="margin-right:1em;color:#4E586E;float:right;text-align: right">{{version}}</span>           
            </div>
    </div>
  </div>
   <div class="share_btn_zone_user" style="margin-top:1px;">
        <div class="share_btn_zone" style="background:#F3F5F7;padding-top:10px">
           <div  class="share_btn"> 
             <!-- <i class="gfkf"></i> -->
              <span style="color:#4E586E;">{{$t('Text.gfwx')}}</span>
              <span style="margin-right:1em;color:#4E586E;float:right;text-align: right">cxotc001</span>
              
            </div>
          </div>
   </div>
   <!--<div class="share_btn_zone_user" style="margin-top:1px;">
        <div class="share_btn_zone">
           <div  class="share_btn"> 
              <span style="color:#4E586E;">{{$t('Text.gfqq')}}</span>
              <span style="margin-right:1em;color:#4E586E;float:right;text-align: right">945742654</span>
              
            </div>
          </div>
   </div>-->
   <div class="share_btn_zone_user" style="margin-top:1px;">
        <div class="share_btn_zone" >
           <div  class="share_btn"> 
             <!-- <i class="gfkf"></i> -->
              <span style="color:#4E586E;">{{$t('Text.gftkf')}}</span>
              <span style="margin-right:1em;color:#4E586E;float:right;text-align: right">cxotcservice</span>
              
            </div>
          </div>
   </div>
   <div class="share_btn_zone_user" style="margin-top:1px;">
        <div class="share_btn_zone" >
           <div  class="share_btn"> 
             <!-- <i class="gfkf"></i> -->
              <span style="color:#4E586E;">{{$t('Text.jrtqz')}}</span>
              <span style="margin-right:1em;color:#4E586E;float:right;text-align: right">cxotcgroup</span>
              
            </div>
          </div>
   </div>

     
  </div>
</template>

<script>
import BottomNav from '../components/BottomNav'
import store from '../store'
 import storage from '../models/storage'
import {SET_USER,CLEAN_USER} from '../store/mutation-types'
import user from "../models/user";
import Clipboard from 'clipboard'
export default {
  name: 'User',
  components:{BottomNav},
  data () {
    return { 
      toast:false,
      message:'',
      version:'1.0.0',
      reward_levels:[],
      user_levels:[],
      isSHow :false,
      service:''

    }
  },
  created: function() {
    this.getAbout();
  },
  methods:{

   goBack() {
      this.$router.go(-1);
      },
    go(){
     this.isSHow = !this.isSHow

    },
    getAbout(){

       user
        .aboutAs()
        .then(result => {

//           reward_levels: [0.5]
// 0: 0.5
// service: "test@test.gt"
// user_levels: [{amount: 0, fee_rate: 0.01}, {amount: 5000, fee_rate: 0.008}, {amount: 20000, fee_rate: 0.005},…]
// 0: {amount: 0, fee_rate: 0.01}
// 1: {amount: 5000, fee_rate: 0.008}
// 2: {amount: 20000, fee_rate: 0.005}
// 3: {amount: 50000, fee_rate: 0.003}
// 4: {amount: 100000, fee_rate: 0.001}


    // "fee2": "用户等级，LV1、LV2、LV3;根据用户交易量（USDT）升阶",
    // "fee3": "LV1:交易量0~5000USDT,手续费1%",
    // "fee4": "LV2:交易量5001~20000USDT,手续费0.8%",
    // "fee5": "LV3:交易量20001~50000USDT以上,手续费0.5%",
    // "fee6": "LV4:交易量50001~100000USDT以上,手续费0.3%",
    // "fee7": "LV5:交易量100001USDT以上,手续费0.1%",

          if (result.code === 0) {
              this.version = result.data.version
              this.service = result.data.service
              this.reward_levels =  result.data.reward_levels
              // for(var p=0;p< result.data.user_levels.lenght;p++){
              //     if(p+1!=result.data.user_levels){
              //        result.data.user_levels[p].amount =  result.data.user_levels[p+1].amount
              //     }else{
              //        result.data.user_levels[p].amount =result.data.user_levels[p].amount+this.$t("Text.ys");
              //     }
              // }
              var p=0;
           var l =   result.data.user_levels.length;
          var levels =  result.data.user_levels;
          
             result.data.user_levels.forEach(element => {
                  if(p+1!=l){
                     element.amount1 = levels[p+1].amount
                      element.amount2 = levels[p+1].amount
                  }else{
                     element.amount1 =levels[p].amount+1+this.$t("Text.ys");
                      element.amount2 =levels[p].amount +1
                  }
                  p = p+1;
              });
           
              var i =1;
              var v = 0;
              result.data.user_levels.forEach(element => {
                 element.value = "LV"+i +":"+ this.$t("Text.jyl")+ v+"-"+element.amount1+"USDT,"+ this.$t("Text.sxf") + (parseFloat(element.fee_rate)*100) +"%"
                if(i==l){
                  element.value = "LV"+i +":"+ element.amount1+"USDT,"+ this.$t("Text.sxf") + (parseFloat(element.fee_rate)*100) +"%"
                }
               
                i = i+1
                v = element.amount2 +1
              });
              this.user_levels = result.data.user_levels
          }
        })
        .catch(e => {
          
        });
    },

     getAccount(){
        var u = navigator.userAgent, app = navigator.appVersion;  
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        if(isAndroid){
          let account =  getVersionSync();
          if(account != ''){
             this.version = account
          }
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
   @import "../assets/css/help_center.scss";  
</style>
