<template>
	<div class="purchaseCard h-b100 bg-f0">
		<mu-appbar style="width: 100%;">
		  <span @click="goBack" icon slot="left"><img width="24" height="24" src="../../assets/image/arrow_left.png"/></span>
		  	{{$t('Text.gm')}}
		</mu-appbar>
		<div class="content">
			<div class="p-20 bg-w clear p-l-30 p-t-2">
				<div @click="selectCard(index,item.face_value)" v-for="item,index in usdtcard_list" class="box flex">
					<div class="c-card">
						<div class="f-s-18">{{item.face_value || '--'}}<span>{{$t('Text.spot')}}</span></div>
						<div class="f-s-12">{{item.usdt_price}} USDT</div>
					</div>
				</div>
			</div>
			<div class="f-s-12 text-l p-l-30 bg-w p-b-20">{{$t('Text.usdtYe')}}：<span class="c-card">{{available || '--'}}</span></div>
			<div @click="purchase" class="bigBtn">{{$t('Text.ljgm')}}</div>
			<div class="p-l-30 text-l f-s-12">
				<div>{{$t('Text.dkkdysxf')}}</div>
				<div class="m-t-4">{{$t('Text.dkkyzr')}}</div>
				<div class="m-t-4">{{$t('Text.qzjzrqjh')}}</div>
			</div>	
		</div>
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
      toast: false,
      message: "",
      openSimple:false,//密码弹窗
      listNum:0,
      available:'',//usdt余额
      usdtcard_list:'',//可购买列表
      password:'',//密码
      face_value:'',//购买点卡的面值
    };
  },
  created: function() {
  	this.available = this.$route.params.available;//usdt余额
  	this.getUsdtcard_list();//获取可购买点卡列表
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
    //获取可购买点卡列表
    getUsdtcard_list:function(){
    	let lang = "zh_cn";
	    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1)lang = storage.get("lang");
	    lang = lang.replace('_', '-');
    	this.axios({
		  	method: 'post',
	  		timeout: 30000,
				url: API_BASE_URL + '/wallet/usdtcard_list',
				headers: {
					"Accept-Language": lang,
					"Content-Type":'application/json',
	        		"Authorization": "Bearer " + store.state.user.access_token,
	      		},
				data: {}
			}).then((response) => {
				if(response.data.code === 0){
					this.usdtcard_list = response.data.data.cards;
					for(let i in this.usdtcard_list)this.usdtcard_list[i].isSelect = false;
				}else{
					this.showToast(response.data.message)
				}
	  	}).catch((error) => {
	  		this.showToast(this.$t('Text.qqyc'))
	  	});
    },
    //立即购买
    purchase:function(){
    	if(this.face_value){
    		this.openSimple = true;
    	}else{
    		this.showToast(this.$t('Text.qxxzmz'))
    	}
    },
    //保存
    save:function(){
    	if(this.password.length == 6){
    		this.openSimple = false;
    	}else{
    		this.showToast(this.$t('Text.qxsrlwmm'))
    	}
    },
    // 获取购买数据
    getBuy_usdtcard:function(){
    	let lang = "zh_cn";
	    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1)lang = storage.get("lang");
	    lang = lang.replace('_', '-');
    	this.axios({
		  	method: 'post',
	  		timeout: 30000,
				url: API_BASE_URL + '/wallet/buy_usdtcard',
				headers: {
					"Accept-Language": lang,
					"Content-Type":'application/json',
	        		"Authorization": "Bearer " + store.state.user.access_token,
	      		},
				data: {face_value:this.face_value,password:this.password}
			}).then((response) => {
				if(response.data.code === 0){
					this.showToast(this.$t('Text.gmcg'))
					setTimeout(()=>{
						this.$router.push("/purchaseSuccess?v=" + new Date().getTime());
					},1000)
				}else{
					this.showToast(response.data.message)
				}
	  	}).catch((error) => {
	  		this.showToast(this.$t('Text.qqyc'))
	  	});
    },
    //选择面值
    selectCard:function(index,face_value){
    	this.face_value = face_value;//面值
    	for(let i in this.usdtcard_list)this.usdtcard_list[i].isSelect = false;
    	this.usdtcard_list[index].isSelect = true;
    },
  }  
};
</script>

<style>
	@import "../../assets/css/config/common.css";
	.purchaseCard{
		background:rgba(243,245,247,1);
	}
	.purchaseCard .mu-appbar{
		background: #FFFFFF;
		color: #2E3546;
	}
	.content .box{
		width:30.3333%;
		height:65px;
		border-radius:2px;
		border:1px solid rgba(255,140,69,1);
		float: left;
		box-sizing: border-box;
		margin-right: 3%;
		margin-top: 10px;
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