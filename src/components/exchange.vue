<template>
<div class="content-exchange">
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
<div class="top">
      
       <div  class="right"  @click="toggle">{{$t('Menu.'+currency_to_currency)}}</div>
          <mu-icon-menu class="icon-top"  @change="handleChange" :open="open" @open="handleOpen" @close="handleClose"  :value="currency_to_currency" icon="more_vert" >
           <mu-menu-item value="FFT_FFC" :title="$t('Menu.FFT_FFC')" />
            <mu-menu-item value="OSC_FFC" :title="$t('Menu.OSC_FFC')" />
             <mu-menu-item value="OSC_FFT" :title="$t('Menu.OSC_FFT')" />
              <mu-menu-item value="FFTS_FFC" :title="$t('Menu.FFTS_FFC')" />
               <mu-menu-item value="DNA_FFC" :title="$t('Menu.DNA_FFC')" />
             <mu-menu-item value="FFTS_FFT" :title="$t('Menu.FFTS_FFT')" />
             <mu-menu-item value="DNA_FFT" :title="$t('Menu.DNA_FFT')" />
             <mu-menu-item value="EGD_FFC" :title="$t('Menu.EGD_FFC')" />
             <mu-menu-item value="EGD_FFT" :title="$t('Menu.EGD_FFT')" />
            <mu-menu-item value="DGC_FFC" :title="$t('Menu.DGC_FFC')" />
            <mu-menu-item value="CBC_FFC" :title="$t('Menu.CBC_FFC')" />
            <mu-menu-item value="XDAG_FFC" :title="$t('Menu.XDAG_FFC')" />
            <mu-menu-item value="ETH_FFC" :title="$t('Menu.ETH_FFC')" />
          </mu-icon-menu>
          <div   class="img-arrow"></div>
 </div>
<div >
  <div class="tab">
        <button class="button" :class="{tab1:this.tab==='tab1'}" @click="mainChange('tab1')">购买</button>
        <button class="button" :class="{tab2:this.tab==='tab2'}" @click="mainChange('tab2')">出售</button>
  </div>
  <div class="exchange-zone">
  <div class="exchange-head-zone" v-show="currency_to_currency=='OSC_FFC'">余额：<span class="exchange-head-zone-span-left"> {{this.tab=='tab1'?FFC+' FFC':OSC+' OSC'}} </span> <span class="exchange-head-zone-span-right" @click="goWallet">充值 <i class="go"></i></span></div> 
  <div class="exchange-head-zone" v-show="currency_to_currency=='OSC_FFT'">余额：<span class="exchange-head-zone-span-left"> {{this.tab=='tab1'?FFT+' FFT':OSC+' OSC'}} </span> <span class="exchange-head-zone-span-right" @click="goWallet">充值 <i class="go"></i></span></div> 
  <div class="exchange-head-zone"  v-show="currency_to_currency=='EGD_FFC'">余额：<span class="exchange-head-zone-span-left"> {{this.tab=='tab1'?FFC+' FFC':EGD+' EGD'}} </span> <span class="exchange-head-zone-span-right" @click="goWallet">充值 <i class="go"></i></span></div> 
   <div class="exchange-head-zone"  v-show="currency_to_currency=='EGD_FFT'">余额：<span class="exchange-head-zone-span-left"> {{this.tab=='tab1'?FFT+' FFT':EGD+' EGD'}} </span> <span class="exchange-head-zone-span-right" @click="goWallet">充值 <i class="go"></i></span></div> 
   <div class="exchange-head-zone"  v-show="currency_to_currency=='FFTS_FFT'">余额：<span class="exchange-head-zone-span-left"> {{this.tab=='tab1'?FFT+' FFT':FFTS+' FFTS'}} </span> <span class="exchange-head-zone-span-right" @click="goWallet">充值 <i class="go"></i></span></div> 
    <div class="exchange-head-zone"  v-show="currency_to_currency=='DNA_FFT'">余额：<span class="exchange-head-zone-span-left"> {{this.tab=='tab1'?FFT+' FFT':DNA+' DNA'}} </span> <span class="exchange-head-zone-span-right" @click="goWallet">充值 <i class="go"></i></span></div> 
   <div class="exchange-head-zone"  v-show="currency_to_currency=='DGC_FFC'">余额：<span class="exchange-head-zone-span-left"> {{this.tab=='tab1'?FFC+' FFC':DGC+' DGC'}} </span> <span class="exchange-head-zone-span-right" @click="goWallet">充值 <i class="go"></i></span></div> 
    <div class="exchange-head-zone"  v-show="currency_to_currency=='DNA_FFC'">余额：<span class="exchange-head-zone-span-left"> {{this.tab=='tab1'?FFC+' FFC':DNA+' DNA'}} </span> <span class="exchange-head-zone-span-right" @click="goWallet">充值 <i class="go"></i></span></div> 
    <div class="exchange-head-zone"  v-show="currency_to_currency=='FFTS_FFC'">余额：<span class="exchange-head-zone-span-left"> {{this.tab=='tab1'?FFC+' FFC':FFTS+' FFTS'}} </span> <span class="exchange-head-zone-span-right" @click="goWallet">充值 <i class="go"></i></span></div> 
  <div class="exchange-head-zone"  v-show="currency_to_currency=='XDAG_FFC'">余额：<span class="exchange-head-zone-span-left"> {{this.tab=='tab1'?FFC+' FFC':XDAG+' XDAG'}} </span> <span class="exchange-head-zone-span-right" @click="goWallet">充值 <i class="go"></i></span></div> 
  <div class="exchange-head-zone"  v-show="currency_to_currency=='ETH_FFC'">余额：<span class="exchange-head-zone-span-left"> {{this.tab=='tab1'?FFC+' FFC':ETH+' ETH'}} </span> <span class="exchange-head-zone-span-right" @click="goWallet">充值 <i class="go"></i></span></div> 
  <div class="exchange-head-zone"  v-show="currency_to_currency=='FFT_FFC'">余额：<span class="exchange-head-zone-span-left"> {{this.tab=='tab1'?FFC+' FFC':FFT+' FFT'}} </span> <span class="exchange-head-zone-span-right"> </span></div> 
  <div class="exchange-head-zone"  v-show="currency_to_currency=='CBC_FFC'">余额：<span class="exchange-head-zone-span-left"> {{this.tab=='tab1'?FFC+' FFC':CBC+' CBC'}} </span> <span class="exchange-head-zone-span-right" @click="goWallet">充值 <i class="go"></i> </span></div> 
  <div class="exchange-diviler"></div>
   <div class="exchange-data-zone">
    <div class="exchange-table-zone">
      <div class="table-zoneleft">
        <!-- <div style="background: #ede7f6;"> -->
      
        <!-- <div style="background: #ede7f6;"> -->
        <table class="exchange-table">
          <tbody>
            <tr>
              <td class="ft-left"></td>
              <td class="td-green" style="color:#999">单价（{{ currency_to_currency|currency_f}})</td>
              <td class="td-gray" style="color:#999">数量（{{currency_to_currency|currency_l}})</td>
            </tr> 
            <tr  @click="select_sell(4)">
              <td class="ft-left" >卖5</td>
              <td class="td-red"  v-show="currency_to_currency!='ETH_FFC'&&(currency_to_currency=='OSC_FFT'||currency_to_currency=='EGD_FFT'||currency_to_currency=='DNA_FFT'||currency_to_currency=='FFTS_FFT'||currency_to_currency=='FFTS_FFC'||currency_to_currency=='DNA_FFC')">{{asks.length>=5?asks[4][0].toFixed(4):0}}</td>
              <td class="td-red"  v-show="currency_to_currency!='ETH_FFC'&&!(currency_to_currency=='OSC_FFT'||currency_to_currency=='EGD_FFT'||currency_to_currency=='DNA_FFT'||currency_to_currency=='FFTS_FFT'||currency_to_currency=='FFTS_FFC'||currency_to_currency=='DNA_FFC')">{{asks.length>=5?asks[4][0].toFixed(3):0}}</td>
              <td class="td-red"  v-show="currency_to_currency=='ETH_FFC'">{{asks.length>=5?asks[4][0].toFixed(2):0}}</td>
               <!-- <td class="td-red" v-show="currency_to_currency=='ETH_FFC'">{{asks.length>=5?asks[4][0].toFixed(4):0}}</td> -->
              <td class="td-gray"  v-show="currency_to_currency!='ETH_FFC'">{{asks.length>=5?asks[4][1]:0}}</td>
               <td class="td-gray"  v-show="currency_to_currency=='ETH_FFC'">{{asks.length>=5?asks[4][1].toFixed(4):0}}</td>
            </tr>
            <tr  @click="select_sell(3)">
              <td class="ft-left"  >卖4</td>
              <td class="td-red" v-show="currency_to_currency!='ETH_FFC'&&(currency_to_currency=='OSC_FFT'||currency_to_currency=='EGD_FFT'||currency_to_currency=='DNA_FFT'||currency_to_currency=='FFTS_FFT'||currency_to_currency=='FFTS_FFC'||currency_to_currency=='DNA_FFC')">{{asks.length>=4?asks[3][0].toFixed(4):0}}</td>
              <td class="td-red" v-show="currency_to_currency!='ETH_FFC'&&!(currency_to_currency=='OSC_FFT'||currency_to_currency=='EGD_FFT'||currency_to_currency=='DNA_FFT'||currency_to_currency=='FFTS_FFT'||currency_to_currency=='FFTS_FFC'||currency_to_currency=='DNA_FFC')">{{asks.length>=4?asks[3][0].toFixed(3):0}}</td>
              <td class="td-red"   v-show="currency_to_currency=='ETH_FFC'">{{asks.length>=4?asks[3][0].toFixed(2):0}}</td>
              <td class="td-gray"  v-show="currency_to_currency!='ETH_FFC'">{{asks.length>=4?asks[3][1]:0}}</td>
              <td class="td-gray"  v-show="currency_to_currency=='ETH_FFC'">{{asks.length>=4?asks[3][1].toFixed(4):0}}</td>
            </tr>
            <tr  @click="select_sell(2)">
              <td class="ft-left" >卖3</td>
              <td class="td-red"  v-show="currency_to_currency!='ETH_FFC'&&(currency_to_currency=='OSC_FFT'||currency_to_currency=='EGD_FFT'||currency_to_currency=='DNA_FFT'||currency_to_currency=='FFTS_FFT'||currency_to_currency=='FFTS_FFC'||currency_to_currency=='DNA_FFC')" >{{asks.length>=3?asks[2][0].toFixed(4):0}}</td>
              <td class="td-red"  v-show="currency_to_currency!='ETH_FFC'&&!(currency_to_currency=='OSC_FFT'||currency_to_currency=='EGD_FFT'||currency_to_currency=='DNA_FFT'||currency_to_currency=='FFTS_FFT'||currency_to_currency=='FFTS_FFC'||currency_to_currency=='DNA_FFC')" >{{asks.length>=3?asks[2][0].toFixed(3):0}}</td>
              <td class="td-red"  v-show="currency_to_currency=='ETH_FFC'" >{{asks.length>=3?asks[2][0].toFixed(2):0}}</td>
              <td class="td-gray" v-show="currency_to_currency!='ETH_FFC'">{{asks.length>=3?asks[2][1]:0}}</td>
              <td class="td-gray" v-show="currency_to_currency=='ETH_FFC'">{{asks.length>=3?asks[2][1].toFixed(4):0}}</td>
            </tr>
            
            <tr  @click="select_sell(1)">
              <td class="ft-left">卖2</td>
              <td class="td-red"   v-show="currency_to_currency!='ETH_FFC'&&(currency_to_currency=='OSC_FFT'||currency_to_currency=='EGD_FFT'||currency_to_currency=='DNA_FFT'||currency_to_currency=='FFTS_FFT'||currency_to_currency=='FFTS_FFC'||currency_to_currency=='DNA_FFC')">{{asks.length>=2?asks[1][0].toFixed(4):0}}</td>
              <td class="td-red"   v-show="currency_to_currency!='ETH_FFC'&&!(currency_to_currency=='OSC_FFT'||currency_to_currency=='EGD_FFT'||currency_to_currency=='DNA_FFT'||currency_to_currency=='FFTS_FFT'||currency_to_currency=='FFTS_FFC'||currency_to_currency=='DNA_FFC')">{{asks.length>=2?asks[1][0].toFixed(3):0}}</td>
              <td class="td-red"   v-show="currency_to_currency=='ETH_FFC'">{{asks.length>=2?asks[1][0].toFixed(2):0}}</td>
              <td class="td-gray" v-show="currency_to_currency!='ETH_FFC'">{{asks.length>=2?asks[1][1]:0}}</td>
              <td class="td-gray" v-show="currency_to_currency=='ETH_FFC'">{{asks.length>=2?asks[1][1].toFixed(4):0}}</td>
            </tr>
            <tr  @click="select_sell(0)">
              <td class="ft-left">卖1</td>
              <td class="td-red"  v-show="currency_to_currency!='ETH_FFC'&&(currency_to_currency=='OSC_FFT'||currency_to_currency=='EGD_FFT'||currency_to_currency=='DNA_FFT'||currency_to_currency=='FFTS_FFT'||currency_to_currency=='FFTS_FFC'||currency_to_currency=='DNA_FFC')">{{asks.length>=1?asks[0][0].toFixed(4):0}}</td>
              <td class="td-red"  v-show="currency_to_currency!='ETH_FFC'&&!(currency_to_currency=='OSC_FFT'||currency_to_currency=='EGD_FFT'||currency_to_currency=='DNA_FFT'||currency_to_currency=='FFTS_FFT'||currency_to_currency=='FFTS_FFC'||currency_to_currency=='DNA_FFC')">{{asks.length>=1?asks[0][0].toFixed(3):0}}</td>
              <td class="td-red"  v-show="currency_to_currency=='ETH_FFC'">{{asks.length>=1?asks[0][0].toFixed(2):0}}</td>
              <td class="td-gray"  v-show="currency_to_currency!='ETH_FFC'">{{asks.length>=1?asks[0][1]:0}}</td>
              <td class="td-gray"  v-show="currency_to_currency=='ETH_FFC'">{{asks.length>=1?asks[0][1].toFixed(4):0}}</td>
            </tr>
          </tbody>
        </table>
         <p class="p_green"  v-show="currency_to_currency=='OSC_FFC' && osc_last>=osc_open">{{osc_last}}&nbsp;&nbsp;+{{osc_last ,osc_open|osc_filters}}&nbsp;%</p>
         <p class="p_red"  v-show="currency_to_currency=='OSC_FFC' && osc_last<osc_open">{{osc_last}}&nbsp;&nbsp;{{osc_last ,osc_open|osc_filters}}&nbsp;%</p>

         <p class="p_green"  v-show="currency_to_currency=='OSC_FFT' && oscfft_last>=oscfft_open">{{oscfft_last}}&nbsp;&nbsp;+{{oscfft_last ,oscfft_open|oscfft_filters}}&nbsp;%</p>
         <p class="p_red"  v-show="currency_to_currency=='OSC_FFT' && oscfft_last<oscfft_open">{{oscfft_last}}&nbsp;&nbsp;{{oscfft_last ,oscfft_open|oscfft_filters}}&nbsp;%</p>

          <p class="p_green"  v-show="currency_to_currency=='EGD_FFC' && egd_last>=egd_open">{{egd_last}}&nbsp;&nbsp;+{{egd_last ,egd_open|egd_filters}}&nbsp;%</p>
         <p class="p_red"  v-show="currency_to_currency=='EGD_FFC' && egd_last<egd_open">{{egd_last}}&nbsp;&nbsp;{{egd_last ,egd_open|egd_filters}}&nbsp;%</p>

         <p class="p_green"  v-show="currency_to_currency=='EGD_FFT' && egdfft_last>=egdfft_open">{{egdfft_last}}&nbsp;&nbsp;+{{egdfft_last ,egdfft_open|egdfft_filters}}&nbsp;%</p>
         <p class="p_red"  v-show="currency_to_currency=='EGD_FFT' && egdfft_last<egdfft_open">{{egdfft_last}}&nbsp;&nbsp;{{egdfft_last ,egdfft_open|egdfft_filters}}&nbsp;%</p>



         <p class="p_green"  v-show="currency_to_currency=='DGC_FFC' && dgc_last>=dgc_open">{{dgc_last}}&nbsp;&nbsp;+{{dgc_last ,dgc_open|dgc_filters}}&nbsp;%</p>
         <p class="p_red"  v-show="currency_to_currency=='DGC_FFC' && dgc_last<dgc_open">{{dgc_last}}&nbsp;&nbsp;{{dgc_last ,dgc_open|dgc_filters}}&nbsp;%</p>

         <p class="p_green"  v-show="currency_to_currency=='XDAG_FFC' && xdag_last>=xdag_open">{{xdag_last}}&nbsp;&nbsp;+{{xdag_last ,xdag_open|xdag_filters}}&nbsp;%</p>
         <p class="p_red"  v-show="currency_to_currency=='XDAG_FFC' && xdag_last<xdag_open">{{xdag_last}}&nbsp;&nbsp;{{xdag_last ,xdag_open|xdag_filters}}&nbsp;%</p>
       
        <p class="p_green"  v-show="currency_to_currency=='CBC_FFC' && cbc_last>=cbc_open">{{cbc_last}}&nbsp;&nbsp;+{{cbc_last ,cbc_open|cbc_filters}}&nbsp;%</p>
         <p class="p_red"  v-show="currency_to_currency=='CBC_FFC' && cbc_last<cbc_open">{{cbc_last}}&nbsp;&nbsp;{{cbc_last ,cbc_open|cbc_filters}}&nbsp;%</p>


        <p class="p_green"  v-show="currency_to_currency=='FFT_FFC' && fft_last>=fft_open">{{fft_last}}&nbsp;&nbsp;+{{fft_last ,fft_open|fft_filters}}&nbsp;%</p>
         <p class="p_red"  v-show="currency_to_currency=='FFT_FFC' && fft_last<fft_open">{{fft_last}}&nbsp;&nbsp;{{fft_last ,fft_open|fft_filters}}&nbsp;%</p>

          <p class="p_green"  v-show="currency_to_currency=='ETH_FFC' && eth_last>=eth_open">{{eth_last}}&nbsp;&nbsp;+{{eth_last ,eth_open|eth_filters}}&nbsp;%</p>
         <p class="p_red"  v-show="currency_to_currency=='ETH_FFC' && eth_last<eth_open">{{eth_last}}&nbsp;&nbsp;{{eth_last ,eth_open|eth_filters}}&nbsp;%</p>
       
       <p class="p_green"  v-show="currency_to_currency=='FFTS_FFT' && fftsfft_last>=fftsfft_open">{{fftsfft_last}}&nbsp;&nbsp;+{{fftsfft_last ,fftsfft_open|fftsfft_filters}}&nbsp;%</p>
         <p class="p_red"  v-show="currency_to_currency=='FFTS_FFT' && fftsfft_last<fftsfft_open">{{fftsfft_last}}&nbsp;&nbsp;{{fftsfft_last ,fftsfft_open|fftsfft_filters}}&nbsp;%</p>

        <p class="p_green"  v-show="currency_to_currency=='DNA_FFT' && dnafft_last>=dnafft_open">{{dnafft_last}}&nbsp;&nbsp;+{{dnafft_last ,dnafft_open|dnafft_filters}}&nbsp;%</p>
         <p class="p_red"  v-show="currency_to_currency=='DNA_FFT' && dnafft_last<dnafft_open">{{dnafft_last}}&nbsp;&nbsp;{{dnafft_last ,dnafft_open|dnafft_filters}}&nbsp;%</p>

         <p class="p_green"  v-show="currency_to_currency=='FFTS_FFC' && ffts_last>=ffts_open">{{ffts_last}}&nbsp;&nbsp;+{{ffts_last ,ffts_open|ffts_filters}}&nbsp;%</p>
         <p class="p_red"  v-show="currency_to_currency=='FFTS_FFC' && ffts_last<ffts_open">{{ffts_last}}&nbsp;&nbsp;{{ffts_last ,ffts_open|ffts_filters}}&nbsp;%</p>


      <p class="p_green"  v-show="currency_to_currency=='DNA_FFC' && dna_last>=dna_open">{{dna_last}}&nbsp;&nbsp;+{{dna_last ,dna_open|dna_filters}}&nbsp;%</p>
         <p class="p_red"  v-show="currency_to_currency=='DNA_FFC' && dna_last<dna_open">{{dna_last}}&nbsp;&nbsp;{{dna_last ,dna_open|dna_filters}}&nbsp;%</p>

        <!-- </div> -->
        <div class="table-zoneright">
   
      <table class="exchange-table">
       <tbody>
           <tr  @click="select_buy(0)">
              <td class="ft-left" >买1</td>
              <td class="td-green" v-show="currency_to_currency!='ETH_FFC'&&(currency_to_currency=='OSC_FFT'||currency_to_currency=='EGD_FFT'||currency_to_currency=='DNA_FFT'||currency_to_currency=='FFTS_FFT'||currency_to_currency=='FFTS_FFC'||currency_to_currency=='DNA_FFC')" >{{bids.length>=1?bids[0][0].toFixed(4):0}}</td>
               <td class="td-green" v-show="currency_to_currency!='ETH_FFC'&&!(currency_to_currency=='OSC_FFT'||currency_to_currency=='EGD_FFT'||currency_to_currency=='DNA_FFT'||currency_to_currency=='FFTS_FFT'||currency_to_currency=='FFTS_FFC'||currency_to_currency=='DNA_FFC')">{{bids.length>=1?bids[0][0].toFixed(3):0}}</td>
              <td class="td-green" v-show="currency_to_currency=='ETH_FFC'">{{bids.length>=1?bids[0][0].toFixed(2):0}}</td>
              <td class="td-gray"  v-show="currency_to_currency!='ETH_FFC'">{{bids.length>=1?bids[0][1]:0}}</td>
               <td class="td-gray"  v-show="currency_to_currency=='ETH_FFC'">{{bids.length>=1?bids[0][1].toFixed(4):0}}</td>
            </tr>
            <tr  @click="select_buy(1)">
              <td class="ft-left" >买2</td>
              <td class="td-green" v-show="currency_to_currency!='ETH_FFC'&&(currency_to_currency=='OSC_FFT'||currency_to_currency=='EGD_FFT'||currency_to_currency=='DNA_FFT'||currency_to_currency=='FFTS_FFT'||currency_to_currency=='FFTS_FFC'||currency_to_currency=='DNA_FFC')">{{bids.length>=2?bids[1][0].toFixed(4):0}}</td>
              <td class="td-green" v-show="currency_to_currency!='ETH_FFC'&&!(currency_to_currency=='OSC_FFT'||currency_to_currency=='EGD_FFT'||currency_to_currency=='DNA_FFT'||currency_to_currency=='FFTS_FFT'||currency_to_currency=='FFTS_FFC'||currency_to_currency=='DNA_FFC')">{{bids.length>=2?bids[1][0].toFixed(3):0}}</td>
              <td class="td-green" v-show="currency_to_currency=='ETH_FFC'">{{bids.length>=2?bids[1][0].toFixed(2):0}}</td>
              <td class="td-gray"  v-show="currency_to_currency!='ETH_FFC'">{{bids.length>=2?bids[1][1]:0}}</td>
              <td class="td-gray"  v-show="currency_to_currency=='ETH_FFC'">{{bids.length>=2?bids[1][1].toFixed(4):0}}</td>
            </tr>
            
            <tr  @click="select_buy(2)">
              <td class="ft-left" >买3</td>
              <td class="td-green" v-show="currency_to_currency!='ETH_FFC'&&(currency_to_currency=='OSC_FFT'||currency_to_currency=='EGD_FFT'||currency_to_currency=='DNA_FFT'||currency_to_currency=='FFTS_FFT'||currency_to_currency=='FFTS_FFC'||currency_to_currency=='DNA_FFC')">{{bids.length>=3?bids[2][0].toFixed(4):0}}</td>
              <td class="td-green" v-show="currency_to_currency!='ETH_FFC'&&!(currency_to_currency=='OSC_FFT'||currency_to_currency=='EGD_FFT'||currency_to_currency=='DNA_FFT'||currency_to_currency=='FFTS_FFT'||currency_to_currency=='FFTS_FFC'||currency_to_currency=='DNA_FFC')">{{bids.length>=3?bids[2][0].toFixed(3):0}}</td>
               <td class="td-green" v-show="currency_to_currency=='ETH_FFC'" >{{bids.length>=3?bids[2][0].toFixed(2):0}}</td>
              <td class="td-gray"  v-show="currency_to_currency!='ETH_FFC'" >{{bids.length>=3?bids[2][1]:0}}</td>
              <td class="td-gray"  v-show="currency_to_currency=='ETH_FFC'" >{{bids.length>=3?bids[2][1].toFixed(4):0}}</td>
            </tr>
            <tr  @click="select_buy(3)">
              <td class="ft-left" >买4</td>
              <td class="td-green" v-show="currency_to_currency!='ETH_FFC'&&(currency_to_currency=='OSC_FFT'||currency_to_currency=='EGD_FFT'||currency_to_currency=='DNA_FFT'||currency_to_currency=='FFTS_FFT'||currency_to_currency=='FFTS_FFC'||currency_to_currency=='DNA_FFC')">{{bids.length>=4?bids[3][0].toFixed(4):0}}</td>
              <td class="td-green" v-show="currency_to_currency!='ETH_FFC'&&!(currency_to_currency=='OSC_FFT'||currency_to_currency=='EGD_FFT'||currency_to_currency=='DNA_FFT'||currency_to_currency=='FFTS_FFT'||currency_to_currency=='FFTS_FFC'||currency_to_currency=='DNA_FFC')">{{bids.length>=4?bids[3][0].toFixed(3):0}}</td>
             <td class="td-green" v-show="currency_to_currency=='ETH_FFC'">{{bids.length>=4?bids[3][0].toFixed(2):0}}</td>
              <td class="td-gray"  v-show="currency_to_currency!='ETH_FFC'" >{{bids.length>=4?bids[3][1]:0}}</td>
                <td class="td-gray"  v-show="currency_to_currency=='ETH_FFC'" >{{bids.length>=4?bids[3][1].toFixed(4):0}}</td>
            </tr>
            <tr  @click="select_buy(4)">
              <td class="ft-left" >买5</td>
              <td class="td-green" v-show="currency_to_currency!='ETH_FFC'&&(currency_to_currency=='OSC_FFT'||currency_to_currency=='EGD_FFT'||currency_to_currency=='DNA_FFT'||currency_to_currency=='FFTS_FFT'||currency_to_currency=='FFTS_FFC'||currency_to_currency=='DNA_FFC')" >{{bids.length>=5?bids[4][0].toFixed(4):0}}</td>
              <td class="td-green" v-show="currency_to_currency!='ETH_FFC'&&!(currency_to_currency=='OSC_FFT'||currency_to_currency=='EGD_FFT'||currency_to_currency=='DNA_FFT'||currency_to_currency=='FFTS_FFT'||currency_to_currency=='FFTS_FFC'||currency_to_currency=='DNA_FFC')" >{{bids.length>=5?bids[4][0].toFixed(3):0}}</td>
              <td class="td-green" v-show="currency_to_currency=='ETH_FFC'" >{{bids.length>=5?bids[4][0].toFixed(2):0}}</td>
              <td class="td-gray"  v-show="currency_to_currency!='ETH_FFC'">{{bids.length>=5?bids[4][1]:0}}</td>
               <td class="td-gray"  v-show="currency_to_currency=='ETH_FFC'">{{bids.length>=5?bids[4][1].toFixed(4):0}}</td>
            </tr>
          </tbody>
        </table>
           </div>
      <!--  -->
      </div>
    </div>
      <!-- buy 买入-->
      <div class="exchange-input-zone" v-show="tab=='tab1'">
        <div class="exchange-input-btn-zone">
          <button class="buy-left-btn"  :class="{disable:isBuyMarket}"    @click="buyTabChange(false)">限价买</button>
          <button class="buy-right-btn"  :class="{disable:!isBuyMarket}"    @click="buyTabChange(true)">市价买</button>
        </div>
          <input v-show="!isBuyMarket&&!(currency_to_currency=='EGD_FFT'||currency_to_currency=='OSC_FFT')"  class="exchange-input-buy" placeholder="价格（FFC）" v-model="buy_price"  type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   @input="change_buy_price($event)">
           <input v-show="!isBuyMarket&&(currency_to_currency=='EGD_FFT'||currency_to_currency=='OSC_FFT')"  class="exchange-input-buy" placeholder="价格（FFT）" v-model="buy_price"  type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   @input="change_buy_price($event)">
         <!--   <input v-show="!isBuyMarket"  class="exchange-input-buy" placeholder="价格（FFC）" v-model="buy_price"  type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   @input="change_buy_price($event)"> -->
          <input  v-show="!isBuyMarket&&currency_to_currency=='OSC_FFC'"  class="exchange-input-buy"  placeholder="数量（OSC）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="buy_qty"  @input="change_buy_qty($event)" >
          <input  v-show="!isBuyMarket&&currency_to_currency=='OSC_FFT'"  class="exchange-input-buy"  placeholder="数量（OSC）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="buy_qty"  @input="change_buy_qty($event)" >

          <input  v-show="!isBuyMarket&&currency_to_currency=='FFTS_FFC'"  class="exchange-input-buy"  placeholder="数量（FFTS）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="buy_qty"  @input="change_buy_qty($event)" >
          <input  v-show="!isBuyMarket&&currency_to_currency=='FFTS_FFT'"  class="exchange-input-buy"  placeholder="数量（FFTS）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="buy_qty"  @input="change_buy_qty($event)" >

          <input  v-show="!isBuyMarket&&currency_to_currency=='DNA_FFC'"  class="exchange-input-buy"  placeholder="数量（DNA）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="buy_qty"  @input="change_buy_qty($event)" >
          <input  v-show="!isBuyMarket&&currency_to_currency=='DNA_FFT'"  class="exchange-input-buy"  placeholder="数量（DNA）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="buy_qty"  @input="change_buy_qty($event)" >

          <input  v-show="!isBuyMarket&&currency_to_currency=='EGD_FFC'"  class="exchange-input-buy"  placeholder="数量（EGD）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="buy_qty"  @input="change_buy_qty($event)" >
          <input  v-show="!isBuyMarket&&currency_to_currency=='EGD_FFT'"  class="exchange-input-buy"  placeholder="数量（EGD）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="buy_qty"  @input="change_buy_qty($event)" >
          <input  v-show="!isBuyMarket&&currency_to_currency=='DGC_FFC'"  class="exchange-input-buy"  placeholder="数量（DGC）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="buy_qty"  @input="change_buy_qty($event)" >
          <input  v-show="!isBuyMarket&&currency_to_currency=='CBC_FFC'"  class="exchange-input-buy"  placeholder="数量（CBC）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="buy_qty"  @input="change_buy_qty($event)" >
          <input  v-show="!isBuyMarket&&currency_to_currency=='XDAG_FFC'"  class="exchange-input-buy"  placeholder="数量（XDAG）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="buy_qty"  @input="change_buy_qty($event)" >
          <input  v-show="!isBuyMarket&&currency_to_currency=='FFT_FFC'"  class="exchange-input-buy"  placeholder="数量（FFT）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="buy_qty"  @input="change_buy_qty($event)" >
          <input  v-show="!isBuyMarket&&currency_to_currency=='ETH_FFC'"  class="exchange-input-buy"  placeholder="数量（ETH）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="buy_qty"  @input="change_buy_qty($event)" >
          <input v-show="isBuyMarket&&!(currency_to_currency=='EGD_FFT'||currency_to_currency=='OSC_FFT')"  class="exchange-input-buy"  placeholder="金额（FFC）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="buy_amount"  >
          <input v-show="isBuyMarket&&(currency_to_currency=='EGD_FFT'||currency_to_currency=='OSC_FFT')"  class="exchange-input-buy"  placeholder="金额（FFT）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="buy_amount"  >
          <input  class="exchange-input-buy"  placeholder="交易密码" type="password"  v-model="passwordValue"  >
 <div style="display:flex" v-show="!isBuyMarket" ><mu-slider  :display-value='true' @change="onBuyLimetSliderChange" style="width:80%"></mu-slider><span style="font-size:0.7em;width:25%;text-align:right;padding-top:0.3em;">{{buyLimtChangeValue}}</span></div>
           <div style="display:flex" v-show="isBuyMarket" ><mu-slider  :display-value='true' @change="onBuyMarketSliderChange" style="width:80%"></mu-slider><span style="font-size:0.7em;width:25%;text-align:right;padding-top:0.3em;">{{buyMarketChangeValue}}</span></div>
          
          <p style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;"  v-show="!(currency_to_currency=='OSC_FFT'||currency_to_currency=='EGD_FFT'||currency_to_currency=='FFTS_FFT'||currency_to_currency=='DNA_FFT')">手续费0.2%（金牌0%，银牌0.1%)，最小购买20FFC。</p><!--手续费0.15%，最小买入20FFC。-->
           <p style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;" v-show="currency_to_currency=='EGD_FFT'||currency_to_currency=='FFTS_FFT'||currency_to_currency=='DNA_FFT'">手续费0.2%（金牌0%，银牌0.1%)，最小购买0.5FFT。</p>
          <p style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;" v-show="currency_to_currency=='OSC_FFT'">手续费0.2%（金牌0%，银牌0.1%)，最小购买10FFT。</p>
         
           <p style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;" v-show="!isBuyMarket" v-html="buyAmountTip"></p>
          <mu-raised-button v-show="isBuyMarket" @click="buy_market" class="btn-buy" fullWidth primary>购买</mu-raised-button>
          <mu-raised-button v-show="!isBuyMarket" @click="buy_limit" class="btn-buy" fullWidth primary>购买</mu-raised-button>
          <p class="p-place-order" @click="placeOrder"><i>批量下单 》</i></p>
       </div>
       <!-- sell 出售-->
       <div class="exchange-input-zone"  v-show="tab=='tab2'">
        <div class="exchange-input-btn-zone">
          <button class="sell-left-btn"  :class="{disable:isSellMarket}"    @click="sellTabChange(false)">限价卖</button>
          <button class="sell-right-btn"  :class="{disable:!isSellMarket}"    @click="sellTabChange(true)">市价卖</button>
        </div>
          <input v-show="!isSellMarket&&!(currency_to_currency=='EGD_FFT'||currency_to_currency=='OSC_FFT'||currency_to_currency=='FFTS_FFT'||currency_to_currency=='DNA_FFT')"  class="exchange-input-sell" placeholder="价格（FFC）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"  v-model="sell_price"  @input="change_sell_price($event)">
           <input v-show="!isSellMarket&&(currency_to_currency=='EGD_FFT'||currency_to_currency=='OSC_FFT'||currency_to_currency=='FFTS_FFT'||currency_to_currency=='DNA_FFT')"  class="exchange-input-sell" placeholder="价格（FFT）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"  v-model="sell_price"  @input="change_sell_price($event)">
          <input  v-show="!isSellMarket&&currency_to_currency=='OSC_FFC'"  class="exchange-input-sell"  placeholder="数量（OSC）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="sell_qty"  @input="change_sell_qty($event)" >
          <input v-show="isSellMarket&&currency_to_currency=='OSC_FFC'"  class="exchange-input-sell"  placeholder="数量（OSC）"  type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"  v-model="sell_qtys"  >
          <input  v-show="!isSellMarket&&currency_to_currency=='OSC_FFT'"  class="exchange-input-sell"  placeholder="数量（OSC）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="sell_qty"  @input="change_sell_qty($event)" >
          <input v-show="isSellMarket&&currency_to_currency=='FFTS_FFC'"  class="exchange-input-sell"  placeholder="数量（FFTS）"  type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"  v-model="sell_qtys"  >
          <input  v-show="!isSellMarket&&currency_to_currency=='FFTS_FFT'"  class="exchange-input-sell"  placeholder="数量（FFTS）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="sell_qty"  @input="change_sell_qty($event)" >
          <input v-show="isSellMarket&&currency_to_currency=='DNA_FFC'"  class="exchange-input-sell"  placeholder="数量（DNA）"  type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"  v-model="sell_qtys"  >
          <input  v-show="!isSellMarket&&currency_to_currency=='DNA_FFT'"  class="exchange-input-sell"  placeholder="数量（DNA）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="sell_qty"  @input="change_sell_qty($event)" >
          <input v-show="isSellMarket&&currency_to_currency=='OSC_FFT'"  class="exchange-input-sell"  placeholder="数量（OSC）"  type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"  v-model="sell_qtys"  >
          <input  v-show="!isSellMarket&&currency_to_currency=='EGD_FFC'"  class="exchange-input-sell"  placeholder="数量（EGD）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="sell_qty"  @input="change_sell_qty($event)" >
          <input v-show="isSellMarket&&currency_to_currency=='EGD_FFC'"  class="exchange-input-sell"  placeholder="数量（EGD）"  type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"  v-model="sell_qtys"  >
          <input  v-show="!isSellMarket&&currency_to_currency=='EGD_FFT'"  class="exchange-input-sell"  placeholder="数量（EGD）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="sell_qty"  @input="change_sell_qty($event)" >
          <input v-show="isSellMarket&&currency_to_currency=='EGD_FFT'"  class="exchange-input-sell"  placeholder="数量（EGD）"  type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"  v-model="sell_qtys"  >
         <input  v-show="!isSellMarket&&currency_to_currency=='FFTS_FFC'"  class="exchange-input-sell"  placeholder="数量（FFTS）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="sell_qty"  @input="change_sell_qty($event)" >
          <input v-show="!isSellMarket&&currency_to_currency=='DNA_FFC'"  class="exchange-input-sell"  placeholder="数量（DNA）"  type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"  v-model="sell_qty"  >
          <input  v-show="isSellMarket&&currency_to_currency=='FFTS_FFT'"  class="exchange-input-sell"  placeholder="数量（FFTS）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="sell_qty"  @input="change_sell_qty($event)" >
          <input v-show="isSellMarket&&currency_to_currency=='DNA_FFT'"  class="exchange-input-sell"  placeholder="数量（DNA）"  type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"  v-model="sell_qtys"  >
          <input  v-show="!isSellMarket&&currency_to_currency=='DGC_FFC'"  class="exchange-input-sell"  placeholder="数量（DGC）"  type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"  v-model="sell_qty"  @input="change_sell_qty($event)" >
          <input v-show="isSellMarket&&currency_to_currency=='DGC_FFC'"  class="exchange-input-sell"  placeholder="数量（DGC）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="sell_qtys"  >
          <input  v-show="!isSellMarket&&currency_to_currency=='CBC_FFC'"  class="exchange-input-sell"  placeholder="数量（CBC）"  type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"  v-model="sell_qty"  @input="change_sell_qty($event)" >
          <input v-show="isSellMarket&&currency_to_currency=='CBC_FFC'"  class="exchange-input-sell"  placeholder="数量（CBC）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="sell_qtys"  >
          <input  v-show="!isSellMarket&&currency_to_currency=='XDAG_FFC'"  class="exchange-input-sell"  placeholder="数量（XDAG）"  type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"  v-model="sell_qty"  @input="change_sell_qty($event)" >
          <input v-show="isSellMarket&&currency_to_currency=='XDAG_FFC'"  class="exchange-input-sell"  placeholder="数量（XDAG）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="sell_qtys"  >
          <input  v-show="!isSellMarket&&currency_to_currency=='FFT_FFC'"  class="exchange-input-sell"  placeholder="数量（FFT）"  type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"  v-model="sell_qty"  @input="change_sell_qty($event)" >
          <input v-show="isSellMarket&&currency_to_currency=='FFT_FFC'"  class="exchange-input-sell"  placeholder="数量（FFT）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="sell_qtys"  >
          <input  v-show="!isSellMarket&&currency_to_currency=='ETH_FFC'"  class="exchange-input-sell"  placeholder="数量（ETH）"  type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"  v-model="sell_qty"  @input="change_sell_qty($event)" >
          <input v-show="isSellMarket&&currency_to_currency=='ETH_FFC'"  class="exchange-input-sell"  placeholder="数量（ETH）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="sell_qtys"  >
          <input  class="exchange-input-sell"  placeholder="交易密码"  type="password" v-model="passwordValue"  >
          <div style="display:flex" v-show="!isSellMarket" ><mu-slider    @change="onSellLimetSliderChange" style="width:80%"></mu-slider><span style="font-size:0.7em;width:25%;text-align:right;padding-top:0.3em;">{{sellLimtChangeValue}}</span></div>
           <div style="display:flex" v-show="isSellMarket" ><mu-slider   @change="onSellMarketSliderChange" style="width:80%"></mu-slider><span style="font-size:0.7em;width:25%;text-align:right;padding-top:0.3em;">{{sellMarketChangeValue}}</span></div>
           <p v-show="currency_to_currency=='OSC_FFC'"  style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;">手续费0.2%（金牌0%，银牌0.1%)，最小出售10OSC。</p>
            <p v-show="currency_to_currency=='OSC_FFT'"  style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;">手续费0.2%（金牌0%，银牌0.1%)，最小出售1OSC。</p>
           <p v-show="currency_to_currency=='DGC_FFC'"  style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;">手续费0.2%（金牌0%，银牌0.1%)，最小出售100DGC。</p>
            <p v-show="currency_to_currency=='CBC_FFC'"  style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;">手续费0.2%（金牌0%，银牌0.1%)，最小出售100CBC。</p>
            <p v-show="currency_to_currency=='EGD_FFT'"  style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;">手续费0.2%（金牌0%，银牌0.1%)，最小出售50EGD。</p>
            <p v-show="currency_to_currency=='EGD_FFC'"  style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;">手续费0.2%（金牌0%，银牌0.1%)，最小出售50EGD。</p>
            <p v-show="currency_to_currency=='FFTS_FFT'"  style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;">手续费0.2%（金牌0%，银牌0.1%)，最小出售50FFTS。</p>
            <p v-show="currency_to_currency=='FFTS_FFC'"  style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;">手续费0.2%（金牌0%，银牌0.1%)，最小出售50FFTS。</p>
            <p v-show="currency_to_currency=='DNA_FFT'"  style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;">手续费0.2%（金牌0%，银牌0.1%)，最小出售50DNA。</p>
            <p v-show="currency_to_currency=='DNA_FFC'"  style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;">手续费0.2%（金牌0%，银牌0.1%)，最小出售50DNA。</p>
           <p v-show="currency_to_currency=='XDAG_FFC'"  style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;">手续费0.2%（金牌0%，银牌0.1%)，最小出售10XDAG。</p>
            <p v-show="currency_to_currency=='FFT_FFC'"  style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;">手续费0.2%（金牌0%，银牌0.1%)，最小出售10FFT。</p>
            <p v-show="currency_to_currency=='ETH_FFC'"  style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;">手续费0.2%（金牌0%，银牌0.1%)，最小出售0.005ETH。</p>
             <p v-show="currency_to_currency=='FFTS_FFT'"  style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;">手续费0.2%（金牌0%，银牌0.1%)，最小出售50FFTS。</p>
            <p v-show="currency_to_currency=='FFTS_FFC'"  style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;">手续费0.2%（金牌0%，银牌0.1%)，最小出售50FFTS。</p>
             <p v-show="currency_to_currency=='DNA_FFT'"  style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;">手续费0.2%（金牌0%，银牌0.1%)，最小出售50DNA。</p>
            <p v-show="currency_to_currency=='DNA_FFC'"  style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;">手续费0.2%（金牌0%，银牌0.1%)，最小出售50DNA。</p>
            <p style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;" v-show="!isSellMarket" v-html="sellAmountTip"></p>
          <mu-raised-button v-show="isSellMarket" @click="sell_market" class="btn-sell" fullWidth primary>出售</mu-raised-button>
          <mu-raised-button v-show="!isSellMarket" @click="sell_limit" class="btn-sell" fullWidth primary>出售</mu-raised-button>
          <p class="p-place-order" @click="placeOrder"><i>批量下单 》</i></p>
       </div>
    </div>
    <div>
      <div class="exchange-diviler"></div>
      <div class="table-history">
        <div class="history_btn_zone">
          <button :class="{active:this.isHistory}" @click="orderedHistory()">未完成</button>
          <button :class="{active:this.isHistoryed}" @click="orderedHistoryed()">已完成</button>
          <!-- <button :class="{active:this.isLastTrade}" @click="latestTraded()" v-show="false">最新成交</button> -->
          <button :class="{active:this.isLastTrade}" @click="latestTraded()"  v-show="false">批量下单</button>
        </div>
        <table v-show="(this.isHistory)" class="history-table">
          <tbody>
            <tr>
              <td style="width:25%">时间</td>
              <td style="width:20%">类型</td>
              <td style="width:20%">价格</td>
              <td style="width:20%">数量</td>
              <td style="width:15%">操作</td>
            </tr>
              <tr v-for="(item) in this.tradingingList" :key="item.id" >
                <td class="td-time" >{{item.updated |formatDate2 }}</td>
                <td >{{$t('Order.'+item.order_type)}}</td>  
                <td >{{item.price}}</td>
                <td >{{item|getQty}}</td>
                <td  @click="showCancelOrderDialog(item.id)"><u style="color:red">撤销</u></td>
              </tr>
          </tbody>
        </table>
        <table v-show="(this.isHistoryed)" class="history-table">
          <tbody>
            <tr>
              <td >时间</td>
              <td >类型</td>
              <td >成交量</td>
              <td >金额</td>
            </tr>
            
              <tr v-for="(item) in this.tradedList" :key="item.id">
                <td class="td-time">{{item.updated |formatDate2 }}</td>
                <td >{{$t('Order.'+item.order_type)}}</td>
                <td >{{item.excuted_qty}}</td>
                <td >{{item.excuted_amount}}</td>
              </tr>
          </tbody>
        </table>
        <!-- <table v-show="(this.isLastTrade)" class="history-table">
          <tbody>
            <tr>
              <td >时间</td>
              <td >成交价</td>
              <td >成交量</td>
            </tr>
            
              <tr v-for="(item) in this.traded_list" :key="item.tid">
                <td class="td-time">{{item.time |formatDate3 }}</td>
                <td >{{item.price.toFixed(3)}}</td>
                <td >{{item.amount.toFixed(8)}}</td>
              </tr>
          </tbody>
        </table> -->
    
      </div> 
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
    </div>
  </div>
</div>

<!--订单取消接口-->
    <mu-dialog :open="isOrderCancelDialog" title="订单取消提示" >
      <div >
        <span style="font-size:12px">请确认是否撤销订单。</span>
        <div style="text-align:right">
          <mu-flat-button slot="actions" @click="closeDialog" primary label="取消"/>
          <mu-flat-button slot="actions" primary @click="cancelOrder" label="撤销"/>
        </div>
      </div>
    </mu-dialog>

    <mu-dialog :open="isPlaceOrder" :title="this.tab==='tab1'?'批量买下单':'批量卖下单'" @close="close()" >
        <div >
        <div class="publish-safe-price-currency-item1">
            <span>委托单价</span>
            <mu-auto-complete v-model.trim="entrust_price" hintText='请输入委托单价'  fullWidth class="mu-text-field-input"></mu-auto-complete>
             <img src="../assets/image/icon_question.svg"  class='img-right-question1' v-show="false"  > <!--@click="showAdProtectPrice"-->
        </div>
        <div class="publish-safe-price-currency-item1">
            <span>委托数量</span>
            <mu-auto-complete v-model.trim="entrust_qty" hintText='请输入委托数量'    fullWidth  class="mu-text-field-input"></mu-auto-complete>
             <img src="../assets/image/icon_question.svg"  class='img-right-question1' v-show="false"   >
        </div>
        <div class="publish-safe-price-currency-item1">
            <span>价格增量</span>
            <mu-auto-complete v-model.trim="entrust_interval_price" hintText='请输入价格增量'    fullWidth  class="mu-text-field-input"></mu-auto-complete>
             <img src="../assets/image/icon_question.svg"  class='img-right-question1' v-show="false"  >
        </div>
        <div class="publish-safe-price-currency-item1">
            <span>数量增量</span>
            <mu-auto-complete v-model.trim="entrust_interval_qty" hintText='请输入数量增量'    fullWidth   class="mu-text-field-input"></mu-auto-complete>
             <img src="../assets/image/icon_question.svg"  class='img-right-question1' v-show="false"   >
        </div>
      <div class="publish-safe-price-currency-item1">
            <span>下单次数</span>
            <mu-auto-complete  v-model.trim="entrust_time" hintText='请输入下单次数'    fullWidth class="mu-text-field-input"></mu-auto-complete>
             <img src="../assets/image/icon_question.svg"  class='img-right-question1' v-show="false"  >
        </div>
      <div class="publish-safe-price-currency-item1">
            <span>交易密码</span>
            <mu-text-field v-model.trim="passwordValue" hintText='请输入交易密码'  type="password"    fullWidth class="mu-text-field-input"></mu-text-field>
             <img src="../assets/image/icon_question.svg"  class='img-right-question1' v-show="false"  >
        </div>
       
        <div class="div-diver-1px"></div>
        <!-- <mu-raised-button  label="批量下单（购买）" @click="placeOrderBuy" class="btn-plan-buy" fullWidth primary v-show="this.tab==='tab1'"/>
         <mu-raised-button label="批量下单（出售）" @click="placeOrderSell" class="btn-plan-sell" fullWidth primary v-show="this.tab==='tab2'"/> -->
         <button  class="btn-plan-buy" v-show="this.tab==='tab1'"  @click="placeOrderBuy" >批量下单（购买）</button>
         <button class="btn-plan-sell" v-show="this.tab==='tab2'"  @click="placeOrderSell" >批量下单（出售）</button>
      </div>
    </mu-dialog>
    <mu-dialog :open="isBatchListDialog" :title="this.tab==='tab1'?'批量买单':'批量卖单'" style="height:10em;">
      <table class="history-table" style="width:100%" >  
          <tbody>
            <tr>
              <td style="width:33.33%">序号</td>
              <td style="width:33.33%">价格（{{currency_to_currency|currency_f}}）</td>
              <td style="width:33.33%">数量（{{currency_to_currency|currency_l}}）</td>
            </tr>
          </tbody>
      </table>
      <div style=" overflow-x: hidden; overflow-y: scroll;height: 15em;width:100%;" >
        <table class="history-table" style="width:100%" >  
          <tbody>
            <!-- <tr>
              <td style="width:33.33%">序号</td>
              <td style="width:33.33%">价格{{CURRENCY_TO_CURRENCY|currency_f}}</td>
              <td style="width:33.33%">数量{{CURRENCY_TO_CURRENCY|currency_l}}</td>
            </tr> -->
              <tr v-for="(item) in this.h_order_pres" :key="item.index" >
              
                <td style="width:33.33%">{{item.index}}</td>  
                <td style="width:33.33%">{{item.price}}</td>
                <td style="width:33.33%">{{item.qty}}</td>
              </tr>
          </tbody>
        </table>
      </div>
      <div style="text-align:right">
          <mu-flat-button slot="actions" @click="closeDialog" primary label="取消"/>
          <mu-flat-button slot="actions" primary @click="placeOrdersBuy" label="购买"  v-show="this.tab==='tab1'" />
          <mu-flat-button slot="actions" primary @click="placeOrdersSell" label="出售"  v-show="this.tab==='tab2'" />
        </div>
    </mu-dialog>
    <BottomNav></BottomNav>
</div>

</template>
<script>
import BottomNav from "../components/BottomNav";
import nprogress from "nprogress";
import validate from "../utils/validate";
import moment from "../utils/moment";
import { formatDate } from "../common/js/data";
import { CAPTCHA_SIGNIN } from "../models/url";
import market from "../models/market";
import HttpResultCode from "../utils/HttpResultCode";
import wallet from "../models/wallet";
import {
  CURRENCY_TO_CURRENCY,
  CLEAN_USER,
  SET_USER,
  SET_CRYPTO_CURRENCY
} from "../store/mutation-types";
import lib from "../utils/lib";
import store from "../store";

export default {
  name: "exchange",
  components: { BottomNav },
  data() {
    return {
      tab: "tab1",
      toast: false,
      toastTimer: "",
      message: "",
      total_trading: 1,
      total_traded: 1,
      limit: 10,
      offset_trading: 0,
      offset_traded: 0,
      bids: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
      asks: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
      refresh_timer: null,
      btnBuyStatus: false,
      btnSellStatus: false,
      isPrice: false,
      isQty: false,
      buy_price: "",
      buy_qty: "",
      sell_price: "",
      sell_qty: "",
      isSell: false,
      isPasswordDialog: false,
      isOrderCancelDialog: false,
      orderId: "",
      tradingingList: [],
      tradedList: [],
      passwordValue: "",
      scroller: null,
      OSC: 0,
      FFC: 0,
      EGD: 0,
      DGC: 0,
      CBC: 0,
      XDAG: 0,
      FFT: 0,
      ETH: 0,
      FFTS:0,
      DNA:0,
      currency_to_currency: this.$store.state.user.currency_to_currency,
      isBuyMarket: false,
      isSellMarket: false,
      buy_amount: "",
      sell_qtys: "",
      scroller: null,
      loading: false,
      isTrading: false,
      open: false,
      buyAmountTip: "",
      sellAmountTip: "",
      isBuyAutoPrice: true,
      isSellAutoPrice: true,
      // ticker_timer1: null,

      osc_amount: "",
      osc_buy: "",
      osc_high: "",
      osc_low: "",
      osc_sell: "",
      osc_volume: "",
      osc_last: "",
      osc_open: 1,

      oscfft_amount: "",
      oscfft_buy: "",
      oscfft_high: "",
      oscfft_low: "",
      oscfft_sell: "",
      oscfft_volume: "",
      oscfft_last: "",
      oscfft_open: 1,

      ffts_amount: "",
      ffts_buy: "",
      ffts_high: "",
      ffts_low: "",
      ffts_sell: "",
      ffts_volume: "",
      ffts_last: "",
      ffts_open: 1,

      fftsfft_amount: "",
      fftsfft_buy: "",
      fftsfft_high: "",
      fftsfft_low: "",
      fftsfft_sell: "",
      fftsfft_volume: "",
      fftsfft_last: "",
      fftsfft_open: 1,

      dna_amount: "",
      dna_buy: "",
      dna_high: "",
      dna_low: "",
      dna_sell: "",
      dna_volume: "",
      dna_last: "",
      dna_open: 1,

      dnafft_amount: "",
      dnafft_buy: "",
      dnafft_high: "",
      dnafft_low: "",
      dnafft_sell: "",
      dnafft_volume: "",
      dnafft_last: "",
      dnafft_open: 1,


      dgc_amount: "",
      dgc_buy: "",
      dgc_high: "",
      dgc_low: "",
      dgc_sell: "",
      dgc_volume: "",
      dgc_last: 1,
      dgc_open: 1,
      xdag_amount: "",
      xdag_buy: "",
      xdag_high: "",
      xdag_low: "",
      xdag_sell: "",
      xdag_volume: "",
      xdag_last: "",
      xdag_open: 1,

      eth_amount: "",
      eth_buy: "",
      eth_high: "",
      eth_low: "",
      eth_sell: "",
      eth_volume: "",
      eth_last: "",
      eth_open: 1,

      cbc_amount: "",
      cbc_buy: "",
      cbc_high: "",
      cbc_low: "",
      cbc_sell: "",
      cbc_volume: "",
      cbc_last: "",
      cbc_open: 1,

      egdfft_amount: "",
      egdfft_buy: "",
      egdfft_high: "",
      egdfft_low: "",
      egdfft_sell: "",
      egdfft_volume: "",
      egdfft_last: "",
      egdfft_open: 1,

      egd_amount: "",
      egd_buy: "",
      egd_high: "",
      egd_low: "",
      egd_sell: "",
      egd_volume: "",
      egd_last: "",
      egd_open: 1,

      sellLimtChangeValue: "0%",
      sellMarketChangeValue: "0%",
      buyMarketChangeValue: "0%",
      buyLimtChangeValue: "0%",

      isHistory: true,
      isHistoryed: false,
      isLastTrade: false,

      traded_list: [],

      entrust_price: "",
      entrust_qty: "",
      entrust_interval_price: "",
      entrust_interval_qty: "",
      entrust_time: "",
      isPlaceOrder: false,
      isStopPlaceOrder: false,

      h_order_pres: [],

      fft_amount: "",
      fft_buy: "",
      fft_high: "",
      fft_low: "",
      fft_sell: "",
      fft_volume: "",
      fft_last: "",
      fft_open: 1,
      isBatchListDialog: false,
      listRefreshTime: new Date().getTime(),
      listRefreshTime1: new Date().getTime()
    };
  },
  mounted() {
    this.scroller = this.$el;
  },
  filters: {
    currency_f(currency_to_currency) {
      if (currency_to_currency == undefined) return "";
      return currency_to_currency.split("_")[1];
    },
    currency_l(currency_to_currency) {
      if (currency_to_currency == undefined) return "";
      return currency_to_currency.split("_")[0];
    },
    formatDate2(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    formatDate3(time) {
      let date = new Date(time);
      return formatDate(date, "hh:mm:ss");
    },
    getQty(item) {
      return (item.limit_qty - item.excuted_qty).toFixed(4);
    },
    formate(value) {
      return lib.toFixed(parseFloat(value), 4);
    },
    osc_filters(last, osc_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == osc_open || osc_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(osc_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(osc_open)) /
        parseFloat(osc_open) *
        100
      ).toFixed(2);
    },
    oscfft_filters(last, oscfft_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == oscfft_open || oscfft_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(oscfft_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(oscfft_open)) /
        parseFloat(oscfft_open) *
        100
      ).toFixed(2);
    },
    ffts_filters(last, ffts_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == ffts_open || ffts_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(ffts_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(ffts_open)) /
        parseFloat(ffts_open) *
        100
      ).toFixed(2);
    },
    fftsfft_filters(last, fftsfft_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == fftsfft_open || fftsfft_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(fftsfft_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(fftsfft_open)) /
        parseFloat(fftsfft_open) *
        100
      ).toFixed(2);
    },

    dna_filters(last, dna_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == dna_open || dna_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(dna_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(dna_open)) /
        parseFloat(dna_open) *
        100
      ).toFixed(2);
    },
    dnafft_filters(last, dnafft_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == dnafft_open || dnafft_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(dnafft_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(dnafft_open)) /
        parseFloat(dnafft_open) *
        100
      ).toFixed(2);
    },

    dgc_filters(last, dgc_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == dgc_open || dgc_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(dgc_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(dgc_open)) /
        parseFloat(dgc_open) *
        100
      ).toFixed(2);
    },
    cbc_filters(last, cbc_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == cbc_open || cbc_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(cbc_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(cbc_open)) /
        parseFloat(cbc_open) *
        100
      ).toFixed(2);
    },
    xdag_filters(last, xdag_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == xdag_open || xdag_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(xdag_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(xdag_open)) /
        parseFloat(xdag_open) *
        100
      ).toFixed(2);
    },
    fft_filters(last, fft_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == fft_open || fft_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(fft_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(fft_open)) /
        parseFloat(fft_open) *
        100
      ).toFixed(2);
    },
    eth_filters(last, eth_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == eth_open || eth_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(eth_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(eth_open)) /
        parseFloat(eth_open) *
        100
      ).toFixed(2);
    },
    egd_filters(last, egd_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == egd_open || egd_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(egd_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(egd_open)) /
        parseFloat(egd_open) *
        100
      ).toFixed(2);
    },
    egdfft_filters(last, egdfft_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == egdfft_open || egdfft_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(egdfft_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(egdfft_open)) /
        parseFloat(egdfft_open) *
        100
      ).toFixed(2);
    }
  },
  created: function() {
    // alert("sadfas")
    // window.test.exec('123','werq','432452');
    // plus.bridge.execSync('fsdg',"sdfgsdfg","sfdgsd")
    // this.isHistory = false;
    this.getBalance();
    if (
      this.currency_to_currency == "OSC_FFC" ||
      this.currency_to_currency == "OSC_FFT" ||
      this.currency_to_currency == "FFTS_FFC" ||
      this.currency_to_currency == "FFTS_FFT" ||
      this.currency_to_currency == "DNA_FFC" ||
      this.currency_to_currency == "DNA_FFT" ||
      this.currency_to_currency == "EGD_FFC" ||
      this.currency_to_currency == "EGD_FFT" ||
      this.currency_to_currency == "DGC_FFC" ||
      this.currency_to_currency == "XDAG_FFC" ||
      this.currency_to_currency == "FFT_FFC" ||
      this.currency_to_currency == "ETH_FFC" ||
      this.currency_to_currency == "CBC_FFC"
    ) {
    } else {
      this.currency_to_currency = "OSC_FFC";
      this.handleChange(this.currency_to_currency);
    }
    this.orderedHistory();
    this.getExchangeDepth();
    this.time_refresh();
  },
  methods: {
    placeOrder() {
      if (!this.$store.state.user.access_token.length > 0) {
        this.$router.push("/sign_in");
        return;
      }
      this.isPlaceOrder = true;
    },
    close() {
      this.isPlaceOrder = false;
    },
    placeOrderBuy() {
      if (this.entrust_price == "" || parseFloat(this.entrust_price) <= 0) {
        this.showToast("请输入正确的委托单价");
        return;
      }

      if (this.entrust_qty == "" || parseFloat(this.entrust_qty) <= 0) {
        this.showToast("请输入正确的委托数量");
        return;
      }

      if (
        this.entrust_interval_price == "" ||
        parseFloat(this.entrust_interval_price) == 0
      ) {
        this.showToast("请输入正确的委托增价");
        return;
      }

      if (
        this.entrust_interval_qty == "" ||
        parseFloat(this.entrust_interval_qty) == 0
      ) {
        this.showToast("请输入正确的委托增量");
        return;
      }

      if (this.entrust_time == "" || parseInt(this.entrust_time) <= 0) {
        this.showToast("请输入正确的委托次数");
        return;
      }
      if (parseInt(this.entrust_time) > 50) {
        this.showToast("委托次数小于50次");
        return;
      }
      if (parseFloat(this.entrust_price) * parseFloat(this.entrust_qty) < 20) {
        this.showToast("订单不足 20 FFC。");
        return;
      }

      if (this.passwordValue === "") {
        this.showToast("请输入火狐狸平台交易密码");
        return;
      }
      this.isPlaceOrder = false;

      this.isStopPlaceOrder = false;
      var l_this = this;
      this.h_order_pres = [];
      var m_entrust_price = parseFloat(this.entrust_price);
      var m_entrust_qty = parseFloat(this.entrust_qty);
      var m_entrust_interval_price = parseFloat(this.entrust_interval_price);
      var m_entrust_interval_qty = parseFloat(this.entrust_interval_qty);
      var m_entrust_time = parseInt(this.entrust_time);
      var m_currency_to_currency = this.currency_to_currency;

      for (var i = 0; i < m_entrust_time; i++) {
        if (m_entrust_price <= 0 || m_entrust_qty <= 0) {
          this.isBatchListDialog = true;
          return;
        }
        var item = {
          price: m_entrust_price.toFixed(3),
          qty: m_entrust_qty.toFixed(3),
          index: i + 1
        };
        this.h_order_pres.push(item);
        m_entrust_price = m_entrust_price + m_entrust_interval_price;
        m_entrust_qty = m_entrust_qty + m_entrust_interval_qty;
      }
      this.isBatchListDialog = true;
    },
    placeOrdersBuy() {
      this.isStopPlaceOrder = false;
      this.isBatchListDialog = false;
      var l_this = this;
      var m_entrust_price = parseFloat(this.entrust_price);
      var m_entrust_qty = parseFloat(this.entrust_qty);
      var m_entrust_interval_price = parseFloat(this.entrust_interval_price);
      var m_entrust_interval_qty = parseFloat(this.entrust_interval_qty);
      var m_entrust_time = parseInt(this.entrust_time);
      var m_currency_to_currency = this.currency_to_currency;
      this.entrust_price = "";
      this.entrust_qty = "";
      this.entrust_interval_price = "";
      this.entrust_interval_qty = "";
      this.entrust_time = "";
      for (var i = 0; i < m_entrust_time; i++) {
        setTimeout(() => {
          l_this.orderBuy(
            m_currency_to_currency,
            m_entrust_price,
            m_entrust_qty,
            i + 1,
            m_entrust_time
          );
          m_entrust_price = m_entrust_price + m_entrust_interval_price;
          m_entrust_qty = m_entrust_qty + m_entrust_interval_qty;
        }, i * 500);
      }
    },
    placeOrderSell() {
      if (this.entrust_price == "" || parseFloat(this.entrust_price) <= 0) {
        this.showToast("请输入正确的委托单价");
        return;
      }

      if (this.entrust_qty == "" || parseFloat(this.entrust_qty) <= 0) {
        this.showToast("请输入正确的委托数量");
        return;
      }

      if (
        this.entrust_interval_price == "" ||
        parseFloat(this.entrust_interval_price) == 0
      ) {
        this.showToast("请输入正确的委托增价");
        return;
      }

      if (
        this.entrust_interval_qty == "" ||
        parseFloat(this.entrust_interval_qty) == 0
      ) {
        this.showToast("请输入正确的委托增量");
        return;
      }

      if (this.entrust_time == "" || parseInt(this.entrust_time) <= 0) {
        this.showToast("请输入正确的委托次数");
        return;
      }
      if (parseInt(this.entrust_time) > 50) {
        this.showToast("委托次数小于50次");
        return;
      }
      if (parseFloat(this.entrust_price) * parseFloat(this.entrust_qty) < 20) {
        this.showToast("订单不足 20 FFC。");
        return;
      }

      if (this.passwordValue === "") {
        this.showToast("请输入火狐狸平台交易密码");
        return;
      }
      this.isPlaceOrder = false;
      // this.isTrading = true;
      this.isStopPlaceOrder = false;
      var l_this = this;
      this.h_order_pres = [];
      var m_entrust_price = parseFloat(this.entrust_price);
      var m_entrust_qty = parseFloat(this.entrust_qty);
      var m_entrust_interval_price = parseFloat(this.entrust_interval_price);
      var m_entrust_interval_qty = parseFloat(this.entrust_interval_qty);
      var m_entrust_time = parseInt(this.entrust_time);
      var m_currency_to_currency = this.currency_to_currency;
      for (var i = 0; i < m_entrust_time; i++) {
        if (m_entrust_price <= 0 || m_entrust_qty <= 0) {
          this.isBatchListDialog = true;
          return;
        }
        var item = {
          price: m_entrust_price.toFixed(3),
          qty: m_entrust_qty.toFixed(3),
          index: i + 1
        };
        this.h_order_pres.push(item);
        m_entrust_price = m_entrust_price + m_entrust_interval_price;
        m_entrust_qty = m_entrust_qty + m_entrust_interval_qty;
      }
      this.isBatchListDialog = true;
    },
    placeOrdersSell() {
      this.isBatchListDialog = false;
      var l_this = this;
      var m_entrust_price = parseFloat(this.entrust_price);
      var m_entrust_qty = parseFloat(this.entrust_qty);
      var m_entrust_interval_price = parseFloat(this.entrust_interval_price);
      var m_entrust_interval_qty = parseFloat(this.entrust_interval_qty);
      var m_entrust_time = parseInt(this.entrust_time);
      var m_currency_to_currency = this.currency_to_currency;
      this.entrust_price = "";
      this.entrust_qty = "";
      this.entrust_interval_price = "";
      this.entrust_interval_qty = "";
      this.entrust_time = "";
      for (var i = 0; i < m_entrust_time; i++) {
        setTimeout(() => {
          l_this.orderSell(
            m_currency_to_currency,
            m_entrust_price,
            m_entrust_qty,
            i + 1,
            m_entrust_time
          );
          m_entrust_price = m_entrust_price + m_entrust_interval_price;
          m_entrust_qty = m_entrust_qty + m_entrust_interval_qty;
        }, i * 500);
      }
    },
    orderBuy(m_currency_to_currency, price, qty, time1, time2) {
      // console.log(new Date().getTime()+"  time");
      if (price <= 0 || qty <= 0) {
        this.isStopPlaceOrder = true;
        return;
      }
      if (this.isStopPlaceOrder) return;
      market
        .exchangeLimitOrder(
          m_currency_to_currency,
          qty,
          true,
          price,
          this.passwordValue
        )
        .then(data => {
          if (time1 == time2) {
            setTimeout(this.getBalance(), 1000);
            if (this.isHistory) setTimeout(this.orderedHistory(), 1000);
          }
        })
        .catch(e => {
          // this.isTrading = false;
          this.isStopPlaceOrder = true;
          this.passwordValue = "";
          if (e.code == 1104) {
            this.showToast("账户余额不足");
          } else {
            this.showToast(HttpResultCode.validate(e.code));
          }
        });
    },
    orderSell(m_currency_to_currency, price, qty, time1, time2) {
      // console.log(new Date().getTime()+"  time");
      if (price <= 0 || qty <= 0) {
        this.isStopPlaceOrder = true;
        return;
      }
      if (this.isStopPlaceOrder) return;
      market
        .exchangeLimitOrder(
          m_currency_to_currency,
          qty,
          false,
          price,
          this.passwordValue
        )
        .then(data => {
          if (time1 == time2) {
            setTimeout(this.getBalance(), 1000);
            if (this.isHistory) setTimeout(this.orderedHistory(), 1000);
          }
        })
        .catch(e => {
          this.passwordValue = "";
          this.isStopPlaceOrder = true;
          if (e.code == 1104) {
            this.showToast("账户余额不足");
          } else {
            this.showToast(HttpResultCode.validate(e.code));
          }
        });
    },
    onSellLimetSliderChange(val) {
      // alert(val)
      this.sellLimtChangeValue = val + " %";

      if (this.currency_to_currency == "OSC_FFC") {
        this.sell_qty = this.OSC * val / 100;
      }
      if (this.currency_to_currency == "OSC_FFT") {
        this.sell_qty = this.OSC * val / 100;
      }
      if (this.currency_to_currency == "DGC_FFC") {
        this.sell_qty = this.DGC * val / 100;
      }
      if (this.currency_to_currency == "CBC_FFC") {
        this.sell_qty = this.CBC * val / 100;
      }
      if (this.currency_to_currency == "EGD_FFC") {
        this.sell_qty = this.EGD * val / 100;
      }
      
      if (this.currency_to_currency == "EGD_FFT") {
        this.sell_qty = this.EGD * val / 100;
      }
      if (this.currency_to_currency == "FFTS_FFC") {
        this.sell_qty = this.FFTS * val / 100;
      }
       if (this.currency_to_currency == "FFTS_FFT") {
        this.sell_qty = this.FFTS * val / 100;
      }
      if (this.currency_to_currency == "DNA_FFC") {
        this.sell_qty = this.DNA * val / 100;
      }
       if (this.currency_to_currency == "DNA_FFT") {
        this.sell_qty = this.DNA * val / 100;
      }
      if (this.currency_to_currency == "XDAG_FFC") {
        // console.log(this.XDAG * val)
        this.sell_qty = this.XDAG * val / 100;
      }
      if (this.currency_to_currency == "FFT_FFC") {
        // console.log(this.XDAG * val)
        this.sell_qty = this.FFT * val / 100;
      }
      if (this.currency_to_currency == "ETH_FFC") {
        // console.log(this.XDAG * val)
        this.sell_qty = this.ETH * val / 100;
      }
      this.change_sell_qty(null);
    },
    onSellMarketSliderChange(val) {
      this.sellMarketChangeValue = val + " %";
      if (this.currency_to_currency == "OSC_FFC") {
        this.sell_qtys = this.OSC * val / 100;
      }
      if (this.currency_to_currency == "OSC_FFT") {
        this.sell_qtys = this.OSC * val / 100;
      }
      if (this.currency_to_currency == "EGD_FFC") {
        this.sell_qtys = this.EGD * val / 100;
      }
      if (this.currency_to_currency == "EGD_FFT") {
        this.sell_qtys = this.EGD * val / 100;
      }
      if (this.currency_to_currency == "FFTS_FFC") {
        this.sell_qtys = this.FFTS * val / 100;
      }
      if (this.currency_to_currency == "DNA_FFT") {
        this.sell_qtys = this.DNA * val / 100;
      }
      if (this.currency_to_currency == "DNA_FFC") {
        this.sell_qtys = this.DNA * val / 100;
      }
      if (this.currency_to_currency == "FFTS_FFT") {
        this.sell_qtys = this.FFTS * val / 100;
      }


      if (this.currency_to_currency == "DGC_FFC") {
        this.sell_qtys = this.DGC * val / 100;
      }
      if (this.currency_to_currency == "CBC_FFC") {
        this.sell_qtys = this.CBC * val / 100;
      }
      if (this.currency_to_currency == "XDAG_FFC") {
        // console.log(this.XDAG * val)
        this.sell_qtys = this.XDAG * val / 100;
      }
      if (this.currency_to_currency == "FFT_FFC") {
        // console.log(this.XDAG * val)
        this.sell_qtys = this.FFT * val / 100;
      }
      if (this.currency_to_currency == "ETH_FFC") {
        // console.log(this.XDAG * val)
        this.sell_qtys = this.ETH * val / 100;
      }
    },
    onBuyMarketSliderChange(val) {
      this.buyMarketChangeValue = val + " %";
      this.buy_amount = (this.FFC * val / 100).toFixed(8);
    },
    onBuyLimetSliderChange(val) {
      this.buyLimtChangeValue = val + " %";
      if (parseFloat(this.buy_price) > 0) {
        this.buy_qty = (this.FFC * val / 100 / this.buy_price).toFixed(8);
        this.change_buy_qty(null);
      }
    },
    select_sell(index) {
      if (this.asks[index] != null) {
        this.buy_price = this.asks[index][0].toFixed(3);
        this.sell_price = this.asks[index][0].toFixed(3);
      }
    },
    select_buy(index) {
      if (this.bids[index] != null) {
        this.sell_price = this.bids[index][0].toFixed(3);
        this.buy_price = this.bids[index][0].toFixed(3);
      }
    },
    showToast: function(msg) {
      this.toast = true;
      this.message = msg;
      this.toastTimer = setTimeout(() => {
        this.toast = false;
      }, 2000);
    },
    hideToast() {
      this.toast = false;
      if (this.toastTimer) clearTimeout(this.toastTimer);
    },
    closeDialog() {
      this.dialog = false;
      this.isPasswordDialog = false;
      this.isOrderCancelDialog = false;
      this.isBatchListDialog = false;
    },
    handleChange(val) {
      this.currency_to_currency = val;
      this.$store.commit(CURRENCY_TO_CURRENCY, this.currency_to_currency);
      this.isBuyAutoPrice = true;
      this.isSellAutoPrice = true;
      if (this.isHistory) this.orderedHistory();
      if (this.isHistoryed) this.orderedHistoryed();
      if (this.isLastTrade) this.latestTraded();
      this.getExchangeDepth();
    },
    toggle() {
      this.open = !this.open;
    },
    handleOpen() {
      this.open = true;
    },
    handleClose() {
      this.open = false;
    },
    mainChange(tab) {
      this.tab = tab;
      this.passwordValue = "";
    },
    buyTabChange(isBuyMarket) {
      this.isBuyMarket = isBuyMarket;
      this.buyAmountTip = "";
      this.sellAmountTip = "";
    },
    sellTabChange(isSellMarket) {
      this.isSellMarket = isSellMarket;
      this.buyAmountTip = "";
      this.sellAmountTip = "";
    },
    goWallet() {
      if (!this.$store.state.user.access_token.length > 0) {
        this.$router.push("/sign_in");
        return;
      }
      if (this.tab == "tab1") {
        this.$router.push("/wallet_detail_ffc");
      }
      if (this.tab == "tab2") {
        if (
          this.currency_to_currency == "OSC_FFC" ||
          this.currency_to_currency == "OSC_FFT"
        ) {
          this.$router.push({
            name: "wallet_detail",
            params: { crypto_currency: "osc" }
          });
          // this.$store.commit(SET_CRYPTO_CURRENCY,'OSC')
        }
        if (this.currency_to_currency == "DGC_FFC") {
          this.$router.push({
            name: "wallet_detail",
            params: { crypto_currency: "dgc" }
          });
          // this.$store.commit(SET_CRYPTO_CURRENCY,'DGC')
        }
        if (this.currency_to_currency == "CBC_FFC") {
          this.$router.push({
            name: "wallet_detail",
            params: { crypto_currency: "cbc" }
          });
          // this.$store.commit(SET_CRYPTO_CURRENCY,'DGC')
        }
        if (
          this.currency_to_currency == "EGD_FFC" ||
          this.currency_to_currency == "EGD_FFT"
        ) {
          this.$router.push({
            name: "wallet_detail",
            params: { crypto_currency: "egd" }
          });
          // this.$store.commit(SET_CRYPTO_CURRENCY,'DGC')
        }
        if (
          this.currency_to_currency == "FFTS_FFC" ||
          this.currency_to_currency == "FFTS_FFT"
        ) {
          this.$router.push({
            name: "wallet_detail",
            params: { crypto_currency: "ffts" }
          });
          // this.$store.commit(SET_CRYPTO_CURRENCY,'DGC')
        }
        if (
          this.currency_to_currency == "DNA_FFC" ||
          this.currency_to_currency == "DNA_FFT"
        ) {
          this.$router.push({
            name: "wallet_detail",
            params: { crypto_currency: "dna" }
          });
          // this.$store.commit(SET_CRYPTO_CURRENCY,'DGC')
        }
        if (this.currency_to_currency == "XDAG_FFC") {
          this.$router.push({
            name: "wallet_detail",
            params: { crypto_currency: "xdag" }
          });
          // this.$store.commit(SET_CRYPTO_CURRENCY,'DGC')
        }
        if (this.currency_to_currency == "ETH_FFC") {
          this.$router.push({
            name: "wallet_detail",
            params: { crypto_currency: "eth" }
          });
          // this.$store.commit(SET_CRYPTO_CURRENCY,'DGC')
        }
        // this.$router.push('/wallet_detail');
      }
    },
    buy_market() {
      if (!this.$store.state.user.access_token.length > 0) {
        this.$router.push("/sign_in");
        return;
      }
      if (this.isTrading) {
        this.showToast("请稍后");
        return;
      }
      if (!isNaN(parseInt(this.buy_amount))) {
        this.buy_amount = lib.toFixed(parseFloat(this.buy_amount), 4);
        if (this.buy_amount <= 0) {
          this.showToast("请输入正确的购买金额");
          return;
        }
      } else {
        this.showToast("请输入正确的购买金额");
        return;
      }
      if (this.passwordValue === "") {
        this.showToast("请输入火狐狸平台交易密码");
        return;
      }
      if (
        this.currency_to_currency == "OSC_FFT" ||
        this.currency_to_currency == "EGD_FFT"||
        this.currency_to_currency == "FFTS_FFT"||
        this.currency_to_currency == "DNA_FFT"
      ) {
        // if (parseInt(this.buy_amount) < 25) {
        //   this.showToast("订单不足 25 FFT");
        //   return;
        // }
      } else {
        if (parseInt(this.buy_amount) < 20) {
          this.showToast("订单不足 20 FFC");
          return;
        }
      }

      this.isTrading = true;
      market
        .market_order(
          this.currency_to_currency,
          this.buy_amount,
          true,
          this.passwordValue
        )
        .then(data => {
          this.isTrading = false;
          this.buy_amount = "";
          this.passwordValue = "";
          this.showToast("下单成功");
          setTimeout(this.getBalance(), 1000);
          if (this.isHistoryed) setTimeout(this.orderedHistoryed(), 1000);
        })
        .catch(e => {
          this.isTrading = false;
          this.passwordValue = "";
          if (e.code == 1104) {
            this.showToast("账户余额不足");
          } else {
            this.showToast(HttpResultCode.validate(e.code));
          }
        });
    },
    buy_limit() {
      if (!this.$store.state.user.access_token.length > 0) {
        this.$router.push("/sign_in");
        return;
      }
      if (this.isTrading) {
        this.showToast("请稍后");
        return;
      }
      if (!isNaN(parseInt(this.buy_price))) {
        this.buy_price = lib.toFixed(parseFloat(this.buy_price), 4);
        if (this.buy_price <= 0) {
          this.showToast("请输入正确的购买价格");
          return;
        }
      } else {
        this.showToast("请输入正确的购买价格");
        return;
      }
      if (!isNaN(parseInt(this.buy_qty))) {
        this.buy_qty = lib.toFixed(parseFloat(this.buy_qty), 8);
        if (this.buy_qty <= 0) {
          this.showToast("请输入正确的购买数量");
          return;
        }
      } else {
        this.showToast("请输入正确的购买数量");
        return;
      }

      if (
        this.currency_to_currency == "OSC_FFT" ||
        this.currency_to_currency == "EGD_FFT"||
        this.currency_to_currency == "FFTS_FFT"||
        this.currency_to_currency == "DNA_FFT"
      ) {
        /*  if (parseFloat(this.buy_price) * parseFloat(this.buy_qty) < 25) {
                  // var number = 20/parseFloat(this.buy_price)
                  // this.showToast('最小购买  '+number+' '+this.currency_to_currency)
                  this.showToast("订单不足 25 FFT。");
                  return;
                } */
      } else {
        if (parseFloat(this.buy_price) * parseFloat(this.buy_qty) < 20) {
          // var number = 20/parseFloat(this.buy_price)
          // this.showToast('最小购买  '+number+' '+this.currency_to_currency)
          this.showToast("订单不足 20 FFC。");
          return;
        }
      }

      // if(this.currency_to_currency=='DGC_FFC'){
      //     if(parseInt(this.buy_qty)<100){
      //   this.showToast('最小购买 100 DGC')
      //   return
      //   }
      // }else if(this.currency_to_currency=='OSC_FFC'){
      //   if(parseInt(this.buy_qty)<10){
      //   this.showToast('最小购买 10 OSC')
      //   return
      //   }
      // }

      if (this.passwordValue === "") {
        this.showToast("请输入火狐狸平台交易密码");
        return;
      }
      this.isTrading = true;
      this.sellAmountTip = "";
      this.buyAmountTip = "";
      market
        .exchangeLimitOrder(
          this.currency_to_currency,
          this.buy_qty,
          true,
          this.buy_price,
          this.passwordValue
        )
        .then(data => {
          this.isTrading = false;
          this.buy_qty = "";
          this.buy_price = "";
          this.passwordValue = "";
          this.showToast("下单成功");
          setTimeout(this.getBalance(), 1000);
          if (this.isHistory) setTimeout(this.orderedHistory(), 1000);
        })
        .catch(e => {
          this.isTrading = false;
          this.passwordValue = "";
          if (e.code == 1104) {
            this.showToast("账户余额不足");
          } else {
            this.showToast(HttpResultCode.validate(e.code));
          }
        });
    },
    sell_market() {
      if (!this.$store.state.user.access_token.length > 0) {
        this.$router.push("/sign_in");
        return;
      }
      if (this.isTrading) {
        this.showToast("请稍后");
        return;
      }
      // if (!isNaN(parseInt(this.sell_qtys))) {
      //   this.sell_qtys = lib.toFixed(parseFloat(this.sell_qtys), 8);
      //   if (this.sell_qtys <= 0) {
      //     this.showToast("请输入正确的出售数量");
      //     return;
      //   }
      // } else {
      //   this.showToast("请输入正确的出售数量");
      //   return;
      // }
      if (this.passwordValue === "") {
        this.showToast("请输入火狐狸平台交易密码");
        return;
      }
      // if(parseInt(this.sell_qtys)<10){
      //   this.showToast('出售数量最少 10 OSC')
      //  return
      // }
      if (this.currency_to_currency == "DGC_FFC") {
        if (parseFloat(this.sell_qtys) < 100) {
          this.showToast("出售数量最少 100 DGC");
          return;
        }
      } else if (this.currency_to_currency == "OSC_FFC") {
        if (parseFloat(this.sell_qtys) < 10) {
          this.showToast("出售数量最少 10 OSC");
          return;
        }
      } else if (this.currency_to_currency == "OSC_FFT") {
        if (parseFloat(this.sell_qtys) < 10) {
          this.showToast("出售数量最少 10 OSC");
          return;
        }
      } else if (this.currency_to_currency == "CBC_FFC") {
        if (parseFloat(this.sell_qtys) < 100) {
          this.showToast("出售数量最少 100 CBC");
          return;
        }
      } else if (this.currency_to_currency == "EGD_FFC") {
        if (parseFloat(this.sell_qtys) < 50) {
          this.showToast("出售数量最少 50 EGD");
          return;
        }
      } else if (this.currency_to_currency == "EGD_FFT") {
        if (parseFloat(this.sell_qtys) < 50) {
          this.showToast("出售数量最少 50 EGD");
          return;
        }
      } else if (this.currency_to_currency == "XDAG_FFC") {
        if (parseFloat(this.sell_qtys) < 10) {
          this.showToast("出售数量最少 10 XDAG");
          return;
        }
      } else if (this.currency_to_currency == "FFT_FFC") {
        if (parseFloat(this.sell_qtys) < 10) {
          this.showToast("出售数量最少 10 FFT");
          return;
        }
      } else if (this.currency_to_currency == "ETH_FFC") {
        if (parseFloat(this.sell_qtys) < 0.005) {
          this.showToast("出售数量最少 0.005 ETH");
          return;
        }
      }
      this.isTrading = true;
      market
        .market_order(
          this.currency_to_currency,
          this.sell_qtys,
          false,
          this.passwordValue
        )
        .then(data => {
          this.isTrading = false;
          this.sell_qtys = "";
          this.passwordValue = "";
          this.showToast("下单成功");
          setTimeout(this.getBalance(), 1000);
          if (this.isHistoryed) setTimeout(this.orderedHistoryed(), 1000);
        })
        .catch(e => {
          this.isTrading = false;
          this.passwordValue = "";
          if (e.code == 1104) {
            this.showToast("账户余额不足");
          } else {
            this.showToast(HttpResultCode.validate(e.code));
          }
        });
    },
    sell_limit() {
      if (!this.$store.state.user.access_token.length > 0) {
        this.$router.push("/sign_in");
        return;
      }
      if (this.isTrading) {
        this.showToast("请稍后");
        return;
      }
      if (!isNaN(parseFloat(this.sell_price))) {
        this.sell_price = lib.toFixed(parseFloat(this.sell_price), 4);
        if (this.sell_price <= 0) {
          this.showToast("请输入正确的出售价格");
          return;
        }
      } else {
        this.showToast("请输入正确的出售价格");
        return;
      }
      // if (!isNaN(parseFloat(this.sell_qty))) {
      //   this.sell_qty = lib.toFixed(parseFloat(this.sell_qty), 8);
      //   if (this.sell_qty <= 0) {
      //     this.showToast("请输入正确的出售数量");
      //     return;
      //   }
      // } else {
      //   this.showToast("请输入正确的出售数量");
      //   return;
      // }
      //  if(parseInt(this.sell_qty)<10){
      //   this.showToast('出售数量最少 10 OSC')
      //  return
      // }
      if (this.currency_to_currency == "DGC_FFC") {
        if (parseFloat(this.sell_qty) < 100) {
          this.showToast("出售数量最少 100 DGC");
          return;
        }
      } else if (this.currency_to_currency == "OSC_FFC") {
        if (parseFloat(this.sell_qty) < 10) {
          this.showToast("出售数量最少 10 OSC");
          return;
        }
      } else if (this.currency_to_currency == "OSC_FFT") {
        if (parseFloat(this.sell_qty) < 10) {
          this.showToast("出售数量最少 10 OSC");
          return;
        }
      } else if (this.currency_to_currency == "CBC_FFC") {
        if (parseFloat(this.sell_qty) < 100) {
          this.showToast("出售数量最少 100 CBC");
          return;
        }
      } else if (this.currency_to_currency == "EGD_FFC") {
        if (parseFloat(this.sell_qty) < 50) {
          this.showToast("出售数量最少 50 EGD");
          return;
        }
      } else if (this.currency_to_currency == "EGD_FFT") {
        if (parseFloat(this.sell_qty) < 50) {
          this.showToast("出售数量最少 50 EGD");
          return;
        }
      } else if (this.currency_to_currency == "FFTS_FFC") {
        if (parseFloat(this.sell_qty) < 50) {
          this.showToast("出售数量最少 50 FFTS");
          return;
        }
      } else if (this.currency_to_currency == "DNA_FFT") {
        if (parseFloat(this.sell_qty) < 50) {
          this.showToast("出售数量最少 50 DNA");
          return;
        }
      } else if (this.currency_to_currency == "XDAG_FFC") {
        if (parseFloat(this.sell_qty) < 10) {
          this.showToast("出售数量最少 10 XDAG");
          return;
        }
      } else if (this.currency_to_currency == "FFT_FFC") {
        if (parseFloat(this.sell_qty) < 10) {
          this.showToast("出售数量最少 10 FFT");
          return;
        }
      } else if (this.currency_to_currency == "ETH_FFC") {
        if (parseFloat(this.sell_qty) < 0.005) {
          this.showToast("出售数量最少 0.005 ETH");
          return;
        }
      }
      if (this.passwordValue === "") {
        this.showToast("请输入火狐狸平台交易密码");
        return;
      }

      this.isTrading = true;
      this.sellAmountTip = "";
      this.buyAmountTip = "";
      market
        .exchangeLimitOrder(
          this.currency_to_currency,
          this.sell_qty,
          false,
          this.sell_price,
          this.passwordValue
        )
        .then(data => {
          this.isTrading = false;
          this.sell_qty = "";
          this.sell_price = "";
          this.passwordValue = "";
          this.showToast("下单成功");
          setTimeout(this.getBalance(), 1000);
          if (this.isHistory) setTimeout(this.orderedHistory(), 1000);
        })
        .catch(e => {
          this.isTrading = false;
          this.passwordValue = "";
          if (e.code == 1104) {
            this.showToast("账户余额不足");
          } else {
            this.showToast(HttpResultCode.validate(e.code));
          }
        });
    },
    limitTrade() {
      if (!(this.isPrice && this.isQty)) {
        this.showToast("输入不正确");
        return;
      }
      //对比自己账户数据
      this.passwordValue = "";
      this.isPasswordDialog = true;
    },
    showCancelOrderDialog(orderId) {
      this.isOrderCancelDialog = true;
      this.orderId = orderId;
    },
    cancelOrder() {
      if (!this.$store.state.user.access_token.length > 0) {
        return;
      }
      this.isOrderCancelDialog = false;
      market
        .exchangeCancelOrder(this.currency_to_currency, this.orderId)
        .then(data => {
          setTimeout(() => {
            this.orderedHistory(true);
          }, 1000);
        })
        .catch(e => {});
    },
    orderedHistory() {
      this.isHistory = true;
      this.isHistoryed = false;
      this.isLastTrade = false;
      this.offset_trading = 0;
      this.total_trading = 1;
      this.exchangeMyTradingOrder();
    },
    orderedHistoryed() {
      this.isHistory = false;
      this.isHistoryed = true;
      this.isLastTrade = false;
      this.offset_traded = 0;
      this.total_traded = 1;
      this.exchangeMyTradedOrder();
    },
    latestTraded() {
      this.isHistory = false;
      this.isHistoryed = false;
      this.isLastTrade = true;

      //最新成交
      market
        .trades(this.currency_to_currency)
        .then(data => {
          if (data.code == 0) {
            this.traded_list = data.data.trades;
          }
        })
        .catch(e => {});
    },
    loadMore() {
      if (this.isHistory) {
        this.exchangeMyTradingOrder();
      } else if (this.isHistoryed) {
        this.exchangeMyTradedOrder();
      } else if (this.isLastTrade) {
        // this.latestTraded();
      }
    },
    exchangeMyTradingOrder() {
      var t = new Date().getTime() - this.listRefreshTime;
      if (t < 2000) {
        return;
      }
      this.listRefreshTime = new Date().getTime();
      if (this.loading) {
        return;
      }
      if (this.total_trading <= this.offset_trading) {
        this.loading = false;
        return;
      }
      if (!this.$store.state.user.access_token.length > 0) {
        return;
      }
      this.loading = true;
      market
        .foxExchangeMyOrder(
          this.currency_to_currency,
          "TRADING",
          this.offset_trading,
          this.limit
        )
        .then(data => {
          this.loading = false;
          if (this.offset_trading == 0) this.tradingingList = [];
          if (data.code == 0) {
            if (data.data.total > 0) {
              this.offset_trading =
                this.offset_trading + data.data.orders.length;
              this.tradingingList = this.tradingingList.concat(
                data.data.orders
              );
              this.total_trading = data.data.total;
            }
          }
          //  this.getBalance();
        })
        .catch(e => {
          this.loading = false;
        });
    },
    exchangeMyTradedOrder() {
      var t = new Date().getTime() - this.listRefreshTime;
      if (t < 2000) {
        return;
      }
      this.listRefreshTime = new Date().getTime();
      if (this.loading) {
        return;
      }
      if (this.total_traded <= this.offset_traded) {
        this.loading = false;
        return;
      }
      if (!this.$store.state.user.access_token.length > 0) {
        return;
      }
      this.loading = true;
      market
        .foxExchangeMyOrder(
          this.currency_to_currency,
          "TRADED",
          this.offset_traded,
          this.limit
        )
        .then(data => {
          this.loading = false;
          if (this.offset_traded == 0) this.tradedList = [];
          if (data.code == 0) {
            if (data.data.total > 0) {
              this.offset_traded = this.offset_traded + data.data.orders.length;
              this.tradedList = this.tradedList.concat(data.data.orders);
              this.total_traded = data.data.total;
            }
          }
          //  this.getBalance();
        })
        .catch(e => {
          this.loading = false;
        });
    },
    change_buy_price: function(e) {
      if (this.buy_price.length == 0) {
        this.buyAmountTip = "";
        return;
      }
      if (this.buy_qty.length == 0) {
        this.buyAmountTip = "";
        return;
      }
      if (
        this.currency_to_currency == "OSC_FFT" ||
        this.currency_to_currency == "EGD_FFT"||
        this.currency_to_currency == "FFTS_FFT"||
        this.currency_to_currency == "DNA_FFT"
      ) {
        if (parseFloat(this.buy_price) > 0 && parseFloat(this.buy_qty) > 0) {
          this.buyAmountTip =
            '交易额：<span style="color:#1AAC19">' +
            parseFloat(
              (parseFloat(this.buy_price) * parseFloat(this.buy_qty)).toFixed(8)
            ) +
            "</span> FFT";
        } else {
          this.buyAmountTip = "";
        }
      } else {
        if (parseFloat(this.buy_price) > 0 && parseFloat(this.buy_qty) > 0) {
          this.buyAmountTip =
            '交易额：<span style="color:#1AAC19">' +
            parseFloat(
              (parseFloat(this.buy_price) * parseFloat(this.buy_qty)).toFixed(8)
            ) +
            "</span> FFC";
        } else {
          this.buyAmountTip = "";
        }
      }
    },
    change_buy_qty: function(e) {
      if (this.buy_price.length == 0) {
        this.buyAmountTip = "";
        return;
      }
      if (this.buy_qty.length == 0) {
        this.buyAmountTip = "";
        return;
      }
      if (
        this.currency_to_currency == "OSC_FFT" ||
        this.currency_to_currency == "EGD_FFT"||
        this.currency_to_currency == "FFTS_FFT"||
        this.currency_to_currency == "DNA_FFT"
      ) {
        if (parseFloat(this.buy_price) > 0 && parseFloat(this.buy_qty) > 0) {
          this.buyAmountTip =
            '交易额：<span style="color:#1AAC19">' +
            parseFloat(
              (parseFloat(this.buy_price) * parseFloat(this.buy_qty)).toFixed(8)
            ) +
            "</span> FFT";
        } else {
          this.buyAmountTip = "";
        }
      } else {
        if (parseFloat(this.buy_price) > 0 && parseFloat(this.buy_qty) > 0) {
          this.buyAmountTip =
            '交易额：<span style="color:#1AAC19">' +
            parseFloat(
              (parseFloat(this.buy_price) * parseFloat(this.buy_qty)).toFixed(8)
            ) +
            "</span> FFC";
        } else {
          this.buyAmountTip = "";
        }
      }
    },
    change_sell_price: function(e) {
      if (this.sell_price.length == 0) {
        this.sellAmountTip = "";
        return;
      }
      if (this.sell_qty.length == 0) {
        this.sellAmountTip = "";
        return;
      }
      if (
        this.currency_to_currency == "OSC_FFT" ||
        this.currency_to_currency == "EGD_FFT"||
        this.currency_to_currency == "FFTS_FFT"||
        this.currency_to_currency == "DNA_FFT"
      ) {
        if (parseFloat(this.sell_price) > 0 && parseFloat(this.sell_qty) > 0) {
          this.sellAmountTip =
            '交易额：<span style="color:#ff4d2d">' +
            parseFloat(
              (parseFloat(this.sell_price) * parseFloat(this.sell_qty)).toFixed(
                8
              )
            ) +
            "</span> FFT";
        } else {
          this.sellAmountTip = "";
        }
      } else {
        if (parseFloat(this.sell_price) > 0 && parseFloat(this.sell_qty) > 0) {
          this.sellAmountTip =
            '交易额：<span style="color:#ff4d2d">' +
            parseFloat(
              (parseFloat(this.sell_price) * parseFloat(this.sell_qty)).toFixed(
                8
              )
            ) +
            "</span> FFC";
        } else {
          this.sellAmountTip = "";
        }
      }
    },
    currency_l(currency_to_currency) {
      if (currency_to_currency == undefined) return "";
      return currency_to_currency.split("_")[0];
    },
    change_sell_qty: function(e) {
      if (this.sell_price.length == 0) {
        this.sellAmountTip = "";
        return;
      }
      if (this.sell_qty.length == 0) {
        this.sellAmountTip = "";
        return;
      }
      if (
        this.currency_to_currency == "OSC_FFT" ||
        this.currency_to_currency == "EGD_FFT"||
        this.currency_to_currency == "FFTS_FFT"||
        this.currency_to_currency == "DNA_FFT"
      ) {
        if (parseFloat(this.sell_price) > 0 && parseFloat(this.sell_qty) > 0) {
          this.sellAmountTip =
            '交易额：<span style="color:#ff4d2d">' +
            parseFloat(
              (parseFloat(this.sell_price) * parseFloat(this.sell_qty)).toFixed(
                8
              )
            ) +
            "</span> FFT";
        } else {
          this.sellAmountTip = "";
        }
      } else {
        if (parseFloat(this.sell_price) > 0 && parseFloat(this.sell_qty) > 0) {
          this.sellAmountTip =
            '交易额：<span style="color:#ff4d2d">' +
            parseFloat(
              (parseFloat(this.sell_price) * parseFloat(this.sell_qty)).toFixed(
                8
              )
            ) +
            "</span> FFC";
        } else {
          this.sellAmountTip = "";
        }
      }
    },
    time_refresh: function() {
      if ("/exchange" == this.$route.path) {
      } else {
        return;
      }
      this.refresh_timer = window.setInterval(() => {
        if ("/exchange" == this.$route.path) {
          this.getExchangeDepth();
          this.getBalance();
          this.getTicker_list();
          if (this.isHistory) this.orderedHistory();
        } else {
          window.clearInterval(this.refresh_timer);
          return;
        }
      }, 10000);
    },
    clear_refresh: function() {},
    getExchangeDepth() {
      market
        .exchangeDepth(this.currency_to_currency, "5")
        .then(data => {
          if (data.data.depths.hasOwnProperty("bids")) {
            this.bids = data.data.depths.bids;
            if (this.isSellAutoPrice) {
              // this.sell_price = this.bids[0][0].toFixed(3);
            }
            this.isSellAutoPrice = false;
          } else {
            this.bids = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
          }
          if (data.data.depths.hasOwnProperty("asks")) {
            this.asks = data.data.depths.asks;
            if (this.isBuyAutoPrice) {
              this.isBuyAutoPrice = false;
              // this.buy_price = this.asks[0][0].toFixed(3);
            }
          } else {
            this.asks = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
          }
        })
        .catch(e => {});
    },
    getBalance: function() {
      if (!this.$store.state.user.access_token.length > 0) {
        return;
      }
      wallet
        .balance()
        .then(data => {
          let list = data.data.list;
          for (let i = 0; i < list.length; i++) {
            if (list[i].currency === "OSC") {
              this.OSC = list[i].available.toFixed(3);
            }
            if (list[i].currency === "FFC") {
              this.FFC = list[i].available.toFixed(2);
            }
            if (list[i].currency === "DGC") {
              this.DGC = list[i].available.toFixed(3);
            }
            if (list[i].currency === "CBC") {
              this.CBC = list[i].available.toFixed(3);
            }
            if (list[i].currency === "EGD") {
              this.EGD = list[i].available.toFixed(3);
            }
            if (list[i].currency === "FFTS") {
              this.FFTS = list[i].available.toFixed(3);
            }
            if (list[i].currency === "DNA") {
              this.DNA = list[i].available.toFixed(3);
            }
            if (list[i].currency === "XDAG") {
              this.XDAG = list[i].available.toFixed(3);
            }
            if (list[i].currency === "FFT") {
              this.FFT = list[i].available.toFixed(4);
            }
            if (list[i].currency === "ETH") {
              this.ETH = list[i].available.toFixed(6);
            }
          }
        })
        .catch(e => {
          // console.log("e = "+e.code)
        });
    },
    getTicker_list() {
      if ("/exchange" == this.$route.path) {
      } else {
        // clearTimeout(this.ticker_timer1);
        return;
      }
      // clearTimeout(this.ticker_timer1);
      var coinType = "FFC"
      if (
        this.currency_to_currency == "OSC_FFT" ||
        this.currency_to_currency == "EGD_FFT"||
        this.currency_to_currency == "FFTS_FFT"||
        this.currency_to_currency == "DNA_FFT"
      ){
          coinType = "TTF"
      }
      market
        .ticker_list(coinType)
        .then(data => {
          // this.ticker_timer1 = setTimeout(this.getTicker_list, 5000);
          if(data.data.tickers.OSC_FFT!=null){
            let OSC_FFT = data.data.tickers.OSC_FFT;
            this.oscfft_amount = OSC_FFT.amount.toFixed(2);
            this.oscfft_buy = OSC_FFT.buy.toFixed(4);
            this.oscfft_high = OSC_FFT.high.toFixed(4);
            this.oscfft_low = OSC_FFT.low.toFixed(4);
            this.oscfft_sell = OSC_FFT.sell.toFixed(4);
            this.oscfft_volume = OSC_FFT.volume.toFixed(2);
            this.oscfft_last = OSC_FFT.last.toFixed(4);
            this.oscfft_open = OSC_FFT.open.toFixed(4);

          let EGD_FFT = data.data.tickers.EGD_FFT;
          this.egdfft_amount = EGD_FFT.amount.toFixed(2);
          this.egdfft_buy = EGD_FFT.buy.toFixed(4);
          this.egdfft_high = EGD_FFT.high.toFixed(4);
          this.egdfft_low = EGD_FFT.low.toFixed(4);
          this.egdfft_sell = EGD_FFT.sell.toFixed(4);
          this.egdfft_volume = EGD_FFT.volume.toFixed(2);
          this.egdfft_last = EGD_FFT.last.toFixed(4);
          this.egdfft_open = EGD_FFT.open.toFixed(4);

          let FFTS_FFT = data.data.tickers.FFTS_FFT;
          this.fftsfft_amount = FFTS_FFT.amount.toFixed(2);
          this.fftsfft_buy = FFTS_FFT.buy.toFixed(4);
          this.fftsfft_high = FFTS_FFT.high.toFixed(4);
          this.fftsfft_low = FFTS_FFT.low.toFixed(4);
          this.fftsfft_sell = FFTS_FFT.sell.toFixed(4);
          this.fftsfft_volume = FFTS_FFT.volume.toFixed(2);
          this.fftsfft_last = FFTS_FFT.last.toFixed(4);
          this.fftsfft_open = FFTS_FFT.open.toFixed(4);

          let DNA_FFT = data.data.tickers.DNA_FFT;
          this.dnafft_amount = DNA_FFT.amount.toFixed(2);
          this.dnafft_buy = DNA_FFT.buy.toFixed(4);
          this.dnafft_high = DNA_FFT.high.toFixed(4);
          this.dnafft_low = DNA_FFT.low.toFixed(4);
          this.dnafft_sell = DNA_FFT.sell.toFixed(4);
          this.dnafft_volume = DNA_FFT.volume.toFixed(2);
          this.dnafft_last = DNA_FFT.last.toFixed(4);
          this.dnafft_open = DNA_FFT.open.toFixed(4);

            return ;
          }
          let OSC_FFC = data.data.tickers.OSC_FFC;
          this.osc_amount = OSC_FFC.amount.toFixed(2);
          this.osc_buy = OSC_FFC.buy.toFixed(3);
          this.osc_high = OSC_FFC.high.toFixed(3);
          this.osc_low = OSC_FFC.low.toFixed(3);
          this.osc_sell = OSC_FFC.sell.toFixed(3);
          this.osc_volume = OSC_FFC.volume.toFixed(2);
          this.osc_last = OSC_FFC.last.toFixed(3);
          this.osc_open = OSC_FFC.open.toFixed(3);

         

          let EGD_FFC = data.data.tickers.EGD_FFC;
          this.egd_amount = EGD_FFC.amount.toFixed(2);
          this.egd_buy = EGD_FFC.buy.toFixed(3);
          this.egd_high = EGD_FFC.high.toFixed(3);
          this.egd_low = EGD_FFC.low.toFixed(3);
          this.egd_sell = EGD_FFC.sell.toFixed(3);
          this.egd_volume = EGD_FFC.volume.toFixed(2);
          this.egd_last = EGD_FFC.last.toFixed(3);
          this.egd_open = EGD_FFC.open.toFixed(3);

          

          let FFTS_FFC = data.data.tickers.FFTS_FFC;
          this.ffts_amount = FFTS_FFC.amount.toFixed(2);
          this.ffts_buy = FFTS_FFC.buy.toFixed(3);
          this.ffts_high = FFTS_FFC.high.toFixed(3);
          this.ffts_low = FFTS_FFC.low.toFixed(3);
          this.ffts_sell = FFTS_FFC.sell.toFixed(3);
          this.ffts_volume = FFTS_FFC.volume.toFixed(2);
          this.ffts_last = FFTS_FFC.last.toFixed(4);
          this.ffts_open = FFTS_FFC.open.toFixed(3);

          





         let DNA_FFC = data.data.tickers.DNA_FFC;
          this.dna_amount = DNA_FFC.amount.toFixed(2);
          this.dna_buy = DNA_FFC.buy.toFixed(3);
          this.dna_high = DNA_FFC.high.toFixed(3);
          this.dna_low = DNA_FFC.low.toFixed(3);
          this.dna_sell = DNA_FFC.sell.toFixed(3);
          this.dna_volume = DNA_FFC.volume.toFixed(2);
          this.dna_last = DNA_FFC.last.toFixed(4);
          this.dna_open = DNA_FFC.open.toFixed(3);

          



          let DGC_FFC = data.data.tickers.DGC_FFC;
          this.dgc_amount = DGC_FFC.amount.toFixed(2);
          this.dgc_buy = DGC_FFC.buy.toFixed(3);
          this.dgc_high = DGC_FFC.high.toFixed(3);
          this.dgc_low = DGC_FFC.low.toFixed(3);
          this.dgc_sell = DGC_FFC.sell.toFixed(3);
          this.dgc_volume = DGC_FFC.volume.toFixed(2);
          this.dgc_last = DGC_FFC.last.toFixed(3);
          this.dgc_open = DGC_FFC.open.toFixed(3);
          let XDAG_FFC = data.data.tickers.XDAG_FFC;
          this.xdag_amount = XDAG_FFC.amount.toFixed(2);
          this.xdag_buy = XDAG_FFC.buy.toFixed(3);
          this.xdag_high = XDAG_FFC.high.toFixed(3);
          this.xdag_low = XDAG_FFC.low.toFixed(3);
          this.xdag_sell = XDAG_FFC.sell.toFixed(3);
          this.xdag_volume = XDAG_FFC.volume.toFixed(2);
          this.xdag_last = XDAG_FFC.last.toFixed(3);
          this.xdag_open = XDAG_FFC.open.toFixed(3);

          let FFT_FFC = data.data.tickers.FFT_FFC;
          this.fft_amount = FFT_FFC.amount.toFixed(2);
          this.fft_buy = FFT_FFC.buy.toFixed(3);
          this.fft_high = FFT_FFC.high.toFixed(3);
          this.fft_low = FFT_FFC.low.toFixed(3);
          this.fft_sell = FFT_FFC.sell.toFixed(3);
          this.fft_volume = FFT_FFC.volume.toFixed(2);
          this.fft_last = FFT_FFC.last.toFixed(3);
          this.fft_open = FFT_FFC.open.toFixed(3);
          let ETH_FFC = data.data.tickers.ETH_FFC;
          this.eth_amount = ETH_FFC.amount.toFixed(2);
          this.eth_buy = ETH_FFC.buy.toFixed(2);
          this.eth_high = ETH_FFC.high.toFixed(2);
          this.eth_low = ETH_FFC.low.toFixed(2);
          this.eth_sell = ETH_FFC.sell.toFixed(2);
          this.eth_volume = ETH_FFC.volume.toFixed(4);
          this.eth_last = ETH_FFC.last.toFixed(2);
          this.eth_open = ETH_FFC.open.toFixed(2);

          let CBC_FFC = data.data.tickers.CBC_FFC;
          this.cbc_amount = CBC_FFC.amount.toFixed(2);
          this.cbc_buy = CBC_FFC.buy.toFixed(3);
          this.cbc_high = CBC_FFC.high.toFixed(3);
          this.cbc_low = CBC_FFC.low.toFixed(3);
          this.cbc_sell = CBC_FFC.sell.toFixed(3);
          this.cbc_volume = CBC_FFC.volume.toFixed(2);
          this.cbc_last = CBC_FFC.last.toFixed(3);
          this.cbc_open = CBC_FFC.open.toFixed(3);
        })
        .catch(e => {});
    }
  },

  beforeDestroy: function() {
    if (this.refresh_timer != null) {
      window.clearInterval(this.refresh_timer);
    }
  }
};
</script>

<style lang="scss" scope>
@import "../assets/css/exchange.scss";
</style>

