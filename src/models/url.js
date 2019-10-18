// base

// 测试环境配置
// export const BASE_URL = document.location.protocol + '//localhost:8080'
// export const API_BASE_URL = document.location.protocol + '//localhost:8080/api'

// 测试环境配置
export const BASE_URL =
document.location.protocol + "//" + document.location.host;
export const API_BASE_URL =
document.location.protocol + "//" + document.location.host + "/api";


// 生产环境配置

// export const BASE_URL = "https://www.cxotc.com";
// export const API_BASE_URL = "https://www.cxotc.com/api";


// export const BASE_URL = "https://m.firefoxotc.com"; ///切記Android打包 assst 加.  img.src = IMG_BASE_URL + "invite.png"; // "/static/img/invite.png"; //IMG_BASE_URL + "invite.png";
// export const API_BASE_URL = "https://m.firefoxotc.com/api"; /// 切記Android打包   img.src = IMG_BASE_URL + "invite.png"; // "/static/img/invite.png"; //IMG_BASE_URL + "invite.png";

// export const BASE_URL = 'http://192.168.1.36:8082'
// export const API_BASE_URL = 'http://192.168.1.36:8082/api'

// export const BASE_URL = 'http://192.168.1.105:80/api'
// export const API_BASE_URL = 'http://192.168.1.105:80/api'

export const IMG_BASE_URL = "http://hkbitfuture.oss-cn-hongkong.aliyuncs.com/m/img/";
// export const IMG_BASE_URL = '../../static/'
// user

export const USER_MOBILE_SIGN_UP = "/mobile_sign_up";

export const USER_EMAIL_SIGN_UP_CODE = "/email_sign_up_code";
export const USER_EMAIL_SIGN_UP = "/email_sign_up";

export const USER_SIGN_OUT = "/user/sign_out";

export const USER_INVITE_REWARD_SUMMARY = "/wallet/reward_summary";
export const USER_INVITE_REWARD_DETAIL = "/wallet/reward_detail";

export const USER_MOBILE_RESET_SIGN_IN_PASSWORD_CODE =
  "/user/onetimecode/resetsigninpassword";
export const USER_MOBILE_RESET_SIGN_IN_PASSWORD =
  "/user/resetsigninpassword";
export const USER_EMAIL_RESET_SIGN_IN_PASSWORD =
  "/email_reset_sign_in_password";
export const USER_EMAIL_RESET_SIGN_IN_PASSWORD_CODE =
  "/email_reset_sign_in_password_code";

export const USER_INFO = "/user/profile";
export const USER_SECURITY = "/user/profile";

export const USER_MODIFY_PAYMENT_PASSWORD = "/modify_payment_password";
export const USER_MODIFY_PASSWORD = "/user/modifysigninpassword";
export const USER_BIND_EMAIL_CODE = "/bind_email_code";
export const USER_BIND_EMAIL = "/bind_email";
export const USER_BIND_MOBILE_CODE = "/bind_mobile_code";
export const USER_BIND_MOBILE = "/bind_mobile";


export const USER_BIND_GOOGLE_AUTH = "/user/bindgoogleauth";
export const USER_UNBIND_GOOGLE_AUTH = "/user/unbindgoogleauth";

export const USER_BIND_GOOGLE_AUTH_CODE = "/user/onetimecode/bindgoogleauth";


export const USER_BIND_MOBILE_EMAIL_CODE = "/bind_mobile_email_code";
export const USER_BIND_EMAIL_MOBILE_CODE = "/bind_email_mobile_code";

export const USER_MOBILE_RESET_PAYMENT_PASSWORD =
  "/mobile_reset_payment_password";
export const USER_MOBILE_RESET_PAYMENT_PASSWORD_CODE =
  "/mobile_reset_payment_password_code";
export const USER_EMAIL_RESET_PAYMENT_PASSWORD_CODE =
  "/email_reset_payment_password_code";
export const USER_EMAIL_RESET_PAYMENT_PASSWORD =
  "/email_reset_payment_password";



//market
export const EXCHANGE_KLINE = "/exchange/kline";
export const MARKET_MINE = "/market/mine";
export const MARKET_UNPUBLISH = "/market/unpublish";
export const MARKET_REPUBLISH = "/market/republish";
export const MARKET_DELETE = "/market/delete";
export const MARKET_GET = "/market/get";

//order
export const ORDER_MINE = "/order/mine";
export const ORDER_PAID = "/otc/pay_trade";
export const ORDER_CANCEL = "/otc/cancel_trade";
export const ORDER_GET = "/order/get";
export const ORDER_RELEASE = "/otc/release_trade";
export const ORDER_DISPUTE = "/otc/dispute_trade ";

//wallet
export const WALLET_BALANCE = "/wallet/balance";
export const WALLET_MY_DEPOSIT = "/wallet/my_deposit";
export const WALLET_BILL = "/wallet/my_bill";
export const WALLET_GET_ADDRESS = "/wallet/my_address";
export const WALLET_NEW_ADDRESS = "/wallet/new_address";
export const WALLET_MY_WITHDRAWAL = "/wallet/my_withdrawal";
export const WALLET_MY_WITHDRAW = "/wallet/withdraw";
export const WALLET_MY_WITHDRAW_RESTRICTION = "/wallet/withdraw_restriction";
export const WALLET_MY_WITHDRAW_WITHDRAW_CODE = "/wallet/withdraw_code";
export const WALLET_OSC = "/wallet/osc";

//data
export const DATA_NOTICE =
  "//misc.firefoxotc.com/h5/v1/static/data/notice.json";

//captcha



export const USER_S3_INFO = "/aws/upload_file";
export const USER_PAYMENT_BIND_ALIPAY = "/bind_alipay";
export const USER_PAYMENT_BIND_WECHAT = "/bind_wechat_pay";
export const USER_PAYMENT_BIND_BANK = "/bind_bankcard";

export const EXCHANGE_LIMIT_ORDER = API_BASE_URL + "/exchange/limit_order";
export const EXCHANGE_MARKET_ORDER = API_BASE_URL + "/exchange/market_order";
export const EXCHANGE_DEPTH = API_BASE_URL + "/exchange/depth";
export const EXCHANGE_MY_ORDER = API_BASE_URL + "/exchange/my_order";
export const EXCHANGE_CANCEL_ORDER = API_BASE_URL + "/exchange/cancel_order";

export const EXCHANGE_TRADES = API_BASE_URL + "/exchange/trades";

export const AGENT_LOCK = API_BASE_URL + "/agent/lock";
export const AGENT_UNLOCK = API_BASE_URL + "/agent/unlock";
export const AGENT_DEPOSIT = API_BASE_URL + "/agent/deposit";
export const AGENT_CANCEL_DEPOSIT = API_BASE_URL + "/agent/cancel_deposit/";
export const AGENT_SUCCEED_DEPOSIT = API_BASE_URL + "/agent/succeed_deposit/";
export const AGENT_SUCCEED_WITHDRAW = API_BASE_URL + "/agent/succeed_withdraw/";
export const AGENT_WITHDRAW = API_BASE_URL + "/agent/withdraw";
export const AGENT = API_BASE_URL + "/agent";
export const AGENT_MINE_TRANSFER = API_BASE_URL + "/agent/mine_transfer";
export const AGENT_AGENT_TRANSFER = API_BASE_URL + "/agent/agent_transfer";

export const EXCHANGE_TICKER_LIST = API_BASE_URL + "/exchange/ticker_list";

//game
//fox
export const FOX_ACTIVE = API_BASE_URL + "/fox/activate";
export const FOX_ACTIVATE = API_BASE_URL + "/fox/activate";
export const FOX_MINE = API_BASE_URL + "/fox/mine";
export const FOX_MARKET_LIST = API_BASE_URL + "/fox/market/list";
export const FOX_SELL = API_BASE_URL + "/fox/sell";
export const FOX_MATE = API_BASE_URL + "/fox/mate";
export const FOX_DRAW_LOTTERY = API_BASE_URL + "/fox/draw_lottery";
export const FOX_LOG_FEED = API_BASE_URL + "/fox/log/feed";
export const FOX_LOG_DIG = API_BASE_URL + "/fox/log/dig";
export const FOX_MINE_MATE = API_BASE_URL + "/fox/mine_mate";
export const FOX_TRADE_LIST = API_BASE_URL + "/fox/trade/list";
export const FOX_SEARCH_MARKET_LIST = API_BASE_URL + "/fox/market/list";

//fox dan
export const FOX_MINE_DAN = API_BASE_URL + "/fox/mine_dan";
export const FOX_HUA_DAN = API_BASE_URL + "/fox/hua_dan";
export const FOX_FEED_DAN = API_BASE_URL + "/fox/feed_dan";
export const FOX_LOG_DAN = API_BASE_URL + "/fox/log/dan";
// export const EXCHANGE_LIMIT_ORDER = API_BASE_URL + '/exchange/limit_order'
// export const EXCHANGE_MARKET_ORDER = API_BASE_URL + '/exchange/market_order'
// export const EXCHANGE_DEPTH = API_BASE_URL + '/exchange/depth'
// export const EXCHANGE_MY_ORDER = API_BASE_URL + '/exchange/my_order'
// export const EXCHANGE_CANCEL_ORDER = API_BASE_URL + '/exchange/cancel_order'

export const FOX_BALANCE_FEED = API_BASE_URL + "/fox/balance_feed";

// export const WALLET_BALANCE = API_BASE_URL +  '/wallet/balance'

export const FOX_MINE_HIDE = API_BASE_URL + "/fox/mine_hide";
export const FOX_HIDE_INFO = API_BASE_URL + "/fox/hide_info";
export const FOX_HIDE_LIST = API_BASE_URL + "/fox/hide_list";
export const FOX_ROB_HIDE = API_BASE_URL + "/fox/rob_hide";
export const FOX_BET_HIDE = API_BASE_URL + "/fox/bet_hide";

export const FOX_MINE_DRAW = API_BASE_URL + "/fox/mine_draw";
export const FOX_DRAW_FOX = API_BASE_URL + "/fox/draw_fox";
export const POST_FOX_ACTIVATE_FOX = API_BASE_URL + "/fox/activate_fox";

export const FOX_OSC_HIDE_INFO = API_BASE_URL + "/fox/osc_hide_info";
export const FOX_OSC_HIDE_RECORD = API_BASE_URL + "/fox/osc_hide_record";
export const FOX_BET_OSC_HIDE = API_BASE_URL + "/fox/bet_osc_hide";
export const FOX_INJECT_OSC_HIDE = API_BASE_URL + "/fox/inject_osc_hide";

export const INDEX_BANNER_LIST = API_BASE_URL + "/banner/list";

export const FOX_OSC_AUTO_HIDE_INFO = API_BASE_URL + "/fox/osc_auto_hide_info";
export const FOX_OSC_AUTO_HIDE_RECORD =
  API_BASE_URL + "/fox/osc_auto_hide_record";
export const BET_FOX_OSC_AUTO_HIDE = API_BASE_URL + "/fox/bet_osc_auto_hide";

export const DEPOSIT_SEND_OSC = BASE_URL + "/deposit/send_osc";

export const WALLET_XDAG_BIND_ADDRESS =
  API_BASE_URL + "/wallet/xdag/bind_address";

export const WALLET_ANDROID_VERSION = API_BASE_URL + "/ios/version";

// export const USER_BIND_MOBILE_CODE = API_BASE_URL + '/bind_mobile_code'
// export const USER_BIND_MOBILE = API_BASE_URL + '/bind_mobile'

export const AGENT_DISABLE_DEPOSITE = API_BASE_URL + "/agent/disable_deposit";
export const AGENT_ENABLE_DEPOSITE = API_BASE_URL + "/agent/enable_deposit";

export const NOTICE_CONTENT = API_BASE_URL + "/notice/content";
export const NOTICE_LIST = API_BASE_URL + "/notice/list";

export const FFT_SHARES_SUMMARY = API_BASE_URL + "/fft_shares/summary";
export const FFT_SHARES_GET = API_BASE_URL + "/fft_shares/get";

export const AGENT_DISABLE_WITHDRAWAL =
  API_BASE_URL + "/agent/disable_withdrawal";
export const AGENT_ENABLE_WITHDRAWAL =
  API_BASE_URL + "/agent/enable_withdrawal";

export const AGENT_PAID = API_BASE_URL + "/agent/paid/";
// export const EXCHANGE_KLINE = "/exchange/kline";

export const FOX_MINE_GOD_FOX = API_BASE_URL + "/fox/mine_god_fox";

export const FOX_MINE_ALL = API_BASE_URL + "/fox/mine_all";

export const FOX_SUMMARY = API_BASE_URL + "/fox/summary";

export const OPTIONS_MINE = API_BASE_URL + "/options/mine";
export const OPTIONS_SUBMIT = API_BASE_URL + "/options/submit";
export const OPTIONS_CANCEL = API_BASE_URL + "/options/cancel";
export const OPTIONS_BUY = API_BASE_URL + "/options/buy";
export const OPTIONS_EXERCISE = API_BASE_URL + "/options/exercise";
export const OPTIONS_LIST = API_BASE_URL + "/options/list";




export const USER_CHECK_NAME = "/user/check_name";


export const USER_MOBILE_SIGNUP = "/user/mobile/signup";

export const USER_SIGN_IN = "/user/signin";

export const USER_PROFILE = "/user/profile";

export const CAPTCHA_SIGNUP = API_BASE_URL + "/user/image_code/signup";

export const USER_MOBILE_SIGN_UP_CODE = "/user/mobile_code/signup";

export const CAPTCHA_SIGNIN = API_BASE_URL + "/user/image_code/signin";

export const USER_SET_PAYMENT_PASSWORD = "/user/setpaymentpassword";


//trade
export const TRADE_MARKET_LIST = "/otc/ad_list";
export const TRADE_MARKET_PUBLISH = "/otc/publish_ad";
export const TRADE_MARKET_EDIT = "/market/edit";
export const TRADE_MARKET_PRE_ORDER = "/otc/pre_order";
export const TRADE_MARKET_GET = "/market/get";
export const TRADE_MARKET_PLACE_ORDER = "/otc/place_order";
export const TRADE_MARKET_PUBLISH_RESTRICTION = "/otc/publish_restriction";
export const TRADE_MARKET_PRUCE = "/market/price";
export const TRADE_MARKET_MY_ADS = "/otc/my_ad";
export const TRADE_OTC_UNPUBLISH_AD = "/otc/unpublish_ad";

export const USER_ABOUT_US = "/about_us";

export const USER_GOOGLE_AUTH_KEY = "/user/getgoogleauthkey";

export const USER_onetimecode_resetpaymentpassword = "/user/onetimecode/resetpaymentpassword";

export const USER_user_resetpaymentpassword = "/user/resetpaymentpassword";

export const USER_ADD_ADDRESS = "/otc/add_receiver_address";

export const USER_otc_mobile_code_addreceiveraddress = "/otc/mobile_code/addreceiveraddress";
export const USER_otc_my_receiver_address = "/otc/my_receiver_address";

export const USER_otc_mobile_code_deletereceiveraddress = "/otc/mobile_code/deletereceiveraddress";

export const USER_otc_delete_receiver_address = "/otc/delete_receiver_address";

export const USER_otc_supported_currencies = "/otc/supported_currencies";

export const USER_otc_my_account = "/wallet/my_account";

export const USER_otc_my_supported_otc_symbols = "/otc/supported_otc_symbols";

export const USER_otc_my_trade = "/otc/my_trade";

export const USER_otc_get_trade = "/otc/get_trade";

export const USER_otc_my_depositing = "/wallet/my_depositing";

export const USER_otc_wallet_deposit = "/wallet/deposit";

export const USER_otc_my_deposit = "/wallet/my_deposit";

export const USER_wallet_cancel_transfer = "/wallet/cancel_transfer";

export const USER_wallet_withdraw_restriction = "/wallet/withdraw_restriction";

export const USER_wallet_onetimecode_withdraw = "/wallet/onetimecode/withdraw";

export const USER_wallet_my_withdrawal = "/wallet/my_withdrawal";

export const USER_wallet_withdraw = "/wallet/withdraw";


export const USER_OTC_AWS_UPLOAD_DISPUTE = "/otc/aws/upload_dispute?tid=";


export const USER_OTC_dispute_seller_submit = "/otc/dispute/seller_submit";

export const USER_OTC_dispute_buyer_comment = "/otc/dispute/buyer_comment";

export const USER_feedback = "/user/feedback";


export const USER_my_feedback = "/user/my_feedback";

export const USER_otc_ad_detail = "/otc/ad_detail";



export const USER_onetimecode_signin = "/user/onetimecode/signin";


