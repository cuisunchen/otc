<template>
  <div class="content">
    <div class="top">
      <div class="center">{{$t('Text.mine_tab5')}}</div>
      <div class="left" @click="goBack" />
    </div>
     <!-- $t('User.SignInOrSignUp')-->

   <div class="share_btn_zone_user_help_center">
      <div class="share_btn_zone">
        <!-- <div class="share_btn bottom_border" @click="cjwt">
          <span>{{$t('Text.cjwt')}}</span> 
          <i class="go"></i>
        </div> -->
        <p class="share_topTitle"> {{$t('Text.cjwt1')}} </p>
        <div class="share_container">
        <p class="share_title ">{{$t('Text.jyptmmwjts')}} </p>
        <p class="share_content "> {{$t('Text.jyptmmwjts1')}} </p>
        </div>
        
      </div>   
          <!-- <div class="share_btn_zone">
           <div class="share_btn bottom_border" @click="google">
              <span>{{$t('Text.rhbdgg')}}</span>
              <i class="go"></i>
           </div>
          </div> -->
   </div>
  
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
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
    <!-- <BottomNav></BottomNav>  -->
  </div>
</template>

<script>
import BottomNav from "../components/BottomNav";
import store from "../store";
import storage from "../models/storage";
import { SET_USER, CLEAN_USER } from "../store/mutation-types";
import user from "../models/user";
import Clipboard from "clipboard";
export default {
  name: "help_center",
  components: { BottomNav },
  data() {
    return {
      toast: false,
      message: "",
      name: this.$store.state.user.name,
      subName: this.$store.state.user.name.substring(0, 2).toUpperCase(),
      mobile: this.$store.state.user.mobile,
      isSignOutDialog: false,
      isDown: false,
      is_real_name_authentication: false,
      isRealNameDialog: false,
      qq: "3294806200",
      wx: "FireFoxOTC"
    };
  },
  created: function() {
    this.isDown = this.isAndroid_ios();
    this.getSecurity();
  },
  methods: {
    signIn() {
      // this.$router.push('/sign_in')
    },
    goBack() {
      this.$router.go(-1);
    },
    isAndroid_ios() {
      //判断是否是安卓还是ios
      var u = navigator.userAgent,
        app = navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      return isAndroid == true ? true : false;
    },
    hideToast() {
      this.toast = false;
      if (this.toastTimer) clearTimeout(this.toastTimer);
    },
    showToast(message) {
      this.toast = true;
      this.message = message;
      this.toastTimer = setTimeout(() => {
        this.toast = false;
      }, 2000);
    },
    agent() {
      this.$router.push("/how_to_agent");
    },
    ffc_exchange() {
      this.$router.push("/ffc_exchange");
    },
    wallet() {
      this.$router.push("/wallet");
    },
    my_ad() {
      this.$router.push("/ads");
    },
    signOutShowDialog() {
      this.isSignOutDialog = true;
    },
    closeDialog() {
      this.isSignOutDialog = false;
      this.isRealNameDialog = false;
    },
    signOUt() {
      this.isSignOutDialog = false;
      storage.set("at", "");
      storage.set("hpp", "");
      storage.set("mobile", "");
      store.commit(CLEAN_USER);
      this.$router.push("/trade");
    },
    withdraw() {
      this.$router.push("/help_withdraw");
    },
    ffc() {
      this.$router.push("/help_ffc");
    },
    bibi() {
      this.$router.push("/help_bibi");
    },
    cjwt(){
       this.$router.push("/help_ffc");
    },
    point() {
      this.$router.push("/help_point");
    },
    sell() {
      this.$router.push("/help_sell");
    },
    google() {
      this.$router.push("/help_bound_google");
    },
    success: function(e) {
      this.showToast(this.$t("Invite.CopySuccessContent"));
    },
    buy() {
      this.$router.push("/help_buy");
    },
    recharge() {
      this.$router.push("/help_recharge");
    },
    game() {
      this.$router.push("/game_fox_bound_add");
    },
    realname() {
      this.$router.push("/realname");
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
@import "../assets/css/help_center.scss";
</style>
