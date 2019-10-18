<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="main" style="width: 600px;height: 800px;"></div>
</template>
<script>
//import echarts from 'echarts'
export default {
  name: "",
  data() {
    return {
      charts: "",
      opinion: ["FFT", "OSC", "XDAG", "DGC", "CBC", "ETH"],
      opinionData: [
        { value: 335, name: "FFT" },
        { value: 310, name: "OSC" },
        { value: 234, name: "XDAG" },
        { value: 135, name: "DGC" },
        { value: 135, name: "CBC" },
        { value: 1548, name: "ETH" }
      ]
    };
  },
  methods: {
    drawPie(id) {
      this.charts = this.$echarts.init(document.getElementById(id));
      this.charts.setOption({
        title: {
          text: "本期待分配收入",
          subtext: "交易挖矿",
          // x: "center"
          y: "80"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          // orient: "vertical",
          // x: "left",
          orient: "horizontal",
          y: "bottom",
          data: this.opinion
        },
        calculable: true,
        series: [
          {
            name: "本期待分配收入",
            type: "pie",
            radius: "55%",
            center: ["50%", "70%"],
            data: this.opinionData
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