<template>
  <div class="ehcarts" ref="echarts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  //    组件挂载完毕时，初始化echarts
  mounted() {
    let myEcharts = echarts.init(this.$refs.echarts);
    myEcharts.setOption({
      xAxis: {
        data: [10, 20, 30, 40, 50, 60, 70, 80],
        show: false,
      },
      yAxis: { show: false },
      series: {
        type: "bar",
        data: [12, 14, 25, 12, 34, 12, 34, 56],
      },
      gird: {
        left: 0,
        top: 0,
        right: 0,
        buttom: 0,
      },
      tooltip:{}
    });
  },
};
</script>

<style>
.ehcarts {
  width: 100%;
  height: 100%;
}
</style>