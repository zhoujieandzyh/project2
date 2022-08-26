<template>
  <el-row :gutter="10">
    <el-col :span="6">
      <el-card>
        <CardSon title="总销售额" count="￥10086">
          <template slot="A">
            <span>周同比&nbsp;10%</span
            ><svg
              t="1659070274781"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3447"
              width="16"
              height="16"
            >
              <path
                d="M255.998 488.11h167.253l0.909 322.563h166.4v-322.56l167.253 0.455L506.819 165.61l-250.821 322.5z"
                fill="#1296DB"
                p-id="3448"
              ></path>
            </svg>
            <span>日同比&nbsp;10%</span
            ><svg
              t="1659070378572"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4509"
              width="16"
              height="16"
            >
              <path
                d="M512 618.666667L298.666667 405.333333h426.666666L512 618.666667z"
                fill="#1296db"
                p-id="4510"
              ></path>
            </svg>
          </template>
          <template slot="B">
            <span>日销售额&nbsp;￥10086</span>
          </template>
        </CardSon>
      </el-card>
    </el-col>
    <el-col :span="6"
      ><el-card>
        <CardSon title="访问量" count="10086">
            <template slot="A">
                <lineCharts></lineCharts>
            </template>
          <template slot="B">
            <span>日访问量&nbsp;￥10086</span>
          </template>
        </CardSon>
      </el-card></el-col
    >
    <el-col :span="6"
      ><el-card>
        <CardSon title="支付笔数" count="10086">
            <template slot="A">
                    <barCharts></barCharts>
            </template>
          <template slot="B">
            <span>转化率&nbsp;78%</span>
          </template>
        </CardSon>
      </el-card></el-col
    >
    <el-col :span="6"
      ><el-card>
        <CardSon title="运营活动效果" count="78%">
            <template slot="A">
                <processCharts />
            </template>
          <template slot="B">
            <span>周同比&nbsp;10%</span
            ><svg
              t="1659070274781"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3447"
              width="16"
              height="16"
            >
              <path
                d="M255.998 488.11h167.253l0.909 322.563h166.4v-322.56l167.253 0.455L506.819 165.61l-250.821 322.5z"
                fill="#1296DB"
                p-id="3448"
              ></path>
            </svg>
            <span>日同比&nbsp;10%</span
            ><svg
              t="1659070378572"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4509"
              width="16"
              height="16"
            >
              <path
                d="M512 618.666667L298.666667 405.333333h426.666666L512 618.666667z"
                fill="#1296db"
                p-id="4510"
              ></path>
            </svg>
          </template>
        </CardSon> </el-card
    ></el-col>
  </el-row>
</template>

<script>
import CardSon from "./CardSon";
import lineCharts from './lineCharts'
import barCharts from './barCharts'
import processCharts from './processCharts'
export default {
  components: { CardSon,lineCharts,barCharts,processCharts },
};
</script>

<style>
</style>