<template>
  <div class="content" style="background:#fff;">
    <div class="top">
      <div class="center">{{notice.title}}</div>
      <div class="left" @click="goBack" />
    </div>
    <div v-html="notice.content" style="padding:4em 1em 3em 1em;text-align: left"></div>
  </div>
</template>

<script>
import nprogress from "nprogress";
import notice1 from "../models/notice1";
export default {
  name: "notice",
  components: {},
  data() {
    return {
      notice: {
        content: "",
        id: "",
        title: "",
        created: 1529234103791
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    // 参数初始化

    let id = to.params.id;
    notice1
      .content(id)
      .then(result => {
        let notice = {};
        if (result.code === 0) {
          notice = result.data;
        }
        next(vm => {
          vm.notice = notice;
        });
        nprogress.done();
      })
      .catch(e => {
        nprogress.done();
        HttpResultCode.validate(e.code);
      });
  },
  created: function() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "../assets/css/help_center.scss";
</style>
