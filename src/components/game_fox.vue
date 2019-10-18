<template>
  <div class="content">
     <div class="fix-progress" v-show="false">
    <mu-linear-progress color="#0A2463"/>
    </div>
    <div class="top-order">
      <div class="center-order" style="padding-left:2.2em;text-align:left;"># {{id}}</div>
      <div class="left-order" @click="goBack" />
      <div class="paixu-zone" >
         <mu-flat-button class="big-pirce" style="color:#fff;font-size:1.5em;top:0.18em;" v-show="otherselling" :label="price+' OSC'" slot="right" secondary/>
      </div>
  </div>
    <div v-show="!all_loding">
         <div class="list-content-big">
          <div class="list-content">
            <div class="list-img" id="list-img" :style="bg">
                <div :class="'body'+appearance[1]"></div>
                <div :class="'hate'+appearance[2]"></div>
                <div :class="'erhuan'+appearance[3]"></div>
                <div :class="'yanjing'+appearance[4]"></div>
                <div :class="'weibo'+appearance[5]"></div>
                <div :class="'shiping'+appearance[6]"></div>
                <div :class="'mouth'+appearance[7]"></div>
                <div :class="'face'+appearance[8]"></div>
                <div :class="'level'+appearance[9]"></div>
            </div>
            <div class="list-content-right">
              <h4><i>{{generation}}</i>代<span>{{weight}}ERG</span></h4>
              <div class="right-content-zone">
                <p>修炼：<i>{{grow}}</i></p>
                <p>造狐：<i>{{mate}}</i><span>(造狐{{mate_count}}次)</span></p>
                <p>寻宝：<i>{{dig}}</i><span>(寻宝{{dig_count}}次)</span></p>
                <p><span>寻宝收入：{{total_reward}}OSC</span></p>
              </div>
              <div class="sell-btn-zone" v-show="!ismy">
                  <mu-raised-button style="font-size:0.8em" v-show="othersell" label="立即购买" @click="buyfoxhint" class="demo-raised-button" secondary/>
                  <mu-raised-button style="font-size:0.8em" v-show="othersellmate" label="立即造狐" @click="buyfoxhint2" class="demo-raised-button" secondary/>
              </div>

              <div class="sell-btn-zone" v-show="item==null?false:item.status == 'MERGENCE'" style="color:#0A2463">
                已合成神狐
              </div>
              <div class="sell-btn-zone" v-show="item==null?false:item.status == 'DELETED'" style="color:#0A2463">
                 已化丹
              </div>
            </div>
          </div>
          <p class="sex">萌狐诞生：{{next_mate_time | formatDate2}}</p>
        </div> 
     <mu-tabs style="margin-top:1em;background:#fff" :value="activeTab" @change="handleTabChange">
    <mu-tab value="tab1"  title="简介"/>
    <mu-tab value="tab2" @click="feedfox" title="修炼记录"/>
    <mu-tab value="tab3" @click="digfox" title="寻宝记录"/>
    <mu-tab value="tab4" @click="feededDan" title="服丹记录"/>
    </mu-tabs>
    <div v-if="activeTab === 'tab1'">
      <div class="content2">
        <!-- <h2><i><mu-icon value="assignment" :size="2"/></i>简介</h2> -->
        <div class="content2-zone">
          <p>{{created | formatDate}}<br />
            {{created_msg}} </p>
           <div class="fox-family" v-show="zero">
             <div style="width:5em" class="mamafox" :style="bg_left"> 
                <div :class="'body'+left_appearance[1]"></div>
                <div :class="'hate'+left_appearance[2]"></div>
                <div :class="'erhuan'+left_appearance[3]"></div>
                <div :class="'yanjing'+left_appearance[4]"></div>
                <div :class="'weibo'+left_appearance[5]"></div>
                <div :class="'shiping'+left_appearance[6]"></div>
                <div :class="'mouth'+left_appearance[7]"></div>
                <div :class="'face'+left_appearance[8]"></div>
                <div :class="'level'+left_appearance[9]"></div>
             </div>
             <span class="jiantou"><mu-icon value="add" :size="1.5"/></span>
             <div style="width:5em; margin-left: 0.6em;" class="mamafox" :style="bg_right"> 
                <div :class="'body'+right_appearance[1]"></div>
                <div :class="'hate'+right_appearance[2]"></div>
                <div :class="'erhuan'+right_appearance[3]"></div>
                <div :class="'yanjing'+right_appearance[4]"></div>
                <div :class="'weibo'+right_appearance[5]"></div>
                <div :class="'shiping'+right_appearance[6]"></div>
                <div :class="'mouth'+right_appearance[7]"></div>
                <div :class="'face'+right_appearance[8]"></div>
                <div :class="'level'+right_appearance[9]"></div>
             </div>
             <span class="jiantou"><mu-icon value="keyboard_backspace" :size="1.5"/></span>
             <div style="width:5em" class="mamafox" :style="bg">
              <div :class="'body'+appearance[1]"></div>
                <div :class="'hate'+appearance[2]"></div>
                <div :class="'erhuan'+appearance[3]"></div>
                <div :class="'yanjing'+appearance[4]"></div>
                <div :class="'weibo'+appearance[5]"></div>
                <div :class="'shiping'+appearance[6]"></div>
                <div :class="'mouth'+appearance[7]"></div>
                <div :class="'face'+appearance[8]"></div>
                <div :class="'level'+appearance[9]"></div>
             </div>
           </div>
           <p>出生时获得天分属性<br />
           修炼: {{birth_grow}}，造狐: {{birth_mate}}，寻宝: {{birth_dig}}
           </p>
        </div>
      </div>
    </div>
    <div v-if="activeTab === 'tab2'">
      <div class="content2">
        <!-- <h2><i><mu-icon value="child_friendly" :size="2"/></i>修炼记录</h2> -->
        <div class="content2-zone">
          <div class="hint">
            每修炼 1OSC 能量增长 {{grow}}ERG
          </div>
      <mu-table :multiSelectable="multiSelectable" enableSelectAll ref="table" class="fox-table"  :showCheckbox="false">
        <mu-tbody>
          <mu-tr  v-for="(item,index) in list" :key="index">
            <mu-td class="list-time"  @click="modifyData(index,'bottom')" >{{item.created | formatDate}}</mu-td>
            <mu-td class="list-left"  @click="modifyData(index,'bottom')" >+{{item.grow}}+{{item.mate}}+{{item.dig}}<span>+{{item.weight}}</span></mu-td>
            <mu-td class="list-right"  @click="modifyData(index,'bottom')" >{{item.feed}}OSC</mu-td>
            <mu-td class="list-right-ico"><mu-icon v-if="item.hasOwnProperty('hash')" value="help"  @click="modifyData(index,'bottom')" :size="1.2"/></mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
        </div>
            
      </div>
    </div>
 
    <div v-if="activeTab === 'tab3'">
      <div class="content2">
        <!-- <h2><i><mu-icon value="highlight" :size="2"/></i>寻宝记录</h2> -->
        <div class="content2-zone">
          <div class="hint">
            若当日修炼金额为0OSC，无法参加寻宝
          </div>
      <mu-table multiSelectable enableSelectAll ref="table" class="fox-table" :showCheckbox="false">
        <mu-tbody>
          <mu-tr v-for="(item,index) in digLogList" :key="index">
            <mu-td class="left">{{item.created | formatDate}}</mu-td>
            <mu-td class="right"><i>+{{item.reward}}</i> OSC</mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
        </div>
      </div>
    </div>
    <div v-if="activeTab === 'tab4'">
      <div class="content2">
        <!-- <h2><i><mu-icon value="highlight" :size="2"/></i>服丹记录</h2> -->
        <div class="content2-zone">
          <div class="hint">
            服丹可以增加您属性。
          </div>
      <mu-table multiSelectable enableSelectAll ref="table" class="fox-table" :showCheckbox="false">
        <mu-tbody>
          <mu-tr  v-for="(danItem,index) in danLogList" :key="index">
            <mu-td class="list-time"  @click="foxDanDataDialog(danItem)">{{danItem.created | formatDate}}</mu-td>
            <mu-td class="list-left" @click="foxDanDataDialog(danItem)">+{{danItem.grow}}+{{danItem.mate}}+{{danItem.dig}}</mu-td>
            <mu-td class="list-right" @click="foxDanDataDialog(danItem)">{{danItem.dan}}颗</mu-td>
            <mu-td class="list-right-ico" @click="foxDanDataDialog(danItem)"><mu-icon  v-if="true" value="help"   :size="1.2"/></mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
        </div>
      </div>
    </div>
    </div>
 <mu-infinite-scroll :scroller="scroller" :loading="isScroller" @load="loadMore"/>
    <div class="bottom_nav_zone" v-show="ismy && !(this.status == 'MERGENCE' ||this.status == 'DELETED' )">
      <div class="bottom_nav">
            <a class="bottom_nav_btn_zone main-btn" @click="openxiulian">
                <span>
                  <img class="btn-img" :src="xiulianSrc">
                </span>
            </a>
              <a class="bottom_nav_btn_zone main-min-btn"  @click="opensell">
                <span class="main-min-btn-hint" v-show="selling" >出售中</span>
                <span class="main-min-btn-hint" v-show="isTrading" >交易中</span>
                <img class="btn-img" :src="chushouSrc">
              </a>
          <a class="bottom_nav_btn_zone main-min-btn" @click="opensy">
              <span class="main-min-btn-hint" v-show="mateing" >造狐中</span>
              <span class="main-min-btn-hint" v-show="isTrading" >交易中</span>
              <img class="btn-img" :src="zaohuSrc">
          </a>
          <a class="bottom_nav_btn_zone main-min-btn" @click="openxb">
              <img class="btn-img" :src="xunbaoSrc">
          </a>
      </div>
  </div>
     <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopup" @close="close('bottom')">
              <mu-appbar title="修炼详情">
                <mu-flat-button slot="right" label="关闭" color="white" @click="close('bottom')"/>
              </mu-appbar>
              <mu-content-block>
                <p><br />周日至周六分别对应：1-7</p>
                <p>sha3(时间+txid) = hash</p>
                <p>{{this.selectedlist.created}}<br />+<br />{{this.selectedlist.hash}}<br />= 
                  <br />{{this.selectedlist.txid}}</p>
              </mu-content-block>
      </mu-popup>
     <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="danHashPopup" @close="close('danHash')">
              <mu-appbar title="服丹hash">
                <mu-flat-button slot="right" label="关闭" color="white" @click="close('danHash')"/>
              </mu-appbar>
              <mu-content-block>
                <p><br />hash = </p>
                <p>{{this.selectDan.hash}}</p>
              </mu-content-block>
      </mu-popup>
      <mu-toast v-if="toast" :message="msg"/>
<!-- 购买狐狸 -->
       <mu-dialog :open="buydialog" @close="closebuy" title="余额购买提示">
         
         <!-- <div class="buy-sell-btn-zone">
        <button class="buy-change-btn"  :class="{disable:isTradeType}"    @click="buyTtradeChange(false)">余额购买</button>
        <button class="sell-change-btn" :class="{disable:!(isTradeType)}"  @click="buyTtradeChange(true)">转账购买</button>
      </div>  -->
       <div v-show="!(isTradeType)">
          通过火狐狸平台账户链克币购买链克狐，方便，快捷，不用手动转账。
          </div>
         <div v-show="isTradeType">
          下单后，请在15分钟内，按指定地址完成转账，频繁未完成转账可能会被系统设置为黑名单，将影响您的操作，切忌!<br />
          <span style="color:#0A2463">您的火狐狸平台钱包将被冻结2OSC，如果未在规定时间内完成转账将会被扣除</span>
          </div>
          <mu-flat-button slot="actions" @click="closebuy" primary label="取消"/>
          <mu-flat-button slot="actions" primary @click="buyfox" :label="this.isTradeType?'转账购买':'余额购买'"/>
        </mu-dialog>

<!-- 购买狐狸生育权-->
       <!-- <mu-dialog :open="buymatedialog" title="购买提示" @close="closebuy">
          下单后，请在15分钟内，按指定地址完成转账，频繁未完成转账可能会被系统设置为黑名单，将影响您的操作，切忌!<br />
          <span style="color:#0A2463">您的火狐狸平台钱包将被冻结2OSC，如果未在规定时间内完成转账将会被扣除</span>
          <mu-flat-button slot="actions" @click="closebuy" primary label="取消"/>
          <mu-flat-button slot="actions" primary @click="buymate" label="确定"/>
        </mu-dialog> -->

       <mu-dialog :open="buymatedialog" @close="closebuy" title="余额造狐提示">
         
        <!-- <div class="buy-sell-btn-zone">
          <button class="buy-change-btn"  :class="{disable:isTradeMateType}"    @click="mateTtradeChange(false)">余额造狐</button>
          <button class="sell-change-btn" :class="{disable:!(isTradeMateType)}"  @click="mateTtradeChange(true)">转账造狐</button>
        </div>  -->
       <div v-show="!(isTradeMateType)">
          通过火狐狸平台账户链克币购买链克狐造狐权，方便，快捷，不用手动转账。
          </div>
         <div v-show="isTradeMateType">
          下单后，请在15分钟内，按指定地址完成转账，频繁未完成转账可能会被系统设置为黑名单，将影响您的操作，切忌!<br />
          <span style="color:#0A2463">您的火狐狸平台钱包将被冻结2OSC，如果未在规定时间内完成转账将会被扣除</span>
          </div>
          <mu-flat-button slot="actions" @click="closebuy" primary label="取消"/>
          <mu-flat-button slot="actions" primary @click="buymate" :label="this.isTradeMateType?'转账造狐':'余额造狐'"/>
        </mu-dialog>
<!-- 购买返回数据 -->
<mu-dialog :open="allfoxdialog" title="选择狐狸" @close="closebuy2">
  <div class="fox-mate-list-limit">
      <div class="fox-list-content-big" v-for="(item,index) in matelist" :key="index" >
         <p class="choics_fox" @click="buymate2(index)">{{item==null?'':item.generation}}代 <span>#ID{{item.id}} </span></p>
      </div>
       <mu-flat-button slot="actions" @click="nextPage" primary label="下一页" v-show="isShowNext"/>
       <mu-flat-button slot="actions" @click="closebuy" primary label="关闭"/> 
      <!-- <mu-flat-button slot="actions" @click="closebuy"  primary label=""/>
      <mu-flat-button slot="actions" primary @click="closebuy" label="取消"/> -->
  </div>
</mu-dialog>
<!-- 购买返回数据 -->
         <mu-dialog :open="buy2dialog" title="购买提示" @close="closebuy2">
          请用您的绑定钱包地址<br />
          {{this.fromadd}}<br /><br />
          一次性向卖方转账<br />
          {{this.toadd}}<br />
          请在<i class="hint">15分钟</i>内完成,超时订单将被自动取消<br />
        <br />
          
          转账<i class="hint">{{this.price}} OSC</i><br /><br />

          <br />
        <p class="min-hint"> *务必使用账号绑定钱包，进行交易，否则会钱狐双无哦！</p>
        <p class="min-hint"> *转账时请仔细核对金额，务必与上方金额完全一致</p>
        <p class="min-hint"> *请在倒计时结束前完成转账，否则将无法获取小狐</p>
          <mu-flat-button slot="actions" @click="closebuy2" primary label="取消"/>
          <mu-flat-button slot="actions" primary @click="paid" label="标记已付款"/>
        </mu-dialog>

        <!-- 测试 -->
       <mu-dialog :open="xiuliandialog" title="修炼" @close="close">
        <div v-show="(this.generation == '299')||(this.generation == '229')">
       
          当前神狐ID <span class="main-min">#{{id}}</span><br/><br/>
          每天修炼1.{{reverse(id)}} OSC，即可获得
            <span v-show="this.generation == '299'" style="color:#0A2463">两颗狐丹。</span>
            <span v-show="this.generation == '229'" style="color:#0A2463">一颗狐丹。</span>
        </div> 
        <div v-show="!(this.generation == '299'||this.generation == '229')">
           当前小狐狸ID <span class="main-min">#{{id}}</span><br /><br />
        支持2种修炼方式：<br />第一种，余额修炼，直接用您的火狐狸平台账户的链克币修炼。<br />第二种，狐丹修炼，直接用您的火狐狸平台账户的狐丹修炼。<br /><br />
        您可以去 青丘集市→狐仙秘境 购买狐丹或者用链克狐化丹来修炼链克狐，每天每只链克狐可以修炼8颗狐丹。
        </div>  
        
       <mu-flat-button slot="actions" @click="godFoxBalanceFeed('1.')" primary label="余额修炼" v-show="(this.feed_today ==0 &&(this.generation == '299'||this.generation == '229'))"/>
      <mu-flat-button slot="actions" @click="openFoxFeedBalance" primary label="余额修炼"  v-show="!(this.generation == '299'||this.generation == '229')"/>
        <mu-flat-button slot="actions" @click="openFoxFeedDan" primary label="修炼狐丹"  v-show="!(this.generation == '299'||this.generation == '229')"/>
        <mu-flat-button slot="actions" primary @click="closexiulian" label="我知道了"/>
      </mu-dialog>
      <mu-dialog :open="selldialog"  title="出售" @close="close">
        <div v-show="!selling">
          <mu-auto-complete v-model="sellprice"  label="出售价" class="input-zone" hintText="不能低于1 OSC" fullWidth />
          出售#{{id}}<br />
          手续费1(OSC)+出售价*5%，全额投入奖池！如2币出售，手续费为1+2*5%=1.1。<br>冻结火狐狸账号余额 {{this.sellprice===''||this.sellprice==='0'?'0':(1+this.sellprice*0.05).toFixed(2)}} OSC，以实际成交价为准
          <div style="text-align:right">
          <mu-flat-button slot="actions" @click="closesell" primary label="取消"/>
          <mu-flat-button slot="actions" primary @click="opensell2" label="出售"/>
          </div>
        </div>

        <div v-show="selling">
          出售#{{id}} <span class="main-min">{{this.price}} OSC</span><br />
          手续费1(OSC)+出售价*5%，全额投入奖池！如2币出售，手续费为1+2*5%=1.1。<br>冻结火狐狸账号余额 {{this.price===''||this.price==='0'?'0':(1+this.price*0.05).toFixed(2)}} OSC，以实际成交价为准。
          <div style="text-align:right;position:relative">
          <mu-flat-button slot="actions" @click="closesell" primary label="取消"/>
          <mu-flat-button slot="actions" primary @click="sellback" label="撤单"/>
          </div>
        </div>
      </mu-dialog>
      <mu-dialog :open="foxDandialog"  title="修炼狐丹提示" @close="close">
          <mu-auto-complete v-model="feedDanNumber"  label="狐丹" class="input-zone" hintText="不能大于8颗狐丹" fullWidth maxlength="1" type="tel" />


          <!-- 出售#{{id}}<br />
          手续费5%，冻结火狐狸账号余额 {{(this.sellprice*0.05).toFixed(2)}} OSC，以实际成交价为准 -->
          <div style="text-align:right">
          <mu-flat-button slot="actions" @click="closeFoxFeedDan" primary label="取消"/>
          <mu-flat-button slot="actions" primary @click="foxFeedDan" label="修炼狐丹"/>
        </div>
      </mu-dialog>
    <mu-dialog :open="foxBalancedialog"  title="余额修炼" @close="close">
      <div style="display:flex;padding:1em 0px;">
        <button style="width:48%;margin-right:2%;background:#3d9cee;color:#fff;border-radius:0.25em;border:0px;height:3em" @click="foxBalanceFeed('1.')">1.{{reverse(id)}} OSC</button>
        <button style="width:48%;margin-left:2%;background:#3d9cee;color:#fff;border-radius:0.25em;border:0px;height:3em" @click="foxBalanceFeed('2.')">2.{{reverse(id)}} OSC</button>
      </div>
       <div style="display:flex;padding:1em 0px;margin-bottom:1em">
        <button style="width:48%;margin-right:2%;background:#3d9cee;color:#fff;border-radius:0.25em;border:0px;height:3em" @click="foxBalanceFeed('3.')">3.{{reverse(id)}} OSC</button>
        <button style="width:48%;margin-left:2%;background:#3d9cee;color:#fff;border-radius:0.25em;border:0px;height:3em" @click="foxBalanceFeed('4.')">4.{{reverse(id)}} OSC</button>
      </div>

          <!-- 出售#{{id}}<br />
          手续费5%，冻结火狐狸账号余额 {{(this.sellprice*0.05).toFixed(2)}} OSC，以实际成交价为准 -->
          <div style="text-align:right">
          <mu-flat-button slot="actions" primary @click="closeFoxFeedDan" label="关闭"/>
        </div>
      </mu-dialog>
      <mu-dialog :open="sell2dialog"  title="温馨提示" @close="close">
          你忍心将<span class="main-min">#{{id}}</span>以<span class="main-min">{{this.sellprice}}</span> OSC的价格出售吗？<br />
          发布出售成功后，如果被买家拍下付款，<span class="main-min">链克狐</span>将不可退回，切忌！
          <mu-text-field  v-model="passwordValue"  label="交易密码" class="input-zone" hintText="请输入火狐网交易密码"  type="password" maxLength='16' fullWidth />
          <div style="text-align:right;position:relative">
          <mu-flat-button slot="actions" @click="closesell2" primary label="取消"/>
          <mu-flat-button slot="actions" primary @click="sell" label="出售"/>
          </div>
      </mu-dialog>
      <mu-dialog :open="sydialog" title="造狐" @close="close">
        <div v-show="!mateing">
          <mu-auto-complete  v-model="mateprice"  label="造狐价" class="input-zone" hintText="不能低于1 OSC" fullWidth />
          出售#{{id}}<br />造狐权
          手续费1(OSC)+造狐价*5%，全额投入奖池！如2币造狐，手续费为1+2*5%=1.1。<br>冻结火狐狸账号余额 {{this.mateprice===''||this.mateprice==='0'?'0':(this.mateprice*0.05+1).toFixed(2)}} OSC，以实际成交价为准。
          <div style="text-align:right">
            <mu-flat-button slot="actions" @click="closesy" primary label="取消"/>
            <mu-flat-button slot="actions" primary @click="openmate" label="出售造狐权"/>
          </div>
        </div>
        <div v-show="mateing">
          造狐#{{id}} <span class="main-min">{{this.price}} OSC</span><br />
          手续费1(OSC)+造狐价*5%，全额投入奖池！如2币造狐，手续费为1+2*5%=1.1。<br>冻结火狐狸账号余额 {{this.price===''||this.price==='0'?'0':(this.price*0.05+1).toFixed(2)}} OSC，以实际成交价为准。
          <div style="text-align:right;position:relative">
          <mu-flat-button slot="actions" @click="closesy" primary label="取消"/>
          <mu-flat-button slot="actions" primary @click="sellback" label="撤单"/>
          </div>
        </div>
      </mu-dialog>
      <mu-dialog :open="sy2dialog"  title="温馨提示" @close="close">
          请确认是否将<span class="main-min">#{{id}}</span>以<span class="main-min">{{this.mateprice}} OSC </span>的价格发布造狐权？
           <div style="text-align:right;position:relative">
          <mu-flat-button slot="actions" @click="closesy2" primary label="取消"/>
          <mu-flat-button slot="actions" primary @click="mateFox" label="出售造狐权"/>
          </div>
      </mu-dialog>
      <mu-dialog :open="xbdialog" title="寻宝" @close="close">
        小狐狸个个都很灵通，没出生多久就要去寻宝挣钱啦！<br />
        每日寻宝时间：18:00-23:00，其他时间不能寻宝。<br />
        <span class="xunbao-title">宝藏总数：</span><i class="xunbao-font">{{total_reward_pool}}</i> OSC<br />
        <span class="xunbao-title">寻宝总分数：</span><i class="xunbao-font">{{total_score_pool}}</i> <br />
        <span class="xunbao-title">您的寻宝分数：</span><i class="xunbao-font">{{dig_score}}</i> <br />
        <span class="xunbao-title">大约可寻宝量：</span><i class="xunbao-font">{{(((dig_score/total_score_pool)*total_reward_pool)/2).toFixed(6)}}</i> OSC<br />
        <mu-flat-button slot="actions" @click="closexb" primary label="取消"/>
        <mu-flat-button slot="actions" primary @click="digFoxCoin" label="寻宝"/>
      </mu-dialog>
  </div>
  
</template>

<script>
import nprogress from "nprogress";
import game from "../models/game";
import validate from "../utils/validate";
import moment from "../utils/moment";
import HttpResultCode from "../utils/HttpResultCode";
import { CAPTCHA_SIGNIN } from "../models/url";
import { formatDate } from "../common/js/data";
import { IMG_BASE_URL } from "../models/url.js";
export default {
  name: "game_fox",
  components: {},
  data() {
    return {
      digLogList: [],
      danLogList: [],
      next_mate_time: "",
      birth_grow: "",
      birth_mate: "",
      birth_dig: "",
      generation: "",
      weight: "",
      grow: "",
      mate: "",
      mate_count: "",
      dig_count: "",
      dig: "",
      total_reward: "",
      left_appearance: [],
      right_appearance: [],
      appearance: [],
      bg: "",
      bg_left: "",
      bg_right: "",
      created: "",
      total_reward_pool: "",
      total_score_pool: "",
      dig_score: "",
      bound_address: "",
      feed_address: "",
      fromadd: "",
      toadd: "",
      refresh_txt: "",
      activeTab: "tab1",
      buydialog: false,
      buy2dialog: false,
      buymatedialog: false,
      allfoxdialog: false,
      fox_img_mama: "",
      ismy: false,
      sell_before: false,
      fox_img_baba: "",
      fox_img: "",
      mama_name: "",
      baba_name: "",
      id: this.$route.params.id,
      created_msg: "",
      rightPopup: false,
      zero: false,
      list: [],
      matelist: "",
      all_loading: "true",
      price: "",
      bottomPopup: false,
      multiSelectable: false,
      selected: "",
      selectedlist: "",
      have_hash: "",
      sellprice: "",
      feedDanNumber: "",
      toast: false,
      selling: false,
      mateing: false,
      sellingfan: true,
      mateprice: "",
      value: 0,
      all_loding: false,
      msg: "",
      loading: false,
      dialog: false,
      xiuliandialog: false,
      selldialog: false,
      foxDandialog: false,
      foxBalancedialog: false,
      sydialog: false,
      xbdialog: false,
      sell2dialog: false,
      sy2dialog: false,
      deadline: "",
      xiulianSrc: IMG_BASE_URL + "home1.png",
      chushouSrc: IMG_BASE_URL + "home2.png",
      zaohuSrc: IMG_BASE_URL + "home3.png",
      xunbaoSrc: IMG_BASE_URL + "home4.png",
      othersell: false,
      otherselling: false,
      othersellmate: false,
      isTradeType: false,
      isTradeMateType: false,
      offset: 0,
      foxMineMateOffset: 0,
      foxMineMateTotal: 0,
      limit: 20,
      feed_today: 0,
      selectDan: "",
      isTrading: false,
      danHashPopup: false,
      scroller: null,
      isScroller: false,
      item: null,
      isShowNext: true,
      status: "",
      passwordValue: ""
    };
  },
  filters: {
    formatDate(time) {
      if (time == undefined) return "";
      if (time == "") return "";
      let date = new Date(time * 1000);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    formatDate2(time) {
      if (time == undefined) return "";
      if (time == "") return "";
      let date = new Date(parseInt(time) * 1000);
      if (Date.parse(new Date()) < date) {
        return formatDate(date, "yyyy-MM-dd hh:mm:ss");
      }
      return "准备就绪";
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    showToast: function(msg) {
      this.toast = true;
      this.msg = msg;
      this.toastTimer = setTimeout(() => {
        this.toast = false;
      }, 2000);
    },
    hideToast() {
      this.toast = false;
      if (this.toastTimer) clearTimeout(this.toastTimer);
    },
    paid: function() {
      this.all_loding = true;
      game
        .foxMarkPaid(this.id)
        .then(data => {
          this.value = 100;
          clearInterval(this.timer);
          this.all_loding = false;
          this.value = 0;
          this.dialog = false;
          this.deadline = data.data.deadline;
          this.time_refresh();
        })
        .catch(e => {
          this.showToast(HttpResultCode.validate(e.code));
          // switch (e.code){
          //     case 1615:
          //     this.value=100
          //     clearInterval(this.timer)
          //       this.all_loding=false
          //       this.value=0
          //       this.dialog = false
          //       this.toast=true
          //       this.msg='稍后重试'
          //       this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
          //       break
          //   }
        });
    },
    buyTtradeChange: function(isTradeType) {
      this.isTradeType = isTradeType;
    },
    mateTtradeChange: function(isTradeMateType) {
      this.isTradeMateType = isTradeMateType;
    },
    buymate: function() {
      this.all_loding = true;
      this.foxMineMateOffset = 0;
      this.matelist = [];
      game
        .foxMineMate(this.foxMineMateOffset, this.limit)
        .then(data => {
          this.buymatedialog = false;
          this.all_loding = false;
          if (data.code == 0 && data.data.total > 0) {
            this.allfoxdialog = true;
            this.foxMineMateTotal = data.data.total;
            this.matelist = this.matelist.concat(data.data.list);
            this.foxMineMateOffset = this.matelist.length;
            if (this.foxMineMateOffset < this.foxMineMateTotal) {
              this.isShowNext = true;
            } else {
              this.isShowNext = false;
            }
          } else {
            this.showToast("暂时没有合适的造狐狐狸。");
          }
        })
        .catch(e => {
          this.all_loding = false;
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    nextPage: function() {
      if (this.foxMineMateOffset >= this.foxMineMateTotal) {
        //加载完成
        return;
      }
      game
        .foxMineMate(this.foxMineMateOffset, this.limit)
        .then(data => {
          if (data.code == 0 && data.data.total > 0) {
            this.allfoxdialog = true;
            this.foxMineMateTotal = data.data.total;
            this.matelist = this.matelist.concat(data.data.list);
            this.foxMineMateOffset = this.matelist.length;
            if (this.foxMineMateOffset < this.foxMineMateTotal) {
              this.isShowNext = true;
            } else {
              this.isShowNext = false;
            }
          }
        })
        .catch(e => {
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    buymate2(index) {
      this.all_loding = true;
      this.selected = index;
      this.selectedlist = this.matelist[index];
      this.allfoxdialog = false;
      if (this.isTradeMateType) {
        game
          .foxMate(this.id, this.selectedlist.id)
          .then(data => {
            this.refresh_data();
            this.all_loding = false;
            this.fromadd = data.data.from;
            this.toadd = data.data.to;
            this.loading = false;
            this.buydialog = false;
            this.buy2dialog = true;
          })
          .catch(e => {
            this.buydialog = false;
            this.showToast(HttpResultCode.validate(e.code));
            //  switch (e.code){
            //     case 1608:
            //     this.value=100
            //     clearInterval(this.timer)
            //       this.all_loding=false
            //       this.value=0
            //       this.buydialog=false
            //       this.toast=true
            //       this.msg='您还有一笔交易未完成'
            //       break
            //     case 1606:
            //     this.value=100
            //     clearInterval(this.timer)
            //       this.all_loding=false
            //       this.value=0
            //       this.buydialog=false
            //       this.toast=true
            //       this.msg='正在交易中，再选一只吧'
            //       break
            //   }
          });
      } else {
        game
          .foxBalanceMate(this.id, this.selectedlist.id, this.item.price)
          .then(data => {
            this.refresh_data();
            this.loading = false;
            this.all_loding = false;
            this.showToast("造狐成功");
          })
          .catch(e => {
            this.buydialog = false;
            this.showToast(HttpResultCode.validate(e.code));
            //  switch (e.code){
            //     case 1608:
            //     this.value=100
            //     clearInterval(this.timer)
            //       this.all_loding=false
            //       this.value=0
            //       this.buydialog=false
            //        this.showToast('您还有一笔交易未完成')
            //       break
            //     case 1606:
            //     this.value=100
            //     clearInterval(this.timer)
            //       this.all_loding=false
            //       this.value=0
            //       this.buydialog=false
            //       this.showToast('正在交易中，再选一只吧')
            //       break
            //   }
          });
      }
    },
    buyfox: function() {
      this.loading = true;
      this.buydialog = false;
      if (this.isTradeType) {
        game
          .foxBuy(this.id)
          .then(data => {
            this.refresh_data();
            this.fromadd = data.data.from;
            this.toadd = data.data.to;
            this.loading = false;
            this.buydialog = false;
            this.buy2dialog = true;
            this.deadline = data.data.deadline;
            this.time_refresh();
          })
          .catch(e => {
            this.buydialog = false;
            this.showToast(HttpResultCode.validate(e.code));
            //  switch (e.code){
            //     case 1608:
            //     this.value=100
            //     clearInterval(this.timer)
            //       this.all_loding=false
            //       this.value=0
            //       this.buydialog=false
            //       this.showToast('您还有一笔交易未完成')
            //       break
            //     case 1606:
            //     this.value=100
            //     clearInterval(this.timer)
            //       this.all_loding=false
            //       this.value=0
            //       this.buydialog=false
            //        this.showToast('正在交易中，再选一只吧')
            //       break
            //      case 1104:
            //        this.value=100
            //         clearInterval(this.timer)
            //       this.all_loding=false
            //       this.value=0
            //       this.buydialog=false
            //        this.showToast('账户余额不足')
            //       break
            //   }
          });
      } else {
        game
          .foxBalanceBuy(this.id, this.item.price)
          .then(data => {
            this.refresh_data();
            this.all_loding = false;
            this.showToast("购买成功");
          })
          .catch(e => {
            this.buydialog = false;
            this.showToast(HttpResultCode.validate(e.code));
            //  switch (e.code){
            //     case 1608:
            //     this.value=100
            //     clearInterval(this.timer)
            //       this.all_loding=false
            //       this.value=0
            //       this.buydialog=false

            //        this.showToast('您还有一笔交易未完成')
            //       break
            //     case 1606:
            //     this.value=100
            //     clearInterval(this.timer)
            //       this.all_loding=false
            //       this.value=0
            //       this.buydialog=false
            //       this.toast=true
            //       this.msg='正在交易中，再选一只吧'
            //       break
            //       case 1104:
            //        this.value=100
            //         clearInterval(this.timer)
            //       this.all_loding=false
            //       this.value=0
            //       this.buydialog=false
            //       this.toast=true
            //       this.msg='账户余额不足'
            //       break
            //   }
          });
      }
    },
    time_refresh: function() {
      var time = Date.parse(new Date()) / 1000;
      let sec = this.deadline - time;
      for (let i = 0; i <= sec; i++) {
        this.refresh_timer.push(
          window.setTimeout(() => {
            if (sec !== 0) {
              if (sec > 60) {
                this.refresh_txt = parseInt(sec / 60) + "分" + sec % 60 + "秒";
              } else {
                this.refresh_txt = sec + "";
              }

              sec--;
            } else {
              sec = 0;
              this.refresh_txt = "";
              clear_refresh();
            }
          }, i * 1000)
        );
      }
    },
    sellback: function() {
      this.loading = true;
      game
        .foxCancel(this.id)
        .then(data => {
          this.loading = false;
          this.msg = "出售广告已下架";
          this.toast = true;
          this.toastTimer = setTimeout(() => {
            this.toast = false;
          }, 2000);
          this.selldialog = false;
          this.sydialog = false;
          this.selling = false;
          this.mateing = false;
        })
        .catch(e => {
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    mateFox: function() {
      this.loading = true;
      if (this.mateprice > 200000) {
        this.loading = false;
        //  this.msg="出售金额不能超过200000 OSC"
        //  this.toast=true
        //  this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
        this.showToast("出售金额不能超过200000 OSC");
        this.sy2dialog = false;
        return;
      }
      game
        .foxsSellmate(this.id, this.mateprice)
        .then(data => {
          this.loading = false;
          // this.msg="出售造狐权成功"
          // this.toast=true
          //  this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
          this.showToast("出售造狐权成功");
          this.sy2dialog = false;
          this.mateing = true;
        })
        .catch(e => {
          this.loading = false;
          this.sy2dialog = false;
          this.showToast(HttpResultCode.validate(e.code));
          // switch (e.code) {
          //   case 1104:
          //   this.msg="钱包余额不足"
          //   this.toast=true
          //   this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
          //   break;
          //   case 1601:
          //   this.msg="正在出售"
          //   this.toast=true
          //   this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
          //   break;
          //   case 1603:
          //   this.loading=false
          //   this.msg="不能交配"
          //   this.toast=true
          //   this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
          //   this.sell2dialog = false
          //   break;
          // }
        });
    },
    digFoxCoin: function() {
      this.loading = true;
      game
        .foxDig(this.id)
        .then(data => {
          this.loading = false;
          this.msg = "寻到" + data.data.reward + " OSC";
          this.toast = true;
          this.toastTimer = setTimeout(() => {
            this.toast = false;
          }, 3000);
          this.xbdialog = false;
        })
        .catch(e => {
          this.loading = false;
          this.showToast(HttpResultCode.validate(e.code));
          // switch (e.code) {
          //   case 1613:
          //   this.loading=false
          //    this.msg="别急，还没到寻宝时间呢！"
          //     this.toast=true
          //     this.toastTimer = setTimeout(() => { this.toast = false }, 3000)
          //     this.xbdialog = false
          //   break;
          //   case 1610:
          //   this.loading=false
          //    this.msg="一天只能寻一次！"
          //     this.toast=true
          //     this.toastTimer = setTimeout(() => { this.toast = false }, 3000)
          //     this.xbdialog = false
          //     break
          // }
        });
    },
    sell: function() {
      this.loading = true;
      if (this.sellprice > 200000) {
        this.loading = false;
        this.msg = "出售金额不能超过200000 OSC";
        this.toast = true;
        this.toastTimer = setTimeout(() => {
          this.toast = false;
        }, 2000);
        this.sell2dialog = false;
        return;
      }
      if (this.passwordValue.length === 0) {
        this.loading = false;
        this.msg = "请输入火狐网交易密码。";
        this.toast = true;
        this.toastTimer = setTimeout(() => {
          this.toast = false;
        }, 2000);
        //  this.sell2dialog = false;
        return;
      }
      game
        .foxSell(this.id, this.sellprice, this.passwordValue)
        .then(data => {
          this.loading = false;
          // this.msg="小狐狸出售成功"
          // this.toast=true
          //  this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
          this.showToast("小狐狸出售成功");

          this.sell2dialog = false;
          this.selling = true;
          this.refresh_data();
          this.passwordValue = "";
        })
        .catch(e => {
          // console.log(HttpResultCode.validate(e.code)+"sdfgsdfgsdf");
          // this.showToast(HttpResultCode.validate(e.code));
          this.sell2dialog = false;
          this.passwordValue = "";
          this.sellprice = "";
          if (e.code == 1603) {
            this.showToast("萌狐诞生时间未到，不能出售哦");
          } else {
            this.showToast(HttpResultCode.validate(e.code));
          }
          // switch (e.code) {
          //   case 1104:
          //   this.loading=false
          //   this.msg="钱包余额不足"
          //   this.toast=true
          //   this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
          //   this.sell2dialog = false
          //   break;
          //   case 1602:
          //   this.loading=false
          //   this.msg="正在出售交配权"
          //   this.toast=true
          //   this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
          //   this.sell2dialog = false
          //   break;
          //   case 1603:
          //   this.loading=false
          //   this.msg="不能出售"
          //   this.toast=true
          //   this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
          //   this.sell2dialog = false
          //   break;
          // }
        });
    },
    reverse(str) {
      if (str.length == 0) return null;
      var i = str.length;
      var dstr = "";
      while (--i >= 0) {
        dstr += str.charAt(i);
      }
      return dstr;
    },
    openxiulian() {
      this.xiuliandialog = true;
    },
    opensell() {
      this.sellprice = "";
      this.selldialog = true;
    },
    closeFoxFeedDan() {
      this.foxBalancedialog = false;
      this.foxDandialog = false;
    },
    foxFeedDan() {
      this.foxDandialog = false;
      var number = this.feedDanNumber;

      if (
        !(
          number === "1" ||
          number === "2" ||
          number === "3" ||
          number === "4" ||
          number === "5" ||
          number === "6" ||
          number === "7" ||
          number === "8"
        )
      ) {
        this.toast = true;
        this.msg = "每次只能修炼1至8颗狐丹。";
        this.toastTimer = setTimeout(() => {
          this.toast = false;
        }, 2000);
        return;
      }

      game
        .foxFeedDan(this.id, this.feedDanNumber)
        .then(data => {
          this.loading = false;
          this.msg = "服丹成功";
          this.toast = true;
          this.toastTimer = setTimeout(() => {
            this.toast = false;
          }, 3000);
        })
        .catch(e => {
          this.showToast(HttpResultCode.validate(e.code));
          //  switch (e.code) {
          //     case 1617:
          //     this.loading=false
          //      this.msg="这只狐狸今天不能再修炼狐丹了。！"
          //       this.toast=true
          //       this.toastTimer = setTimeout(() => { this.toast = false }, 3000)

          //     break;
          //    case 1104:
          //     this.loading=false
          //      this.msg="账户狐丹不足"
          //       this.toast=true
          //       this.toastTimer = setTimeout(() => { this.toast = false }, 3000)

          //     break;
          //    default:
          //     this.loading=false
          //      this.msg="网络异常"
          //       this.toast=true
          //       this.toastTimer = setTimeout(() => { this.toast = false }, 3000)
          //       break;

          //   }
        });
    },
    buyfoxhint() {
      this.buydialog = true;
    },
    buyfoxhint2() {
      this.buymatedialog = true;
    },
    opensell2() {
      if (parseInt(this.sellprice) > 1) {
        this.sell2dialog = true;
        this.selldialog = false;
        return;
      } else {
        this.showToast("出售价格输入有误");
      }
    },
    openmate() {
      if (parseInt(this.mateprice) > 1) {
        this.sy2dialog = true;
        this.sydialog = false;
        return;
      } else {
        this.showToast("造狐价格输入有误");
      }
    },
    opensy() {
      this.sydialog = true;
      this.mateprice = "";
    },
    openxb() {
      this.xbdialog = true;
    },
    closexiulian() {
      this.xiuliandialog = false;
    },
    openFoxFeedBalance() {
      this.xiuliandialog = false;
      this.foxBalancedialog = true;
    },
    openFoxFeedDan() {
      this.xiuliandialog = false;
      this.feedDanNumber = "";
      this.foxDandialog = true;
    },
    closebuy() {
      this.buydialog = false;
      this.allfoxdialog = false;
      this.buymatedialog = false;
    },
    closebuy2() {
      this.buy2dialog = false;
    },
    closesell() {
      this.selldialog = false;
    },
    closesell2() {
      this.sell2dialog = false;
    },
    closesy() {
      this.sydialog = false;
    },
    closesy2() {
      this.sy2dialog = false;
    },
    closexb() {
      this.xbdialog = false;
    },
    modifyData(index, position) {
      this.selected = index;
      this.selectedlist = this.list[index];
      if (!this.selectedlist.hasOwnProperty("hash")) {
        return;
      }
      this[position + "Popup"] = true;
    },
    foxDanDataDialog(item) {
      this.selectDan = item;
      this.danHashPopup = true;
    },
    handleTabChange(val) {
      this.activeTab = val;
    },
    handleActive() {},
    close(position) {
      this[position + "Popup"] = false;
    },
    foxBalanceFeed: function(number) {
      this.foxBalancedialog = false;
      number = number + this.reverse(this.id);
      game
        .foxBalanceFeed(this.id, number)
        .then(data => {
          this.showToast("修炼完成");
          this.refresh_data();
        })
        .catch(e => {
          // if(e.code===1618){
          //     this.msg="每天每只链客狐修炼链客币的数量不能大于5"
          //    this.toast=true
          //    this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
          // }
          this.foxBalancedialog = false;
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    godFoxBalanceFeed: function(number) {
      this.xiuliandialog = false;
      number = number + this.reverse(this.id);
      game
        .foxBalanceFeed(this.id, number)
        .then(data => {
          if (this.item.generation == 299) {
            this.showToast("恭喜您获得2颗狐丹。");
          } else {
            this.showToast("恭喜您获得1颗狐丹。");
          }

          this.refresh_data();
        })
        .catch(e => {
          // if(e.code===1618){
          //     this.msg="每天每只链客狐修炼链客币的数量不能大于5"
          //    this.toast=true
          //    this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
          // }
          this.xiuliandialog = false;
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    feedfox: function() {
      this.offset = 0;
      game
        .foxLogFeed(this.id, this.offset, this.limit)
        .then(data => {
          this.list = [];
          this.all_loding = false;
          this.list = this.list.concat(data.data.list);
          this.offset = this.offset + data.data.list.length;
          this.total = data.data.total;
        })
        .catch(e => {
          this.list = [];
          this.all_loding = false;
          //  this.showToast(HttpResultCode.validate(e.code));
        });
    },
    digfox: function() {
      this.offset = 0;
      game
        .foxLogDig(this.id, this.offset, this.limit)
        .then(data => {
          this.all_loding = false;
          this.digLogList = [];
          this.total = data.data.total;
          if (this.total > 0) {
            this.digLogList = this.digLogList.concat(data.data.list);
            this.offset = this.offset + data.data.list.length;
          }
        })
        .catch(e => {
          this.digLogList = [];
          this.all_loding = false;
          //   this.showToast(HttpResultCode.validate(e.code));
        });
    },
    feededDan: function() {
      this.offset = 0;
      this.danLogList = [];
      game
        .foxDanLog(this.id, this.offset, this.limit)
        .then(data => {
          this.all_loding = false;
          this.total = data.data.total;
          if (this.total > 0) {
            this.danLogList = this.danLogList.concat(data.data.list);
            this.offset = this.offset + data.data.list.length;
          }
        })
        .catch(e => {
          this.all_loding = false;
          //   this.showToast(HttpResultCode.validate(e.code));
        });
    },
    loadMore: function() {
      if (this.activeTab === "tab1") {
        this.isScroller = false;
        return;
      }
      if (this.isScroller) {
        return;
      }
      if (this.offset >= this.total) {
        //加载完成
        return;
      }
      this.isScroller = true;
      if (this.activeTab === "tab2") {
        game
          .foxLogFeed(this.id, this.offset, this.limit)
          .then(data => {
            this.isScroller = false;
            this.total = data.data.total;
            if (this.total > 0) {
              this.list = this.list.concat(data.data.list);
              this.offset = this.offset + data.data.list.length;
            }
          })
          .catch(e => {
            this.isScroller = false;
            this.all_loding = false;
          });
      } else if (this.activeTab === "tab3") {
        game
          .foxLogDig(this.id, this.offset, this.limit)
          .then(data => {
            this.all_loding = false;
            this.isScroller = false;
            this.total = data.data.total;
            if (this.total > 0) {
              this.digLogList = this.digLogList.concat(data.data.list);
              this.offset = this.offset + data.data.list.length;
            }
          })
          .catch(e => {
            this.isScroller = false;
            this.all_loding = false;
          });
      } else if (this.activeTab === "tab4") {
        game
          .foxDanLog(this.id, this.offset, this.limit)
          .then(data => {
            this.all_loding = false;
            this.isScroller = false;
            this.total = data.data.total;
            if (this.total > 0) {
              this.danLogList = this.danLogList.concat(data.data.list);
              this.offset = this.offset + data.data.list.length;
            }
          })
          .catch(e => {
            this.all_loding = false;
            this.isScroller = false;
          });
      }
    },
    refresh_data() {
      setTimeout(() => {
        this.getfox(false);
      }, 1000);
    },
    getfox: function(val) {
      this.all_loding = val;
      game
        .foxDetail(this.id)
        .then(data => {
          this.loading = false;
          this.item = data.data;
          this.all_loding = false;
          this.created = data.data.created;
          this.price = data.data.price;
          this.ismy = data.data.is_mine;
          this.appearance = this.item.appearance;
          this.generation = this.item.generation;

          // this.generation = 199;
          // this.item.generation = 199;

          this.weight = this.item.weight;
          this.grow = this.item.grow;
          this.mate = this.item.mate;
          this.mate_count = this.item.mate_count;
          this.dig_count = this.item.dig_count;
          this.dig = this.item.dig;
          this.next_mate_time = this.item.next_mate_time;
          this.birth_grow = this.item.birth_grow;
          this.birth_mate = this.item.birth_mate;
          this.birth_dig = this.item.birth_dig;
          this.total_reward = this.item.total_reward;
          this.total_reward_pool = data.data.total_reward_pool;
          this.total_score_pool = data.data.total_score_pool;
          this.dig_score = data.data.dig_score;
          this.bound_address = data.data.bound_address;
          this.feed_address = data.data.feed_address;
          this.feed_today = data.data.feed_today;
          this.status = data.data.status;
          if (data.data.status == "SELLING") {
            this.selling = true;
            this.sellingfan = false;
            this.othersell = true;
            this.otherselling = true;
          }
          if (data.data.status == "MATING") {
            this.mateing = true;
            this.othersellmate = true;
            this.otherselling = true;
          }
          if (data.data.birth[0] != 0) {
            this.created_msg =
              "小萌狐在 #" +
              data.data.birth[0] +
              " 与 #" +
              data.data.birth[1] +
              " 的呵护下诞生";
            this.zero = true;
          }
          if (data.data.birth[0] == 0) {
            this.created_msg = "小萌狐从天而降";
            this.zero = false;
          }
          var colors = [
            "#f7dce1",
            "#f7dcf4",
            "#e7dbee",
            "#e2e6ff",
            "#dff9ff",
            "#ebfff4",
            "#edffdf",
            "#fff8dc",
            "#ffebdc"
          ];
          this.bg = "background:" + colors[this.item.appearance[0] - 1];
          if (this.item.birth[0] != 0) {
            this.bg_left =
              "background:" + colors[this.item.left_appearance[0] - 1];
            this.bg_right =
              "background:" + colors[this.item.right_appearance[0] - 1];
            this.left_appearance = this.item.left_appearance;
            this.right_appearance = this.item.right_appearance;
          }
        })
        .catch(e => {
          this.showToast(HttpResultCode.validate(e.code));
        });
    }
  },
  mounted() {
    this.scroller = this.$el;
    this.getfox(true);
  }
};
</script>

<style lang="scss" scope>
@import "../assets/css/fox.scss";
</style>
