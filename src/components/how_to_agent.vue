<template>
  <div class="content-help">
    <div class="top">
      <div class="center">如何成为认证商家及使用方法?</div>
      <div class="left" @click="goBack" />
    </div>
   <div class="help_center_content_zone">
     <p>1.如何成为认证商家？<br />
     认证商家需要先将币锁定在平台，按当前链克的价格，计算锁定币的总价值，可以接收 总价值/2 的FFC购买。首次锁仓金额不能低于10000链克（OSC），追加锁仓金额不能低于10000链克。<br />
 </p>
     <h4>
       手机端和手机网页版
     </h4>
     <p> 步骤一：点击“用户中心”，点击“认证商家”：</p>
     <img :src="agent2">
     <p>步骤二：点击“锁仓”，输入锁仓币数量，锁仓即可 <br />
            <img :src="agent3">
     <p>2.FFC收款 <br>
普通用户可以在钱包中购买FFC，输入金额后，系统会自动分配认证商家。 <br>
a．接收到用户的购买FFC通知。 <br> 
b．确认微信、支付宝或者银行卡已经收到付款，核对订单号、金额一致后，请及时点击“已确认收款”。  <br>
C．商家确认收款后，认证商家中余额会增加相应的金额。 <br> </p>
     <img :src="agent4">
     <br>
     <p>3.FFC提现 <br>
普通用户在钱包中选择FFC提现，输入提现金额后，系统自动分配认证商家进行转账。 <br>
a．接收到用户的出售FFC通知。 <br>
b．请按照提示完成支付、备注订单号并电话联系用户进行审核。 <br>
C．用户收到款后，在钱包FFC出售界面下点击确认已收款后，认证商家余额会相应减少。 <br><br>

4.奖励：完成一笔FFC提现，认证商家将获得0.3%的金额奖励。 <br>
备注：<br><span style="color:#ff4d2d">认证商家充值通道，可自行关闭与开启。</span> <br>
<span style="color:#ff4d2d">2.FFC充值与提现，请于十分钟内处理，如未处理，十分钟后您的联系电话会显示出来，用户会给您电话。</span> <br>
<span style="color:#ff4d2d">3.因处理不及时，如果被用户投诉次数过多，将取消认证商家资格。</span><br>  </p>
     <img :src="agent5">
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
  name: "help_buy",
  components: { BottomNav },
  data() {
    return {
      agent2: IMG_BASE_URL + "agent2.png",
      agent3: IMG_BASE_URL + "agent3.png",
      agent4: IMG_BASE_URL + "agent4.png",
      agent5: IMG_BASE_URL + "agent5.png"
    };
  },
  created: function() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "../assets/css/help_page.scss";
</style>
