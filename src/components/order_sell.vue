<template>
  <div class="content-order-sell">
    <div>
      <div class="top">
        <div class="center">{{$t('Trade.Sell.Title1')}} {{crypto_currency|titleDeal}}</div>
        <div class="left" @click="goBack"></div>
        <div class="right" @click="disputedTipShowDialog1" v-show="trade.status=='PAID'&& isDealTime" >{{$t('Text.ss')}}</div>
        <div class="right" @click="disputedTipShowDialog2" v-show="((trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED')&&!this.isDispute)">{{$t('Text.ss')}}</div>
        <div class="right" @click="disputedTipShowDialog" v-show="((trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED')&&this.isDispute)">{{$t('Text.ss')}}</div>
      </div>
      <!-- <button  @click="disputedTipShowDialog" class="buy-order-item-bottom-disputed" v-show="(trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED')&&this.isDispute" >{{$t('Text.gxss')}}</button>
      <button  @click="disputedTipShowDialog" class="buy-order-item-bottom-disputed" v-show="(trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED')&&!this.isDispute" >{{$t('Text.tjss')}}</button>-->

      <div class="card">
        <div class="order-status-bg" style="margin: 0  auto 0 auto;"></div>
        <div class="status-text fs-18">{{title_content}}</div>
        <div class="info fs-14">{{$t('Text.mjyfhhtip')}}</div>
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
                v-show="trade.status=='TAKEN'||trade.status=='TB_CANCELLED'||trade.status=='OVERTIME'||trade.status=='PAID'||trade.status=='PB_CANCELLED'||trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED'"
              >{{$t('Text.mjqrsb')}}</div>
              <div
                style="color:#005EE4;font-size:0.8em;margin-top:0.333em"
                v-show="trade.status=='BUYER_WON'||trade.status=='SELLER_WON'||trade.status=='RELEASED'"
              >{{$t('Text.mjqrsb')}}</div>
            </div>
          </div>
        </div>

        <!-- <div style="width: 80%; margin: 0em auto 1em auto;display:flex;padding-bottom:1em;">
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
 
              <div style="color:#6D778B;font-size:1em;margin-top:0.2em"  v-show="trade.status=='TAKEN'||trade.status=='TB_CANCELLED'||trade.status=='OVERTIME'||trade.status=='PAID'||trade.status=='PB_CANCELLED'||trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED'"  >
                  {{$t('Text.mjqrsb')}}
                </div>
              <div style="color:#1BF2BA;font-size:1em;margin-top:0.2em"  v-show="trade.status=='BUYER_WON'||trade.status=='SELLER_WON'||trade.status=='RELEASED'">
                  {{$t('Text.mjqrsb')}}
                </div>
           </div> 
        </div>-->
      </div>

      <div style="width: 100%;height: 0.666em;background-color: #f4f4f4;"></div>
      <!--买家信息-->

      <!-- <div  class="order-detail-bg"> -->
      <div
        class="card buyer-detail"
        style="
        text-align: left;"
      >
        <div
          style="display: flex;flex-flow: row nowrap;justify-content: space-between;
    align-items: center;"
        >
          <div style="font-size:1em;color:#6D778B">{{$t('Text.mjxx')}}</div>
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
            >{{trade.is_buy?trade.seller_name :trade.buyer_name }}</span>
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

        <!-- <p  style="color:#6D778B;font-size:1em">{{$t('Text.ljcj')}}&nbsp;<span style="float:right">{{trade.buyer_trade_total_usdt + " "}}{{crypto_currency | pricechange1}}</span></p> -->
        <p style="color:#6D778B;font-size:1em">
          {{$t('Text.ljcjds')}}&nbsp;
          <span
            style="float:right"
          >{{trade.buyer_trade_success_count + " "}} | {{trade.buyer_trade_success_ratio + " %"}}</span>
        </p>

        <!-- <div style="display:flex">
      <div style="width:2em;height:2em;border-radius: 4em;background:#212B67;margin-left:-2em; "></div>  
      <div style="width:100%;height:2px;border-top:1px dashed #212B67;margin-top:1em;"></div>
       <div style="width:2em;height:2em;border-radius: 4em;background:#212B67;margin-right:-2em; "></div>  
      
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
        <p  style="color:#6D778B;font-size:1em"><span  v-html="$t('Order.OrderAmount')"></span> &nbsp;<span style="float:right">{{trade.amount}}&nbsp;{{crypto_currency | pricechange1}}</span></p>-->

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
            {{trade.seller_fee}}&nbsp;
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
          >{{ (parseFloat(trade.amount) - parseFloat(trade.seller_fee)).toFixed(2)}}&nbsp;{{crypto_currency | pricechange1}}</span>
        </p>

        <!-- <p style="color:#6D778B;font-size:1em">
          <span v-html="$t('Text.skdz')"></span>&nbsp;
        </p>

        <div style="display:flex">
          <div style="font-size:1em;color:#3180D0;line-height:3;background:#E9EEF3;flex:1">
            <div
              style="padding-left:0.4em;padding-right:0.2em;flex:1"
              v-clipboard:copy="buyer_addresses[0]"
              v-clipboard:success="success"
              v-clipboard:error="error"
            >{{buyer_addresses[0]|getAddress}}</div>
          </div>
          <div
            v-clipboard:copy="buyer_addresses[0]"
            v-clipboard:success="success"
            v-clipboard:error="error"
            style="font-size:1em;color:#FFFFFF;line-height:3;background:#3180D0;padding-left:0.4em;padding-right:0.4em;margin-left:0.2em;"
          >{{$t('Text.copy')}}</div>
        </div>

        <p style="color:#6D778B;font-size:1em">
          <span v-html="$t('Text.xzf')"></span>&nbsp;
        </p>

        <div style="display:flex">
          <div style="font-size:1em;color:#FFA100;line-height:3;background:#E9EEF3;flex:1">
            <div
              style="padding-left:0.4em;padding-right:0.2em;"
              v-clipboard:copy="trade.qty"
              v-clipboard:success="success"
              v-clipboard:error="error"
            >{{trade.qty}}&nbsp;{{crypto_currency | pricechange2}}</div>
          </div>
          <div
            v-clipboard:copy="trade.qty"
            v-clipboard:success="success"
            v-clipboard:error="error"
            style="font-size:1em;color:#FFFFFF;line-height:3;background:#3180D0;padding-left:0.4em;padding-right:0.4em;margin-left:0.2em;"
          >{{$t('Text.copy')}}</div>
        </div>-->

        <!-- <p  style="color:#6D778B;font-size:1em"><span  v-html="$t('Text.xf')"></span>&nbsp;</p>

 <p  style="color:#212B67;font-size:1.8em;text-align: center;margin-top:1em;">

   {{trade.amount}}&nbsp;{{crypto_currency | pricechange1}}
        </p>-->
      </div>
      <div style="width: 100%;height: 0.666em;background-color: #f4f4f4;"></div>

      <!-- 收款地址 -->
      <div class="card buyer-detail"  style="text-align: left;">
        <p style="color:#6D778B;font-size:1em"><span v-html="$t('Text.skdz')"></span>&nbsp;</p>
        <div style="display:flex;height: 2.9333em;line-height: 2.9333em;">
          <div style="font-size:0.9333em;color:#005EE4;background:#E9EEF3;flex:1">
            <div style="padding-left:0.4em;padding-right:0.2em;flex:1" v-clipboard:copy="buyer_addresses[0]" v-clipboard:success="success" v-clipboard:error="error">{{buyer_addresses[0]|getAddress}}</div>
          </div>
          <div v-clipboard:copy="buyer_addresses[0]" v-clipboard:success="success" v-clipboard:error="error"
            style="width: 3.8em;text-align:center;font-size:1em;color:#FFFFFF;line-height:3;background:#005EE4;padding-left:0.4em;padding-right:0.4em;margin-left:0.2em;">
          	{{$t('Text.copy')}}
      		</div>
        </div>
        <p v-if="crypto_currency == 'SBO_USDT'" style="color:#6D778B;font-size:1em"><span v-html="$t('Text.xzf')"></span>&nbsp;<span v-html="$t('Text.xzfsm')"></span></p>
        <p v-if="crypto_currency == 'WT_USDT'" style="color:#6D778B;font-size:1em">{{$t('Text.xzf')}} (<span v-html="$t('Text.wtXzf') +  trade.qty  +' WT'"></span> )&nbsp;</p>
        <!--请确保买家收到100WT（Make sure the buyer will receives 100WT）-->
        <div style="display:flex;height: 2.9333em;line-height: 2.9333em;">
          <div style="font-size:1em;color:#005EE4;background:#E9EEF3;flex:1">
            <div style="padding-left:0.4em;padding-right:0.2em;font-size: 1.333em;" v-clipboard:copy="trade.qty + (crypto_currency == 'WT_USDT' ? 0 : 2)" v-clipboard:success="successNum" v-clipboard:error="error">{{trade.qty + (crypto_currency == 'WT_USDT' ? 0 : 2)}}&nbsp;{{crypto_currency | pricechange2}}</div>
          </div>
          <div v-clipboard:copy="trade.qty + (crypto_currency == 'WT_USDT' ? 0 : 2)" v-clipboard:success="successNum" v-clipboard:error="error" style="width: 3.8em;text-align:center;font-size:1em;color:#FFFFFF;line-height:3;background:#005EE4;padding-left:0.4em;padding-right:0.4em;margin-left:0.2em;">{{$t('Text.copy')}}</div>
        </div>
      </div>
      <!--申诉中-->
      <div
        class="card buyer-detail"
        style="
        margin: 0.666em auto 0.666em auto;
        text-align: left;"
        v-show="isDispute"
      >
        <div style="font-size:1em;color:#6D778B;font-weight:400;">{{$t('Text.disputeInfo')}}</div>
        <div style="background:rgba(245,247,250,1);padding: 0.666em;margin: 0.666em 0;">
          <div style="color:#6D778B;padding:0.5em  0;font-size:1em">{{seller_content}}</div>
          <!-- <div style="padding:0px;color:#6D778B;padding:0.5em  0;font-size:1em">
            {{$t('Text.sssj')+":"}}
            <span style="float:right">{{seller_updated|getformatDate}}</span>
          </div>-->
          <div class="pay-qr-zone">
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
          <div style="padding:0px;color:#6D778B;padding:0.5em  0;font-size:1em">
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
          style="font-size:1em;color:#6D778B;font-weight:400;"
          v-show="buyer_comment!=null&&buyer_comment!==''"
        >{{$t('Text.mjly')}}</div>
        <p
          style="color:#6D778B;font-size:1em;"
          v-show="buyer_comment!=null&&buyer_comment!==''"
        >{{buyer_comment}}</p>
        <p style="color:#6D778B;font-size:1em;" v-show="buyer_updated!=null&&buyer_updated!==''">
          {{$t('Text.sssj')+":"}}
          <span style="float:right">{{buyer_updated|getformatDate}}</span>
        </p>

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
          style="font-size:1em;color:#6D778B;font-weight:400;padding-top: 0.666em;"
          v-show="ob_comment!=null&&ob_comment!==''"
        >{{$t('Text.zcyj')}}</div>
        <div style="background:rgba(245,247,250,1);padding: 0.666em;margin: 0.666em 0;">
          <p
            style="color:#6D778B;font-size:1em;"
            v-show="ob_comment!=null&&ob_comment!==''"
          >{{ob_comment}}</p>
          <p style="color:#6D778B;font-size:1em;" v-show="ob_updated!=null&&ob_updated!==''">
            {{$t('Text.zcsjTime')+"："}}
            <span>{{ob_updated|getformatDate}}</span>
          </p>
        </div>
      </div>
      <div class="buy-order-item-bottom">
        <!-- <button
          @click="paidShowDialog"
          class="buy-order-item-bottom-main"
          v-show="trade.status=='TAKEN'"
        >{{$t('Order.PaidTitle')}}</button>-->
        <mu-raised-button v-show="trade.status=='TAKEN'" :label="$t('Order.PaidTitle')" @click="paidShowDialog" class="btn-sell" fullWidth primary />
        <!-- <button
          @click="cancelOrderShowDialog"
          class="buy-order-item-bottom-main"
          v-show="trade.status=='TAKEN'||trade.status=='PAID'||trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED'"
        >{{$t('Order.orderCancel')}}</button>-->
        <mu-raised-button v-show="trade.status=='TAKEN'||trade.status=='PAID'||trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED'" :label="$t('Order.orderCancel')" @click="cancelOrderShowDialog" class="btn-sell-cancel" primary fullWidth />
      </div>
      <!-- <button  @click="disputedShowDialog" v-show="trade.status=='PAID'" :class="{main:isDealTime,c1:!isDealTime}">{{$t('Order.complaint')}}</button> -->
      <!-- <button  @click="disputedTipShowDialog" class="buy-order-item-bottom-disputed" v-show="(trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED')&&this.isDispute" >{{$t('Text.gxss')}}</button>
      <button  @click="disputedTipShowDialog" class="buy-order-item-bottom-disputed" v-show="(trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED')&&!this.isDispute" >{{$t('Text.tjss')}}</button>-->

      <div style="with:100%;height:3em;"></div>
      <!--   
    <div class="sell-order-item-title">
      <p >{{$t('Order.OrderSell')}}&nbsp;<span>{{title_content}}</span></p>
    </div>
    <div class="sell-order-item-info">
    <div class="sell-order-item-info-content ">
          <div class="sell-order-item-info-content-head" >{{trade.is_buy?trade.seller_name :trade.buyer_name | namechange}}</div>
          <div v-show="trade.is_online" class="sell-order-item-info-content-online"  ></div>
           <div class="sell-order-item-info-content-center" >
              <h4>
                {{trade.is_buy?trade.seller_name :trade.buyer_name }}
              </h4>
      
              <p v-show="trade.is_buy">{{$t('Text.zcsj')}}<span class="left_space">&nbsp;{{trade.seller_created | getformatDate}} </span></p>
            <p v-show="!trade.is_buy">{{$t('Text.zcsj')}}<span class="left_space">&nbsp;{{trade.buyer_created | getformatDate}} </span></p>
          </div>
      </div>
 
        <div class="sell-order-item-title" style="padding:0px;border-top:1px solid #eee;border-bottom:0px;padding-top:0.4em;" >
          <p >{{$t('Text.ljcj')}}&nbsp;<span>{{trade.buyer_trade_total_usdt + " "}}{{crypto_currency | pricechange1}}</span></p>
        </div>
      </div>
    <div class="sell-order-item-info">
      <div class="sell-order-item-info-content-order">
        <p><span v-html="$t('Order.OrderId1')" v-clipboard:copy="disp_last_id"
              v-clipboard:success="success"></span><span class="left-span blue-span" v-clipboard:copy="disp_last_id"
              v-clipboard:success="success"><span style="color:#ccc;">{{trade.disp_id|getFrontDisId}}</span>{{trade.disp_id|getLastDisId}}</span>&nbsp;</p>
        <p>{{$t('Order.OrderAmount')}}<span class="left-span red-span">{{trade.amount}}&nbsp;<span >{{crypto_currency | pricechange1}}</span></span></p>
        <p><span v-html="$t('Order.TradePrice')" ></span><span class="left-span  red-span">{{trade.price}}&nbsp;<span >{{crypto_currency | pricechange1}}</span></span></p>
        <p><span v-html="$t('Order.TradeQty')" ></span><span class="left-span">{{trade.qty}}&nbsp;<span >{{crypto_currency | pricechange2}}</span></span></p>
        <p v-show="trade.status !== 'RELEASED'" ><span v-html="$t('Order.TradeFee')"  ></span><span class="left-span">{{trade.seller_fee}}&nbsp;<span >{{crypto_currency | pricechange1}}</span></span></p>
        <p class="no-border"><span v-html="$t('Order.TradeTime')" ></span><span class="left-span gray-span">{{trade.created | getformatDate}}</span></p>
      </div>
    </div>

    <p class="title_pay">{{$t('Text.mfsbdz')}}</p>
  <div  class="share_btn_zone" >
            <div class="share_btn bottom_border" >
      
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
        <p v-html="$t('Order.OrderTip4')">
       </p>
       <p class="hint-titile"><mu-icon class="hint_ico" value="report_problem" color="#f25c49" :size="1.5"/>{{$t('Order.tradeIssue')}}</p>
       <p v-html="$t('Order.OrderTip5')">
       </p>
      </div>-->

      <!-- <div class="buy-order-item-bottom" v-show="trade.status=='TAKEN'||trade.status=='PAID'||trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED'">
     <button  @click="paidShowDialog" class="buy-order-item-bottom-main" v-show="trade.status=='TAKEN'" >{{$t('Order.PaidTitle')}}</button>
     <button  @click="cancelOrderShowDialog"  class="buy-order-item-bottom-cancel" v-show="trade.status=='TAKEN'||trade.status=='PAID'||trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED'"  >{{$t('Order.orderCancel')}}</button> 
     <button  @click="disputedShowDialog" v-show="trade.status=='PAID'" :class="{main:isDealTime,c1:!isDealTime}">{{$t('Order.complaint')}}</button>
     <button  @click="disputedTipShowDialog" class="buy-order-item-bottom-disputed" v-show="(trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED')&&this.isDispute" >{{$t('Text.gxss')}}</button>
     <button  @click="disputedTipShowDialog" class="buy-order-item-bottom-disputed" v-show="(trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED')&&!this.isDispute" >{{$t('Text.tjss')}}</button>
      </div>-->

      <!-- <mu-dialog :open="isCancelOrderDialog" :title="$t('Order.WarmPrompt')">
        <div v-html="$t('Order.OrderTip3')"></div>

        <mu-raised-button slot="actions" @click="closeDialog" :label="$t('Order.Colse')" />
        <mu-raised-button
          slot="actions"
          primary
          @click="cancelOrder"
          :label="$t('Order.orderCancel')"
        />
      </mu-dialog>-->
      <div
        style="  width: 100%;
        height: 100%;
        position: fixed;
        top: 0px;z-index:999;"
        class="reset-dialog"
        v-show="isCancelOrderDialog"
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
            v-html="$t('Order.OrderTip3')"
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
              :label="$t('Order.orderCancel')"
              @click="cancelOrder"
              class="btn-toast-submit"
              style="margin-top:1em;"
              fullWidth
              primary
            />
          </div>
        </div>
      </div>

      <!-- <mu-dialog :open="isPaidDialog" :title="$t('Order.WarmPrompt')">
        <div v-html="$t('Order.PaidContent')"></div>

        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')" />
        <mu-flat-button slot="actions" primary @click="paid" :label="$t('Order.PaidTitle')" />
      </mu-dialog>-->

      <div
        style="  width: 100%;height: 100%;position: fixed;top: 0px;z-index:999;" class="reset-dialog" v-show="isPaidDialog">
        <div style="margin: 35% auto 0 auto;background: #ffffff;border-radius: 0.3em;" class="reset-dialog-wrap">
          <div class="fs-18" style="padding-top:2.1333em;color: #2E3546;font-weight: 500;" >{{$t('Order.WarmPrompt')}}</div>
          <div style="color: #4E586E;padding: 0 1em;margin: 2em 0;" class="fs-15" v-html="$t('Order.PaidContent')"></div>
          <div style="display: flex;flex-flow: row nowrap;justify-content: space-between;width: 95%;margin: auto;">
            <mu-raised-button :label="$t('Order.Colse')" @click="closeDialog" class="btn-toast-cancel" style="margin-top:1em;" fullWidth primary/>
            <mu-raised-button :label="$t('Order.PaidTitle')" @click="paid" class="btn-toast-submit" style="margin-top:1em;" fullWidth primary/>
          </div>
        </div>
      </div>

      <!-- <mu-dialog :open="isDisputedTipDialog" :title="$t('Order.WarmPrompt')">
        {{$t('Text.mjsstis2')}}
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')" />
        <mu-flat-button slot="actions" primary @click="goDisputed" :label="$t('Text.disputeBtn')" />
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
            v-text="$t('Text.mjsstis2')"
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
              :label="$t('Text.disputeBtn')"
              @click="goDisputed"
              class="btn-toast-submit"
              style="margin-top:1em;"
              fullWidth
              primary
            />
          </div>
        </div>
      </div>

      <!-- <mu-dialog :open="isDisputedTipDialog1" :title="$t('Order.WarmPrompt')">
        <div v-show="!isDealTime">{{trade.deadline|getformatDate}} {{$t('Text.mjssztip2')}}</div>
        <div v-show="isDealTime">{{$t('Text.mjsstis2')}}</div>
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')" />
        <mu-flat-button
          slot="actions"
          primary
          @click="goDisputed1"
          v-show="isDealTime"
          :label="$t('Text.disputeBtn')"
        />
      </mu-dialog>-->

      <div
        style="  width: 100%;
        height: 100%;
        position: fixed;
        top: 0px;z-index:999;"
        class="reset-dialog"
        v-show="isDisputedTipDialog1"
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
            v-show="!isDealTime"
          >{{trade.deadline|getformatDate}} {{$t('Text.mjssztip2')}}</div>
          <div
            style="color: #4E586E;padding: 0 1em;margin: 2em 0;"
            class="fs-15"
            v-show="isDealTime"
          >{{$t('Text.mjsstis2')}}</div>
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
              :label="$t('Text.disputeBtn')"
              @click="goDisputed1"
              v-show="isDealTime"
              class="btn-toast-submit"
              style="margin-top:1em;"
              fullWidth
              primary
            />
          </div>
        </div>
      </div>

      <!-- <mu-dialog :open="isDisputedTipDialog2" :title="$t('Order.WarmPrompt')">
        {{$t('Text.mjsstis2')}}
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')" />
        <mu-flat-button slot="actions" primary @click="goDisputed" :label="$t('Text.disputeBtn')" />
      </mu-dialog>-->

      <div
        style="width: 100%;
        height: 100%;
        position: fixed;
        top: 0px;z-index:999;"
        class="reset-dialog"
        v-show="isDisputedTipDialog2"
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
          >{{$t('Text.mjsstis2')}}</div>
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
              :label="$t('Text.disputeBtn')"
              @click="goDisputed"
              class="btn-toast-submit"
              style="margin-top:1em;"
              fullWidth
              primary
            />
          </div>
        </div>
      </div>

      <!-- if (vm.trade.deadline > new Date().getTime()) {
                vm.isDealTime = false;
              } else {
                vm.isDealTime = true;
      }-->

      <!-- <mu-dialog :open="isDisputedDialog" :title="$t('Order.WarmPrompt')">
        {{$t('Text.mjsstis2')}}
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')" />
        <mu-flat-button slot="actions" primary @click="disputed" :label="$t('Order.complaint')" />
      </mu-dialog>-->

      <div
        style="width: 100%;
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
          >{{$t('Text.mjsstis2')}}</div>
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

      <!-- <mu-dialog :open="isPayTipDialog" :title="$t('Order.WECHAT_PAY_TYPE_TIP')"> -->
      <!-- <p -->
      <!-- style="width: 100%;text-align: left;margin: 0 0 ;font-size: 0.7em;color:#404040" -->
      <!-- >{{$t('Order.WECHAT_PAY_TYPE')}}</p> -->
      <!-- <p style="width: 100%;text-align: left;margin: 0 0 ;font-size: 0.7em;color:#404040"> -->
      <!-- 请立刻转账后，点击标记已付款 -->
      <!-- <span style="color:#ff4d2d">{{title_content}}</span> -->
      <!-- </p> -->
      <!-- <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')" /> -->
      <!-- <mu-flat-button slot="actions" primary @click="go_aliplay"  :label="$t('Order.goPay')"/>  -->
      <!-- </mu-dialog> -->

      <div
        style="width: 100%;
        height: 100%;
        position: fixed;
        top: 0px;z-index:999;"
        class="reset-dialog"
        v-show="isPayTipDialog"
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
          >{{$t('Order.WECHAT_PAY_TYPE_TIP')}}</div>
          <div style="color: #4E586E;padding: 0 1em;margin: 2em 0;" class="fs-15">
            <p>{{$t('Order.WECHAT_PAY_TYPE')}}</p>
            <p>
              <!-- 请立刻转账后，点击标记已付款 -->
              <span style="color:#ff4d2d">{{title_content}}</span>
            </p>
          </div>
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
            <!-- <mu-raised-button
              :label="$t('Order.goPay')"
              @click="go_aliplay"
              class="btn-toast-submit"
              style="margin-top:1em;"
              fullWidth
              primary
            />-->
          </div>
        </div>
      </div>

      <!-- TODO: 下面弹窗ui没换，支付宝相关的暂不涉及到 -->
      <mu-dialog :open="dialogAlipay" :title="$t('Text.dispute')" @close="closeDialog">
        <img style="width:100%" :src="alipay_payment_code_url_value_current" />

        <mu-flat-button slot="actions" primary @click="closeDialog" :label="$t('Text.sure')" />
      </mu-dialog>

      <!-- <mu-dialog :open="isReleaseDialog" :title="$t('Order.WarmPrompt')" > 
      <mu-checkbox label="我已经查实收到转账了" v-model="isPayed"/> 
      <div v-html="$t('Order.realseTip')"></div>        
      <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
      <mu-flat-button slot="actions" primary @click="releaseDialog" :label="$t('User.SetMenuAssertPwd')"/>
  </mu-dialog>

    <mu-dialog :open="isPasswordDialog" :title="$t('User.SetMenuAssertPwd')" @click="closeDialog">
      <div >
        <mu-text-field  v-model="passwordValue"  :label="$t('User.SetMenuAssertPwd')" class="input-zone" :hintText="$t('Wallet_Detail.pwd_validate_tip')"
         @focus="input_focus('pwd')"   type="password"  fullWidth :errorText="pwd_error" />
        <div style="text-align:right">
          <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
          <mu-flat-button slot="actions" primary @click="release" :label="$t('Order.realse')"/>
        </div>
      </div>
    </mu-dialog>
    <mu-dialog :open="isDisputedDialog" :title="$t('Order.WarmPrompt')" > 
      {{$t('Order.AppealHint')}}
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
        <mu-flat-button slot="actions" primary @click="disputed" :label="$t('Order.complaint')"/>
      </mu-dialog>-->
      
      <mu-dialog :open="isTipsPayment" :title="$t('Order.WarmPrompt')">
        <div v-html="$t('Order.tipsPayment')"></div>
        <mu-raised-button :label="$t('Order.tipsOk')" @click="sign" class="btn-toast-cancel" style="margin:2em 0 1em 0;background: #005EE4;" fullWidth primary/>
      </mu-dialog>
      
      <mu-dialog :open="isCopyWT_USDT" >
      	<div style="color: #000000;">{{$t('Text.wtTitle')}}</div>
      	<p style="color:#6D778B;font-size:14px">{{$t('Text.wtText')}}</p>
        <div style="display:flex;height: 2.9333em;line-height: 2.9333em;">
          <div style="font-size:1em;color:#005EE4;background:#E9EEF3;flex:1">
            <div style="padding-left:0.4em;padding-right:0.2em;font-size: 1.333em;" v-clipboard:copy="trade.qty + 5" v-clipboard:success="successNums" v-clipboard:error="error">{{trade.qty + 5}}&nbsp;{{crypto_currency | pricechange2}}</div>
          </div>
          <div v-clipboard:copy="trade.qty + 5" v-clipboard:success="successNums" v-clipboard:error="error" style="width: 3.8em;text-align:center;font-size:1em;color:#FFFFFF;line-height:3;background:#005EE4;padding-left:0.4em;padding-right:0.4em;margin-left:0.2em;">{{$t('Text.copy')}}</div>
        </div>
      	<p style="color:#6D778B;font-size:14px">{{$t('Text.wtTexts')}}</p>
        <div style="display:flex;height: 2.9333em;line-height: 2.9333em;">
          <div style="font-size:1em;color:#005EE4;background:#E9EEF3;flex:1">
            <div style="padding-left:0.4em;padding-right:0.2em;font-size: 1.333em;" v-clipboard:copy="trade.qty" v-clipboard:success="successNums" v-clipboard:error="error">{{trade.qty}}&nbsp;{{crypto_currency | pricechange2}}</div>
          </div>
          <div v-clipboard:copy="trade.qty" v-clipboard:success="successNums" v-clipboard:error="error" style="width: 3.8em;text-align:center;font-size:1em;color:#FFFFFF;line-height:3;background:#005EE4;padding-left:0.4em;padding-right:0.4em;margin-left:0.2em;">{{$t('Text.copy')}}</div>
        </div>
        <!--<div v-html="$t('Order.tipsPayment')"></div>
        <mu-raised-button :label="$t('Order.tipsOk')" @click="sign" class="btn-toast-cancel" style="margin:2em 0 1em 0;background: #005EE4;" fullWidth primary/>-->
      </mu-dialog>
      
      <mu-toast v-if="toast" :message="message" @close="hideToast" />
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
  name: "order_sell",
  components: {},
  data() {
    return {
    	isCopyWT_USDT:false,//wt复制时弹窗
    	isTipsPayment:false,//不足30分钟提示
      id: this.$route.params.id,
      crypto_currency: this.$route.params.symbol.toUpperCase(),
      title_content: "",
      trade: {},
      alipay_on: false,
      wechat_pay_on: false,
      bankcard_on: false,
      isDealTime: false,
      // isReleaseDialog: false,
      // isPasswordDialog: false,
      // isDisputedTipDialog: false,
      // isDisputedDialog: false,

      isCancelOrderDialog: false, //订单取消
      isPaidDialog: false,
      isDisputedTipDialog: false,
      isDisputedDialog: false,
      trade_t: null,
      toast: false,
      message: "",
      passwordValue: "",
      pwd_error: "",
      alipay_pay: "",
      wechat_pay: "",
      bank_pay: "",
      disp_last_id: "",
      isAlipayQrcode: false,
      isWechatQrcode: false,
      wechat_payment_code_url: "",
      wechat_payment_code_url_value: "",
      alipay_payment_code_url: "",
      alipay_payment_code_url_value: "",
      isPayTipDialog: false,
      buyer_addresses: [""],
      disputeJSON: null,
      alipay_payment_code_url_value: "",
      alipay_payment_code_url_value1: "",
      alipay_payment_code_url_value2: "",
      alipay_payment_code_url_value_current: "",
      dialogAlipay: false,
      buyer_comment: "",
      buyer_updated: "",
      ob_comment: "",
      ob_updated: "",
      seller_content: "",
      seller_updated: "",
      isDispute: false,
      isDisputedTipDialog1: false,
      isDisputedTipDialog2: false,
      index: 0,
      nameFirst: "",
      isPayed: false
    };
  },
	created:function(){
//		this.load_trade();
	},
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    // 参数初始化

    let id = to.params.id;
    let crypto_currency = to.params.symbol.toUpperCase();

    let params = {
      symbol: crypto_currency.toLowerCase(),
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

          var charas = trade.buyer_name.substring(0, 1).toUpperCase();
          var index1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charas);
          index = (index1 + 1) % 9;
        }
        if (buyer_addresses == null || buyer_addresses.length == 0) {
          buyer_addresses = [""];
        }

        next(vm => {
          vm.trade = trade;
          vm.index = index;
          vm.nameFirst = charas;
          vm.disputeJSON = dispute;
          vm.buyer_addresses = buyer_addresses;
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
          if (vm.trade.disp_id.length == 8)
            vm.disp_last_id = vm.trade.disp_id.substring(4, 8).toUpperCase();
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
              vm.title_content = vm.$t("Text.mjssztip");
            } else {
              vm.title_content = vm.$t("Order." + vm.trade.status);
              if (vm.trade.status === "TAKEN") {
                vm.title_content = vm.$t("Text.SELLER_TAKEN");
              }
              if (vm.trade.status === "PAID") {
                vm.title_content = vm.$t("Text.SELLER_PAID");
              }
              if (vm.trade.status === "RELEASED") {
                vm.title_content = vm.$t("Text.SELLER_RELEASED");
              }

              if (
                vm.trade.status === "OVERTIME" ||
                vm.trade.status === "TB_CANCELLED" ||
                vm.trade.status === "PB_CANCELLED"
              ) {
                vm.title_content = vm.$t("Text.SELLER_CANCEL");
              }
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
      if (time == null || time == "") return "";
      let date = new Date(parseInt(time));
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    getAddress(address) {
      if (address.length > 28) {
        return (
          address.substring(0, 8) +
          "******" +
          address.substring(address.length - 8, address.length)
        );
      } else {
        return address;
      }
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
      return dispId;
      // if (dispId.length > 4) return dispId.substring(0, 4).toUpperCase();
    },
    getLastDisId(dispId) {
      if (undefined == dispId) return "";
      return "";
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

  methods: {
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
    showToast(message) {
      this.toast = true;
      this.message = message;
      this.toastTimer = setTimeout(() => {
        this.toast = false;
      }, 2000);
    },
    goDisputed() {
      this.isDisputedTipDialog = false;
      this.$router.push({
        name: "dispute",
        params: {
          id: this.trade.id,
          symbol: this.trade.symbol
        }
      });
    },
    open(pay) {
      if (pay == "alipay") {
        this.wechat_pay = false;
        this.bank_pay = false;
        if (this.alipay_pay == true) {
          this.alipay_pay = false;
        } else {
          this.alipay_pay = true;
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
    closeDialog() {
      this.isCancelOrderDialog = false;
      this.isPaidDialog = false;
      this.isDisputedTipDialog = false;
      this.isDisputedDialog = false;
      this.isPayTipDialog = false;
      this.dialogAlipay = false;
      this.isDisputedTipDialog1 = false;
      this.isDisputedTipDialog2 = false;
    },
    cancelOrderShowDialog() {
      this.isCancelOrderDialog = true;
    },
    paidShowDialog() {
      this.isPaidDialog = true;
    },
    disputedTipShowDialog() {
      // this.isDisputedTipDialog = true;
      this.goDisputed();
    },
    disputedTipShowDialog1() {
      this.isDisputedTipDialog1 = true;
    },
    disputedTipShowDialog2() {
      this.isDisputedTipDialog2 = true;
    },
    disputedShowDialog() {
      if (this.isDealTime) {
        this.isDisputedDialog = true;
      } else {
        let str = this.getformatDate1(this.trade.deadline);
        this.showToast(str + this.$t("Order.AppealTime"));
        this.initData();
      }
    },

    // closeDialog() {
    //   this.isReleaseDialog = false;
    //   this.isDisputedTipDialog = false;
    //   this.isDisputedDialog = false;
    //   this.isPasswordDialog = false;
    // },
    // releaseShowDialog() {
    //   this.isReleaseDialog = true;
    //   this.isPayed = false;
    // },
    // releaseDialog() {
    //   if (!this.isPayed) {
    //     this.showToast("请确认我已收到款。");
    //     return;
    //   }
    //   this.passwordValue = "";
    //   this.isPasswordDialog = true;
    //   this.isReleaseDialog = false;
    //   this.isPayed = false;
    // },
    // disputedTipShowDialog() {
    //   this.isDisputedTipDialog = true;
    // },
    // disputedShowDialog() {
    //   if (this.isDealTime) {
    //     this.isDisputedDialog = true;
    //   } else {
    //     let str = this.getformatDate1(this.trade.deadline);
    //     this.showToast(str + " 后才能发起申诉");
    //     this.initData();
    //   }
    // },
    input_focus(selected) {
      if (selected == "pwd") {
        this.pwd_error = "";
      }
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
          this.title_content = this.$t("Text.SELLER_TAKEN") + this.date;
        }
        this.date_t = setTimeout(() => {
          this.update_date();
        }, 1000);
      } else {
        this.initData();
        //window.location.reload()
      }
    },
    initData: function() {
      this.date_t = setTimeout(() => {
        this.load_trade();
      }, 1000);
    },
    update_trade: function() {
      this.trade_t = setInterval(() => {
        this.load_trade();
      }, 10000);
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

          //  this.dialogAlipay = true;
          this.process_trade(trade);
        })
        .catch(e => {
          HttpResultCode.validate(e.code);
        });
    },

    cancelOrder() {
      this.isCancelOrderDialog = false;
      var params = {
        symbol: this.crypto_currency.toLowerCase(),
        tid: this.trade.id
      };
      order
        .cancel(params)
        .then(result => {
          let code = parseInt(result.code);
          if (code === 0) {
            // this.showToast('订单取消成功')
            this.initData();
          }
        })
        .then(() => {
          this.initData();
        });
    },
    paid() {
      this.isPaidDialog = false;
      var params = {
        symbol: this.crypto_currency.toLowerCase(),
        tid: this.trade.id
      };
      order
        .paid(params)
        .then(result => {
          let code = parseInt(result.code);
          if (code === 0) {
            // this.showToast('标记已付款成功')
            this.initData();
          }
        })
        .then(() => {
          this.initData();
        });
    },
    goDisputed1() {
      this.isDisputedDialog1 = false;
      this.isDisputedDialog2 = false;
      var params = {
        symbol: this.crypto_currency.toLowerCase(),
        tid: this.trade.id
      };
      order
        .dispute(params)
        .then(result => {
          let code = parseInt(result.code);
          if (code === 0) {
            // this.showToast(this.$t("Order.AppealHint"));
            this.initData();
            this.goDisputed();
          }
        })
        .then(e => {
          this.initData();
        });
    },
    disputed() {
      this.isDisputedDialog = false;
      var params = {
        symbol: this.crypto_currency.toLowerCase(),
        tid: this.trade.id
      };
      order
        .dispute(params)
        .then(result => {
          let code = parseInt(result.code);
          if (code === 0) {
            // this.showToast(this.$t("Order.AppealHint"));
            this.initData();
            this.goDisputed();
          }
        })
        .then(e => {
          this.initData();
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
          this.title_content = this.$t("Text.mjssztip");
        } else {
          this.title_content = this.$t("Order." + trade.status);
          if (trade.status === "TAKEN") {
            this.title_content = this.$t("Text.SELLER_TAKEN");
          }
          if (trade.status === "PAID") {
            this.title_content = this.$t("Text.SELLER_PAID");
          }
          if (trade.status === "RELEASED") {
            this.title_content = this.$t("Text.SELLER_RELEASED");
          }

          if (
            trade.status === "OVERTIME" ||
            trade.status === "TB_CANCELLED" ||
            trade.status === "PB_CANCELLED"
          ) {
            this.title_content = this.$t("Text.SELLER_CANCEL");
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
    // release: function() {
    //   if (this.passwordValue.length == 0) {
    //     this.pwd_error = "请输入交易密码";
    //     return false;
    //   }
    //   this.isPasswordDialog = false;
    //   order
    //     .release(this.id, this.crypto_currency, this.passwordValue)
    //     .then(result => {
    //       this.passwordValue = "";
    //       let code = parseInt(result.code);
    //       if (code === 0) {
    //         this.showToast("已放币");
    //         if (this.trade_t != null) clearInterval(this.trade_t);
    //         this.initData();
    //       }
    //     })
    //     .catch(e => {
    //       this.passwordValue = "";
    //       this.showToast(HttpResultCode.validate(e.code));
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
    //         this.showToast("申诉已提交,请联系客服！");
    //         this.initData();
    //       }
    //     })
    //     .then(e => {
    //       this.initData();
    //     });
    // },
    sign:function(){
    	this.paid();//标记已转币
    	setTimeout(()=>{
    		this.isTipsPayment = false;
    		this.showToast(this.$t("Invite.CopySuccessContent"));
    	},800)
    },
    successNums:function(){
    	this.showToast(this.$t("Invite.CopySuccessContent"));
    	this.isCopyWT_USDT = false;
    },
    successNum:function(){
    	if(this.crypto_currency == 'WT_USDT'){
    		this.isCopyWT_USDT = true;
    	}else{
    		this.showToast(this.$t("Invite.CopySuccessContent"));
    	}
    },
    success: function(e) {
    	let timeList = this.date.split(':');
    	if(timeList.length == 2){
				let outTimesMinute = parseInt(this.date.split(':')[0]);//分钟
				if(outTimesMinute < 30){
					this.isTipsPayment = true;
				}else{
					this.showToast(this.$t("Invite.CopySuccessContent"));
				}
    	}else{
    		this.showToast(this.$t("Invite.CopySuccessContent"));
    	}
    },
    error: function(e) {
      this.showToast(this.$t("Invite.CopyErrorContent"));
    }
  },
  beforeDestroy: function() {
    if (this.trade_t != null) clearInterval(this.trade_t);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss"  scoped>
@import "../assets/css/order_sell.scss";
.mu-raised-button-primary {
    background-color: #005EE4;
}
</style>
