<template>
	<div class="transfer h-b100 bg-f0">
		<mu-appbar style="width: 100%;">
		  <span @click="goBack" icon slot="left"><img width="24" height="24" src="../../assets/image/arrow_left.png"/></span>
		  	{{$t('Text.zr')}}
		</mu-appbar>
		<div class="content">
			<div class="m-t-15 box1 p-r">
				<span @click="isOpenDrawer = true" class="c-card f-s-16 p-a t-10 z-9">+{{country_code}} <span style="color: #D7D7D7;" class="d-i m-l-5 p-r t--2">|</span></span>
				<mu-text-field :hintText="$t('SignIn.AccountPlaceholder')" v-model="mobile"></mu-text-field>
			</div>
			<!--<div class="box2 p-r">
				<mu-text-field :hintText="$t('SignUp.NameCode')" v-model="message"></mu-text-field>
				<span @click="getCode" class="c-card p-a t-10 r-20" :class="{disabled:this.isDisabled}">{{codeText}}</span>
			</div>-->
			<div v-if="userNama" class="text-l m-l-r-15 f-s-12">{{$t('Text.qrskr')}}：{{userNama}}</div>
			<div @click="goTransfer" class="bigBtn m-t-50" >{{$t('Text.mszr')}}</div>
		</div>
		<mu-drawer :open.sync="isOpenDrawer" :docked="docked" style="text-align: left;">
			<div>
				<div v-for="item in codeList"  @click="selectCode(item.value)" class="p-b-t-10 codeItem">{{item.name + ' (+' + item.value + ')'}}</div>
			</div>
		</mu-drawer>
		
		<mu-dialog :title="$t('Text.srjymm')" width="360" :open.sync="openSimple" class="pwdDlog">
	      	<mu-text-field :hintText="$t('SignIn.PasswordPlaceholder')" type="password" v-model="password"></mu-text-field>
	      	<div @click="sign_in_reset" class="f-s-12 c-card text-r">{{$t('Text.wjmm')}}</div>
	      	<div class="clear m-t-15">
	      		<div @click="openSimple=false;password=''" class="cancel">{{$t('Text.qx')}}</div>
	      		<div @click="save" class="Determine">{{$t('Text.qd')}}</div>
	      	</div>
		</mu-dialog>
		
		<mu-toast v-if="toast" :message="message" @close="hideToast"/>
	</div>
</template>

<script>
import nprogress from "nprogress";
import wallet from "../../models/wallet";
import store from "../../store";
import storage from "../../models/storage";
import user from "../../models/user";
import lib from "../../utils/lib";
import HttpResultCode from "../../utils/HttpResultCode";
import {
  SET_CRYPTO_CURRENCY,
  CLEAN_USER,
  SET_USER
} from "../../store/mutation-types";
import PopupDialog from "../../common/PopupDialog";
import {
  API_BASE_URL,
} from "../../models/url.js";	
export default {
  data() {
    return {
      mobile:"",//手机号	
      userNama:"",//收卡人用户名
      usdt_card_id:"",//点卡号码
      country_code:"86",//国家码
      password:'',//交易密码
      openSimple:false,	
      isOpenDrawer:false,
      docked: false,
      position: 'left',
      codeList: [
        { name: this.$t("Text.c86"), value: "86" },
        { name: this.$t("Text.c81"), value: "81" },
        { name: this.$t("Text.c852"), value: "852" },
        { name: this.$t("Text.c886"), value: "886" },
        { name: this.$t("Text.c82"), value: "82" },
        { name: this.$t("Text.c7"), value: "7" },
        { name: this.$t("Text.c380"), value: "380" },
        { name: this.$t("Text.c375"), value: "375" },
        { name: this.$t("Text.c963"), value: "963" },
        { name: this.$t("Text.c971"), value: "971" },
        { name: this.$t("Text.c98"), value: "98" },
        { name: this.$t("Text.c90"), value: "90" },
        { name: this.$t("Text.c972"), value: "972" },
        { name: this.$t("Text.c66"), value: "66" },
        { name: this.$t("Text.c91"), value: "91" },
        { name: this.$t("Text.c855"), value: "855" },
        { name: this.$t("Text.c84"), value: "84" },
        { name: this.$t("Text.c95"), value: "95" },
        { name: this.$t("Text.c55"), value: "55" },
        { name: this.$t("Text.c54"), value: "54" },
        { name: this.$t("Text.c53"), value: "53" },
        { name: this.$t("Text.c52"), value: "52" },
        { name: this.$t("Text.c57"), value: "57" },
        { name: this.$t("Text.c385"), value: "385" },
        { name: this.$t("Text.c351"), value: "351" },
        { name: this.$t("Text.c49"), value: "49" },
        { name: this.$t("Text.c33"), value: "33" },
        { name: this.$t("Text.c39"), value: "39" },
        { name: this.$t("Text.c31"), value: "31" },
        { name: this.$t("Text.c34"), value: "34" },
        { name: this.$t("Text.c46"), value: "46" },
        { name: this.$t("Text.c41"), value: "41" },
        { name: this.$t("Text.c48"), value: "48" },
        { name: this.$t("Text.c30"), value: "30" },
        { name: this.$t("Text.c43"), value: "43" },
        { name: this.$t("Text.c65"), value: "65" },
        { name: this.$t("Text.c60"), value: "60" },
        { name: this.$t("Text.c62"), value: "62" },
        { name: this.$t("Text.c92"), value: "92" },
        { name: this.$t("Text.c44"), value: "44" },
        { name: this.$t("Text.c1"), value: "1" },
        { name: this.$t("Text.c61"), value: "61" }
      ],	
      isDisabled:false,
      toast: false,
      codeText:this.$t('SignUp.NameCode'),
      codeNum:120,
      message: "",
    };
  },
  created: function() {
  	
  },
  watch:{
	password:function(){
		if(this.password.length >= 6){
			setTimeout(()=>{
				this.password = this.password.substr(0,6);
			},100)
		}
	},
  },
  methods: {
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
    goBack() {
      this.$router.go(-1);
    },
    //去转让
    goTransfer:function(){
    	if(this.mobile){
    		this.getUserName();//通过手机号查询用户名
    	}
    },
    //获取转让数据
    transfer_usdtcard:function(){
    	let lang = "zh_cn";
	    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1)lang = storage.get("lang");
	    lang = lang.replace('_', '-');
    	this.axios({
		  	method: 'post',
	  		timeout: 30000,
				url: API_BASE_URL + '/wallet/transfer_usdtcard',
				headers: {
					"Accept-Language": lang,
					"Content-Type":'application/json',
	        		"Authorization": "Bearer " + store.state.user.access_token,
	      		},
				data: {country_code:this.country_code,mobile:this.mobile,usdt_card_id:'',password:this.password}
			}).then((response) => {
				if(response.data.code === 0){
					this.showToast(response.data.message);
					setTimeout(()=>{
						this.goBack();
					},1000)
				}else{
					this.showToast(response.data.message)
				}
	  	}).catch((error) => {
	  		this.showToast(this.$t('Text.qqyc'))
	  	});
    },
    //保存
    save:function(){
    	if(this.password.length == 6){
    		this.openSimple = false;
    		this.transfer_usdtcard();获取转让数据
    	}else{
    		this.showToast(this.$t('Text.qxsrlwmm'))
    	}
    },
    //忘记密码
    sign_in_reset:function(){
    	this.$router.push('/sign_in_reset?v=' + new Date().getTime());
    },
    //选择国家码
    selectCode:function(country_code){
    	this.country_code = country_code;
    	this.isOpenDrawer = false;
    },
    //获取验证码
    getCode:function(){
    	this.isDisabled = true;
    	let Interval;
    	Interval = setInterval(()=>{
    		if(this.codeNum <= 1){
    			this.codeText = this.$t('SignUp.NameCode');
    			this.isDisabled = false;
    			this.codeNum = 120;
    			clearInterval(Interval)
    			return;
    		}
    		this.codeNum--;
    		this.codeText = this.codeNum + ' s';
    	},1000)
    },
    //通过手机号查询用户名
    getUserName:function(){
    	let lang = "zh_cn";
	    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1)lang = storage.get("lang");
	    lang = lang.replace('_', '-');
    	this.axios({
		  	method: 'post',
	  		timeout: 30000,
				url: API_BASE_URL + '/user/query_name',
				headers: {
					"Accept-Language": lang,
					"Content-Type":'application/json',
	        		"Authorization": "Bearer " + store.state.user.access_token,
	      		},
				data: {country_code:this.country_code,mobile:this.mobile}
			}).then((response) => {
				if(response.data.code === 0){
					this.userNama = response.data.data.name;
					this.openSimple = true;
				}else{
					this.userNama = '';
					this.showToast(response.data.message)
				}
	  	}).catch((error) => {
	  		this.showToast(this.$t('Text.qqyc'))
	  	});
    },
  }  
};
</script>

<style>
	@import "../../assets/css/config/common.css";
	.transfer{
		background:#FFFFFF;
	}
	.transfer .mu-appbar{
		background: #FFFFFF;
		color: #2E3546;
	}
	.transfer .box1 .mu-text-field{
		width: 90%;
		text-align: left;
		padding-left: 50px;
	}
	.transfer .box2 .mu-text-field{
		width: 90%;
		text-align: left;
	}
	.codeItem{
		border-bottom: 1px solid #f0f0f0;
		padding-left: 15px;
	}
	.codeItem:active{
		background: #F0F0F0;
	}
	.mu-dialog-title{
		text-align: center;
		display: block;
	}
    .mu-text-field{
		width: 100%;
	}
    .cancel{
    	float: left;
		width:82px;
		height:50px;
		line-height: 50px;
		background:rgba(255,255,255,1);
		border-radius:4px;
		border:1px solid #FF8C45;
		text-align: center;
		font-size: 18px;
		color: #FF8C45;
	}
	.Determine{
		float: right;
		width:123px;
		height:50px;
		line-height: 50px;
		text-align: center;
		background:#FF8C45;
		border-radius:4px;
		font-size: 18px;
		color: #FFFFFF;
	}
</style>