<template>
  <div class="content-help">
    <div class="top">
      <div class="center">交易中注意事项</div>
      <div class="left" @click="goBack" />
    </div>
   <div class="help_center_content_zone">
     <h4>
      一、作为卖方，应该注意什么？
     </h4>
    <p>
      <span>1.在交易过程中，买方常见的诈骗行为有哪些？</span><br />
      A.实际付款金额与订单显示金额不符，故意误导；<br />
      B.两笔同价格订单同时生成，只收到一笔付款，但未备注订单号，误导卖家放币；<br />
      C.收到伪基站等手段发送的虚假到账短信，来伪造银行的到账短信提醒；<br />
      D.通过PS手段，买方直接向卖方发送PS的银行转账完成的截图，不断的催促卖方放币；<br />
      E.选择支付宝交易时，买方发来一个有备注订单号的“请你代付”申请，要求卖方放币（“代付”只是让其他人付款，而实际并没有付款）。<br /><br />
      <span>2.交易过程中，买方出现什么样的行为，卖方需要提高警惕？</span><br />
      A.买方付款时未备注订单号；<br />
      B.卖方收到收款短信提醒，登录银行账号却无实际汇款或发现银行账户被锁无法登录；<br />
      C.卖方尚未核实到账，但买方却催促卖方尽快放币，并且多次强调让卖方查看收款短信；<br />
      D.订单已完成，但买方还在主动与卖方闲聊，获取更多个人信息、拖延时间或重复拍下订单。<br /><br />
      <span>3.确认收到买方付款，且订单号与金额均确认无误的情况下，应第一时间放币。</span><br /><br />
      <span>4.买方付款时未备注订单号，卖方有权不放币，并发起申诉。</span><br />
    </p>
    <h4>
     二、作为买方，应该注意什么？
     </h4>
     <p>
       1.订单生成后，应第一时间付款，付款时务必备注订单号；<br />
        2.付款后请勿取消订单，否则将无法挽回损失；<br />
        3.请在倒计时结束前完成付款，并点击“标记已付款”，否则订单在倒计时结束后将会自动取消；<br />
        4.如果您发布了购买广告，人不在线时，广告应及时下架；<br />
        5.如果您发布了购买广告，取消订单，该广告将自动下架；<br />
        6.当天取消订单累计3次，将限制当天购买功能（无法直接购买和发布购买广告）；请根据需求购买，勿随意下单并取消。
    </p>
    <h4>三、哪些影响信用分？</h4>
    <p>1.正常交易会增加信用分；<br />
      2.下单后，发现误拍，5分钟内取消，不影响信用分，但仍累计当日上次取消订单次数中；<br />
      3.下单后，超过5分钟后取消订单，或倒计时结束后自动取消，均会扣除信用分；<br />
      4.申诉的订单，由客服判决，将会影响判负一方的信用分。</p>
    <h4>四、场外交易需注意以下事宜，投资人自行承担交易风险：</h4>
    <p>1.不轻易透露个人联系方式；<br />
      2.不轻信银行到账短信，转账截图；<br />
      3.收款到账信息以登陆网银查看为准；<br />
      4.仅拿出自己可控的资金，理性投资；<br />
      5.交易不涉及洗钱、倒汇、非法集资等违法行为；<br />
      6.自愿遵守平台的充值、提现、认证等运营规则；<br />
      7.自觉遵守平台运营规则，如果违背运营规则，愿意接受平台相应处理；<br />
      8.曾经有参与过数字资产的场外交易，对场外交易的交易风险有详尽了解;<br />
      9.具备风控经验，掌握场外交易常识并具备良好的风险控制能力。</p>
   </div>
  </div>
</template>

<script>
import BottomNav from '../components/BottomNav'
import store from '../store'
 import storage from '../models/storage'
import {SET_USER,CLEAN_USER} from '../store/mutation-types'
import user from "../models/user";
export default {
  name: 'help_point',
  components:{BottomNav},
  data () {
    return { 
     name:this.$store.state.user.name,
     subName:this.$store.state.user.name.substring(0,2).toUpperCase(),
     mobile:this.$store.state.user.mobile,
     isSignOutDialog:false,
     isDown:false,
     is_real_name_authentication:false,
     isRealNameDialog:false,
    }
  },
  created: function() {
    this.isDown = this.isAndroid_ios();
    this.getSecurity();
  },
  methods:{
     goBack() {
      this.$router.go(-1);
      },
   signIn(){ 
      // this.$router.push('/sign_in')
   },
    isAndroid_ios(){   //判断是否是安卓还是ios  
      var u = navigator.userAgent, app = navigator.appVersion;  
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器  
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端  
      return isAndroid==true?true:false;  
    },
   wallet(){
     this.$router.push('/wallet')
   },
   my_ad(){
     this.$router.push('/ads')
   },
   signOutShowDialog(){
     this.isSignOutDialog = true;
   },
   closeDialog(){
    this.isSignOutDialog = false;
    this.isRealNameDialog = false;
   },
   signOUt(){
     this.isSignOutDialog = false;
     storage.set('at', '')
     storage.set('hpp', '')
     storage.set('mobile', '')
     store.commit(CLEAN_USER)
     this.$router.push('/trade') 
   },
   sets(){
      this.$router.push('/set')
   },
   pay(){
     this.$router.push('/pay')
   },
   ffc(){
     this.$router.push('/agent')
    //  if(this.is_real_name_authentication){
    //       this.$router.push('/agent')
    //  }else{
    //     this.isRealNameDialog = true;
    //  }   
   },
   game(){
     this.$router.push('/game_fox_bound_add')
   },
   realname(){
    this.$router.push('/realname')
   },
   getSecurity(){
      user.getSecurity().then(result => {
         this.is_real_name_authentication = result.data.authentication.real_name_authentication.verified;
      }).catch((e) => {

      })
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
   @import "../assets/css/help_page.scss";  
</style>
