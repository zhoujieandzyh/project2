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
        // data: [10, 20, 30, 40, 50, 60, 70, 80],
        show: false,
        min:0,
        max:100
      },
      yAxis: { show: false, type: "category" },
      series: {
        type: "bar",
        data: [78],
        color: "yellowgreen",
        showBackground: true,
        backgroundStyle: {
          color: "#eee",
        },
        label:{
            show:true,    
            formatter:'|' ,
            position:'right'
        },
        barWidth:10
      },
      gird: {
        left: 0,
        top: 0,
        right: 0,
        buttom: 0,
      },
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