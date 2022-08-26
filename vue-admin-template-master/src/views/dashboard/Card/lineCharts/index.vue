<template>
  <div class="echarts" ref="ec"></div>
</template>

<script>
// 直接引入echarts报错，需要加一个*as
import * as echarts from "echarts";
export default {
  // 初始化echarts实例
  // 组件挂载完毕初始化
  mounted() {
    let myEcharts = echarts.init(this.$refs.ec);
    myEcharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: { show: false },
      series: [
        {
          type: "line",
          data: [10, 23, 51, 22, 62],
          // 去掉拐点
          itemStyle: {
            opacity: 0,
          },

          lineStyle: {
            color: "purple",
          },
          //  填充颜色

          areaStyle: {
            color:{
                  type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "red", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "purple", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },                  
        },
        }
      ],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      tooltip:{}
    });
  },
};
</script>

<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>