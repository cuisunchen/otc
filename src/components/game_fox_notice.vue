<template>
  <div class="content">
    <div class="fix-progress" v-show="all_loding">
    <mu-linear-progress color="#0A2463"/>
    </div>
    <div  v-show="!all_loding">
    <mu-appbar  title="绑定钱包">
    </mu-appbar>
    <div class="hint">
        <p>游戏开始前需要激活您的账号,请按下面方式激活您的账号：</p>
        <div v-show="bafoerAdd" class="tel-zone">
          <mu-auto-complete v-model.trim="name"  class="input-zone"  hintText="15875234562" label="账号"  disabled="disabled" />
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
        <mu-raised-button label="我已转账" v-show="sureBtn" class="btn" @click="load_baundadd()"  fullWidth primary/>
    </div>
    </div>
  </div>
</template>

<script>
import nprogress from "nprogress";
import game from "../models/game";
import validate from "../utils/validate";

import { CAPTCHA_SIGNIN } from "../models/url";
export default {
  name: "game_fox_home",
  components: {},
  data() {
    return {
      is_login: false,
      bounded: false,
      nextBtn: true,
      sureBtn: false,
      bafoerAdd: true,
      added: false,
      fromadd: "",
      to: "",
      osc: "",
      name: this.$store.state.user.name,
      codeError: "",
      all_loding: true
    };
  },
  created: function() {
    this.all_loding = true;
    if (this.$store.state.user.access_token != "") {
      this.all_loding = false;
      this.is_login = true;
      this.load_baundadd();
    }
  },
  methods: {
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
              switch (e.code) {
                case 1101:
                  this.codeError = "无效地址";
                  break;
                case 1102:
                  this.codeError = "改地址已被绑定";
                  break;
                default:
                  this.codeError = "地址绑定失败";
              }
            });
        }
      }
    },
    input_focus: function() {
      this.codeError = "";
    },
    load_baundadd: function() {
      this.all_loding = true;
      game
        .getBoundadd()
        .then(data => {
          this.all_loding = false;
          if (data.data.active_status == "ADDRESS_NOT_ACTIVE") {
            this.next();
            this.fromadd = data.data.active_detail.from;
            this.to = data.data.active_detail.to;
            this.osc = data.data.active_detail.value;
          }
          if (data.data.active_status == "ACTIVE") {
            this.$router.push("/game_fox_home");
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scope>
@import "../assets/css/boundAdd.scss";
</style>
