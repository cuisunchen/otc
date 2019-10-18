<template>
  <div class="content-help">
    <div class="top">
      <div class="center">如何出售数字币?</div>
      <div class="left" @click="goBack" />
    </div>
   <div class="help_center_content_zone">
     <p>在火狐狸网上您有两种方式可以出售您的数字币：<br />
      一种是在OTC交易中，选择《我要出售》直接出售；<br />
      一种是在OTC交易中，发布出售广告，您的广告将显示《我要购买》列表中，等待买家购买。</p>
     <h4>
      第一种：在《我要购买》直接出售，选择您想要出售的价格和数量，点击“出售”，具体步骤如下：
     </h4>
     <p>1、首先，打开网站：https://m.firefoxotc.com；或者用浏览器扫描二维码，下载手机APP。</p>
     <img :src="sell1">
     <p>2、请用手机号注册一个新账号。如果您已有账号，请直接登录。<br />
        3、登录后进入OTC交易——我要出售，您首先需要将您的数字币充值到火狐狸网账户钱包（参考：如何充值）。<br />
        4、选择要出售币种、价格、数量、支付方式，选择合适的广告，点击出售（以链克币为例）。</p>
     <img :src="sell2">
     <p>5、输入需要出售的金额/数量，点击“立即出售”。<br />
        6、下单成功后，等待买家付款。<br />
        7、下单5分钟后，还未收到买家付款，可在买家信息下方将显示对方号码，您可以电话联系对方。
     </p>
     <img :src="sell3">
     <p> 8、买家点击“标记已付款”后，订单详情中将显示“已付款”，请仔细查实是否收到该笔款项及备注的订单号，确认到账后，再点击“放币”。<br />
         9、买家点击“标记已付款”后，如果十分钟后，您仍未收到该笔款项，可点击“申诉”按钮。<br />
        根据提示联系客服介入处理，并点击确定。
     </p>
     <h4>
      第二种，在OTC交易中，发布出售广告，您的广告将显示《我要购买》列表中，等待买家下单。
     </h4>
     <p>
       1、登录参考上述第一种方法的1、2步骤。<br />
       2、要出售数字币，您首先需要将一些数字币充值到火狐狸网账户钱包（参考：如何充值）。<br />
       3、进入OTC交易，点击“发布广告”，选择交易类型：我要出售，依次设置信息后点击“立即发布”。
     </p>
     <img :src="sell4">
     <p>
       4、等待买家下单<br />
       5、买家下单后，参考上述第一种方法的6、7、8、9步骤
     </p>
     <p class="help-hint">
       注：<br />
        ① 发布广告，要求您有一定量的币才能发布成功；<br />
        ② 您设置的“最小额度”须低于“您数字币余额扣减成交后的手续费”，否则广告将不显示；<br />
        ③“最小限额”“最大限额”：指设置您购买时单笔订单的数量范围，设定合适的区间能让您的交易更有效率；<br />
        ④ 出售限额：输入您本次总共想要出售的额度，避免您被下单累计数量超过您想出售的总数量；<br />
        ⑤ 选择您想要的支付转账方式，可以多选。
     </p>
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
  name: "help_sell",
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
      sell1: IMG_BASE_URL + "sell1.png",
      sell2: IMG_BASE_URL + "sell2.png",
      sell3: IMG_BASE_URL + "sell3.png",
      sell4: IMG_BASE_URL + "sell4.png"
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
