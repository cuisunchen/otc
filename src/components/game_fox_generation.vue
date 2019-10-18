<template>
<div class="content market-content">
    <mu-appbar class="fix-progress" :title="name+generation +'代狐狸（'+total+')'" style="text-align:center">
      <mu-icon-button style="font-size:3em;width:1em;" icon="keyboard_arrow_left" slot="left"  @click="goBack" />
    </mu-appbar>
  <div  class="list-content-zone" style="background:#ede7f6">
  <div class="list-row3" v-for="(item) in this.list" :key="item.id" >
  <router-link :to="'/game_fox/' + item.id">
          <div class="content-zone">
            <div class="content-zone-img" :style="item.bg">
               <div :class="'body'+item.appearance[1]"></div>
               <div :class="'hate'+item.appearance[2]"></div>
                <div :class="'erhuan'+item.appearance[3]"></div>
                <div :class="'yanjing'+item.appearance[4]"></div>
                <div :class="'weibo'+item.appearance[5]"></div>
                <div :class="'shiping'+item.appearance[6]"></div>
                <div :class="'mouth'+item.appearance[7]"></div>
                <div :class="'face'+item.appearance[8]"></div>
                <div :class="'level'+item.appearance[9]"></div>
            </div>
              <div class="g">
              <i class="g1">{{item.generation}}</i>代
              </div>
            <div class="fox-id">
                # {{item.id}}
            </div>
            <div class="content-title">
              <div class="fox-msg">
                {{item.mate_count}}次<br />
              {{item.grow}}/{{item.mate}}/{{item.dig}}
              </div>
              <i>{{item.price}}</i><span>OSC</span>
            </div>
          </div>
  </router-link>
</div>
</div>
<mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
</div>
</template>
<script>
import nprogress from "nprogress";
import game from "../models/game";
import validate from "../utils/validate";
import moment from '../utils/moment';
import { formatDate } from "../common/js/data";
import { CAPTCHA_SIGNIN } from "../models/url";

  export default {
              name: 'game_fox_generation',
              components: {},
              data () {
                return {
                sell_type:this.$route.params.sell_type,
                generation:this.$route.params.generation,
                order:'PRICE_DESC',
                offset:0,
                limit:30,
                list:[],
                name:'',
                total:0,
                loading:false,
                passwordValue:'',
               isFirstEnter:false,
                scroller: null
                }
              },
              mounted () {
                this.scroller = this.$el
                this.sell_type = this.$route.params.sell_type;
                this.generation = this.$route.params.generation;
                if(this.sell_type==='SELL_PROPERTY'){
                  this.name = '青丘集市'
                }else{
                  this.name = '十里桃❀'
                }
              },
             filters: { 
               formatDate2(time) {
                let date =new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
              }
             },
               beforeRouteEnter(to, from, next){
              if(from.name=='game_fox'){
                to.meta.isBack=true;
                  }else{
                     to.meta.isBack=false;
                  }
                    next()
                },
                  created() {
                  this.isFirstEnter=true;
                },
              activated() {
                this.sell_type = this.$route.params.sell_type;
                this.generation = this.$route.params.generation;
                if(this.sell_type==='SELL_PROPERTY'){
                  this.name = '青丘集市'
                }else{
                  this.name = '十里桃❀'
                }
                  if(!this.$route.meta.isBack || this.isFirstEnter){
                    this.initData();
                }
                this.$route.meta.isBack=false
                this.isFirstEnter=false;
              },
              
              methods: {
                goBack() {
                  this.$router.go(-1);
                  },
                pullUpHandle:function(val){     
                    this.loadMore();
                },
                pullDownHandle:function(val){  
                  this.initData();
                },
                initData:function (){
                this.offset=0
                this.list=[]
                if(this.loading) {
                  // this.showToast('正在加载');
                  return
                }
                this.loading = true
                this.progressShow = true
                 game.foxSearchMarketList(this.sell_type,this.generation,this.offset,this.limit).then(data => {
                      this.isShowData=true
                      this.list = [];
                      this.dealData(data)
                    }).catch((e) => {
                     this.loading = false
                    })
            },
            loadMore:function (){
              // console.log('this.$route.path = '+this.$route.name)
              if('game_fox_generation'!=this.$route.name ){
                // console.log('this.$route.path = '+this.$route.path)
                return;
                 }
                if(this.loading) {
                  // this.showToast('正在加载');
                  return
                }
                if(this.offset>=this.total){//加载完成
                    // this.showToast('加载完成');
                  return
                }
                this.loading = true
                this.progressShow = true
               game.foxSearchMarketList(this.sell_type,this.generation,this.offset,this.limit).then(data => {
                      this.dealData(data)
                    }).catch((e) => {
                      this.loading = false
                    })
            },
            dealData(data){
              this.progressShow=false
              this.isShowData=true
               var colors=["#f7dce1","#f7dcf4","#e7dbee","#e2e6ff","#dff9ff","#ebfff4","#edffdf","#fff8dc","#ffebdc"];
              for(var i=0;i<data.data.list.length;i++){
                    var item = data.data.list[i];
                    item.bg = 'background:'+colors[(item.appearance[0]-1)];
                    data.data.list[i] = item;
                }
                this.offset = this.offset+data.data.list.length;
                this.total = data.data.total;
                this.list = this.list.concat( data.data.list);
                this.progressShow=false
                this.loading = false
            },
       
      },
    }
</script>

<style lang="scss" scope>
@import "../assets/css/market.scss";
</style>

