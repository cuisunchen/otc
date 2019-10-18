<template>
	<div class="myPintCrd h-b100 bg-f0">
		<div class="header">
			<mu-appbar style="width: 100%;">
			  <span @click="goBack" icon slot="left"><img width="24" height="24" src="../../assets/image/myPintCrd/Icon back.png"/></span>
			  	{{$t('Text.wddk')}}
			  <span flat slot="right">{{$t('Text.mx')}}</span>
			</mu-appbar>
			<div class="content">
				<div class="cardBox">
					<div class="cardBoxContent c-w">
						<div style="height: 15px;"></div>
						<div>{{$t('Text.dkyed')}}</div>
						<div class="ed f-w-5">{{cardData.card_available}}</div>
						<div class="m-t-4">{{$t('Text.djd')}}</div>
						<div class="f-s-20 f-w-5 m-t-4">{{cardData.card_locked}}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="h-10 bg-f0 p-r t--10"></div>
		<div class="list">
			<div @click="purchase" class="clear text-l p-r p-b-5 p-t-12 bg-w">
				<div class="pull-l m-l-24 m-r-18">
					<img width="26" height="26" src="../../assets/image/myPintCrd/gm.png"/>
				</div>
				<div class="pull-l">
					<span class="m-t-4 d-i">{{$t('Text.gm')}}</span>
				</div>
				<div class="pull-r m-t-4 m-r-18"><img width="14" height="14" src="../../assets/image/arrow_right.png"/></div>
				<div class="b-b p-a b-0 r-0" style="left: 68px;"></div>
			</div>
			<div class="clear text-l p-r p-b-5 p-t-12 bg-w">
				<div class="pull-l m-l-24 m-r-18">
					<img width="26" height="26" src="../../assets/image/myPintCrd/jh.png"/>
				</div>
				<div class="pull-l">
					<span class="m-t-4 d-i">{{$t('Text.jh')}}</span>
				</div>
				<div class="pull-r m-t-4 m-r-18"><img width="14" height="14" src="../../assets/image/arrow_right.png"/></div>
				<!--<div class="b-b p-a b-0 r-0" style="left: 68px;"></div>-->
			</div>
			<div class="clear text-l p-r p-b-5 p-t-12 m-t-10 bg-w">
				<div class="pull-l m-l-24 m-r-18">
					<img width="26" height="26" src="../../assets/image/myPintCrd/dk.png"/>
				</div>
				<div class="pull-l">
					<span class="m-t-4 d-i">{{$t('Text.card')}}</span>
				</div>
				<div class="pull-r m-t-4 m-r-18">
					<span class="d-i FF8C45 m-r-5">{{listNum}} {{$t('Text.cardz')}}</span>
					<img width="14" height="14" src="../../assets/image/arrow_right.png"/>
				</div>
				<!--<div class="b-b p-a b-0 r-0" style="left: 68px;"></div>-->
			</div>
		</div>
		<mu-toast v-if="toast" :message="message" @close="hideToast"/>
	</div>
</template>

<script>
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
//import Clipboard from "clipboard";
import PopupDialog from "../../common/PopupDialog";
import {
  API_BASE_URL,
} from "../../models/url.js";	
export default {
  data() {
    return {
      toast: false,
      message: "",
      cardData:'',//点卡额度
      listNum:0,
    };
  },
  created: function() {
  	this.cardData = this.$route.params;
  	this.getCardNum();//获取点卡数量
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
  	//购买
  	purchase:function(){
  		this.$router.push('/purchaseCard/' + this.cardData.available + '/' + new Date().getTime());
  	},
    goBack() {
      this.$router.go(-1);
    },
    //获取点卡数量
    getCardNum:function(){
    	let lang = "zh_cn";
	    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1)lang = storage.get("lang");
	    lang = lang.replace('_', '-');
    	this.axios({
		  	method: 'post',
	  		timeout: 30000,
				url: API_BASE_URL + '/wallet/my_usdtcard',
				headers: {
					"Accept-Language": lang,
					"Content-Type":'application/json',
	        		"Authorization": "Bearer " + store.state.user.access_token,
	      		},
				data: {status:"PENDING",limit:0,offset:1}
			}).then((response) => {
				if(response.data.code === 0){
					this.listNum = response.data.data.cards.length;
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
	.myPintCrd .header{
		background:linear-gradient(199deg,rgba(51,60,83,1) 0%,rgba(19,25,37,1) 100%);
		opacity:0.9;
	}
	.mu-paper-1{
		box-shadow:none
	}
	.mu-appbar{
		background: none;
	}
	.mu-appbar .left{
		font-size: 20px;
	}
	.m-t-15{
		margin-top: 15px;
	}
	.content .cardBoxContent{
		padding-left: 15px;
		text-align: left;
		height: 158px;
		margin: 10px 15px;
		background: url(../../assets/image/myPintCrd/cardbg.png);
		background:linear-gradient(270deg,rgba(255,157,109,1) 0%,rgba(255,135,66,1) 100%);
		box-shadow:0px 2px 7px 0px rgba(254,166,91,1);
		border-radius:10px;
	}
	.content .cardBoxContent .ed{
		font-size:35px;
	}
	.list .b-b{
		height: 1px;
		background: #F0F0F0;
	}
</style>