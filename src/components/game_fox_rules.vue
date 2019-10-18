<template>
  <div class="content-game">
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
    <div style="position:fixed;z-index:999;width: 100%;top:0; max-width: 640px;">
    <mu-appbar  title="规则" >
      <mu-icon-button icon="close" slot="left"
      style="font-size: 1.5em;padding-right: 0em;" @click="goBack"/>
    </mu-appbar>
    
    </div>
   <div class="content-game-item">
      <mu-checkbox name="group"  v-model="checkbox1" label="" class="demo-checkbox"/>
    1. 游戏的第一步就是绑定钱包地址，只有把钱包地址与账户绑定后才能正常玩耍，切记！ 
   </div>
   <div class="content-game-divider"></div>
   <div class="content-game-item">
      <mu-checkbox name="group"  v-model="checkbox2" label="" class="demo-checkbox"/>
   2. 如果遇到未绑定钱包提示，请前往我的->点击个人头像->退出登录，重新登录完成绑定。</div>
   <div class="content-game-divider"></div>
   <div class="content-game-item">
      <mu-checkbox name="group"  v-model="checkbox3" label="" class="demo-checkbox"/>
   3. 游戏中所有转账操作必须用第一步绑定的钱包地址进行转账，否则无效！造成损失将由自己承担。 </div>
   <div class="content-game-divider"></div>
   <div class="content-game-item">
      <mu-checkbox name="group" v-model="checkbox4" label="" class="demo-checkbox"/>4. 市场上的小狐狸全部由玩家自行定价，与平台无关。请大家理性消费，量力而行。</div>
   <div class="content-game-divider"></div>
   <div class="content-game-item">
      <mu-checkbox name="group"  v-model="checkbox5" label="" class="demo-checkbox"/>5. 游戏中与他人交易/交配使用的是自己链克钱包中的余额(非游戏账户余额)，实时到账，不可撤回，
      请务必按照游戏指引操作，仔细检查，犹如钱包转账一样仔细，否则出现币失货无的情况我们也没有办法解决。</div>
   <div class="content-game-divider"></div>
   <div class="content-game-item">
      <mu-checkbox name="group" v-model="checkbox6" label="" class="demo-checkbox"/>6. 请不要尝试多次交易不付款，频繁锁单将对您的账号进行封禁处理，损失自己承担。 </div>
   <div class="content-game-divider"></div>
   <div class="content-game-item">
      <mu-checkbox name="group" v-model="checkbox7" label="" class="demo-checkbox"/>7. 游戏的修炼、造狐系统完全依赖于链克交易hash系统，所以必须经由链克钱包转账进行，
      当前条件下无法简化，至少我们是做不到。</div>
   <div class="content-game-divider"></div>
   <div class="content-game-item">
      <mu-checkbox name="group" v-model="checkbox8" label="" class="demo-checkbox"/>8. 游戏的小狐狸修炼是有限额的，最高只有5个链克币，包括修炼金额的小数位，
      修炼需要将小狐的ID倒数当做小数位，98%的人是不能修炼满5个币的，请不要尝试，把多打的冲入了寻宝奖金池，但这的确给我们的提现带来了很大压力，请看清规则再欢乐游戏。</div>
   <div class="content-game-divider"></div>
   <div class="content-game-item">
      <mu-checkbox name="group" v-model="checkbox9" label="" class="demo-checkbox"/>9. 小狐狸不修炼他不会死的，大家可以休闲点去玩。</div>
   <div class="content-game-divider"></div>
   <div class="content-game-item">
      <mu-checkbox name="group" v-model="checkbox10" label="" class="demo-checkbox"/>10. 游戏系统中的余额充值与火狐狸平台账户互通，
      可以当做交易/出售造狐机会的保证金及手续费使用，在火狐狸网出售。</div>
   <div class="content-game-divider"></div>
   <div class="content-game-item">
      <mu-checkbox name="group" v-model="checkbox11" label="" class="demo-checkbox"/>11. 造狐的代数计算，两只狐狸的代数相加之和，四舍五入，（0代记做0.5代）。
      造狐过程中根据hash概率会出现高等级后代的暴击事件，与抽奖概率一致。 </div>
   <div class="content-game-divider"></div>
   <div class="content-game-item">
      <mu-checkbox name="group" v-model="checkbox12" label="" class="demo-checkbox"/>12. 游戏中收取的交易手续费、造狐手续费、修炼金额、抽奖全部汇集到一块，
      平台扣除5%的维护运营资金后，每天会按照游戏的玩法进行全服分配。需要在规定时间内寻宝领取。 </div>
   <div class="content-game-divider"></div>
   <div class="content-game-item">
      <mu-checkbox name="group" v-model="checkbox13" label="" class="demo-checkbox"/>13. 游戏中有不懂的请多问、多看然后谨慎操作，以避免没必要的损失。</div>
   <div class="content-game-divider"></div>
   <div class="content-game-item">
   <mu-checkbox name="group" v-model="checkbox14" label="" class="demo-checkbox"/>14. 本游戏由链克狐团队开发运营，与迅雷无关。</div>
  
     <mu-raised-button label="开始游戏" @click="next" class="btn" fullWidth primary/>
  </div>
  
</template>

<script>
export default {
  name: "game_fox_rules",
  components: {},
  data() {
    return {
      toast: false,
      message: "",
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
      checkbox5: false,
      checkbox6: false,
      checkbox7: false,
      checkbox8: false,
      checkbox9: false,
      checkbox10: false,
      checkbox11: false,
      checkbox12: false,
      checkbox13: false,
      checkbox14: false
    };
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
    next() {
      if (!this.checkbox1) {
        this.showToast("请勾选第一条规则");
        return;
      } else if (!this.checkbox2) {
        this.showToast("请勾选第二条规则");
        return;
      } else if (!this.checkbox3) {
        this.showToast("请勾选第三条规则");
        return;
      } else if (!this.checkbox4) {
        this.showToast("请勾选第四条规则");
        return;
      } else if (!this.checkbox5) {
        this.showToast("请勾选第五条规则");
        return;
      } else if (!this.checkbox6) {
        this.showToast("请勾选第六条规则");
        return;
      } else if (!this.checkbox7) {
        this.showToast("请勾选第七条规则");
        return;
      } else if (!this.checkbox8) {
        this.showToast("请勾选第八条规则");
        return;
      } else if (!this.checkbox9) {
        this.showToast("请勾选第九条规则");
        return;
      } else if (!this.checkbox10) {
        this.showToast("请勾选第十条规则");
        return;
      } else if (!this.checkbox11) {
        this.showToast("请勾选第十一条规则");
        return;
      } else if (!this.checkbox12) {
        this.showToast("请勾选第十二条规则");
        return;
      } else if (!this.checkbox13) {
        this.showToast("请勾选第十三条规则");
        return;
      } else if (!this.checkbox14) {
        this.showToast("请勾选第十四条规则");
        return;
      }
      this.$router.push("/game_fox_home");
    }
  }
};
</script>

<style lang="scss" scope>
@import "../assets/css/rules.scss";
</style>


