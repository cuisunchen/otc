<template>
  <div class="content">
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
    <div class="content-notice-zone" v-show="notice_show">
      <div class="top-order">
      <div class="center-order">公告</div>
      <div class="left-order" @click="goBack" />
      <div class="paixu-zone" >
         <mu-flat-button color="white" label="规则" slot="right"  @click="rules()"  v-show="!isActive"/>
      </div>
      
  </div>
      <div class="hint">
        <p v-html='this.noticeft'>{{this.noticeft}}</p>
         <p v-show="isActive">激活链克狐游戏需要从您的火狐狸平台账户扣除 <span style="color:#ff4d2d">{{active_amount}} OSC</span>，激活后，系统随机抽取一只狐狸给您。</p>
       <mu-raised-button v-show="!isActive" label="进入游戏" class="btn" @click="gobound()" fullWidth primary/>
        <mu-raised-button v-show="isActive" label="激活游戏" class="btn" @click="activeAddressSHowDialog" fullWidth primary/>
        <!-- <mu-raised-button  v-show="!isActive" label="游戏规则" class="btn" @click="rules()" fullWidth primary/> -->
      </div>
    </div>
    <div class="fix-progress" v-show="all_loding">
    <mu-linear-progress color="#0A2463"/>
    </div>
    <div  v-show="!all_loding">
    <mu-appbar  title="绑定钱包">
    </mu-appbar>
    <div class="hint">
        <p>游戏开始前需要激活您的账号,请按下面方式激活您的账号：</p>
        <div v-show="bafoerAdd" class="tel-zone">
          <mu-auto-complete v-model.trim="name"  class="input-zone"  hintText="" label="账号"  disabled="disabled" />
        </div>
        <mu-text-field v-model.trim="fromadd" class="bound_add" label="绑定的钱包地址" @focus="input_focus" :disabled="bounded" hintText="您的链克币钱包地址" :errorText="codeError"  :rows="1" :rowsMax="6"/><br/>
        <div v-show="added" class="intr-zone">
          <p>
            请用绑定的钱包地址向下方地址转账<br>
            <i>
             {{to}}
            </i>
          </p>
          <h2>{{osc}}个链克币</h2>
          <p class="hint-ft">
            *认证钱包所需链克币不会退回
          </p>
        </div>
        <mu-raised-button label="绑定钱包" v-show="nextBtn" class="btn" @click="bound()" fullWidth primary/>
        <mu-raised-button label="我已转账" v-show="sureBtn" class="btn" @click="yes_baundadd()"  fullWidth primary/>
    </div>
    </div>

    <mu-dialog :open="activityDialog" title="激活提示" @close="close">
       激活链克狐游戏需要从您的火狐狸平台账户扣除 <span style="color:#ff4d2d">{{active_amount}} OSC</span>，激活后，系统随机抽取一只狐狸给您。
        <mu-flat-button slot="actions" @click="closeDialog" primary label="取消"/>
        <mu-flat-button slot="actions" primary @click="activeAddress" label="激活"/>
      </mu-dialog>
  </div>
</template>

<script>
import nprogress from "nprogress";
import game from "../models/game";
import validate from "../utils/validate";
import HttpResultCode from "../utils/HttpResultCode";
import { CAPTCHA_SIGNIN } from "../models/url";
export default {
  name: "game_fox_bound_add",
  components: {},
  data() {
    return {
      toast: false,
      message: "",
      is_login: false,
      bounded: false,
      nextBtn: true,
      sureBtn: false,
      activeBtn: false,
      bafoerAdd: true,
      added: false,
      fromadd: "",
      to: "",
      osc: "",
      name: this.$store.state.user.name,
      codeError: "",
      all_loding: true,
      noticeft: "",
      notice_show: false,
      active_status: "",
      active_detail: "",
      active_amount: "",
      isActive: false,
      refresh_timer: [],
      activityDialog: false
    };
  },
  created: function() {
    this.all_loding = true;
    if (this.$store.state.user.access_token != "") {
      this.load_baundadd();
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
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
    closeDialog() {
      this.activityDialog = false;
    },
    activeAddressSHowDialog() {
      this.activityDialog = true;
    },
    next: function() {
      {
        this.bounded = true;
        this.nextBtn = false;
        this.sureBtn = true;
        this.bafoerAdd = false;
        this.added = true;
      }
    },
    bound: function() {
      {
        {
          this.all_loding = true;
          game
            .oscDeposited(this.fromadd)
            .then(result => {
              this.all_loding = false;
              console.log(result);
              this.load_baundadd();
            })
            .catch(e => {
              this.showToast(HttpResultCode.validate(e.code));
              switch (e.code) {
                case 1101:
                  this.codeError = "无效地址";
                  break;
                case 1102:
                  this.codeError = "改地址已被绑定";
                  break;
              }
            });
        }
      }
    },
    input_focus: function() {
      this.codeError = "";
    },
    activeAddress: function() {
      this.activityDialog = false;
      game
        .activate_fox()
        .then(result => {
          if (result.code === 0) {
            //  this.$router.push('/game_fox_home')
            setTimeout(() => {
              this.$router.push("/game_fox_home");
            }, 1000);
          }
        })
        .catch(e => {
          switch (e.code) {
            case 1104:
              this.showToast("账户余额不足 " + this.active_amount + " OSC。");
              break;
            default:
              this.showToast(HttpResultCode.validate(e.code));
          }
        });
    },
    load_baundadd: function() {
      this.all_loding = true;
      game
        .getBoundadd()
        .then(data => {
          var string = "";
          try {
            if ("message" in data.data) {
              string = data.data.message.replace(/\r\n/g, "<br>");
              string = string.replace(/\n/g, "<br>");
            }
          } catch (e) {
            // alert(e.message);
          }
          this.noticeft = string;
          this.notice_show = true;
          this.all_loding = false;
          this.active_status = data.data.active_status;

          if (this.active_status == "ADDRESS_NOT_ACTIVE") {
            this.active_amount = data.data.active_amount;
            this.isActive = true;
          }
        })
        .catch(e => {
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    gobound() {
      this.all_loding = true;
      if (this.active_status == "ADDRESS_NOT_BOUND") {
        this.all_loding = false;
      }
      if (this.active_status == "ADDRESS_NOT_ACTIVE") {
        this.all_loding = false;
        this.next();
        this.fromadd = data.data.active_detail.from;
        this.to = data.data.active_detail.to;
        this.osc = data.data.active_detail.value;
      }
      if (this.active_status == "ACTIVE") {
        //  this.$router.push('/game_fox_home')
        this.$router.push("/game_fox_home");
      }
    },
    yes_baundadd() {
      this.all_loding = true;
      game
        .getBoundadd()
        .then(data => {
          var string = "";
          try {
            string = data.data.message.replace(/\r\n/g, "<br>");
            string = string.replace(/\n/g, "<br>");
          } catch (e) {}
          this.noticeft = string;
          this.notice_show = true;
          this.all_loding = false;
          this.active_status = data.data.active_status;
          if (data.data.active_status == "ADDRESS_NOT_ACTIVE") {
            this.next();
            this.fromadd = data.data.active_detail.from;
            this.to = data.data.active_detail.to;
            this.osc = data.data.active_detail.value;
          }
          if (data.data.active_status == "ACTIVE") {
            //  this.$router.push('/game_fox_home')
            this.$router.push("/game_fox_home");
          }
        })
        .catch(e => {
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    close() {
      this.activityDialog = false;
    },
    rules() {
      this.$router.push("/game_fox_rules");
    },
    time_refresh: function() {
      this.refresh_timer.push(
        window.setTimeout(() => {
          this.gobound();
        }, 1000)
      );
    }
  }
};
</script>

<style lang="scss" scope>
@import "../assets/css/boundAdd.scss";
</style>
