<template>
  <div
    style="  width: 100%;
        height: 100%;
        position: fixed;
        top: 0px;z-index:999;"
    class="reset-dialog mycustom-dialog"
  >
    <div
      style="
        margin: 50% auto 0 auto;
        background: #ffffff;
        border-radius: 0.3em;"
      class="reset-dialog-wrap"
    >
      <div class="title-size" style="padding-top:1.5em;color: #242932;">{{title}}</div>
      <div class="title-size fs-14" style="color:rgba(78,88,110,1);font-weight: normal; padding: 0 16px;" v-if="content !=''">{{content}}</div>
      <div style="display: flex;flex-flow: row nowrap;justify-content: space-between;">
        <mu-raised-button
          :label="cancelText || $t('Text.cancel')"
          @click="cancel"
          class="btn-toast-cancel"
          style="margin-top:1em;"
          fullWidth
          primary
        />
        <mu-raised-button
          :label="confirmText || $t('Text.ok')"
          @click="confirm"
          class="btn-toast-submit"
          style="margin-top:1em;"
          fullWidth
          primary
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    confirm: {
      type: Function,
      default: () => {}
    },
    confirmText: {
        type: String,
        default: ""
    },
    cancelText: {
        type: String,
        default: ""
    },
    cancel: {
      type: Function,
      default: () => {}
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/config/Vars";
.mycustom-dialog {
  .reset-dialog-wrap {
    width: toRem(327);
  }
  .btn-toast-submit {
    width: toRem(173);
    height: toRem(50);
    border-radius: 3em;
    background: rgba(0, 94, 228, 1) !important;
    border-radius: 4px;
    margin: 1em auto 1em auto;
    font-size: toRem(18);
  }

  .title-size{
      font-size: toRem(18);
      color: #2E3546;
      font-weight: bold;
      margin-bottom: toRem(40);
  }

  .btn-toast-cancel {
    width: toRem(112);
    height: toRem(50);
    border-radius: 3em;
    background: rgba(255, 255, 255, 1) !important;
    border: 1px solid rgba(0, 94, 228, 1);
    border-radius: 4px;
    color: #005ee4;
    margin: 1em auto 1em auto;
    font-size: toRem(18);
  }

  &.reset-dialog:before {
    content: "";
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 1);
    opacity: 0.49;
    top: 0px;
    left: 0;
    z-index: -999;
  }
}
</style>