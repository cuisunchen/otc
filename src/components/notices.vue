<template>
  <div class="content">
    <div class="top">
      <div class="center">官方公告</div>
      <div class="left" @click="goBack" />
    </div>
     <!-- $t('User.SignInOrSignUp')-->

   <div class="share_btn_zone_user_help_center">
      <div class="share_btn_zone"  v-for="(item, key) in notices" :key="key">
           <div class="share_btn bottom_border" @click="notice_detail(item)">
              <span>{{item.title}}</span>
              <i class="go"></i>
           </div>
          </div>
   </div>
  </div>
</template>
<script>
import store from "../store";
import storage from "../models/storage";
import notice1 from "../models/notice1";
import { SET_USER, CLEAN_USER } from "../store/mutation-types";

export default {
  name: "notices",
  components: {},
  data() {
    return {
      notices: []
    };
  },
  created: function() {
    this.load_list();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    notice_detail(notice) {
      this.$router.push("/notice/" + notice.id);
    },
    load_list() {
      notice1
        .list()
        .then(result => {
          if (result.code == 0) {
            this.notices = result.data.notices;
          }
        })
        .catch(e => {});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "../assets/css/help_center.scss";
</style>
