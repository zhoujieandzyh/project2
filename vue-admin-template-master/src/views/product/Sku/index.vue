<template>
  <div>
    <el-table style="width: 100%" border :data="sku.records">
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column label="默认图片" width="width">
        <template slot-scope="{ row, $index }">
          <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(kg)" width="width">
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" width="80">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="primary"
            icon="el-icon-bottom"
            size="mini"
            v-if="row.isSale == 0"
            @click="buttomSku(row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-top"
            size="mini"
            v-else
            @click="topSku(row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            @click="showMessage"
          ></el-button>
          <el-button
            icon="el-icon-info"
            size="mini"
            @click="showSkuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--   @size-change="handleSizeChange"
      @current-change="handleCurrentChange"-->
    <!-- 分页器 -->
    <el-pagination
      :current-page="sku.page"
      :page-sizes="[1, 2, 5]"
      :page-size="sku.limit"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="sku.total"
      align="center"
      @current-change="getSkuList"
      @size-change="handleSizeChange"
    >
    </el-pagination>
    <!-- 抽屉 -->
    <el-drawer :visible.sync="drawer" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuList.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuList.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuList.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag
              type="success"
              v-for="(skuAttr, index) in skuAttrValueList"
              :key="skuAttr.id"
              style="margin-right: 10px"
              >{{ skuAttr.id }}:{{ skuAttr.valueId }}</el-tag
            >
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="150px">
            <el-carousel-item v-for="(skuIamge,index) in skuList.skuImageList" :key="skuIamge.id">
              <img :src="skuIamge.imgUrl" alt="" class="small">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      // 第几页
      page: 1,
      // 每页多少数据
      limit: 3,
      // 储存sku的数据
      sku: {},
      // 储存查看sku的数据
      skuList: {},
      // 显示与隐藏抽屉
      drawer: false,
      // 平台属性
      skuAttrValueList: [],
    };
  },
  mounted() {
    // 调用方法
    this.getSkuList();
  },
  methods: {
    // 发送请求，获取sku的数据
    async getSkuList(pages = 1) {
      this.page = pages;
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuInfoList(page, limit);
      if (result.code == 200) {
        this.sku = result.data;
      }
    },
    // 每页展示多少条数据的回调
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSkuList();
    },
    // 上架sku
    async topSku(row) {
      let result = await this.$API.sku.reqSkuTop(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "下架成功" });
        row.isSale = 0;
      }
    },
    //下架sku
    async buttomSku(row) {
      let result = await this.$API.sku.reqSkuButtom(row.id);
      if (result.code == 200) {
        row.isSale = 1;
        this.$message("下架成功");
      }
    },
    // 开发按钮的回调
    showMessage() {
      this.$message("正在开发中");
    },
    // 展示当前sku信息
    async showSkuInfo(row) {
      let result = await this.$API.sku.reqSku(row.id);
      if (result.code == 200) {
        this.drawer = true;
        this.skuList = result.data;
        this.skuAttrValueList = result.data.skuAttrValueList;
      }
    },
  },
};
</script>

<style scoped>
.el-row .el-col-5 {
  color: red;
  text-align: right;
  font-size: 16px;
}
.el-col {
  margin: 10px 10px;
}
</style>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .el-carousel__button{
    width: 20px;
    height: 20px;
    background: skyblue;
    border-radius: 50%;
  }
</style>