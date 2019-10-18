<template>
  <div class="content-help">
    <div class="top">
      <div class="center">什么是币币交易？</div>
      <div class="left" @click="goBack" />
    </div>
   <div class="help_center_content_zone">
     <p>币币交易就是用火狐币FFC去买卖其他数字币，火狐币与人民币是等值的，不会有涨跌。</p>
     <h4>
     一、如何使用币币交易：
     </h4>
    <p>
      <span>【买家】：您想在币币交易中购买数字币。首先去购买FFC，用FFC去币币交易中快速购买数字币</span><br />
      步骤一：进入“用户中心”——“钱包”，点击“火狐币FFC”，购买FFC。（可参考如何充值）
    </p>

  <img :src="bibi1">
  
    <p class="help-hint">
      购买FFC说明：<br />
      1.输入购买金额范围 500 ~ 50000 CNY并下单。<br />
      2.下单成功后，请按照提示完成支付、备注订单号<span  style="color:#ff4d2d">（切勿备注火狐狸或firefox）</span>并电话联系认证商家进行审核。<br />
      3.认证商家审核通过后您的钱包将会获得同等数量的FFC。<br />
      注意：如果您没有及时支付，请取消购买，否则会被封号处理。
    </p>
    <p>
      步骤二：点击“币币交易”，选择相应数字币，限价买或市价买，输入数量，交易密码后，点击“购买”。
    </p>
    <img :src="bibi2">
    <p>此处可查看到您FFC余额，如果FFC不足，可点击“充值”按钮，迅速调整到购买FFC界面。</p>
    <p class="help-hint">
     【卖家】：如果您想在币币交易中将数字币快速出售，得到FFC，FFC可提现（人民币）
     </p>
     <p>
      步骤一：点击“币币交易”，选择相应数字币，限价卖或市价卖，输入数量，交易密码后，点击“出售”。
    </p>
    <img :src="bibi3">
    <p>
      此处可以快速查看到您想出售的数字币余额，方便您确认出售数量。<br />
      步骤二： 进入“用户中心”——“钱包”，点击“我的FFC”，出售FFC。
    </p>
    <img :src="bibi4">
    <p class="help-hint">
      出售FFC说明：<br />
      1.输入出售金额范围 10 ~ 50000 CNY并下单。<br />
      2.下单成功后，请电话联系认证商家进行付款。（认证商家是自动匹配的，不用担心无法下单）。<br />
      3.您确认微信、支付宝或者银行卡已经收到付款后，请及时点击“已确认收款”。<br />
      注意：如果您下单成功后，无法联系商家或商家未在24小时内付款，可以联系客服。
    </p>
    <p class="help-hint">
      【说明】：<br />
      1.币币交易免手续费<br />
      2.出售FFC手续费0.6% ，最低3 CNY <br />
      3.FFC与人民币等值，不会有涨跌
    </p>
    <h4>二、如何成为认证商家及使用方法</h4>
    <p>1.如何成为认证商家？<br />
        认证商家需要先将币锁定在平台，按当前链克的价格，计算锁定币的总价值，可以接收 总价值/2 的FFC购买。首次锁仓金额不能低于100000链克（OSC），追加锁仓金额不能低于10000链克。<br />
        步骤一、通过手机打开连接https://m.firefoxotc.com，或者电脑网页端，点击网页最下方“手机版”</p>
    <img :src="bibi5">
    <p>步骤二：点击“用户中心”，点击“认证商家”</p>
    <img :src="bibi6">
    <p>步骤三：点击“锁仓”，输入锁仓币数量，锁仓即可</p>
    <img :src="bibi7">
    <p>
      2.FFC收款<br />
      普通用户可以在钱包中购买FFC，输入金额后，系统会自动分配认证商家。<br />
      a．接收到用户的购买FFC通知。<br />
      b．确认微信、支付宝或者银行卡已经收到付款，核对订单号、金额一致后，请及时点击“已确认收款”。<br />
      3.FFC提现<br />
      普通用户在钱包中选择FFC提现，输入提现金额后，系统自动分配认证商家进行转账。 <br />
      a．接收到用户的出售FFC通知。<br />
      b．请按照提示完成支付、备注订单号并电话联系用户进行审核。<br />
      4.奖励：完成一笔FFC提现，认证商家将获得0.3%的金额奖励
    </p>
    <h4>三、币币交易风险控制</h4>
    <p>
      认证商家锁定币的总价值为x，已接收的转账为y。
      当y&gt;=x/2时，交易员不能接收转账。
      当x&lt;y*1.2时，系统会强制将锁定的币出售进行平仓，从而保证有足够的CNY用于提现。
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
  name: "help_bibi",
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
      //  bibi1:IMG_BASE_URL+"bibi1.png",
      bibi2: IMG_BASE_URL + "bibi2.png",
      bibi3: IMG_BASE_URL + "bibi3.png",
      bibi4: IMG_BASE_URL + "bibi4.png",
      bibi5: IMG_BASE_URL + "bibi5.png",
      bibi6: IMG_BASE_URL + "bibi6.png",
      bibi7: IMG_BASE_URL + "bibi7.png",
      icon_safe_ok: IMG_BASE_URL + "icon_safe_ok.png"
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
