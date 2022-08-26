<template>
  <el-card class="box-card" style="margin: 10px 0px">
    <!-- 头部 -->
    <div slot="header" class="clearfix">
      <!--  v-model="activeName" @tab-click="handleClick" -->
      <!-- 左边的tabs -->
      <el-tabs class="tabs" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visite"></el-tab-pane>
      </el-tabs>
      <!-- 右边的 -->
      <div class="data">
        <span @click="setDay">本日</span>
        <span @click="setMount">本月</span>
        <span @click="setYear">本年</span>
        <span @click="setWeek">本周</span>
        <el-date-picker
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="el-data"
          size="mini"
          v-model="data"
          value-format='yyyy-MM-dd'
        >
        </el-date-picker>
      </div>
    </div>
    <!-- 主体部分 -->
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <!-- 容器 -->
          <div class="echarts" ref="echarts"></div>
        </el-col>
        <el-col :span="6">
          <div class="rightBox">
            <h3>门店{{title}}</h3>
            <ul class="uls">
              <li>
                <span class="left">0</span>
                <span>肯德基</span>
                <span class="right">124215</span>
              </li>
              <li><span class="left">0</span>
                <span>肯德基</span>
                <span class="right">124215</span></li>
              <li><span class="left">0</span>
                <span>肯德基</span>
                <span class="right">124215</span></li>
              <li><span class="left">0</span>
                <span>肯德基</span>
                <span class="right">124215</span></li>
              <li><span class="left">0</span>
                <span>肯德基</span>
                <span class="right">124215</span></li>
              <li><span class="left">0</span>
                <span>肯德基</span>
                <span class="right">124215</span></li>
              <li><span class="left">0</span>
                <span>肯德基</span>
                <span class="right">124215</span></li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import dayjs from 'dayjs'
export default {
  data() {
    return {
      activeName: "sale",
      myEcharts:null,
      data:[]
    };
  },
  mounted() {
    this.myEcharts = echarts.init(this.$refs.echarts);
    let option = {
      title: {
        text:this.title,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 223, 400, 200, 466, 233, 566],
        },
      ],
    };
    this.myEcharts.setOption(option);
  },
  computed:{
    title(){
      return this.activeName == 'sale'? '销售额':'访问量';
    }
  },
  watch:{
    title(){
        this.myEcharts.setOption({
         title:{
          text:this.title
         }
        })
    }
  },
  methods: {
    setDay(){
      const data = dayjs().format('YYYY-MM-DD');
      this.data = [data,data];
    },
    // 
    setMount(){
       const start = dayjs().date(1).format('YYYY-MM-DD');
       const end = dayjs().date(31).format('YYYY-MM-DD');
       this.data = [start,end];
    },
    setYear(){
      const start = dayjs().startOf('year').format('YYYY-MM-DD');
      const end = dayjs().endOf('year').format('YYYY-MM-DD');
      this.data = [start,end];
    },
    setWeek(){
      const data = dayjs().day(0).format('YYYY-MM-DD');
      const data1 = dayjs().day(6).format('YYYY-MM-DD');
      this.data = [data,data1];
    }
  },
};
</script>

<style>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.data {
  position: absolute;
  right: 0;
}
.el-data {
  margin: 0px 20px;
}
.data span {
  margin: 0px 10px;
}
.tabs {
  width: 100%;
}
.echarts {
  width: 100%;
  height: 300px;
}
.rightBox{
  width: 100%;
  height: 300px;
}
.uls{
  list-style: none;
}
.uls li{
  margin: 10px 0px;
}
.left{
  float: left;
  margin-right: 10px;
}
.right{
  float:right;
}
</style>