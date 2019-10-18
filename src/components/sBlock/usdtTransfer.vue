<template>
	<div class="usdtTransfer h-b100 bg-f0">
		<mu-appbar style="width: 100%;">
		  <span @click="goBack" icon slot="left"><img width="24" height="24" src="../../assets/image/arrow_left.png"/></span>
		  	{{$t('sblock.usdtHz')}}
		</mu-appbar>
		<div class="content text-l bg-w m-t-10 p-r">
			<div class="p-l-r-40 hzBox">
				<div class="p-b-t-15 b-b">S钱包</div>
				<div class="p-b-t-15">OTC账户</div>
			</div>
			<img class="p-a r-10 t-40 z-9" width="24" height="24" src="../../assets/image/myPintCrd/jhbz.png"/>
		</div>
		<div class="m-t-10 p-t-10 bg-w">
			<span>划转数量</span>
			<mu-text-field :hintText="$t('sblock.ky') + ' ' + 11 + ' USDT'" v-model="message"></mu-text-field>
			<span class="c-005EE4">全部</span>
		</div>
		<div @click="assetTransfer" class="bigBtn m-t-50" style="background: #005EE4;">{{$t('sblock.zchz')}}</div>
		<div class="bigBtn bindNewAccount" style="background: rgba(35,71,130,1);opacity:0.3;">{{$t('sblock.zchz')}}</div>
		
		
		
		<mu-dialog :title="$t('Text.srjymm')" width="360" :open.sync="openSimple" class="pwdDlog">
			<div class="text-c f-s-12 m-b-10">{{$t('sblock.qrzf')}} <span class="c-005EE4">11 USDT</span></div>
	      	<mu-text-field :hintText="$t('SignIn.PasswordPlaceholder')" type="password" v-model="password"></mu-text-field>
	      	<div @click="sign_in_reset" class="f-s-12 c-005EE4 text-r">{{$t('Text.wjmm')}}</div>
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
      openSimple:true,
      toast: false,
      password:'',
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
	}
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
    //忘记密码
    sign_in_reset:function(){
    	this.$router.push('/sign_in_reset?v=' + new Date().getTime());
    },
    assetTransfer:function(){
    	alert('资产划转')
    },
    //激活点卡
    activate:function(){
    	let lang = "zh_cn";
	    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1)lang = storage.get("lang");
	    lang = lang.replace('_', '-');
    	this.axios({
		  	method: 'post',
	  		timeout: 30000,
				url: API_BASE_URL + '/wallet/activate_usdtcard',
				headers: {
					"Accept-Language": lang,
					"Content-Type":'application/json',
	        		"Authorization": "Bearer " + store.state.user.access_token,
	      		},
				data: {usdt_card_id:'',usdt_card_secret:''}
			}).then((response) => {
				if(response.data.code === 0){
					this.showToast(this.$t('Text.jhcg'))
				}else{
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
	.usdtTransfer .mu-appbar{
		background: #FFFFFF;
		color: #2E3546;
	}
	.usdtTransfer .hzBox{
		background: url(../../assets/image/myPintCrd/hhzz.png) no-repeat;
		background-size: 8%;
		background-position-y: 12px;
	}
	.usdtTransfer .mu-text-field{
		width: 70%;
		margin-bottom: 0;
		padding-left: 20px;
	}
	.usdtTransfer .mu-text-field .mu-text-field-hint{
		text-align: left;
		font-size: 14px;
	}
    .mu-text-field-focus-line{
		background: #005EE4;
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
		border:1px solid #005EE4;
		text-align: center;
		font-size: 18px;
		color: #005EE4;
	}
	.Determine{
		float: right;
		width:123px;
		height:50px;
		line-height: 50px;
		text-align: center;
		background:#005EE4;
		border-radius:4px;
		font-size: 18px;
		color: #FFFFFF;
	}
</style>