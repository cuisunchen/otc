<template>
	<div class="purchaseSuccess h-b100 bg-w">
		<img class="m-t-70" width="197" height="135" src="../../assets/image/myPintCrd/sBlockBg.png"/>
		<div class="m-t-30 m-l-r-52 f-s-16">{{$t('sblock.sblockAndOtcText')}}</div>
		<div class="bigBtn m-t-50" style="background: #005EE4;">{{$t('sblock.bdyyzh')}}</div>
		<div class="bigBtn bindNewAccount" style="background: #005EE4;">{{$t('sblock.bdxzh')}}</div>
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
//  transfer:function(){
//  	this.$router.push('/transfer?v=' + new Date().getTime());
//  },
  }  
};
</script>

<style>
	@import "../../assets/css/config/common.css";
	.purchaseSuccess .bindNewAccount{
		background: #fff!important;
		color: #005EE4;
		border:1px solid rgba(0,94,228,1);
	}
</style>