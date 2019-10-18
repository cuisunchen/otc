<template><!--https://blog.csdn.net/zgh0711/article/details/80607158-->
    <!--图表内容区域，必须给 ECharts 容器本身指定高度。不然它会使用默认高度-->
    <div class = "chart">
      <div id = "echarts" style = "height: 17.5em"></div>
    </div>
</template>

<script>
import nprogress from "nprogress";
import user from "../models/user";
import validate from "../utils/validate";
import HttpResultCode from "../utils/HttpResultCode";
import store from "../store";
import market from "../models/market";

import echarts from "echarts/lib/echarts";
import "zrender/lib/svg/svg";
import "echarts/lib/chart/line";
import "echarts/lib/chart/candlestick";
import chartUtil from "../../utils/chartUtil";

export default {
  name: "app_down",
  components: {},
  data() {
    return { chart: null };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    next();
    nprogress.done();
  },
  mounted() {
    //初始化 ECharts 实例，不能在created生命周期内初始化，因为那时候DOM还没有渲染，是找不到元素的
    this.initChart();
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    splitData(rawData) {
      var categoryData = [];
      var values = [];
      for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i]);
      }
      return {
        categoryData: categoryData,
        values: values
      };
    },
    calculateMA(dayCount) {
      var result = [];
      for (var i = 0, len = data0.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push("-");
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += data0.values[i - j][1];
        }
        result.push(sum / dayCount);
      }
      return result;
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "上证指数",
          left: 0
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        legend: {
          data: ["日K", "MA5", "MA10", "MA20", "MA30"]
        },
        grid: {
          left: "10%",
          right: "10%",
          bottom: "15%"
        },
        xAxis: {
          type: "category",
          data: data0.categoryData,
          scale: true,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          splitNumber: 20,
          min: "dataMin",
          max: "dataMax"
        },
        yAxis: {
          scale: true,
          splitArea: {
            show: true
          }
        },
        dataZoom: [
          {
            type: "inside",
            start: 50,
            end: 100
          },
          {
            show: true,
            type: "slider",
            y: "90%",
            start: 50,
            end: 100
          }
        ],
        series: [
          {
            name: "日K",
            type: "candlestick",
            data: data0.values,
            itemStyle: {
              normal: {
                color: upColor,
                color0: downColor,
                borderColor: upBorderColor,
                borderColor0: downBorderColor
              }
            },
            markPoint: {
              label: {
                normal: {
                  formatter: function(param) {
                    return param != null ? Math.round(param.value) : "";
                  }
                }
              },
              data: [
                {
                  name: "XX标点",
                  coord: ["2013/5/31", 2300],
                  value: 2300,
                  itemStyle: {
                    normal: { color: "rgb(41,60,85)" }
                  }
                },
                {
                  name: "highest value",
                  type: "max",
                  valueDim: "highest"
                },
                {
                  name: "lowest value",
                  type: "min",
                  valueDim: "lowest"
                },
                {
                  name: "average value on close",
                  type: "average",
                  valueDim: "close"
                }
              ],
              tooltip: {
                formatter: function(param) {
                  return param.name + "<br>" + (param.data.coord || "");
                }
              }
            },
            markLine: {
              symbol: ["none", "none"],
              data: [
                [
                  {
                    name: "from lowest to highest",
                    type: "min",
                    valueDim: "lowest",
                    symbol: "circle",
                    symbolSize: 10,
                    label: {
                      normal: { show: false },
                      emphasis: { show: false }
                    }
                  },
                  {
                    type: "max",
                    valueDim: "highest",
                    symbol: "circle",
                    symbolSize: 10,
                    label: {
                      normal: { show: false },
                      emphasis: { show: false }
                    }
                  }
                ],
                {
                  name: "min line on close",
                  type: "min",
                  valueDim: "close"
                },
                {
                  name: "max line on close",
                  type: "max",
                  valueDim: "close"
                }
              ]
            }
          },
          {
            name: "MA5",
            type: "line",
            data: calculateMA(5),
            smooth: true,
            lineStyle: {
              normal: { opacity: 0.5 }
            }
          },
          {
            name: "MA10",
            type: "line",
            data: calculateMA(10),
            smooth: true,
            lineStyle: {
              normal: { opacity: 0.5 }
            }
          },
          {
            name: "MA20",
            type: "line",
            data: calculateMA(20),
            smooth: true,
            lineStyle: {
              normal: { opacity: 0.5 }
            }
          },
          {
            name: "MA30",
            type: "line",
            data: calculateMA(30),
            smooth: true,
            lineStyle: {
              normal: { opacity: 0.5 }
            }
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scope>
@import "../assets/css/app_down.scss";
</style>
