<template>
  <div class="content-help">
    <div class="top">
      <div class="center">期权说明</div>
      <div class="left" @click="goBack" />
    </div>
   <div class="help_center_content_zone">
     <h4>
     什么是看涨期权?
     </h4>
     <p><strong>期权</strong>是一份合同，合同的内容关乎您的选择，关乎您的收益，所以合约内容至关重要！！！<br /><br />
     <strong>例子：</strong>2018年1月1号，此时OSC价格10元一枚，小王觉得一个月以后OSC会涨到20元一枚，看涨OSC；<br />
     这个时候老张同志出来了，他觉得OSC价格10元一枚是高点，一个月后会降到低点；</p>

     <p><strong>于是老张就写了一份合同：</strong></p>

     <p> 合同：2018年2月1号，谁拥有这份合约就可以用11元跟我买入一个OSC，这份合同只需要1元；<br />
          小王分析一下合同：</p>
          <br>
         <table border="1" style="margin-top:5px;border:solid 2px #464751;">
            <tr>
              <th style=" padding-left:10px;padding-right:2px;">情况一</th>
              <th  style=" padding-left:10px;padding-right:2px;">情况二</th>
            </tr>
            <tr>
              <td  style="padding-left:10px;padding-right:10px;">假如2018年2月1号，链克币价格是12元一个，那么按照合约，我可以11元跟老张买一个OSC，花11元买价值12元的OSC，挣了1元的差价，而我只需要现在付出1元买这个合约。</td>
              <td  style="padding-left:10px;padding-right:10px;">假如2018年2月1号，链克币价格是8元一个，那么按照合约，我可以11元跟老张买一个OSC，花11元块买价值8元的OSC，不划算，不找老王买了。</td>
            </tr>
          </table>
     <strong>
     总结：
     </strong>
   
     <p>（1）如果看涨OSC涨到11元以上，那么这个合约值得购买；</p>

     <p>（2）如果链克币最终没有涨到11元以上，这个合约不值得购买；</p>

     <p>（3）期权跟保险一样，到期就失效了，买合同的1元成本，老张是不会退回给我的。花1元的钱买一个选择权，到期后差价肯定要超过1元才能回本盈利。</p>
    <br /><br /><br /><br />
     <h4>
     什么是看跌期权?
     </h4>
 <p><strong>期权</strong>是一份合同，合同的内容关乎您的选择，关乎您的收益，所以合约内容至关重要！！！<br /><br />
     <strong>例子：</strong>2018年1月1号，此时OSC价格10元一枚，小王觉得一个月以后OSC会跌到5元一枚，看跌OSC；<br />
     这个时候老张同志出来了，他觉得OSC价格10元一枚是低点，一个月后会涨很多；</p>

     <p><strong>于是老张就写了一份合同：</strong></p>

     <p>  合同：2018年2月1号，谁拥有这份合约就可以用9元卖出一个OSC给我，这份合同只需要1元；<br />
          小王分析一下合同：</p>
          <br>
          <table border="1" style="margin-top:5px;border:solid 2px #464751;">
            <tr>
              <th style=" padding-left:10px;padding-right:2px;">情况一</th>
              <th  style=" padding-left:10px;padding-right:2px;">情况二</th>
            </tr>
            <tr>
              <td  style="padding-left:10px;padding-right:10px;">假如2018年2月1号，链克币价格是7元一个，那么按照合约，我可以9元卖一个OSC给老张，7元的OSC卖出去得到9块，挣了2元的差价，而我只需要现在付出2元买这个合约。</td>
              <td  style="padding-left:10px;padding-right:10px;">假如2018年2月1号，链克币价格是12元一个，那么按照合约，我可以9元卖一个OSC给老张，市场价格12元了，我卖给老张才得9w，不划算，不按照合约执行了。</td>
            </tr>
          </table>
     <strong>
     总结：
     </strong>
   
     <p>（1）如果OSC价格跌到9元以下，那么这个合约值得购买；</p>

     <p>（2）如果OSC价格是9元以上的，这个合约不值得购买；</p>

     <p>（3）期权跟保险一样，到期就失效了，买合同的1元成本，人家是不会退回给我的。花1元的钱买一个这样子的选择权，到期后差价肯定要1元以上才能回本盈利。</p>

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
  name: "options_help",
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
      option_help5: IMG_BASE_URL + "option_help5.png",
      option_help2: IMG_BASE_URL + "option_help2.png"
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
