import {TYPE_MESSAGE_BOX ,TYPE_MESSAGE, TYPE_NOTIFICATION ,CODE_CONFIG} from './config'
import action from './action'
import MuseUI from 'muse-ui'
import Vue from 'vue';
import Vuex from 'vuex';


import {CLEAN_USER} from '../../store/mutation-types'
import store from '../../store'
import storage from '../../models/storage'



let notice = function (data) {
  return new Notice(data)
}

let Notice = function (data) {
   if(data!=undefined)
   if(data.code==1004){
    //  alert('data.code ='+data.code)
    //  this.$router.push('/sign_in')
    storage.set('at', '')
    storage.set('hpp', '')
    storage.set('mobile', '')
    store.commit(CLEAN_USER)
   }


  
  // let code = data.code
  // let params = typeof data.data == 'undefined' ? [] : data.data
  // let code_config = this.getCodeDetail(code)
  // this.notice(code_config, params).then(() => {
  //   //处理action
  //   let action_name = code_config.action;
  //   action[action_name]()
  // })
}

Notice.prototype.getCodeDetail = function (code) {
  if(typeof CODE_CONFIG[code] != 'undefined'){
    return CODE_CONFIG[code]
  }
  return CODE_CONFIG[1]
}

Notice.prototype.getContent = function (label, params = []) {
 
}

Notice.prototype.notice = function (config, params) {
  return new Promise((resolve) => {
    let content = this.getContent(config.label, params)
    switch (config.type){
      case TYPE_MESSAGE_BOX:
        MessageBox.alert(content,this.getContent('ALERT_TITLE')).then(()=>{
          resolve()
        })
        break;
      case TYPE_MESSAGE:
        Message.error({
          message: content
        })
        break;
      case TYPE_NOTIFICATION:
        Notification.error({
          message: content
        })
        break
      default:
        resolve()
    }
  });
}

export default notice