<template>
		<div class="Activated">
			<div v-for="item in 8" class="bg-w">
				<div class="m-l-r-15 text-l p-b-t-15 b-b c-h">
					<div class="f-s-16" style="color: #A9B2C3;">卡号：CX10003455</div>
					<div class="m-t-4 f-s-12 c-hh p-r">
						<span class="">已激活</span>
						<span class="d-i m-l-20">来源：购买</span>
						<span class="moneys">50.00</span>
						<img class="rights" width="15" height="15" src="../../assets/image/more.png"/>
					</div>
				</div>
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
	
	.Activated .moneys{
		color: #A9B2C3;
		font-size: 16px;
		position: absolute;
		top: -18px;
    	right: 44px;
	}
	.Activated .rights{
		position: absolute;
		top: -15px;
    	right: 0px;
	}
	.Activated .c-hh{
		color: #6D778B;
	}
</style>