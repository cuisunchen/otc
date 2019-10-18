<template>
	<div class="myPintCrdList h-b100 bg-f0">
		<div class="hades">
			<mu-appbar style="width: 100%;">
			  <span @click="goBack" icon slot="left"><img width="24" height="24" src="../../assets/image/arrow_left.png"/></span>
			  	{{$t('Text.wddk')}}
			</mu-appbar>
			<div class="hadeTab">
				<div @click="active = 0" class="box"><span :class="{actives:active == 0}">待激活(100)</span></div>
				<div @click="active = 1"  class="box"><span :class="{actives:active == 1}">已激活</span></div>
			</div>
		</div>
		<div class="content">
			<be-activated v-if="active == 0"></be-activated>
			<activat-ed v-if="active == 1"></activat-ed>
		</div>
		
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

import beActivated from "./ToBeActivated";//待激活列表
import activatEd from "./Activated";//已激活列表

import {
  API_BASE_URL,
} from "../../models/url.js";	
export default {
  components:{beActivated,activatEd},	
  data() {
    return {
      active:0,
      toast: false,
      message: "",
    };
  },
  created: function() {
  	
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
    statusChange:function(active){
//  	alert(active)
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
	.myPintCrdList{
		background:rgba(243,245,247,1);
		color: #2E3546;
	}
	.myPintCrdList .mu-appbar{
		background: #FFFFFF;
		color: #2E3546;
	}
	.mu-dialog-title{
		text-align: center;
		display: block;
	}
	.myPintCrdList .hadeTab{
		display: flex;
		height: 50px;
		border-bottom: 1px solid #F0F0F0;
	}
	.myPintCrdList .content{
		-webkit-overflow-scrolling : touch;
		height: 100%;
		overflow: scroll;
		position: relative;
		top: 106px;
	} 
	.myPintCrdList .hades{
		z-index: 9999;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}
	.myPintCrdList .hadeTab{
		background: rgba(243,245,247,1);
	}
	.myPintCrdList .hadeTab .box{
		-webkit-box-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	    line-height: 50px;
	}
	.myPintCrdList .actives{
		display: inline-block;
		height: 50px;
		line-height: 50px;
		color: #FF8C45;
		border-bottom: 1px solid #FF8C45;
	}
	.myPintCrdList .moneys{
		font-size: 16px;
		position: absolute;
		color: #FF8C45;
		top: -18px;
    	right: 44px;
	}
	.myPintCrdList .rights{
		position: absolute;
		top: -15px;
    	right: 0px;
	}
</style>