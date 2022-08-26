<template>
  <div>
    <el-card style="margin: 20px"
      ><CategorySelect @getCategoryId="getCategoryId" :show="show != 0"
    /></el-card>
    <el-card>
      <div v-show="show==0">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpus">添加Spu</el-button></el-button>
        <el-table style="width: 100%" boder :data="rocodes">
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width"></el-table-column>
          <el-table-column prop="description" label="spu描述" width="width"></el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="success" icon="el-icon-plus" size="mini" title="添加sku" @click="addSku(row)"></el-button>
              <el-button type="primary" icon="el-icon-edit"  size="mini" title="修改spu" @click="updataSpus(row)"></el-button>
              <el-button type="warning" icon="el-icon-info"  size="mini" title="spu的信息" @click="findSouInfo(row)"></el-button>
              <el-button type="danger" icon="el-icon-delete"  size="mini" title="删除spu" @click="deleteSpu(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
        style="text-align:center"
          :current-page="page"
          :page-sizes="[limit, 4, 5]"
          :page-size="limit"
          layout="prev, pager, next, jumper , -> , sizes,total"
          :total="total"
          @current-change="changePages"
          @size-change="changLimit"
          >
        </el-pagination>
      </div>
      <addSku v-show="show == 1" @changeShow="changeshow" ref="addSpu"></addSku>
      <updataSku v-show="show == 2" ref="addSku" @changeShow="changeshow"></updataSku>
      <!-- 对话框 -->
      <el-dialog :title="`${spu.spuName}的sku信息`" :visible.sync="dialogTableVisible" :before-close="close">
        <!-- sku的table列表 -->
        <el-table style="width:100%" :data="sku" border v-loading="loading">
          <el-table-column  prop="skuName" label="名称" width="width"> </el-table-column>
          <el-table-column  prop="price" label="价格" width="width"> </el-table-column>
          <el-table-column  prop="weight" label="重量" width="width"> </el-table-column>
          <el-table-column  prop="prop" label="默认图片" width="width">
              <template slot-scope="{row,$index}">
                <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px">
              </template>            
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
// 引入组件
import addSku from "./addSku";
import updataSku from "./updataSku";
export default {
  name: "Spu",
  // 注册组件
  components: { addSku, updataSku },
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      page: 1,
      limit: 3,
      rocodes: [],
      total: 0,
      // 管理三个模块的显示与隐藏
      show: 0,
      // 对话框的显示
      dialogTableVisible:false,
      // c存储spu
      spu:{},
      // 存储spu的sku数据
      sku:[],
      // 控制加载效果
      loading:true,
    };
  },
  methods: {
    // 三级联动的自定义事件，可以将子组件的相应的id传给父组件
    getCategoryId({ categoryId, levent }) {
      if (levent == 1) {
        // categoryId:获取到的几级Id levent:是第几ID
        this.category1Id = categoryId;
        // 更改一级Id的时候，清楚二三级Id
        this.category2Id = "";
        this.category3Id = "";
      } else if (levent == 2) {
        // 更改二级Id的时候，清楚三级Id
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        // 发请求获取相应的数据
        this.getAttrList();
      }
    },
    // 当有三级Id的时候，获取数据
    async getAttrList() {
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (result.code == 200) {
        this.total = result.data.total;
        this.rocodes = result.data.records;
      }
    },
    // 点击那页，跳转到那页的回调
    changePages(page) {
      this.page = page;
      this.getAttrList();
    },
    // table中显示多少行数据
    changLimit(limit) {
      this.limit = limit;
      this.getAttrList();
    },
    // 添加spu的回调,需要传递三级ID
    addSpus() {
      //展示addSpu组件
      this.show = 1;
      // 获取子组件addSku
      this.$refs.addSpu.getInfo(this.category3Id);
    },
    // 修改spu的回调，需带上参数row
    updataSpus(row) {
      this.show = 1;
      // 获取子组件 注册子组件时绑定一个ref this.$refs.(ref的名字)
      // console.log(this.$refs.addSpu);
      this.$refs.addSpu.initSpuList(row);
    },
    // 自定义事件的回调
    changeshow({ show, flag }) {
      this.show = show;
      // flag用来区分是添加的保存还是修改的保存
      if (flag == "修改") {
        this.getAttrList(this.page);
      } else {
        this.getAttrList();
      }
      // 子组件获取更新数据后，通知父组件更新数据
    },
    // 删除spu
    async deleteSpu(row) {
      // this. rocodes.splice(index,1);
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      console.log(result);
      if (result.code == 200) {
        //   // 错误写法
        //   // this.rocodes.splice(index, 1);
        //   // 正确写法
        //   //删除成功的提示
        this.$message({ type: "success", message: "删除成功" });
        //   // 再次发请求,获取数据
        this.getAttrList();
      }
    },
    //添加sku ,调用子组件的方法,发送请求
    addSku(row) {
      this.show = 2;
      this.$refs.addSku.getSkuInfo(
        row,
        this.category1Id,
        this.category2Id,
        this.category3Id
      );
    },
    // 查询spu信息按钮的回调
    async findSouInfo(row) {
      // 切换对话框
      this.dialogTableVisible = true;
      // 储存row
      this.spu = row;
      // 发请求，获取数据
      let result = await this.$API.sku.reqFindSkuList(row.id);
      if(result.code == 200){
        this.sku = result.data;
        // 数据获取了，取消加载效果
        this.loading = false;
      }
    },
    // 关闭对话框的回调 ,用loading的问题，需要清楚数据和加载设置为true
    close(done){
        this.loading = true;
        this.sku = [];
        done();
    }
  },
};
</script>

<style>
</style>