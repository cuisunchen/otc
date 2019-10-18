<template>
  <div class="content-help">
    <div class="top">
      <div class="center"> {{$t('Text.bindGoogle')}}</div>
      <div class="left" @click="goBack" />
    </div>
   <div class="help_center_content_zone">
     <!-- <h4>
      如何购买FFC?
     </h4> -->
     <p>{{$t('Text.g1')}}</p>
     <p>{{$t('Text.g2')}}</p>
    <br>
     <p>
     {{$t('Text.g3')}}</p>
       <p class="help-hint">
       {{$t('Text.g4')}}<br />
        {{$t('Text.g5')}}<br />
         {{$t('Text.g6')}}
     </p>
     <br>
     <p>
      {{$t('Text.g7')}}
     </p>
     <p class="help-hint">
        {{$t('Text.g8')}}<br />
      <!-- <br />请勿删除此双重验证密码账户，否则会导致您无法进行账户操作，您可将密钥记录下来，如果误删，可通过手动输入密钥 (AANCXGVDQEMGQFVQ) 来恢复。输入双重验证密码，以开启或关闭双重验证功能。 -->
     </p>
     <br>
     <p>
        {{$t('Text.g9')}}
     </p>
       <!-- <p class="help-hint">
        【注意事项】：<br />请勿删除此双重验证密码账户，否则会导致您无法进行账户操作，您可将密钥记录下来，如果误删，可通过手动输入密钥 (AANCXGVDQEMGQFVQ) 来恢复。输入双重验证密码，以开启或关闭双重验证功能。
     </p> -->
   </div>
  </div>
</template>

<script>
import BottomNav from '../components/BottomNav'
import store from '../store'
 import storage from '../models/storage'
import {SET_USER,CLEAN_USER} from '../store/mutation-types'
import user from "../models/user";
import {IMG_BASE_URL} from '../models/url.js'
export default {
  name: 'help_bound_google',
  components:{BottomNav},
  data () {
    return { 
  
    }
  },
  methods:{
     goBack() {
      this.$router.go(-1);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
   @import "../assets/css/help_page.scss";  
</style>
