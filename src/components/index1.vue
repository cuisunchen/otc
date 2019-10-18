<template>
   <div class="index-content" >
     <div class="top">
      <div class="center">精品推荐</div>
    </div>
     <!-- <img src="../../static/icon_user_my_ad.png">
    <P>icon_user_my_ad</P>
    <img src="../../static/bibi1_1.png">
     <P>bibi1_1</P>
    <img src="../../static/icon_safe_ok.png">
    <P>icon_safe_ok</P>
    <img src="../../static/bibi1.png">
    <P>bibi1</P>
    <img src="../../static/home1.png">
    <P>home1</P>

<img src="../assets/image/bibi1.png">
    <P>bibi1</P> -->
    
    <div style="padding:1em;padding-top:4em;padding-bottom:4em;">
      <div  v-for="(item) in this.banners" :key="item.pic_url" @click="redirect(item.redirect)">
        <div class="img-zone" style="border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #fff;box-shadow:0px 1px 3px rgba(0,0,0,.2);margin-bottom:1em;border-radius: 0.2em;">
            <img style="width: 100%; display: block;" :src="item.pic_url">
            <div class="title-zone" style="padding:0.3em 0.5em;text-align:left;">
                {{item.info.split(" ")[0]}}
                <button style="float:right;background:#b28cde;border:0px solid #fff;;border-radius: 0.1em;color:#fff;height:1.5em;padding:0px 0.8em;">{{item.info.split(" ")[1]}}</button>
            </div>
        </div>
      </div>
    </div>
    <BottomNav></BottomNav> 
   </div>
</template>

<script>
import BottomNav from '../components/BottomNav'
import nprogress from "nprogress";
import wallet from '../models/wallet'
import store from '../store'
import storage from '../models/storage'
import user from "../models/user";
import lib from '../utils/lib'
import HttpResultCode from "../utils/HttpResultCode";
import { formatDate } from "../common/js/data";
import {SET_CRYPTO_CURRENCY,CLEAN_USER,SET_USER,CURRENCY_TO_CURRENCY} from '../store/mutation-types'
export default {
  name: 'index',
  components:{BottomNav},
     data () {
      return {
         banners:[],
        //  isLoaded:false,
      }
    },
    created:function(){
      this.getBanner();
      setTimeout(() =>{
          this.getAccount();
        },1000)
        // if(this.isIos()){
        //   getVersionIos();
        // }
         
    },
    methods:{
      redirect(redirect){
        // if(this.isLoaded)
         this.$router.push('/'+redirect)      
      },
      getBanner(){
          user.banner_list().then(result => {
          if(result.code==0){
             this.banners = result.data.banners;
          }
        }).catch((e) => {
        })
      },
      isIos(){   //判断是否是安卓还是ios  
        var u = navigator.userAgent, app = navigator.appVersion;  
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器  
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端  
        return isiOS==true?true:false;  
      },
      getAccount(){
        var u = navigator.userAgent, app = navigator.appVersion;  
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        if(isAndroid){
          let account =  pluginGetString();
          if(account != ''){
            let accounts=account.split("-firefox-"); //字符分割 
            let access_token = accounts[0]
            let name = accounts[1]
            let has_payment_password = accounts[2]
            let mobile = accounts[3]
            storage.set('at', access_token)
            storage.set('name', name)
            storage.set('hpp', has_payment_password)
            storage.set('mobile', mobile)
            store.commit(SET_USER, {
              name: name,
              access_token: access_token,
              has_payment_password: has_payment_password === true || has_payment_password === 'true' ? true : false,
              mobile:mobile
            })
          }
        }
      },
      
   }

 }
</script>
<style  lang="scss"  scoped>
  @import "../assets/css/index.scss";  
</style>
