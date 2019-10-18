import { CLEAN_USER } from "../../store/mutation-types";
import store from "../../store";
import storage from "../../models/storage";
let HttpResultCode = {};

HttpResultCode.orderStatusType = function(type) {
  if (type == "PENDING") {
    return "等待接单";
  } else if (type == "PENDING_SELL") {
    return "接单";
  } else if (type == "TAKEN") {
    return "已拍下";
  } else if (type == "PAID") {
    return "已付款";
  } else if (type == "RELEASED") {
    return "交易完成";
  } else if (type == "TB_CANCELLED") {
    return "买方取消";
  } else if (type == "SELLER_CANCELLED") {
    return "交易取消";
  } else if (type == "OVERTIME") {
    return "超时取消";
  } else if (type == "PB_CANCELLED") {
    return "交易取消";
  } else if (type == "PS_DISPUTED") {
    return "申诉中";
  } else if (type == "PB_DISPUTED") {
    return "申诉中";
  } else if (type == "BUYER_WON") {
    return "交易完成";
  } else if (type == "SELLER_WON") {
    return "交易完成";
  } else if (type == "NOT_TAKEN") {
    return "订单关闭";
  }
};
/**
 *验证返回码
 * @param code
 */
HttpResultCode.validate = function(code) {
  switch (code) {
    case 0:
      return "成功";
    // case 1:
    //   return "未知错误";
    // case 2:
    //   return "参数错误";
    // case 1001:
    //   return "邮箱已被注册";
    // case 1002:
    //   return "手机已被注册";
    // case 1003:
    //   return "账号或密码错误";
    case 507:
      storage.set("at", "");
      storage.set("hpp", "");
      storage.set("mobile", "");
      storage.set("access_token", "");
      storage.set("name", "");
      store.commit(CLEAN_USER);
      window.vm.$router.push("/sign_in");
      return "token鉴证失败";
    case 401:
      storage.set("at", "");
      storage.set("hpp", "");
      storage.set("mobile", "");
      storage.set("access_token", "");
      storage.set("name", "");
      store.commit(CLEAN_USER);
      window.vm.$router.push("/sign_in");
      return "token鉴证失败";
    default:
      return "网络异常";
  }
};

HttpResultCode.validate1 = function(code,coin) {
  switch (code) {
    case 0:
      return "成功";



      case 2516:

      window.vm.$router.push("/Add_address1/"+coin);
      return "token鉴证失败";
    default:
      return "网络异常";
  }
};
export default HttpResultCode;
