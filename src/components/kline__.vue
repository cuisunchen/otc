<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="main" style="width: 100%;height: 400px;"></div>
</template>
<script>
import market from "../models/market";
export default {
  name: "",
  data() {
    return {
      candle_datas: [1, 2, 3, 4],
      symbol: "OSC_FFC",
      open_price: 0,
      high_price: 0,
      low_price: 0,
      close_price: 0,
      kline_trades: [open_price, close_price, low_price, high_price] // 开盘，收盘，最低，最高
      //
      //         {
      //           value: [5, 9, 1, 11],
    };
  },
  created() {
    // symbol=OSC_FFC&dimension=FIFTEEN_MINUTES&since=1526707799999&prevTradeTime=1526702045385
    market
      .exchange_kline(
        "OSC_FFC",
        "FIFTEEN_MINUTES",
        "1526707799999",
        60,
        "1526702045385"
      )
      .then(result => {
        if (result.code == 0) {
          this.symbol = result.data.symbol;
          var lines = result.data.lines;

          for (var i = 0; i < lines.length; i++) {
            var item = lines[i];
            // 0:1530151200000 交易时间
            // 1:1800 开盘价
            // 2:2300 最高价
            // 3:1200 最低价
            // 4:2100 收盘价
            // 5:0.4  成交量
          }
        }
      })
      .catch(e => {});
  },
  methods: {
    drawPie(id) {
      this.charts = this.$echarts.init(document.getElementById(id));
      this.charts.setOption({
        // title: {
        //   text: "全国机电产品出口总值", //标题
        //   subtext: "机电产品", //副标题
        //   top: "85%",
        //   left: "28%",
        //   textStyle: {
        //     //标题的文字样式
        //     fontSize: 16,
        //     color: "#444",
        //     "text-align": "center",
        //     "margin-top": "20px"
        //   }
        // },
        backgroundColor: "#1b1b1b", //背景色
        // tooltip: {
        //   trigger: "axis",
        //   formatter: function(params) {
        //     var res = params[0].seriesName + " " + params[0].name;
        //     res +=
        //       "<br/>  开盘 : " +
        //       params[0].value[0] +
        //       "  最高 : " +
        //       params[0].value[3];
        //     res +=
        //       "<br/>  收盘 : " +
        //       params[0].value[1] +
        //       "  最低 : " +
        //       params[0].value[2];
        //     return res;
        //   }
        // },
        // legend: {
        //   data: ["火狐狸"]
        // },
        // toolbox: {
        //   show: true,
        //   feature: {
        //     mark: { show: true },
        //     dataZoom: { show: true },
        //     dataView: { show: true, readOnly: false },
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   }
        // },
        // dataZoom: {
        //   show: true,
        //   realtime: true,
        //   start: 0,
        //   end: 50
        // },
        lineStyle: {
          width: 10, //坐标轴线线宽。
          // color: "#333", //颜色。
          color: {
            colorStops: [
              {
                offset: 0,
                color: "red", //渐变的颜色
                offset: 1,
                color: "bule"
              }
            ],
            shadowColor: "red", //阴影的颜色
            shadowBlur: 10 //阴影的宽度
          }
        },
        xAxis: [
          {
            type: "category",
            // color
            boundaryGap: true,
            axisTick: { onGap: false },
            splitLine: { show: false },
            data: ["2013/1/24", "2013/1/25"]
          }
        ],
        yAxis: [
          {
            type: "value",
            scale: true,
            boundaryGap: [0.01, 0.01]
          }
        ],
        series: [
          {
            name: "上证指数",
            type: "k",
            barMaxWidth: 20,
            itemStyle: {
              normal: {
                color: "red", // 阳线填充颜色
                color0: "lightgreen", // 阴线填充颜色
                lineStyle: {
                  width: 2,
                  color: "orange", // 阳线边框颜色
                  color0: "green" // 阴线边框颜色
                }
              },
              emphasis: {
                color: "black", // 阳线填充颜色
                color0: "white" // 阴线填充颜色
              }
            },
            data: [
              // 开盘，收盘，最低，最高
              {
                // value: [5, 9, 1, 11],
                value: this.kline_trades,
                itemStyle: {
                  normal: {
                    color0: "blue", // 阴线填充颜色
                    lineStyle: {
                      width: 3,
                      color0: "blue" // 阴线边框颜色
                    }
                  },
                  emphasis: {
                    color0: "blue" // 阴线填充颜色
                  }
                }
              },
              [1, 2, 3, 4]
              // [2295.35, 2346.5, 2295.35, 2346.92],
              // [2347.22, 2358.98, 2337.35, 2363.8],
              // [2360.75, 2382.48, 2347.89, 2383.76],
              // [2383.43, 2385.42, 2371.23, 2391.82],
              // [2377.41, 2419.02, 2369.57, 2421.15],
              // [2425.92, 2428.15, 2417.58, 2440.38],
              // [2411, 2433.13, 2403.3, 2437.42],
              // [2432.68, 2434.48, 2427.7, 2441.73],
              // [2430.69, 2418.53, 2394.22, 2433.89],
              // [2416.62, 2432.4, 2414.4, 2443.03],
              // [2441.91, 2421.56, 2415.43, 2444.8],
              // [2420.26, 2382.91, 2373.53, 2427.07],
              // [2383.49, 2397.18, 2370.61, 2397.94],
              // [2378.82, 2325.95, 2309.17, 2378.82],
              // [2322.94, 2314.16, 2308.76, 2330.88],
              // [2320.62, 2325.82, 2315.01, 2338.78],
              // [2313.74, 2293.34, 2289.89, 2340.71],
              // [2297.77, 2313.22, 2292.03, 2324.63],
              // [2322.32, 2365.59, 2308.92, 2366.16],
              // [2364.54, 2359.51, 2330.86, 2369.65],
              // [2332.08, 2273.4, 2259.25, 2333.54],
            ],
            markPoint: {
              symbol: "star",
              //symbolSize:20,
              itemStyle: {
                normal: { label: { position: "top" } }
              },
              data: [
                { name: "最高", value: 2444.8, xAxis: "2013/2/18", yAxis: 2466 }
              ]
            }
          }
        ]
      });
    }
  },
  //调用
  mounted() {
    this.$nextTick(function() {
      this.drawPie("main");
    });
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>