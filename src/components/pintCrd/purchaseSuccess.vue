<template>
	<div class="purchaseSuccess h-b100 bg-f0">
		<mu-appbar style="width: 100%;">
		  <span @click="goBack" icon slot="left"><img width="24" height="24" src="../../assets/image/arrow_left.png"/></span>
		  	{{$t('Text.gmcg')}}
		</mu-appbar>
		<div class="content">
			<div class="p-t-15">
				<img width="42" height="42" src="../../assets/image/purchaseSuccess.png"/></span>
				<div class="c-card f-s-18">{{$t('Text.gmcg')}}</div>
				<div class="p-t-15">{{$t('Text.zjhklkkh')}}</div>
			</div>
		</div>
		<div class="clear m-t-20 m-l-r-15">
			<div @click="transfer" class="cancel">{{$t('Text.zr')}}</div>
			<div @click="myPintCrdList" class="Determine">{{$t('Text.qck')}}</div>
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
import {
  API_BASE_URL,
} from "../../models/url.js";	
export default {
  data() {
    return {
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
    //转让
    transfer:function(){
    	this.$router.push('/transfer?v=' + new Date().getTime());
    },
    //去查看
    myPintCrdList:function(){
    	this.$router.push('/myPintCrdList?v=' + new Date().getTime());
    },
  }  
};
</script>

<style>
	@import "../../assets/css/config/common.css";
	.purchaseSuccess{
		background:rgba(243,245,247,1);
	}
	.purchaseSuccess .mu-appbar{
		background: #FFFFFF;
		color: #2E3546;
	}
	.mu-dialog-title{
		text-align: center;
		display: block;
	}
	.mu-text-field{
		width: 100%;
	}
    .purchaseSuccess .cancel{
    	float: left;
		width:130px;
		height:50px;
		line-height: 50px;
		background:rgba(255,255,255,1);
		border-radius:4px;
		border:1px solid #FF8C45;
		text-align: center;
		font-size: 18px;
		color: #FF8C45;
	}
	.purchaseSuccess .Determine{
		float: right;
		width:204px;
		height:50px;
		line-height: 50px;
		text-align: center;
		background:#FF8C45;
		border-radius:4px;
		font-size: 18px;
		color: #FFFFFF;
	}
	.purchaseSuccess .content{
		height:152px;
		background:rgba(255,255,255,1);
	}
</style>