<template>
  <div  class="deposit-content">
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
    <div class="top">
      <div class="center">链克充值</div>
      <div class="left" @click="goBack" />
    </div>
        <!-- <div class="div-content-head1">
            <span class="div-content-head1-left"  onClick="javascript :history.back(-1);">返回</span>
            <span class="div-content-head1-middle">链克充值</span>
            <span class="div-content-head1-span">无需翻墙</span>
        </div> -->
        <!-- <div class="div-content-tip" id="div-tip" ></div> -->
        <div class="div-content">
            <p class="div-content-head-p"><font size="2">链克充值</font></p>
            <div class="div-content-diviler"></div>

            <p class="div-content-title-p"><font size="2">火狐狸网钱包中绑定的链克口袋账户</font></p>
            <div>
                <a href="javascript:;" class="file" id="input-a">导入账户文件
                    <input class="div-content-input-file" type="file"  @change="readKey"   >      
                </a>
            </div>
            <p class="div-content-title-p"><font size="2">链克口袋密码</font></p>      
            <input class="div-content-input" id="password" type="password" v-model="password"  placeholder="请输入您的链克口袋账户密码"   />
            <p class="div-content-title-p"><font size="2">火狐狸充值地址</font></p>

            <input class="div-content-input"  id="address" type="text"  v-model="address"   placeholder="请输入火狐狸充值地址" />
            <p class="div-content-title-p"><font size="2">充值链克数量</font></p>

            <input  class="div-content-input"  id="qty" type="number" v-model="qty"  placeholder="请输入充值链克数量" />

            <p class="div-content-title-p"><font size="2">手续费 0.01 个</font></p>

            <button  class="div-content-input-button" type="button"  @click="send"   value="发送" >发送</button>
            <p class="div-content-title-p1"><font size="2">注：建议使用谷歌浏览器</font></p>
            <p class="div-content-title-p1" style="padding-bottom:40px"><font size="2" >使用方法：打开您的链克口袋app，进入所绑定的口袋账户，导出备份导入您上一步保存的账户文件。</font></p>
            
        </div>
        <a class="div-content-a" >火狐狸旗下网站 完全免费 承诺不保存任何数据 放心使用</a>
   </div>
</template>
<script>
import nprogress from "nprogress";
import wallet from '../models/wallet'
import store from '../store'
 import storage from '../models/storage'
import {SET_USER} from '../store/mutation-types'
import user from "../models/user";
export default {
  name: 'deposit',
  components:{},
  data () {
    return { 
      toast:false,
      message:'',
     name:this.$store.state.user.name,
     subName:this.$store.state.user.name.substring(0,2).toUpperCase(),
     keyValue:'',
     password:'',
     address:'',
     qty:'',
     isTransate:false,
    }
  },
  created:function(){
    this.get_address();
  },
  methods:{
    goBack() {
      this.$router.go(-1);
      },
    hideToast () {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    },
    showToast (message) {
      this.toast=true
      this.message=message
      this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
    },
    get_address: function () {
          wallet.getAddress('OSC', 0, 1).then(result => {
              // this.address_total = result.data.total
              if(result.code === 0 ){
              this.address = '' 
              this.address =  result.data.addresses[0].address
              }
              
          }).catch(e => {
            console.log(e)
          })
        },
    readKey(e) {
      if(e.target.files.length === 0 ){
     
          return false
        }
        let file = e.target.files[0]

    
            var reader = new FileReader();
                reader.onload = (reader_result) => {
         this.keyValue  = reader_result.target.result
                 
                   document.getElementById("input-a").text = '文件上传成功'

                }
                reader.readAsText(file);
        
    },
    send(){
      if(this.isTransate){
         return;
      }
       if(this.keyValue.length==0){
            alert('请上传文件')
            return;
        }
       var password =  document.getElementById("password").value
       var address =  document.getElementById("address").value
       var qty =  document.getElementById("qty").value
       if(password.length<4||password.length>50){
            document.getElementById("password").focus();
            return;
        }
        if(address.length<10||address.length>65){
            document.getElementById("address").focus();
           return;
       }
       if(qty.length==0){
          document.getElementById("qty").focus();
           return;
       }
       this.isTransate = true;
       wallet.deposit(this.keyValue,this.password,this.address,this.qty).then(result => {
           this.isTransate = false;
             this.showToast("转账成功！");
             this.keyValue = ''
             this.password = ''
             this.address = ''
             this.qty = ''
          }).catch(e => { 
             this.isTransate = false;
            this.showToast(e);
          })
    },

  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
  //    .body{
  //     margin: 0 auto;
  //     max-width: 640px;
  //  }
  @import "../assets/css/deposit.scss";  

</style>
