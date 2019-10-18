<template>
  <div class="content-help">
    <div class="top">
      <div class="center">{{$t('Text.cjwt1')}}</div>  
      <div class="left" @click="goBack" />
    </div>
   <div class="help_center_content_zone">
     <h4 style="color:#3180D0">
       {{$t('Text.jyptmmwjts')}}
     </h4>
     <p style="color:#6D778B;"> {{$t('Text.jyptmmwjts1')}} </p>
     <!-- <h4 style="color:#3180D0">
       {{$t('Text.jyptmmwjts2')}}
     </h4>
       <p style="color:#6D778B;" class="help-hint">
         {{$t('Text.jyptmmwjts3')}} 
     </p> -->
   </div>
  </div>
</template>

<script>
import BottomNav from "../components/BottomNav";
import store from "../store";
import storage from "../models/storage";
import { SET_USER, CLEAN_USER } from "../store/mutation-types";
import user from "../models/user";
import { IMG_BASE_URL } from "../models/url.js";
export default {
  name: "help_ffc",
  components: { BottomNav },
  data() {
    return {
      name: this.$store.state.user.name,
      subName: this.$store.state.user.name.substring(0, 2).toUpperCase(),
      mobile: this.$store.state.user.mobile,
      isSignOutDialog: false,
      isDown: false,
      is_real_name_authentication: false,
      isRealNameDialog: false,
      FFC1: IMG_BASE_URL + "FFC1.png",
      FFC2: IMG_BASE_URL + "FFC2.png",
      FFC3: IMG_BASE_URL + "FFC3.png",
      FFC4: IMG_BASE_URL + "FFC4.png",
      FFC5: IMG_BASE_URL + "FFC5.png"
    };
  },
  created: function() {
    this.isDown = this.isAndroid_ios();
    this.getSecurity();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    signIn() {
      // this.$router.push('/sign_in')
    },
    isAndroid_ios() {
      //判断是否是安卓还是ios
      var u = navigator.userAgent,
        app = navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      return isAndroid == true ? true : false;
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
    sets() {
      this.$router.push("/set");
    },
    pay() {
      this.$router.push("/pay");
    },
    ffc() {
      this.$router.push("/agent");
      //  if(this.is_real_name_authentication){
      //       this.$router.push('/agent')
      //  }else{
      //     this.isRealNameDialog = true;
      //  }
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
@import "../assets/css/help_page.scss";
</style>
