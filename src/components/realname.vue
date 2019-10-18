<template>
  <div class="content">
    <div class="top">
      <div class="center">{{$t('User.SetMenuRealName')}}</div>
      <div class="left" @click="goBack" />
    </div>
    <div class="real-zone">
      <p class="p1">
      {{$t('User.SetMenuRealName1')}}</p>
      <p class="p-content" v-html="$t('User.SetMenuRealName2')"></p>
      <p class="p2">
      {{$t('User.SetMenuRealName3')}}
     </p>
      <p class="p3">
      {{$t('User.SetMenuRealName4')}}
      </p>
      <img class="img-rel" :src="realname_1">
      <p class="p4">{{$t('User.SetMenuRealName5')}}</p>
      <img class="img-rel" :src="realname_2">
      <p class="p4">{{$t('User.SetMenuRealName6')}}</p>
      <img class="img-rel" :src="realname_3">
      <p class="p4">{{$t('User.SetMenuRealName7')}}</p>
      <p class="p3">
     {{$t('User.SetMenuRealName8')}} </p>
      <p class="p-content">{{$t('User.SetMenuRealName9')}}</p>
       <img class="img-rel" :src="realname_4">
       <p class="p4">{{$t('User.SetMenuRealName10')}}</p>
       <img class="img-rel" :src="realname_5">
       <p class="p4">{{$t('User.SetMenuRealName11')}}</p>
       <p class="p3">
      {{$t('User.SetMenuRealName12')}}
      </p>
    </div>



  </div>
</template>

<script>
import nprogress from "nprogress";
import store from '../store'
 import storage from '../models/storage'
import {SET_USER} from '../store/mutation-types'
import user from "../models/user";
import {IMG_BASE_URL} from '../models/url.js'
export default {
  name: 'realname',
  components:{},
  data () {
    return { 
     realname_1:IMG_BASE_URL+"realname_1.png",
     realname_2:IMG_BASE_URL+"realname_2.png",
     realname_3:IMG_BASE_URL+"realname_3.png",
     realname_4:IMG_BASE_URL+"realname_4.png",
     realname_5:IMG_BASE_URL+"realname_5.png",
    }
  },
 beforeRouteEnter (to, from, next) {
      nprogress.set(0.6)
      next()
      nprogress.done()
    },
  methods:{
    goBack() {
      this.$router.go(-1);
      },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
   @import "../assets/css/realname.scss";  
</style>
