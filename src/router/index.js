import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import { SET_INVITE_REFERRAL_CODE } from "../store/mutation-types";
import storage from "../models/storage";

const NO_AUTH_PAGES = [
  "sign_in",
  "sign_up",
  "terms_and_privacy",
  "trade",
  "sign_in_reset",
  "exchange",
  "activity",
  "index",
  "index1",
  "app_down",
  "HelloWorld",
  "to_browser",
  "notice",
  "notices",
  "kline",
  "help_center",
  "how_to_agent",
  "ffc_exchange",
  "help_buy",
  "help_sell",
  "help_recharge",
  "help_withdraw",
  "help_ffc",
  "help_point",
  "help_bibi",
  "options_trade",

  "options_help"
];
const NEED_PAYMENT_PWD_PAGES = [
  "order",
  "user",
  "place_order",
  "ad_edit",
  "ads",
  "wallet",
  "bills",
  "realname",
  "google_bound",
  "bound_mobile",
  "game_fox_market",
  "game_fox_home",
  "game_fox",
  "game_fox_bound_add",
  "game_fox_my",
  "about_center",
  "game_fox_fast",
  "help_bound_pay",
  "share",
  "deposit",
  "help_bound_google",
  "game_fox_generation",
  "game_fox_hide",
  "game_fox_high",
  "game_fox_hide_detail",
  "game_fox_rules",
  "game_fox_center",
  "wallet_detail_fft",
  "index_draw",
  "quantitative",
  "game_fox_wkc3d",
  "options_order",
  "exchangeList",
  "Add_address",
  "Addresses",
  "AddressesEd",
  "Add_addressDelete",
  "wallet_usdt",
  "dispute",
  "gd",
  "MyGd",
  "publish_ok",
  "withdraw_ok",
  "Add_address1",
  "person",
  "AdDetail",
  "publish",
  "wallet_usdt_cash",
  "wallet_usdt_recharge"
];

import publish from "@/components/publish";

import trade from "@/components/trade";

import order from "@/components/order";

import share from "@/components/share";

import user from "@/components/user";

import sign_in from "@/components/sign_in";

import sign_up from "@/components/sign_up";

import place_order from "@/components/place_order";

import order_buy from "@/components/order_buy";

import order_sell from "@/components/order_sell";

import ad_edit from "@/components/ad_edit";

import ads from "@/components/ads";

import wallet from "@/components/wallet";

import bills from "@/components/bills";

import set from "@/components/set";

import modify_password from "@/components/modify_password";

import set_assets_pwd from "@/components/set_assets_pwd";

import modify_asserts_pwd from "@/components/modify_asserts_pwd";

import reset_asserts_pwd from "@/components/reset_asserts_pwd";

import realname from "@/components/realname";

import google_bound from "@/components/google_bound";

import google_unbound from "@/components/google_unbound";

import share_rewards from "@/components/share_rewards";

import invite_img from "@/components/invite_img";

import pay from "@/components/pay";
import notice from "@/components/notice";
import notices from "@/components/notices";

import sign_in_reset from "@/components/sign_in_reset";

import wallet_detail from "@/components/wallet_detail";

import wallet_detail_ffc from "@/components/wallet_detail_ffc";

import bills_ffc from "@/components/bills_ffc";

import exchange from "@/components/exchange";

import agent from "@/components/agent";

import ffc_exchange from "@/components/ffc_exchange";

import bills_agent from "@/components/bills_agent";

import activity from "@/components/activity";

import game_fox_market from "@/components/game_fox_market";

import game_fox_center from "@/components/game_fox_center";

import game_fox_home from "@/components/game_fox_home";

import game_fox from "@/components/game_fox";

import game_fox_bound_add from "@/components/game_fox_bound_add";

import game_fox_my from "@/components/game_fox_my";

import game_fox_generation from "@/components/game_fox_generation";

import game_fox_hide from "@/components/game_fox_hide";

import game_fox_high from "@/components/game_fox_high";

import game_fox_hide_detail from "@/components/game_fox_hide_detail";

import help_center from "@/components/help_center";

import help_bibi from "@/components/help_bibi";

import how_to_agent from "@/components/how_to_agent";

import help_point from "@/components/help_point";

import help_ffc from "@/components/help_ffc";

import help_withdraw from "@/components/help_withdraw";

import help_sell from "@/components/help_sell";

import help_buy from "@/components/help_buy";

import help_recharge from "@/components/help_recharge";

import game_fox_rules from "@/components/game_fox_rules";

import invite from "@/components/invite";

import index from "@/components/index";

import about_center from "@/components/about_center";

import game_fox_fast from "@/components/game_fox_fast";

import help_bound_pay from "@/components/help_bound_pay";

import deposit from "@/components/deposit";

import help_bound_google from "@/components/help_bound_google";

import index1 from "@/components/index1";

import bound_mobile from "@/components/bound_mobile";

import to_browser from "@/components/to_browser";

import app_down from "@/components/app_down";
import kline from "@/components/kline";

import wallet_detail_fft from "@/components/wallet_detail_fft";

import index_draw from "@/components/index_draw";
import quantitative from "@/components/quantitative";

import game_fox_wkc3d from "@/components/game_fox_wkc3d";

import options_trade from "@/components/options_trade";
import options_order from "@/components/options_order";
import options_help from "@/components/options_help";
import exchangeList from "@/components/exchangeList";
import Add_address from "@/components/Add_address";
import Addresses from "@/components/Addresses";
import AddressesEd from "@/components/AddressesEd";
import Add_addressDelete from "@/components/Add_addressDelete";
import wallet_usdt from "@/components/wallet_usdt";

import dispute from "@/components/dispute";
import gd from "@/components/gd";
import MyGd from "@/components/MyGd";
import AdDetail from "@/components/AdDetail";

import publish_ok from "@/components/publish_ok";

import person from "@/components/person";

import withdraw_ok from "@/components/withdraw_ok";

import Add_address1 from "@/components/Add_address1";

import terms_and_privacy from "@/components/terms_and_privacy";

import Cash from "@/components/wallet_usdt_cash.vue";

import Recharge from "@/components/wallet_usdt_recharge.vue";

// const Cash = () => import('@/components/wallet_usdt_cash.vue');

// const Recharge = () => import('@/components/wallet_usdt_recharge.vue');

// import game_fox_market from '@/components/game_fox_market'

// import game_fox_center from '@/components/game_fox_center'

// import game_fox_home from '@/components/game_fox_home'

// import game_fox from '@/components/game_fox'

// import game_fox_bound_add from '@/components/game_fox_bound_add'

// import game_fox_my from '@/components/game_fox_my'

// import game_fox_generation from '@/components/game_fox_generation'

// import game_fox_hide from '@/components/game_fox_hide'

// import game_fox_high from '@/components/game_fox_high'

// import game_fox_hide_detail from '@/components/game_fox_hide_detail'

// import help_center from '@/components/help_center'

// import help_bibi from '@/components/help_bibi'

// import help_point from '@/components/help_point'

// import help_ffc from '@/components/help_ffc'

// import help_withdraw from '@/components/help_withdraw'

// import help_sell from '@/components/help_sell'

// import help_buy from '@/components/help_buy'

// import help_recharge from '@/components/help_recharge'

// import game_fox_rules from '@/components/game_fox_rules'

// import invite from '@/components/invite'
// import HelloWorld from '@/components/HelloWorld'
// import xxx from '@/components/xxx'

import sBlockIndex from "@/components/sBlock/sBlockIndex";//sBlockIndex
import usdtTransfer from "@/components/sBlock/usdtTransfer";//USDT划转

import myPintCrd from "@/components/pintCrd/myPintCrd";//我的点卡
import purchaseCard from "@/components/pintCrd/purchaseCard";//购买
import purchaseSuccess from "@/components/pintCrd/purchaseSuccess";//购买成功
import transfer from "@/components/pintCrd/transfer";//转让
import myPintCrdList from "@/components/pintCrd/myPintCrdList";//我的点卡列表
import ToBeActivated from "@/components/pintCrd/ToBeActivated";//我的点卡待激活列表
import Activated from "@/components/pintCrd/Activated";//我的点卡已激活列表



Vue.use(Router);

let router = new Router({
  mode: !!(window.history && history.pushState) ? "history" : "hash",
  // mode:('history'),
  routes: [
    {
      path: "/",
      name: "trade",
      component: trade
    },
    {
      path: "/trade",
      name: "trade",
      component: trade,
      meta: {
        keepAlive: true,
        isBack: true
      }
    },
     {
	    path: '/sBlockIndex',
	    component: sBlockIndex,
	    name: 'S BLOCK首页',
	  },
	  {
	    path: '/usdtTransfer',
	    component: usdtTransfer,
	    name: 'USDT划转',
	  },
    {
	    path: '/myPintCrd/:card_available/:card_locked/:available/:v',
	    component: myPintCrd,
	    name: '我的点卡',
	  },
	   {
	    path: '/purchaseCard/:available/:v',
	    component: purchaseCard,
	    name: '购买',
	  },
	   {
	    path: '/purchaseSuccess',
	    component: purchaseSuccess,
	    name: '购买成功',
	  },
	   {
	    path: '/transfer',
	    component: transfer,
	    name: '转让',
	  },
	  {
	    path: '/myPintCrdList',
	    component: myPintCrdList,
	    name: '我的点卡列表',
	  },
	  {
	    path: '/ToBeActivated',
	    component: ToBeActivated,
	    name: '我的点卡待激活列表',
	  },
	  {
	    path: '/Activated',
	    component: Activated,
	    name: '我的点卡已激活列表',
	  },
    {
      path: "/index",
      name: "index",
      component: index
      // meta: {
      //   keepAlive: true,
      //   isBack: true
      // }
    },
    {
      path: "/index1",
      name: "index1",
      component: index1
    },
    {
      path: "/Add_address1/:coinName",
      name: "Add_address1",
      component: Add_address1
    },
    
    {
      path: "/person",
      name: "person",
      component: person
    },
    
    
    {
      path: "/publish_ok",
      name: "publish_ok",
      component: publish_ok
    },
    
    {
      path: "/bound_mobile",
      name: "bound_mobile",
      component: bound_mobile
    },
    {
      path: "/Add_addressDelete/:address/:currency/:remark",
      name: "Add_addressDelete",
      component: Add_addressDelete
    },
    {
      path: "/dispute/:id/:symbol",
      name: "dispute",
      component: dispute
    },
    
    {
      path: "/Addresses",
      name: "Addresses",
      component: Addresses
    },
    {
      path: "/gd",
      name: "gd",
      component: gd
    },
    {
      path: "/MyGd",
      name: "MyGd",
      component: MyGd
    },
    
    
    {
      path: "/wallet_usdt",
      name: "wallet_usdt",
      component: wallet_usdt,
    },
    {
      path: "/recharge",
      name: "wallet_usdt_recharge",
      component: Recharge,
    },

    {
      path: "/cash",
      name: "wallet_usdt_Cash",
      component: Cash,
    },

    {
      path: "/AddressesEd",
      name: "AddressesEd",
      component: AddressesEd
    },
    {
      path: "/Add_address",
      name: "Add_address",
      component: Add_address
    },
    
    {
      path: "/order",
      name: "order",
      component: order
    },
    {
      path: "/notice/:id",
      name: "notice",
      component: notice
    },
    {
      path: "/notices",
      name: "notices",
      component: notices
    },
  
    {
      path: "/place_order/:id/:symbol", 
      name: "place_order",
      component: place_order
    },
    {
      path: "/share",
      name: "share",
      component: share
    },
    {
      path: "/user",
      name: "user",
      component: user
    },
    {
      path: "/sign_in",
      name: "sign_in",
      component: sign_in
    },
    {
      path: "/sign_up",
      name: "sign_up",
      component: sign_up
    },
    {
      path: "/terms_and_privacy",
      name: "terms_and_privacy",
      component: terms_and_privacy
    },
    {
      path: "/order_buy/:symbol/:id",
      name: "order_buy",
      component: order_buy
    },
    {
      path: "/AdDetail/:id",
      name: "AdDetail",
      component: AdDetail
    },
    {
      path: "/order_sell/:symbol/:id/:v",
      name: "order_sell",
      component: order_sell
    },
    {
      path: "/ad_edit/:crypto_currency/:id",
      name: "ad_edit",
      component: ad_edit
    },
    {
      path: "/ads",
      name: "ads",
      component: ads
    },
    {
      path: "/wallet",
      name: "wallet",
      component: wallet
    },
    {
      path: "/bills",
      name: "bills",
      component: bills
    },
    {
      path: "/set",
      name: "set",
      component: set
    },
    {
      path: "/modify_password",
      name: "modify_password",
      component: modify_password
    },
    {
      path: "/set_assets_pwd",
      name: "set_assets_pwd",
      component: set_assets_pwd
    },
    {
      path: "/modify_asserts_pwd",
      name: "modify_asserts_pwd",
      component: modify_asserts_pwd
    },
    {
      path: "/reset_asserts_pwd",
      name: "reset_asserts_pwd",
      component: reset_asserts_pwd
    },
    {
      path: "/realname",
      name: "realname",
      component: realname
    },
    {
      path: "/google_bound",
      name: "google_bound",
      component: google_bound
    },
    {
      path: "/google_unbound",
      name: "google_unbound",
      component: google_unbound
    },
    {
      path: "/share_rewards",
      name: "share_rewards",
      component: share_rewards
    },
    {
      path: "/invite_img",
      name: "invite_img",
      component: invite_img
    },
    {
      path: "/invite",
      name: "invite",
      component: invite
    },
    {
      path: "/pay",
      name: "pay",
      component: pay
    },
    {
      path: "/sign_in_reset",
      name: "sign_in_reset",
      component: sign_in_reset
    },
    {
      path: "/wallet_detail/:crypto_currency",
      name: "wallet_detail",
      component: wallet_detail
    },
    {
      path: "/exchangeList",
      name: "exchangeList",
      component: exchangeList
    },
    {
      path: "/exchange",
      name: "exchange",
      component: exchange
    },
    {
      path: "/wallet_detail_ffc",
      name: "wallet_detail_ffc",
      component: wallet_detail_ffc
    },
    {
      path: "/wallet_detail_fft",
      name: "wallet_detail_fft",
      component: wallet_detail_fft
    },
    {
      path: "/agent",
      name: "agent",
      component: agent
    },
    {
      path: "/bills_ffc",
      name: "bills_ffc",
      component: bills_ffc
    },
    {
      path: "/bills_agent",
      name: "bills_agent",
      component: bills_agent
    },
    {
      path: "/activity",
      name: "activity",
      component: activity
    },
    {
      path: "/index_draw",
      name: "index_draw",
      component: index_draw
    },
    {
      path: "/quantitative",
      name: "quantitative",
      component: quantitative
    },

    // //fox start

    {
      path: "/game_fox_market",
      name: "game_fox_market",
      component: game_fox_market,
      meta: {
        keepAlive: true,
        isBack: true
      }
    },
    {
      path: "/game_fox_hide",
      name: "game_fox_hide",
      component: game_fox_hide
    },
    {
      path: "/game_fox_high",
      name: "game_fox_high",
      component: game_fox_high
    },
    {
      path: "/game_fox_home",
      name: "game_fox_home",
      component: game_fox_home,
      meta: {
        keepAlive: true,
        isBack: true
      }
    },
    {
      path: "/game_fox/:id",
      name: "game_fox",
      component: game_fox
    },
    {
      path: "/game_fox_generation/:generation/:sell_type",
      name: "game_fox_generation",
      component: game_fox_generation,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
  
    {
      path: "/game_fox_hide_detail",
      name: "game_fox_hide_detail",
      component: game_fox_hide_detail
    },
    {
      path: "/game_fox_center",
      name: "game_fox_center",
      component: game_fox_center
    },

    {
      path: "/game_fox_bound_add",
      name: "game_fox_bound_add",
      component: game_fox_bound_add
    },
    {
      path: "/game_fox_my",
      name: "game_fox_my",
      component: game_fox_my,
      meta: {
        keepAlive: true,
        isBack: true
      }
    },

    {
      path: "/help_center",
      name: "help_center",
      component: help_center
    },
    {
      path: "/how_to_agent",
      name: "how_to_agent",
      component: how_to_agent
    },
    {
      path: "/ffc_exchange",
      name: "ffc_exchange",
      component: ffc_exchange
    },

    {
      path: "/help_bibi",
      name: "help_bibi",
      component: help_bibi
    },
    {
      path: "/help_point",
      name: "help_point",
      component: help_point
    },
    {
      path: "/help_ffc",
      name: "help_ffc",
      component: help_ffc
    },
    {
      path: "/help_withdraw",
      name: "help_withdraw",
      component: help_withdraw
    },
    {
      path: "/help_recharge",
      name: "help_recharge",
      component: help_recharge
    },
    {
      path: "/help_sell",
      name: "help_sell",
      component: help_sell
    },
    {
      path: "/help_buy",
      name: "help_buy",
      component: help_buy
    },

    {
      path: "/game_fox_rules",
      name: "game_fox_rules",
      component: game_fox_rules
    },
    {
      path: "/about_center",
      name: "about_center",
      component: about_center
    },
    {
      path: "/game_fox_fast",
      name: "game_fox_fast",
      component: game_fox_fast
    },
    {
      path: "/help_bound_pay",
      name: "help_bound_pay",
      component: help_bound_pay
    },
    {
      path: "/deposit",
      name: "deposit",
      component: deposit
    },
    {
      path: "/help_bound_google",
      name: "help_bound_google",
      component: help_bound_google
    },
    {
      path: "/to_browser",
      name: "to_browser",
      component: to_browser
    },
    {
      path: "/app_down",
      name: "app_down",
      component: app_down
    },
    {
      path: "/options_help",
      name: "options_help",
      component: options_help
    },

    {
      path: "/kline",
      name: "kline",
      component: kline
    },
    {
      path: "/publish",
      name: "publish",
      component: publish
    },
    {
      path: "/game_fox_wkc3d",
      name: "game_fox_wkc3d",
      component: game_fox_wkc3d
    },
    {
      path: "/withdraw_ok",
      name: "withdraw_ok",
      component: withdraw_ok
    },
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/options_trade",
      name: "options_trade",
      component: options_trade,
      meta: {
        keepAlive: true,
        isBack: true
      }
    },
    {
      path: "/options_order",
      name: "options_order",
      component: options_order,
      meta: {
        keepAlive: true,
        isBack: true
      }
    }
  ]
});

// is_weixn(){
//   var ua = navigator.userAgent.toLowerCase();
//   if(ua.match(/MicroMessenger/i)=="micromessenger") {
//       return true;
//   } else {
//       return false;
//   }
// },

router.beforeEach((to, from, next) => {
  if (typeof to.query.referral_code != "undefined") {
    store.commit(SET_INVITE_REFERRAL_CODE, to.query.referral_code);
    storage.set("rf", to.query.referral_code);
  }
  // var ua = navigator.userAgent.toLowerCase();
  // if (
  //   to.name == "to_browser" &&
  //   ua.match(/MicroMessenger/i) != "micromessenger"
  // ) {
  //   router.push("/app_down");
  // }
  //是否需要登录判断
  //login
  if (NO_AUTH_PAGES.indexOf(to.name) > -1) {
    next();
  } else {
    if (
      store.state.user.access_token.length > 0 &&
      store.state.user.name.length > 0
    ) {
      if (
        NEED_PAYMENT_PWD_PAGES.indexOf(to.name) > -1 &&
        !store.state.user.has_payment_password
      ) {
        router.push("/set_assets_pwd");
      } else {
        next();
      }
    } else {
      router.push("/sign_in");
    }
  }
});

export default router;
