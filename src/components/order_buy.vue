<template>
  <div class="content-order-buy">
    <div style=" padding-bottom:3em;">
      <div class="top">
        <div class="center">{{$t('Trade.Buy.Title1')}} {{crypto_currency|titleDeal}}</div>
        <div class="left" @click="goBack"></div>
        <div
          class="right"
          @click="disputedTipShowDialog"
          v-show="(trade.status=='PAID')&& isDealTime"
        >{{$t('Text.ss')}}</div>
        <div
          class="right"
          @click="disputedTipShowDialog1"
          v-show="(trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED')&&!isDispute"
        >{{$t('Text.ss')}}</div>
        <div
          class="right"
          @click="disputedFkTipShowDialog"
          v-show="(trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED')&&isDispute"
        >{{$t('Text.ss')}}</div>
      </div>

      <!-- <button  @click="disputedTipShowDialog" class="sell-order-item-bottom-disputed" v-show="(trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED')&&!isDispute" >{{$t('Order.complainting')}}</button>
      <button  @click="disputedFkTipShowDialog" class="sell-order-item-bottom-disputed" v-show="(trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED')&&isDispute" >{{$t('Text.ssfk')}}</button>-->
      <!-- content -->

      <div class="card">
        <div class="order-status-bg" style="margin: 0  auto 0 auto;"></div>
        <div class="status-text fs-18">{{title_content}}</div>

        <!-- <div style="color:#212B67;padding-top:0.5em;font-size:1em;">{{$t('Text.qzTip1')}}{{$t('Text.qzTip2')}}</div> -->
        <div class="step">
          <div>
            <div>
              <div class="order-status-ok" style="margin:0 auto;"></div>
              <div style="color:#005EE4;font-size:0.8em;margin-top:0.333em">{{$t('Text.tjdd')}}</div>
            </div>
          </div>
          <div class="order-status-line"></div>
          <div>
            <div>
              <div
                class="order-status-w"
                style="margin:0 auto;"
                v-show="trade.status=='TAKEN'||trade.status=='TB_CANCELLED'||trade.status=='OVERTIME'"
              ></div>
              <div
                class="order-status-ok"
                style="margin:0 auto;"
                v-show="trade.status=='BUYER_WON'||trade.status=='SELLER_WON'||trade.status=='PAID'||trade.status=='RELEASED'||trade.status=='PB_CANCELLED'||trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED'"
              ></div>
              <div
                style="color:#6D778B;font-size:0.8em;margin-top:0.333em"
                v-show="trade.status=='TAKEN'||trade.status=='TB_CANCELLED'||trade.status=='OVERTIME'"
              >{{$t('Text.mjzb')}}</div>
              <div
                style="color:#005EE4;font-size:0.8em;margin-top:0.333em"
                v-show="trade.status=='BUYER_WON'||trade.status=='SELLER_WON'||trade.status=='PAID'||trade.status=='RELEASED'||trade.status=='PB_CANCELLED'||trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED'"
              >{{$t('Text.mjzb')}}</div>
            </div>
          </div>
          <div class="order-status-line"></div>
          <div>
            <div>
              <div
                class="order-status-w"
                style="margin:0 auto;"
                v-show="trade.status=='TAKEN'||trade.status=='TB_CANCELLED'||trade.status=='PAID'||trade.status=='OVERTIME'||trade.status=='PB_CANCELLED'||trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED'"
              ></div>
              <div
                class="order-status-ok"
                style="margin:0 auto;"
                v-show="trade.status=='BUYER_WON'||trade.status=='SELLER_WON'||trade.status=='RELEASED'"
              ></div>
              <div
                style="color:#6D778B;font-size:0.8em;margin-top:0.333em"
                v-show="trade.status=='TAKEN'||trade.status=='TB_CANCELLED'||trade.status=='PAID'||trade.status=='OVERTIME'||trade.status=='PB_CANCELLED'||trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED'"
              >{{$t('Text.mjqrsb')}}</div>
              <div
                style="color:#005EE4;font-size:0.8em;margin-top:0.333em"
                v-show="trade.status=='BUYER_WON'||trade.status=='SELLER_WON'||trade.status=='RELEASED'"
              >{{$t('Text.mjqrsb')}}</div>
            </div>
          </div>
        </div>

        <!-- <div style="width: 85%; margin: 0em auto 0.8em auto;display:flex;padding-bottom:1em;">
           <div>
             
              <div style="color:#1BF2BA;font-size:1em;margin-top:0.2em">
                {{$t('Text.tjdd')}}
              </div>
           </div>
          
            <div class="order-status-line1"  >
            </div> 
            
            <div>
             
              <div style="color:#6D778B;font-size:1em;margin-top:0.2em"  v-show="trade.status=='TAKEN'||trade.status=='TB_CANCELLED'||trade.status=='OVERTIME'" >
                  {{$t('Text.mjzb')}}
                </div>
                <div style="color:#1BF2BA;font-size:1em;margin-top:0.2em"   v-show="trade.status=='BUYER_WON'||trade.status=='SELLER_WON'||trade.status=='PAID'||trade.status=='RELEASED'||trade.status=='PB_CANCELLED'||trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED'" >
                  {{$t('Text.mjzb')}}
                </div>
           </div> 
            <div class="order-status-line1"  >
            </div> 
            <div>
             
              <div style="color:#6D778B;font-size:1em;margin-top:0.2em"  v-show="trade.status=='TAKEN'||trade.status=='TB_CANCELLED'||trade.status=='PAID'||trade.status=='OVERTIME'||trade.status=='PB_CANCELLED'||trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED'"  >
                  {{$t('Text.mjqrsb')}}
                </div>
              <div style="color:#1BF2BA;font-size:1em;margin-top:0.2em"  v-show="trade.status=='BUYER_WON'||trade.status=='SELLER_WON'||trade.status=='RELEASED'">
                  {{$t('Text.mjqrsb')}}
                </div>
           </div> 
        </div>-->
      </div>
      <div style="width: 100%;height: 0.666em;background-color: #f4f4f4;"></div>
      <!-- <div class="buy-order-item-info">
     <div class="buy-order-item-info-content">
          <div class="buy-order-item-info-content-head" >{{trade.is_buy?trade.seller_name :trade.buyer_name | namechange}}</div>
          <div v-show="trade.is_online" class="buy-order-item-info-content-online"  ></div>
           <div class="buy-order-item-info-content-center" >
              <h4>
                {{trade.is_buy?trade.seller_name :trade.buyer_name }}
              </h4>
            <p v-show="trade.is_buy">{{$t('Text.zcsj')}}<span class="left_space">&nbsp;{{trade.seller_created | getformatDate}} </span></p>
            <p v-show="!trade.is_buy">{{$t('Text.zcsj')}}<span class="left_space">&nbsp;{{trade.buyer_created | getformatDate}} </span></p>
          </div>
      </div>
      <div  class="buy-order-item-title" style="padding:0px;border-top:1px solid #eee;border-bottom:0px;padding-top:0.4em;" >
      <p >{{$t('Text.ljcj')}}&nbsp;<span>{{trade.seller_trade_total_usdt + " "}}{{crypto_currency | pricechange1}}</span></p>
    </div>

      </div>-->
      <!--賣家信息-->

      <div
        class="card buyer-detail"
        style="
        margin: 0.666em auto 0.666em auto;
        text-align: left;"
      >
        <div
          style="display: flex;flex-flow: row nowrap;justify-content: space-between;
    align-items: center;"
        >
          <div style="font-size:1em;color:#6D778B">{{$t('Text.sellerxx')}}</div>
          <!-- <div class="sell-order-item-info-content-center" >
              <h4>
                {{trade.is_buy?trade.seller_name :trade.buyer_name }}
              </h4>
              <p v-show="trade.is_buy">{{$t('Text.zcsj')}}<span class="left_space">&nbsp;{{trade.seller_created | getformatDate}} </span></p>
            <p v-show="!trade.is_buy">{{$t('Text.zcsj')}}<span class="left_space">&nbsp;{{trade.buyer_created | getformatDate}} </span></p>
          </div>-->
          <div style="display:flex;align-items: center;">
            <div class="sell-order-item-info-content-head" v-show="index==0">{{this.nameFirst}}</div>
            <div class="sell-order-item-info-content-head1" v-show="index==1">{{this.nameFirst}}</div>
            <div class="sell-order-item-info-content-head2" v-show="index==2">{{this.nameFirst}}</div>
            <div class="sell-order-item-info-content-head3" v-show="index==3">{{this.nameFirst}}</div>
            <div class="sell-order-item-info-content-head4" v-show="index==4">{{this.nameFirst}}</div>
            <div class="sell-order-item-info-content-head5" v-show="index==5">{{this.nameFirst}}</div>
            <div class="sell-order-item-info-content-head6" v-show="index==6">{{this.nameFirst}}</div>
            <div class="sell-order-item-info-content-head7" v-show="index==7">{{this.nameFirst}}</div>
            <div class="sell-order-item-info-content-head8" v-show="index==8">{{this.nameFirst}}</div>

            <span
              style="font-size:0.9333em;color:#132440;font-weight: 500;margin-left: 0.6em;"
            >{{trade.is_buy?trade.seller_name :trade.buyer_name}}</span>
          </div>
        </div>

        <p v-show="trade.is_buy" style="color:#6D778B;font-size:1em">
          {{$t('Text.zcsj')}}
          <span
            style="float:right"
          >&nbsp;{{trade.seller_created | getformatDate}}</span>
        </p>
        <p v-show="!trade.is_buy" style="color:#6D778B;font-size:1em">
          {{$t('Text.zcsj')}}
          <span style="float:right">&nbsp;{{trade.buyer_created | getformatDate}}</span>
        </p>
        <!-- 
     <p  style="color:#6D778B;font-size:1em">{{$t('Text.ljcj')}}&nbsp;<span style="float:right">{{trade.seller_trade_total_usdt + " "}}{{crypto_currency | pricechange1}}</span></p>
        -->
        <p style="color:#6D778B;font-size:1em">
          {{$t('Text.ljcjds')}}&nbsp;
          <span
            style="float:right"
          >{{trade.seller_trade_success_count + " "}} | {{trade.seller_trade_success_ratio + " %"}}</span>
        </p>

        <!-- <div style="display:flex">
          <div
            style="width:2em;height:2em;border-radius: 4em;background:#212B67;margin-left:-2em; "
          ></div>
          <div style="width:100%;height:2px;border-top:1px dashed #212B67;margin-top:1em;"></div>
          <div
            style="width:2em;height:2em;border-radius: 4em;background:#212B67;margin-right:-2em; "
          ></div>
        </div>-->

        <p
          style="height:1px;
          background:rgba(10,36,99,1);
          opacity:0.1;margin: 0.9333em 0;!important;"
        ></p>

        <p style="color:#6D778B;font-size:1em;">
          <span v-html="$t('Order.OrderId1')"></span>&nbsp;
          <span style="float:right">{{trade.disp_id}}</span>
        </p>
        <!-- 
        -->

        <p style="color:#6D778B;font-size:1em;">
          <span v-html="$t('Order.TradePrice')"></span> &nbsp;
          <span style="float:right">{{trade.price}}&nbsp;{{crypto_currency | pricechange1}}</span>
        </p>

        <p style="color:#6D778B;font-size:1em">
          <span v-html="$t('Order.TradeQty')"></span>&nbsp;
          <span style="float:right">{{trade.qty}}&nbsp;{{crypto_currency | pricechange2}}</span>
        </p>

        <p style="color:#6D778B;font-size:1em">
          <span v-html="$t('Order.TradeFee')"></span>
          <span style="float:right">
            {{trade.buyer_fee}}&nbsp;
            <span>{{crypto_currency | pricechange1}}</span>
          </span>
        </p>
        <p style="color:#6D778B;font-size:1em">
          <span v-html="$t('Order.TradeTime')"></span>
          <span style="float:right">{{trade.created | getformatDate}}</span>
        </p>

        <p style="color:#6D778B;font-size:1em">
          <span v-html="$t('Text.ddze')"></span> &nbsp;
          <span
            style="float:right;color: #005EE4;font-weight: 500;"
          >{{ (parseFloat(trade.amount) + parseFloat(trade.buyer_fee)).toFixed(2)}}&nbsp;{{crypto_currency | pricechange1}}</span>
        </p>
      </div>
      <div style="width: 100%;height: 0.666em;background-color: #f4f4f4;"></div>
      <!--申诉中-->
      <div
        class="card buyer-detail"
        style="
        margin: 0.666em auto 0.666em auto;
        text-align: left;"
        v-show="isDispute"
      >
        <div style="font-size:1em;color:#6D778B">{{$t('Text.disputeInfo')}}</div>
        <div style="background:rgba(245,247,250,1);padding: 0.666em;margin: 0.666em 0;">
          <div
            style="padding:0px;color:#6D778B;padding:0.5em  0.5em;font-size:1em"
          >{{seller_content}}</div>
          <!-- <div
          style="padding:0px;color:#6D778B;padding:0.5em  0.5em;font-size:1em"
        >
          {{$t('Text.sssj')+":"}}
          <span>{{seller_updated|getformatDate}}</span>
          </div>-->
          <div v-show="alipay_payment_code_url_value || alipay_payment_code_url_value1 || alipay_payment_code_url_value2" class="pay-qr-zone">
            <div style="position:relative;">
              <img
                @click="open_Alipay(alipay_payment_code_url_value)"
                style="display:block;width:30%;height:100%;position:absolute;top:0px;left:0px;"
                :src="alipay_payment_code_url_value"
                v-show="alipay_payment_code_url_value!=''"
              />
              <img
                @click="open_Alipay(alipay_payment_code_url_value1)"
                style="display:block;width:30%;height:100%;position:absolute;top:0px;left:33%;"
                :src="alipay_payment_code_url_value1"
                v-show="alipay_payment_code_url_value1!=''"
              />
              <img
                @click="open_Alipay(alipay_payment_code_url_value2)"
                style="display:block;width:30%;height:100%;position:absolute;top:0px;left:66%;"
                :src="alipay_payment_code_url_value2"
                v-show="alipay_payment_code_url_value2!=''"
              />
            </div>
          </div>
          <div style="padding:0px;color:#6D778B;padding:0.5em  0.5em;font-size:1em">
            {{$t('Text.sssj')+"："}}
            <span>{{seller_updated|getformatDate}}</span>
          </div>
        </div>
        <!-- <div style="display:flex" v-show="buyer_comment!=null&&buyer_comment!==''">
          <div
            style="width:2em;height:2em;border-radius: 4em;background:#212B67;margin-left:-2em; "
          ></div>
          <div style="width:100%;height:2px;border-top:1px dashed #212B67;margin-top:1em;"></div>
          <div
            style="width:2em;height:2em;border-radius: 4em;background:#212B67;margin-right:-2em; "
          ></div>
        </div>-->

        <div
          style="font-size:1em;color:#6D778B;font-weight:400;padding-top: 0.666em;"
          v-show="buyer_comment!=null&&buyer_comment!==''"
        >{{$t('Text.mjly')}}</div>
        <div style="background:rgba(245,247,250,1);padding: 0.666em;margin: 0.666em 0;">
          <p
            style="color:#6D778B;font-size:1em;padding-left:0.5em;"
            v-show="buyer_comment!=null&&buyer_comment!==''"
          >{{buyer_comment}}</p>
          <p
            style="color:#6D778B;font-size:1em;padding-left:0.5em;"
            v-show="buyer_updated!=null&&buyer_updated!==''"
          >
            {{$t('Text.sssj')+"："}}
            <span>{{buyer_updated|getformatDate}}</span>
          </p>
        </div>

        <!-- <div style="display:flex" v-show="ob_comment!=null&&ob_comment!==''">
          <div
            style="width:2em;height:2em;border-radius: 4em;background:#212B67;margin-left:-2em; "
          ></div>
          <div style="width:100%;height:2px;border-top:1px dashed #212B67;margin-top:1em;"></div>
          <div
            style="width:2em;height:2em;border-radius: 4em;background:#212B67;margin-right:-2em; "
          ></div>
        </div>-->
        <div
          style="font-size:1em;color:#6D778B"
          v-show="ob_comment!=null&&ob_comment!==''"
        >{{$t('Text.zcyj')}}</div>
        <div style="background:rgba(245,247,250,1);padding: 0.666em;margin: 0.666em 0;">
          <p
            style="color:#6D778B;font-size:1em;padding-left:0.5em;"
            v-show="ob_comment!=null&&ob_comment!==''"
          >{{ob_comment}}</p>
          <p
            style="color:#6D778B;font-size:1em;padding-left:0.5em;"
            v-show="ob_updated!=null&&ob_updated!==''"
          >
            {{$t('Text.zcsjTime')+"："}}
            <span>{{ob_updated|getformatDate}}</span>
          </p>
        </div>
      </div>

      <!-- <button
        @click="releaseShowDialog"
        class="sell-order-item-bottom-main"
        v-show="trade.status=='PAID'||trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED'"
      >{{$t('Order.realse')}}</button>-->
      <mu-raised-button
        v-show="trade.status=='PAID'||trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED'"
        :label="$t('Order.realse')"
        @click="releaseShowDialog"
        class="btn-toast-submit"
        style="margin-top:1em;width: 90%;"
        fullWidth
        primary
      />
      <!-- <button  @click="disputedShowDialog" v-show="trade.status=='PAID'||trade.status=='TAKEN'" trade.status=='TAKEN'|| :class="{orange_red:isDealTime,c1:!isDealTime}">{{$t('Order.complaint')}}</button> -->
      <!-- <button  @click="disputedTipShowDialog" class="sell-order-item-bottom-disputed" v-show="(trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED')&&!isDispute" >{{$t('Order.complainting')}}</button>
      <button  @click="disputedFkTipShowDialog" class="sell-order-item-bottom-disputed" v-show="(trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED')&&isDispute" >{{$t('Text.ssfk')}}</button>-->

      <!-- <div class="buy-order-item-info">
      <div class="buy-order-item-info-content-order">
        <p><span v-html="$t('Order.OrderId1')" v-clipboard:copy="disp_last_id"
              v-clipboard:success="success"
              v-clipboard:error="error"></span><span class="left-span blue-span" v-clipboard:copy="disp_last_id"
              v-clipboard:success="success"
              v-clipboard:error="error"><span style="color:#ccc;" >{{trade.disp_id|getFrontDisId}}</span>{{trade.disp_id|getLastDisId}}</span>&nbsp;</p>
        <p>{{$t('Order.OrderAmount1')}}<span class="left-span red-span">{{trade.amount}}&nbsp;<span >{{crypto_currency | pricechange1}}</span></span></p>
        <p><span v-html="$t('Order.TradePrice')" ></span><span class="left-span  red-span">{{trade.price}}&nbsp;<span >{{crypto_currency | pricechange1}}</span></span></p>
        <p><span v-html="$t('Order.TradeQty')" ></span><span class="left-span">{{trade.qty}}&nbsp;<span >{{crypto_currency | pricechange2}}</span></span></p>
        <p  v-show="trade.status !== 'RELEASED'" ><span v-html="$t('Order.TradeFee')"></span><span class="left-span">{{trade.buyer_fee}}&nbsp;<span >{{crypto_currency | pricechange1}}</span></span></p>
        <p class="no-border"><span v-html="$t('Order.TradeTime')" ></span><span class="left-span gray-span">{{trade.created | getformatDate}}</span></p>
        
     </div>
    </div>
      <p class="title_pay">{{$t('Text.mfsbdz')}}</p>
    
       
     <div  class="share_btn_zone" >
            <div class="share_btn bottom_border">
            
              <span v-clipboard:copy="buyer_addresses[0]"
              v-clipboard:success="success"
              v-clipboard:error="error">{{buyer_addresses[0]}}</span>
           
            </div>
     </div>
        <qrcode  :value="buyer_addresses[0]" :options="{ size: 120 }" v-show="buyer_addresses[0]!=''" style="margin-top:0.5em;"></qrcode>

        <p class="title_pay"  v-show="isDispute">{{$t('Text.disputeBtn')}}</p>

     <div class="login-pay" v-show="isDispute">
      
          <div style="padding:0px;border-top:1px solid #eee;border-bottom:0px;padding:0.5em  0.5em;background:#FFFFFF" >{{seller_content}}</div>
         
          <div  style="padding:0px;border-top:1px solid #eee;border-bottom:1px solid #eee;padding:0.5em  0.5em;background:#FFFFFF">{{$t('Text.sssj')+":"}}{{seller_updated|getformatDate}}</div>
         
          <div class="pay-qr-zone" >                                    
            <div style="position:relative;" >
            <img  @click="open_Alipay(alipay_payment_code_url_value)" style="display:block;width:30%;height:100%;position:absolute;top:0px;left:0px;" :src="alipay_payment_code_url_value" v-show="alipay_payment_code_url_value!=''"> 
            <img  @click="open_Alipay(alipay_payment_code_url_value1)" style="display:block;width:30%;height:100%;position:absolute;top:0px;left:33%;" :src="alipay_payment_code_url_value1" v-show="alipay_payment_code_url_value1!=''"> 
            <img  @click="open_Alipay(alipay_payment_code_url_value2)" style="display:block;width:30%;height:100%;position:absolute;top:0px;left:66%;" :src="alipay_payment_code_url_value2" v-show="alipay_payment_code_url_value2!=''"> 
            
            </div>
           </div>
            <div style="border-top:1px solid #eee;border-bottom:0px;padding:0.5em  0.5em;background:#eee" v-show="buyer_comment!=null&&buyer_comment!==''">{{$t('Text.mjly')}}</div>
             <div style="padding:0px;border-top:1px solid #eee;border-bottom:0px;padding:0.5em  0.5em;background:#FFFFFF;color:#333333" v-show="buyer_comment!=null&&buyer_comment!==''" >{{buyer_comment}}</div>
            <div style="padding:0px;border-top:1px solid #eee;border-bottom:0px;padding:0.5em  0.5em;background:#FFFFFF;color:#333333" v-show="buyer_updated!=null&&buyer_updated!==''" >{{buyer_updated|getformatDate}}</div>
 
        <div style="border-top:1px solid #eee;border-bottom:0px;padding:0.5em  0.5em;background:#eee" v-show="ob_comment!=null&&ob_comment!==''">{{$t('Text.zcyj')}}</div>
             <div style="padding:0px;border-top:1px solid #eee;border-bottom:0px;padding:0.5em  0.5em;background:#FFFFFF;color:#333333" v-show="ob_comment!=null&&ob_comment!==''" >{{ob_comment}}</div>
            <div style="padding:0px;border-top:1px solid #eee;border-bottom:0px;padding:0.5em  0.5em;background:#FFFFFF;color:#333333" v-show="ob_updated!=null&&ob_updated!==''" >{{ob_updated|getformatDate}}</div>
      </div>


      <div class="hint-bottom-zone">
      <p class="hint-titile"><mu-icon class="hint_ico" value="report_problem" color="#f25c49" :size="1.5"/>{{$t('Order.tradeTip')}}</p>
       <p v-html="$t('Order.OrderTip1')">
        
       </p>
       <p class="hint-titile"><mu-icon class="hint_ico" value="report_problem" color="#f25c49" :size="1.5"/>{{$t('Order.tradeIssue')}}</p>
       <p  v-html="$t('Order.OrderTip2')">
       </p>
    </div>

    <div class="sell-order-item-bottom" v-show="trade.status=='TAKEN'||trade.status=='PAID'||trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED'">
     
      </div>-->

      <!-- <mu-dialog :open="isDisputedTipDialog" :title="$t('Order.WarmPrompt')">
        {{$t('Text.qbcsslx')}}
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')" />
        <mu-flat-button slot="actions" primary @click="disputed" :label="$t('Order.complaint')" />
      </mu-dialog>-->

      <div
        style="  width: 100%;
        height: 100%;
        position: fixed;
        top: 0px;z-index:999;"
        class="reset-dialog"
        v-show="isDisputedTipDialog"
      >
        <div
          style="
        margin: 35% auto 0 auto;
        background: #ffffff;
        border-radius: 0.3em;"
          class="reset-dialog-wrap"
        >
          <div
            class="fs-18"
            style="padding-top:2.1333em;color: #2E3546;font-weight: 500;"
          >{{$t('Order.WarmPrompt')}}</div>
          <div
            style="color: #4E586E;padding: 0 1em;margin: 2em 0;"
            class="fs-15"
            v-text="$t('Text.qbcsslx')"
          ></div>
          <div
            style="display: flex;flex-flow: row nowrap;justify-content: space-between;width: 95%;margin: auto;"
          >
            <mu-raised-button
              :label="$t('Order.Colse')"
              @click="closeDialog"
              class="btn-toast-cancel"
              style="margin-top:1em;"
              fullWidth
              primary
            />
            <mu-raised-button
              :label="$t('Order.complaint')"
              @click="disputed"
              class="btn-toast-submit"
              style="margin-top:1em;"
              fullWidth
              primary
            />
          </div>
        </div>
      </div>

      <!-- <mu-dialog :open="isReleaseDialog" :title="$t('Order.WarmPrompt')" > 
      <mu-checkbox :label="$t('Text.wyqrsddfzb')" v-model="isPayed"/> 
 
      <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
      <mu-flat-button slot="actions" primary @click="releaseDialog" :label="$t('User.SetMenuAssertPwd')"/>
      </mu-dialog>-->

      <!-- <mu-dialog :open="isPasswordDialog" :title="$t('User.SetMenuAssertPwd')" @click="closeDialog">
      <div >
        <mu-text-field  v-model="passwordValue"  :label="$t('User.SetMenuAssertPwd')" class="input-zone" :hintText="$t('Wallet_Detail.pwd_validate_tip')"
         type="password"  fullWidth :errorText="pwd_error" />
        <div style="text-align:right">
          <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
          <mu-flat-button slot="actions" primary @click="release" :label="$t('Order.realse')"/>
        </div>
      </div>
      </mu-dialog>-->
      <!-- <mu-dialog :open="isDisputedFkTipDialog" :title="$t('Text.ssfk')" @click="closeDialog">
        <div>
          :label="$t('Text.ssfk')"
          <mu-text-field
            v-model="fkyj"
            class="input-zone"
            :hintText="$t('Text.ssfkhint')"
            type="text"
            fullWidth
            :errorText="pwd_error"
          />
          <div style="text-align:right">
            <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')" />
            <mu-flat-button slot="actions" primary @click="feadback" :label="$t('Text.tjss')" />
          </div>
        </div>
      </mu-dialog>-->

      <div
        style="  width: 100%;
        height: 100%;
        position: fixed;
        top: 0px;z-index:999;"
        class="reset-dialog"
        v-show="isDisputedFkTipDialog"
      >
        <div
          style="
        margin: 35% auto 0 auto;
        background: #ffffff;
        border-radius: 0.3em;"
          class="reset-dialog-wrap"
        >
          <div
            class="fs-18"
            style="padding-top:2.1333em;color: #2E3546;font-weight: 500;"
          >{{$t('Text.ssfk')}}</div>
          <mu-text-field
            style="color: #4E586E;margin: 2em 0;width: 90%;"
            class="fs-15"
            v-model="fkyj"
            :hintText="$t('Text.ssfkhint')"
            type="text"
            fullWidth
            :errorText="pwd_error"
          />
          <div
            style="display: flex;flex-flow: row nowrap;justify-content: space-between;width: 95%;margin: auto;"
          >
            <mu-raised-button
              :label="$t('Order.Colse')"
              @click="closeDialog"
              class="btn-toast-cancel"
              style="margin-top:1em;"
              fullWidth
              primary
            />
            <mu-raised-button
              :label="$t('Text.tjss')"
              @click="feadback"
              class="btn-toast-submit"
              style="margin-top:1em;"
              fullWidth
              primary
            />
          </div>
        </div>
      </div>

      <!-- <mu-dialog :open="isDisputedDialog" :title="$t('Order.WarmPrompt')">
        {{$t('Text.qbcsslx')}}
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')" />
        <mu-flat-button slot="actions" primary @click="disputed" :label="$t('Order.complaint')" />
      </mu-dialog>-->

      <div
        style="  width: 100%;
        height: 100%;
        position: fixed;
        top: 0px;z-index:999;"
        class="reset-dialog"
        v-show="isDisputedDialog"
      >
        <div
          style="
        margin: 35% auto 0 auto;
        background: #ffffff;
        border-radius: 0.3em;"
          class="reset-dialog-wrap"
        >
          <div
            class="fs-18"
            style="padding-top:2.1333em;color: #2E3546;font-weight: 500;"
          >{{$t('Order.WarmPrompt')}}</div>
          <div
            style="color: #4E586E;padding: 0 1em;margin: 2em 0;"
            class="fs-15"
            v-text="$t('Text.qbcsslx')"
          ></div>
          <div
            style="display: flex;flex-flow: row nowrap;justify-content: space-between;width: 95%;margin: auto;"
          >
            <mu-raised-button
              :label="$t('Order.Colse')"
              @click="closeDialog"
              class="btn-toast-cancel"
              style="margin-top:1em;"
              fullWidth
              primary
            />
            <mu-raised-button
              :label="$t('Order.complaint')"
              @click="disputed"
              class="btn-toast-submit"
              style="margin-top:1em;"
              fullWidth
              primary
            />
          </div>
        </div>
      </div>
      <!-- TODO: 下面两个涉及到支付宝支付，暂不替换弹窗ui -->
      <mu-dialog :open="isDisputedTipDialog1" :title="$t('Order.WarmPrompt')">
        {{$t('Text.sszl')}}
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')" />
      </mu-dialog>

      <mu-dialog :open="dialogAlipay" :title="$t('Text.dispute')" @close="closeDialog">
        <img style="width:100%" :src="alipay_payment_code_url_value_current" />

        <mu-flat-button slot="actions" primary @click="closeDialog" :label="$t('Text.sure')" />
      </mu-dialog>
      <mu-toast v-if="toast" :message="message" @close="hideToast" />
    </div>

    <div
      style="width: 100%;
        height: 100%;
        position: fixed;
        top: 0px;z-index:999;"
      class="reset-dialog"
      v-show="isPasswordDialog"
    >
      <div
        style="
        margin: 35% auto 0 auto;
        background: #ffffff;
        border-radius: 0.3em;"
        class="reset-dialog-wrap"
      >
        <div class="fs-18" style="padding-top:1.5em;color: #242932;">{{$t('User.SetMenuAssertPwd')}}</div>
        <mu-text-field
          v-model="passwordValue"
          style="width:90%;margin:1.2em auto 0px auto;"
          :hintText="$t('Wallet_Detail.pwd_validate_tip')"
          type="password"
          fullWidth
          :errorText="pwd_error"
        />
        <span
          @click="reset_sign_pwd"
          style="font-size: 1em;color: rgb(49, 128, 208);display: inline-block;position: relative;left: 8.2em;"
        >{{$t('SignIn.forgetPasswordText')}}</span>
        <div
          style="display: flex;flex-flow: row nowrap;justify-content: space-between;width: 95%;margin: auto;"
        >
          <mu-raised-button
            :label="$t('Text.cancel')"
            @click="closeDialog"
            class="btn-toast-cancel"
            style="margin-top:1em;"
            fullWidth
            primary
          />
          <mu-raised-button
            :label="$t('Order.realse')"
            @click="release"
            class="btn-toast-submit"
            style="margin-top:1em;"
            fullWidth
            primary
          />
        </div>
      </div>
    </div>

    <div
      style="  width: 100%;
        height: 100%;
        position: fixed;
        top: 0px;z-index:999;"
      class="reset-dialog"
      v-show="isReleaseDialog"
    >
      <div
        style="
        margin: 35% auto 0 auto;
        background: #ffffff;
        border-radius: 0.3em;"
        class="reset-dialog-wrap"
      >
        <div class="fs-18" style="padding-top:1.5em;color: #242932;">{{$t('Text.qrenyb')}}</div>
        <div style="margin: 2em 0;color:#4E586E;font-size:1em;">{{$t('Text.wyqrsddfzb')}}</div>

        <div
          style="display: flex;flex-flow: row nowrap;justify-content: space-between;width: 95%;margin: auto;"
        >
          <mu-raised-button
            :label="$t('Text.wsb')"
            @click="closeDialog"
            class="btn-toast-cancel"
            style="margin-top:1em;"
            fullWidth
            primary
          />
          <mu-raised-button
            :label="$t('Text.ysb')"
            @click="releaseDialog"
            class="btn-toast-submit"
            style="margin-top:1em;"
            fullWidth
            primary
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import nprogress from "nprogress";
import order from "../models/order";
import lib from "../utils/lib";
import HttpResultCode from "../utils/HttpResultCode";
import { formatDate } from "../common/js/data";
import moment from "../utils/moment";
import Clipboard from "clipboard";
export default {
  name: "order_buy",
  components: {},
  data() {
    return {
      id: this.$route.params.id,
      crypto_currency: this.$route.params.symbol.toUpperCase(),
      title_content: "",
      trade: {},
      alipay_on: false,
      wechat_pay_on: false,
      bankcard_on: false,
      isDealTime: false,
      // isCancelOrderDialog: false, //订单取消
      // isPaidDialog: false,
      // isDisputedTipDialog: false,
      // isDisputedDialog: false,
      isReleaseDialog: false,
      isPasswordDialog: false,
      isDisputedTipDialog: false,
      isDisputedDialog: false,
      trade_t: null,
      toast: false,
      message: "",
      alipay_pay: "",
      wechat_pay: "",
      bank_pay: "",
      disp_last_id: "",
      isCanPay: false,
      isPayTipDialog: false,
      isAlipayQrcode: false,
      isWechatQrcode: false,
      wechat_payment_code_url: "",
      wechat_payment_code_url_value: "",
      alipay_payment_code_url: "",
      buyer_addresses: [""],
      pwd_error: "",
      passwordValue: "",
      disputeJSON: null,
      alipay_payment_code_url_value: "",
      alipay_payment_code_url_value1: "",
      alipay_payment_code_url_value2: "",
      alipay_payment_code_url_value_current: "",
      dialogAlipay: false,
      isDisputedFkTipDialog: false,
      buyer_comment: "",
      buyer_updated: "",
      ob_comment: "",
      ob_updated: "",
      seller_content: "",
      seller_updated: "",
      isDispute: false,
      isPayed: false,
      index: 0,
      nameFirst: "",
      fkyj: "",
      seller_updated: "",
      isDisputedTipDialog1: false,
      alipay_payment_code_url_value: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    // 参数初始化

    let id = to.params.id;
    let crypto_currency = to.params.symbol.toLowerCase();
    let params = {
      symbol: crypto_currency,
      tid: id
    };

    order
      .USER_otc_get_trade(params)
      .then(result => {
        let trade = {};
        let buyer_addresses = [];
        let dispute = {};
        var index = 0;
        if (result.code === 0) {
          trade = result.data.trade;
          buyer_addresses = result.data.buyer_addresses;
          dispute = result.data.dispute;
          var charas = trade.seller_name.substring(0, 1).toUpperCase();
          var index1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charas);
          index = (index1 + 1) % 9;
        }
        if (buyer_addresses == null || buyer_addresses.length == 0) {
          buyer_addresses = [""];
        }
        next(vm => {
          vm.trade = trade;
          vm.nameFirst = charas;
          vm.index = index;
          vm.disputeJSON = dispute;
          vm.buyer_addresses = buyer_addresses;
          if (vm.trade.disp_id.length == 8)
            vm.disp_last_id = vm.trade.disp_id.substring(4, 8).toUpperCase();

          if (dispute != null) {
            vm.isDispute = true;
            vm.buyer_comment = dispute.buyer_comment;
            vm.buyer_updated = dispute.buyer_updated;
            vm.ob_comment = dispute.ob_comment;
            vm.ob_updated = dispute.ob_updated;
            vm.seller_content = dispute.seller_content;
            vm.seller_updated = dispute.seller_updated;
            vm.alipay_payment_code_url_value = dispute.pic1;
            vm.alipay_payment_code_url_value1 = dispute.pic2;
            vm.alipay_payment_code_url_value2 = dispute.pic3;
          }

          if (vm.trade.status == "TAKEN" || vm.trade.status == "PENDING") {
            vm.update_date();
          } else {
            if (vm.trade.status == "PAID") {
              if (vm.trade.deadline > new Date().getTime()) {
                vm.isDealTime = false;
              } else {
                vm.isDealTime = true;
              }
            }
            if (
              vm.trade.status == "PS_DISPUTED" ||
              vm.trade.status == "PB_DISPUTED"
            ) {
              vm.title_content = vm.$t("Text.ssztip");
            } else {
              vm.title_content = vm.$t("Order." + vm.trade.status);
              if (vm.trade.status === "TAKEN") {
                vm.title_content = vm.$t("Text.BUY_TAKEN");
              }
              if (vm.trade.status === "PAID") {
                vm.title_content = vm.$t("Text.BUY_PAID");
              }
              if (vm.trade.status === "RELEASED") {
                vm.title_content = vm.$t("Text.BUY_RELEASED");
              }

              if (
                vm.trade.status === "OVERTIME" ||
                vm.trade.status === "TB_CANCELLED" ||
                vm.trade.status === "PB_CANCELLED"
              ) {
                vm.title_content = vm.$t("Text.BUY_CANCEL");
              }
              // "TAKEN": "已拍下",
              // "PAID": "已转币",
              // "RELEASED": "已释放",
              // "TB_CANCELLED": "卖家已取消",
              // "TB_CANCELLED_old": "已拍下，但卖家取消了交易。",
              // "OVERTIME": "超时取消",
              // "PB_CANCELLED": "卖家已取消",
              // "PB_CANCELLED_old": "卖家标记为已转币，但卖家取消了交易。",
              // "PS_DISPUTED": "申诉中",
              // "PS_DISPUTED_old": "已付款状态下的纠纷 （卖家投诉买家未转币）",
              // "PB_DISPUTED_old": "已付款状态下的纠纷 （买家投诉，已经转币很长时间未收到钱）",
              // "PB_DISPUTED": "申诉中",
              // "BUYER_WON": "判定买家赢",
              // "SELLER_WON": "判定卖家赢",
            }
          }

          // if (vm.trade.alipay_on) {
          //   vm.alipay_on = true;
          //   vm.alipay_payment_code_url = trade.alipay.payment_code_url;
          //   if (vm.alipay_payment_code_url.indexOf("qrcode") == 0) {
          //     vm.alipay_payment_code_url_value = vm.alipay_payment_code_url.substr(
          //       6,
          //       vm.alipay_payment_code_url.length
          //     );
          //     vm.isAlipayQrcode = true;
          //   } else {
          //     vm.alipay_payment_code_url_value = vm.alipay_payment_code_url;
          //     vm.isAlipayQrcode = false;
          //   }
          //   if (
          //     vm.alipay_payment_code_url_value.indexOf("http") == 0 ||
          //     vm.alipay_payment_code_url_value.indexOf("HTTP") == 0
          //   ) {
          //   } else {
          //     vm.alipay_payment_code_url_value =
          //       "http:" + vm.alipay_payment_code_url_value;
          //   }
          // }
          // if (vm.trade.wechat_pay_on) {
          //   vm.wechat_pay_on = true;
          //   vm.wechat_payment_code_url = trade.wechat_pay.payment_code_url;
          //   if (vm.wechat_payment_code_url.indexOf("qrcode") == 0) {
          //     vm.wechat_payment_code_url_value = vm.wechat_payment_code_url.substr(
          //       6,
          //       vm.wechat_payment_code_url.length
          //     );
          //     vm.isWechatQrcode = true;
          //   } else {
          //     vm.wechat_payment_code_url_value = vm.wechat_payment_code_url;
          //     vm.isWechatQrcode = false;
          //   }
          //   if (
          //     vm.wechat_payment_code_url_value.indexOf("http") == 0 ||
          //     vm.wechat_payment_code_url_value.indexOf("HTTP") == 0
          //   ) {
          //   } else {
          //     vm.wechat_payment_code_url_value =
          //       "http:" + vm.wechat_payment_code_url_value;
          //   }
          // }
          // if (vm.trade.bankcard_on) {
          //   vm.bankcard_on = true;
          // }

          if (
            vm.trade.status == "NOT_TAKEN" ||
            vm.trade.status == "BUYER_WON" ||
            vm.trade.status == "SELLER_WON" ||
            vm.trade.status == "TB_CANCELLED" ||
            vm.trade.status == "OVERTIME" ||
            vm.trade.status == "PB_CANCELLED" ||
            vm.trade.status == "RELEASED"
          ) {
          } else {
            vm.update_trade();
          }
        });
        nprogress.done();
      })
      .catch(e => {
        nprogress.done();
        HttpResultCode.validate(e.code);
      });
  },
  filters: {
    getformatDate(time) {
      let date = new Date(parseInt(time));
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    stringSplice(name) {
      if (undefined == name) return "";
      if (name.length > 10) {
        return name.substring(0, 10);
      } else {
        return name;
      }
    },
    titleDeal(coinname) {
      return coinname.replace("_", "/");
    },
    namechange(name) {
      if (undefined == name) return "";
      return name.substring(0, 1).toUpperCase();
    },
    getOrderStateType(status) {
      if (undefined == status) return "";
      return HttpResultCode.orderStatusType(status);
    },
    getFrontDisId(dispId) {
      if (undefined == dispId) return "";
      // if (dispId.length > 4) return dispId.substring(0, 4).toUpperCase();
      return dispId;
    },
    getLastDisId(dispId) {
      if (undefined == dispId) return "";
      return "";
      // return dispId
      // if (dispId.length == 8) return dispId.substring(4, 8).toUpperCase();
    },
    pricechange1(coin) {
      if (undefined == coin) return "";
      return coin.split("_")[1];
    },
    pricechange2(coin) {
      if (undefined == coin) return "";
      return coin.split("_")[0].toUpperCase();
    }
  },
  created: function() {
    // if (window.plus == undefined) {
    //   this.isCanPay = false;
    // } else {
    //   if (this.isAndroid_ios()) this.isCanPay = true;
    // }
  },
  methods: {
    reset_sign_pwd() {
      this.$router.push("/modify_asserts_pwd");
    },
    open_Alipay(currentUrl) {
      if (currentUrl != "") {
        this.alipay_payment_code_url_value_current = currentUrl;

        this.dialogAlipay = true;
      }
    },
    // ffc() {
    //   this.$router.push("/bills_ffc");
    // },
    hideToast() {
      this.toast = false;
      if (this.toastTimer) clearTimeout(this.toastTimer);
    },
    open(pay) {
      if (pay == "alipay") {
        this.wechat_pay = false;
        this.bank_pay = false;

        // pluginShowArrayArgu();
        if (this.alipay_pay == true) {
          this.alipay_pay = false;
        } else {
          this.alipay_pay = true;
        }
        if (
          this.trade.status == "TAKEN" ||
          this.trade.status == "PAID" ||
          this.trade.status == "PB_DISPUTED" ||
          this.trade.status == "PS_DISPUTED"
        ) {
          // if (this.isAndroid_ios())
          //   pluginShow(this.trade.alipay.payment_code_url);
        }
      }
      if (pay == "wechat") {
        this.alipay_pay = false;
        this.bank_pay = false;
        if (this.wechat_pay == true) {
          this.wechat_pay = false;
        } else {
          this.wechat_pay = true;
        }
      }
      if (pay == "bank") {
        this.alipay_pay = false;
        this.wechat_pay = false;
        if (this.bank_pay == true) {
          this.bank_pay = false;
        } else {
          this.bank_pay = true;
        }
      }
    },
    tel() {
      if (this.isAndroid_ios()) {
        var Intent = plus.android.importClass("android.content.Intent");
        var Uri = plus.android.importClass("android.net.Uri");
        var main = plus.android.runtimeMainActivity();
        // 创建Intent
        var uri = Uri.parse("tel:" + this.trade.seller_mobile);
        var call = new Intent("android.intent.action.CALL", uri);
        main.startActivity(call);
      }
    },
    goDisputed() {
      this.isDisputedTipDialog = false;
    },
    isAndroid_ios() {
      //判断是否是安卓还是ios
      var u = navigator.userAgent,
        app = navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      return isAndroid == true ? true : false;
    },
    showToast(message) {
      this.toast = true;
      this.message = message;
      this.toastTimer = setTimeout(() => {
        this.toast = false;
      }, 2000);
    },
    // closeDialog() {
    //   this.isCancelOrderDialog = false;
    //   this.isPaidDialog = false;
    //   this.isDisputedTipDialog = false;
    //   this.isDisputedDialog = false;
    //   this.isPayTipDialog = false;
    // },
    // cancelOrderShowDialog() {
    //   this.isCancelOrderDialog = true;
    // },
    // paidShowDialog() {
    //   this.isPaidDialog = true;
    // },
    // disputedTipShowDialog() {
    //   this.isDisputedTipDialog = true;
    // },
    // disputedShowDialog() {
    //   if (this.isDealTime) {
    //     this.isDisputedDialog = true;
    //   } else {
    //     let str = this.getformatDate1(this.trade.deadline);
    //     this.showToast(str + this.$t("Order.AppealTime"));
    //     this.initData();
    //   }
    // },
    closeDialog() {
      this.isReleaseDialog = false;
      this.isDisputedTipDialog = false;
      this.isDisputedDialog = false;
      this.isPasswordDialog = false;
      this.dialogAlipay = false;
      this.isDisputedFkTipDialog = false;
      this.isDisputedTipDialog1 = false;
    },
    releaseShowDialog() {
      this.isReleaseDialog = true;
      this.isPayed = false;
    },
    releaseDialog() {
      // if (!this.isPayed) {
      //   this.showToast("请确认我已收到款。");
      //   return;
      // }
      this.passwordValue = "";
      this.isPasswordDialog = true;
      this.isReleaseDialog = false;
      this.isPayed = false;
    },
    disputedFkTipShowDialog() {
      this.isDisputedFkTipDialog = true;
    },
    disputedTipShowDialog() {
      this.isDisputedTipDialog = true;
    },
    disputedTipShowDialog1() {
      this.isDisputedTipDialog1 = true;
    },

    disputedShowDialog() {
      if (this.isDealTime) {
        this.isDisputedDialog = true;
      } else {
        let str = this.getformatDate1(this.trade.deadline);
        this.showToast(str + " 后才能发起申诉");
        this.initData();
      }
    },
    go_play() {
      if (
        this.trade.status == "TAKEN" ||
        this.trade.status == "PAID" ||
        this.trade.status == "PB_DISPUTED" ||
        this.trade.status == "PS_DISPUTED"
      ) {
        if (window.plus == undefined) return;
        if (this.isAndroid_ios()) this.isPayTipDialog = true;
      } else if (this.trade.status == "OVERTIME") {
        this.showToast("订单已经超时取消！请重新下单。");
      } else {
        this.showToast("订单支付已过期。");
      }
    },
    go_aliplay() {
      this.isPayTipDialog = false;
      // this.showToast("正在启动支付宝，请稍后...")
      pluginShowArrayArgu();
    },
    getformatDate1(time) {
      let date = new Date(parseInt(time));
      return formatDate(date, "hh:mm");
    },
    goBack() {
      clearTimeout(this.date_t);
      this.$router.go(-1);
    },
    number_format(num) {
      return lib.toFixed(num, 3);
    },
    update_date: function() {
      let m = moment(this.trade.deadline);
      let letf_msecond = parseInt(m.unix() - m.current());
      if (letf_msecond > 0) {
        this.date = m.toDate(letf_msecond);
        if (this.trade.status == "PENDING") {
          this.title_content =
            this.$t("Order.PENDING") +
            "（" +
            this.$t("Order.LeftTime") +
            " " +
            this.date +
            "）";
        } else {
          // this.title_content = this.$t("Order.LeftTime") + " " + this.date;
          this.title_content = this.$t("Text.BUY_TAKEN") + this.date;
        }
        this.date_t = setTimeout(() => {
          this.update_date();
        }, 1000);
      } else {
        this.initData();
        //window.location.reload()
      }
    },
    update_trade: function() {
      this.trade_t = setInterval(() => {
        this.load_trade();
      }, 10000);
    },
    initData: function() {
      this.date_t = setTimeout(() => {
        this.load_trade();
      }, 1000);
    },
    feadback() {
      this.isDisputedFkTipDialog = false;

      let params = {
        comment: this.fkyj,
        tid: this.trade.id
      };

      order
        .USER_OTC_dispute_buyer_comment(params)
        .then(result => {
          if (result.code == 0) {
            this.showToast(this.$t("Text.sscg"));
          } else {
            this.showToast(result.message);
          }
        })
        .catch(function() {});
    },

    load_trade: function() {
      let params = {
        symbol: this.trade.symbol.toLowerCase(),
        tid: this.trade.id
      };

      order
        .USER_otc_get_trade(params)
        .then(result => {
          let trade = result.data.trade;
          this.buyer_addresses = result.data.buyer_addresses;
          this.process_trade(trade);
          this.disputeJSON = result.data.dispute;
          if (this.disputeJSON != null) {
            this.isDispute = true;
            this.buyer_comment = this.disputeJSON.buyer_comment;
            this.buyer_updated = this.disputeJSON.buyer_updated;
            this.ob_comment = this.disputeJSON.ob_comment;
            this.ob_updated = this.disputeJSON.ob_updated;
            this.seller_content = this.disputeJSON.seller_content;
            this.seller_updated = this.disputeJSON.seller_updated;
            this.alipay_payment_code_url_value = this.disputeJSON.pic1;
            this.alipay_payment_code_url_value1 = this.disputeJSON.pic2;
            this.alipay_payment_code_url_value2 = this.disputeJSON.pic3;
          }
        })
        .catch(e => {
          HttpResultCode.validate(e.code);
        });
    },
    process_trade: function(trade) {
      // if (trade.alipay_on) {
      //   this.alipay_on = true;
      // }
      // if (trade.wechat_pay_on) {
      //   this.wechat_pay_on = true;
      // }
      // if (trade.bankcard_on) {
      //   this.bankcard_on = true;
      // }
      if (this.trade.status == "PENDING" || trade.status == "TAKEN") {
        clearTimeout(this.date_t);
        this.trade = trade;
        this.update_date();
      } else {
        this.trade = trade;
        clearTimeout(this.date_t);
        if (trade.status == "PAID") {
          if (trade.deadline > new Date().getTime()) {
            this.isDealTime = false;
          } else {
            this.isDealTime = true;
          }
        }
        if (trade.status == "PS_DISPUTED" || trade.status == "PB_DISPUTED") {
          this.title_content = this.$t("Text.ssztip");
        } else {
          // this.title_content = this.$t("Order." + trade.status);
          if (trade.status === "TAKEN") {
            this.title_content = this.$t("Text.BUY_TAKEN");
          }
          if (trade.status === "PAID") {
            this.title_content = this.$t("Text.BUY_PAID");
          }
          if (trade.status === "RELEASED") {
            this.title_content = this.$t("Text.BUY_RELEASED");
          }

          if (
            trade.status === "OVERTIME" ||
            trade.status === "TB_CANCELLED" ||
            trade.status === "PB_CANCELLED"
          ) {
            this.title_content = this.$t("Text.BUY_CANCEL");
          }
        }
        if (
          this.trade.status == "NOT_TAKEN" ||
          this.trade.status == "BUYER_WON" ||
          this.trade.status == "SELLER_WON" ||
          this.trade.status == "TB_CANCELLED" ||
          this.trade.status == "OVERTIME" ||
          this.trade.status == "PB_CANCELLED" ||
          this.trade.status == "RELEASED"
        ) {
          //订单结束，去掉定时器
          clearInterval(this.trade_t);
        }
      }
    },
    // cancelOrder() {
    //   this.isCancelOrderDialog = false;
    //   order
    //     .cancel(this.trade.id, this.trade.crypto_currency)
    //     .then(result => {
    //       let code = parseInt(result.code);
    //       if (code === 0) {
    //         // this.showToast('订单取消成功')
    //         this.initData();
    //       }
    //     })
    //     .then(() => {
    //       this.initData();
    //     });
    // },
    // paid() {
    //   this.isPaidDialog = false;
    //   order
    //     .paid(this.trade.id, this.trade.crypto_currency)
    //     .then(result => {
    //       let code = parseInt(result.code);
    //       if (code === 0) {
    //         // this.showToast('标记已付款成功')
    //         this.initData();
    //       }
    //     })
    //     .then(() => {
    //       this.initData();
    //     });
    // },
    // disputed() {
    //   this.isDisputedDialog = false;
    //   order
    //     .dispute(this.trade.id, this.trade.crypto_currency)
    //     .then(result => {
    //       let code = parseInt(result.code);
    //       if (code === 0) {
    //         this.showToast(this.$t("Order.AppealHint"));
    //         this.initData();
    //       }
    //     })
    //     .then(e => {
    //       this.initData();
    //     });
    // },

    process_trade: function(trade) {
      // if (trade.alipay_on) {
      //   this.alipay_on = true;
      // }
      // if (trade.wechat_pay_on) {
      //   this.wechat_pay_on = true;
      // }
      // if (trade.bankcard_on) {
      //   this.bankcard_on = true;
      // }
      if (this.trade.status == "PENDING" || trade.status == "TAKEN") {
        clearTimeout(this.date_t);
        this.trade = trade;
        this.update_date();
      } else {
        this.trade = trade;
        clearTimeout(this.date_t);
        if (trade.status == "PAID") {
          if (trade.deadline > new Date().getTime()) {
            this.isDealTime = false;
          } else {
            this.isDealTime = true;
          }
        }
        if (trade.status == "PS_DISPUTED" || trade.status == "PB_DISPUTED") {
          this.title_content = this.$t("Text.ssztip");
        } else {
          this.title_content = this.$t("Order." + trade.status);
          if (trade.status === "TAKEN") {
            this.title_content = this.$t("Text.BUY_TAKEN");
          }
          if (trade.status === "PAID") {
            this.title_content = this.$t("Text.BUY_PAID");
          }
          if (trade.status === "RELEASED") {
            this.title_content = this.$t("Text.BUY_RELEASED");
          }

          if (
            trade.status === "OVERTIME" ||
            trade.status === "TB_CANCELLED" ||
            trade.status === "PB_CANCELLED"
          ) {
            this.title_content = this.$t("Text.BUY_CANCEL");
          }
        }
        if (
          this.trade.status == "NOT_TAKEN" ||
          this.trade.status == "BUYER_WON" ||
          this.trade.status == "SELLER_WON" ||
          this.trade.status == "TB_CANCELLED" ||
          this.trade.status == "OVERTIME" ||
          this.trade.status == "PB_CANCELLED" ||
          this.trade.status == "RELEASED"
        ) {
          //订单结束，去掉定时器

          if (this.trade_t != null) clearInterval(this.trade_t);
        }
      }
    },
    release: function() {
      if (this.passwordValue.length == 0) {
        this.pwd_error = this.$t("Text.passwordHint");
        return false;
      } //this.id, this.crypto_currency, this.passwordValue
      this.isPasswordDialog = false;
      var params = {
        symbol: this.crypto_currency.toLowerCase(),
        password: this.passwordValue,
        tid: this.trade.id
      };
      order
        .release(params)
        .then(result => {
          this.passwordValue = "";
          let code = parseInt(result.code);
          if (code === 0) {
            this.showToast(this.$t("Text.succedd"));
            if (this.trade_t != null) clearInterval(this.trade_t);
            this.initData();
          }
        })
        .catch(e => {
          this.passwordValue = "";
          this.showToast(e.message);
          this.initData();
        });
    },
    disputed() {
      this.isDisputedDialog = false;
      this.isDisputedTipDialog = false;
      var params = {
        symbol: this.crypto_currency.toLowerCase(),
        tid: this.trade.id
      };
      order
        .dispute(params)
        .then(result => {
          let code = parseInt(result.code);
          if (code === 0) {
            this.showToast(this.$t("Text.ssztip"));
            this.initData();
          }
        })
        .then(e => {
          this.showToast(e.message);
          this.initData();
        });
    },
    success: function(e) {
      this.showToast(this.$t("Invite.CopySuccessContent"));
    },
    error: function(e) {
      this.showToast(this.$t("Invite.CopyErrorContent"));
    }
  },
  beforeDestroy: function() {
    clearInterval(this.trade_t);
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss"  scoped>
@import "../assets/css/order_buy.scss";
</style>
