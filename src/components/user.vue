<template>
  <div class="content-user">
    <section class="user-header">
      <h1  @click="signIn">
        {{name}}
        <img src="../assets/image/icon-boss.png" class="img-boss" style="width:1.3rem"/>
        <span v-show="level!=-1" class="user-level fs-12">LV{{level}}</span>
      </h1>
      <p class="p2">{{$t('Text.trade_total_usdt')+": "+ this.trade_total_usdt+" USDT "+ $t('Text.trade_success_ratio')+": "+ parseInt(this.trade_success_ratio)  +" %" }}</p>
    </section>
    <div class="fix-content">
        <wc-swiper :autoplay="false" :pagination="false" style="height: 100%;">
				    <wc-slide style="padding-top: 4px;">
				        <h1>{{ this.total_usdt }}  <span class="fs-14">USDT</span></h1>
				        <p class="fs-12">{{ $t('Text.mine_tab_all') }}</p>
				        <div class="changeMoney">
				          <div class="left" @click="recharge"><img src="../assets/image/icon-money2.png" class="img-left"/>{{$t('Wallet_Detail.top_up')}}</div>
				          <div class="right" @click="cash" style="border-right: 0.06667rem solid #e6e9ef;" > <img src="../assets/image/icon-money1.png" class="img-right"/>{{$t('Wallet_Detail.withdrawal')}}</div>
				          <div class="right"> <img src="../assets/image/hz.png" class="img-right"/>{{$t('Wallet_Detail.hz')}}</div>
				        </div>
				    </wc-slide>
				    <!--点卡-->
				    <wc-slide style="height: 100%;width:100%;border-radius:2px;background: #FF8742;">
				    	<div style="color: #fff;margin-left: 10px;">
				    		<div @click="pointCard" style="margin-top: 6px;font-weight: 500;font-size: 24px;">
				    			<span>{{cardData.card_available}}</span>
				    			<img style="margin-right: 10px;float: right;margin-top: 6px;" height="18" src="../assets/image/rights.png"/>
				    		</div>
					    	<div style="font-size: 12px;">我的点卡余额</div>
					    	<div style="font-size: 16px;margin-top: 10px;">{{cardData.card_locked}}</div>
					    	<div style="font-size: 12px;">冻结</div>
				    	</div>
				    </wc-slide>
				</wc-swiper>
    </div>
   <div class="share_btn_zone_user psf40">
        
         <div class="share_btn_zone">
           <div class="share_btn" @click="wallet">
              <i class="wallet"></i>
              <span>{{$t('Text.mine_tab1')}}</span>
              <i class="go"></i>
           </div>
          </div>
          <!--我的点卡-->
          <div class="share_btn_zone">
           <div class="share_btn" @click="pointCard">
              <i class="mine_tab1a"></i>
              <span>{{$t('Text.mine_tab1a')}}  
              	<span class="Preferential">{{$t('Text.Preferential')}}</span>
              </span>
              <i class="go"></i>
           </div>
          </div>
          
          <div class="share_btn_zone">
           <div class="share_btn bottom_border" @click="Add_address">
              <i class="addressMoney"></i>
              <span>{{$t('Text.mine_tab2')}}</span>
              <i class="go"></i>
           </div>
          </div>
          <div class="share_btn_zone">
           <div class="share_btn bottom_border" @click="sets">
              <i class="safe_u"></i>
              <span>{{$t('Text.mine_tab3')}}</span>
              <i class="go"></i>
           </div>
          </div>

          <div class="share_btn_zone">
           <div class="share_btn bottom_border" @click="invite">
              <i class="invite_u"></i>
              <span>{{$t('Text.mine_tab4')}}</span>
              <i class="go"></i>
           </div>
          </div>
           
           <!-- <div style="width:100%;height:0.8em;background:#F3F5F7;"></div> -->

          <div class="share_btn_zone" >
           <div class="share_btn bottom_border" @click="help">
              <i class="help_u"></i>
              <span>{{$t('Text.mine_tab5')}}</span>
              <i class="go"></i>
           </div>
          </div>

        <!-- <div class="share_btn_zone">
           <div class="share_btn bottom_border" @click="gd">
              <i class="help"></i>
              <span>{{$t('Text.gd')}}</span>
              <i class="go"></i>
           </div>
          </div> -->

        <div class="share_btn_zone">
           <div class="share_btn bottom_border" @click="about">
              <i class="about_u"></i>
              <span>{{$t('Text.mine_tab6')}}</span>
              <i class="go"></i>
           </div>
          </div>
          
         <div class="share_btn_zone">
           <div class="share_btn bottom_border bottom_top" @click="signIn">
              <i class="persent_e"></i>
              <span>{{$t('Text.persent')}}</span>
              <i class="go"></i>
           </div>
          </div>

          <!-- <div class="share_btn_zone">
           <div class="share_btn bottom_border" @click="invite">
              <i class="share-ico"></i>
              <span>{{$t('Tab.Tab3')}}</span> <i class="share-hot"></i>
              <i class="go"></i>
           </div>
          </div> -->

          
          
          <!-- <div class="share_btn_zone">
          <div class="share_btn bottom_border" @click="sets">
              <i class="anquan"></i>
              <span>{{$t('User.SafeCenter')}}</span>
              <i class="go"></i>
          </div>
          </div> -->
   </div>
   <!-- <div class="share_btn_zone_user">
          <div class="share_btn_zone">
          <div class="share_btn bottom_border" @click="help">
              <i class="help"></i>
              <span>帮助中心</span>
              <i class="go"></i>
          </div>
          </div>
          <div class="share_btn_zone" v-show="isDown||isISO">
          <div class="share_btn bottom_border" @click="about">
              <i class="about"></i>
              <span>关于火狐狸</span>
              <i class="go"></i>
          </div>
          </div>
   </div> -->
   <!-- <div class="share_btn_zone_user" style="margin-top:2.5em;" v-show="isDown" >
      <div class="share_btn_zone"  style="padding:0px;">
          <div class="share_btn bottom_border" >
              <span style="margin:0px;text-align:center" @click="downApp"> <a  style="color:#333" href="https://m.firefoxotc.com/download/android">APP下载</a></span>
          </div>
          </div>
   </div> -->
<!-- <div class="share_btn_zone_user" style="margin-top:2.5em;" v-show="isISO" >
      <div class="share_btn_zone"  style="padding:0px;">
          <div class="share_btn bottom_border" >
              <span style="margin:0px;text-align:center" @click="downApp"> <a  style="color:#333" href="https://www.pgyer.com/Hfcr">APP下载</a></span>
          </div>
          </div>
   </div> -->
   
   <!-- <div class="share_btn_zone_user">
      <div class="share_btn_zone"  style="padding:0px;">
          <div class="share_btn bottom_border" @click="signOutShowDialog">
              <span style="margin:0px;text-align:center">{{$t('User.Exit')}}</span>
          </div>
          </div>
   </div> -->


  <mu-dialog :open="isSignOutDialog" :title="$t('User.Exit_tip')" >
        {{$t('User.Exit_Content_tip')}}
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
        <mu-flat-button slot="actions" primary @click="signOUt" :label="$t('User.Exit')"/>
  </mu-dialog>
  <mu-dialog :open="isRealNameDialog" :title="$t('User.SetMenuRealName')" >
     {{$t('User.SetMenuRealNameTip')}}
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
        <mu-flat-button slot="actions" primary @click="realname" :label="$t('User.SetMenuRealName')"/>
  </mu-dialog>
    <!--中间end-->
    <BottomNav2></BottomNav2> 
  </div>
</template>

<script>
import BottomNav2 from "../components/BottomNav2";
import store from "../store";
import storage from "../models/storage";
import { SET_USER, CLEAN_USER } from "../store/mutation-types";
import user from "../models/user";
import HttpResultCode from "../utils/HttpResultCode";
export default {
  name: "user",
  components: { BottomNav2 },
  data() {
    return {
    	cardData:'',//点卡数据
      name: this.$store.state.user.name,
      subName: this.$store.state.user.name.substring(0,1).toUpperCase(),
      index:0,
      mobile: this.$store.state.user.mobile,
      isSignOutDialog: false,
      isDown: false,
      is_real_name_authentication: false,
      isRealNameDialog: false,
      isISO: false,
      trade_success_ratio: 0,
      level:-1,
      trade_total_usdt: 0,
      total_usdt:0
    };
  },
  created: function() {
    // this.getSecurity();
    this.getProfile();
    this.getMyAccount();
    this.getHeadIndex(this.name);
  },
  methods: {
  	//点卡
  	pointCard:function(){
  		this.$router.push('/myPintCrd/'+ this.cardData.card_available + '/' + this.cardData.card_locked + '/' + this.total_usdt + '/' + new Date().getTime());
  	},
    getHeadIndex(name){
        var charas = name.substring(0,1).toUpperCase()
        var index1 =  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(charas)
        this.index = (index1 + 1)%9 ;
    },
    signIn() {
      this.$router.push('/person?v=' + new Date().getTime())
    },
    about() { 
      this.$router.push("/about_center?v=" + new Date().getTime());
    },
    downApp() {  
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.$router.push("/app_down?v=" + new Date().getTime());
      }
    },
    isAndroid_ios() {  
      //判断是否是安卓还是ios
      var u = navigator.userAgent,
        app = navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
      // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      return isAndroid == true ? true : false;
    },
    isIos() {
      //判断是否是安卓还是ios
      var u = navigator.userAgent,
        app = navigator.appVersion;
      //  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      return isiOS;
    },
    wallet() {
      // this.$router.push("/wallet");
      this.$router.push("/wallet_usdt?v=" + new Date().getTime());
      
    },
    recharge() {
      // this.$router.push("/wallet");
      this.$router.push("/recharge?v=" + new Date().getTime());
    },
    cash() {
      // this.$router.push("/wallet");
      this.$router.push("/cash?v=" + new Date().getTime());
    },
    
    gd() {
      this.$router.push("/gd?v=" + new Date().getTime());
    },
    my_ad() {
      this.$router.push("/ads?v=" + new Date().getTime());
    },
    Add_address() {
      this.$router.push("/Addresses?v=" + new Date().getTime());
    },
    
    invite() {
//    this.$router.push("/invite_img");
			this.$router.push({
          path: '/invite_img',
          query: {
            reward_ratio: this.reward_ratio*100,
            v: new Date().getTime()
          }
      })
    },
    goIndex() {
      this.$router.push("/index_draw?v=" + new Date().getTime());
    },
    signOutShowDialog() {
      this.isSignOutDialog = true;
    },
    closeDialog() {
      this.isSignOutDialog = false;
      this.isRealNameDialog = false;
    },
    getProfile(){
       user
        .userProfile()
        .then(result => {
          if (result.code === 0) {
          		this.reward_ratio = result.data.reward_ratio;
             this.trade_success_ratio = result.data.trade_success_ratio
             this.trade_total_usdt = result.data.trade_total_usdt
            //            this.is_real_name_authentication =
            // result.data.authentication.real_name_authentication.verified;
             this.level = result.data.level
          }
        })
        .catch(e => {
            HttpResultCode.validate(e.code);
            this.message = e.message;
              this.toastTimer = setTimeout(() => {
                this.toast = false;
              }, 2000);
        });
    },
    getMyAccount(){
       user
        .USER_otc_my_account()
        .then(result => {
          if (result.code === 0) {
            if(result.data.funds.usdt){
                this.total_usdt = result.data.funds.usdt.available   
                this.cardData = result.data.funds.usdt;
            }
          }
        })
        .catch(e => {
      
        });
    },
    signOUt() {
      this.isSignOutDialog = false;
      storage.set("at", "");
      storage.set("hpp", "");
      storage.set("mobile", "");
      store.commit(CLEAN_USER);
      var u = navigator.userAgent,
        app = navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
      if (isAndroid) {
        //  this.$router.push('/sign_in')
        clearAccount();
      }
      this.$router.push("/trade?v=" + new Date().getTime());
    },
    sets() {
      this.$router.push("/set?v=" + new Date().getTime());
    },
    help() {
      this.$router.push("/help_center?v=" + new Date().getTime());
    },
    pay() {
      this.$router.push("/pay?v=" + new Date().getTime());
    },
    ffc() {
      this.$router.push("/agent?v=" + new Date().getTime());
      //  if(this.is_real_name_authentication){
      //       this.$router.push('/agent')
      //  }else{
      //     this.isRealNameDialog = true;
      //  }
    },
    game() {
      this.$router.push("/game_fox_bound_add?v=" + new Date().getTime());
    },
    realname() {
      this.$router.push("/realname?v=" + new Date().getTime());
    },
    getSecurity() {
      user
        .getSecurity()
        .then(result => {
          this.is_real_name_authentication =
            result.data.authentication.real_name_authentication.verified;
        })
        .catch(e => {});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "../assets/css/user.scss";
.Preferential{
	background:rgba(255,233,156,1);
	padding: 3px 8px;
	font-size:11px;
	font-family:PingFangSC-Medium,PingFangSC;
	font-weight:500;
	color:rgba(255,156,63,1)!important;
	line-height:16px;
}
</style>
