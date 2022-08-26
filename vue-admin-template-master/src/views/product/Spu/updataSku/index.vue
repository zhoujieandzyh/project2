<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="SPU名称">{{ spu.spuName }}</el-form-item>
      <el-form-item label="SKU名称">
        <el-input v-model="spuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input type="number" v-model="spuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input v-model="spuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input v-model="spuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form label-width="80px" :inline="true">
          <el-form-item
            :label="attr.attrName"
            v-for="(attr, index) in attrInfos"
            :key="attr.id"
          >
            <el-select placeholder="请选择" v-model="attr.attrIdAndAttrValueId">
              <el-option
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
                v-for="(attrValue, index) in attr.attrValueList"
                :key="attrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form label-width="80px" :inline="true">
          <el-form-item
            :label="sale.saleAttrName"
            v-for="(sale, index) in saleLists"
            :key="sale.id"
          >
            <el-select
              placeholder="placeholder"
              v-model="sale.saleIdAndSaleValueId"
            >
              <el-option
                :label="saleValue.saleAttrValueName"
                :value="`${sale.id}:${saleValue.id}`"
                v-for="(saleValue, index) in sale.spuSaleAttrValueList"
                :key="saleValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          style="width: 100%"
          border
          :data="images"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            align="center"
            prop="prop"
            type="selection"
            width="50"
          ></el-table-column>
          <el-table-column align="center" prop="prop" label="图片">
            <template slot-scope="{ row, $index }">
              <img :src="row.imgUrl" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="imgName"
            label="名称"
          ></el-table-column>
          <el-table-column align="center" prop="prop" label="操作">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                v-if="row.isDefault == 0"
                @click="changes(row)"
                >设置默认</el-button
              >
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="setSkuInfo">保存</el-button>
        <el-button @click="goShow">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "addSku",
  data() {
    return {
      //储存平台属性
      attrInfos: [],
      // 储存图片列表
      images: [],
      // 储存销售属性
      saleLists: [],
      // 储存收集的spuInfo
      spuInfo: {
        // 第一类 父组件带过来的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 第二类，通过v-model收集的数据
        skuName: "",
        price: 0,
        weight: "",
        skuDesc: "",
        // 第三类，自己书写代码
        //默认图片
        skuDefaultImg: "",
        // 平台属性的信息
        skuAttrValueList: [
          // {
          //   // attrId: 0,
          //   // valueId: 0,
          // },
        ],
        // 图片的信息
        skuImageList: [
          // {
          //   // id: 0,
          //   // imgName: "string",
          //   // imgUrl: "string",
          //   // isDefault: "string",
          //   // skuId: 0,
          //   // spuImgId: 0,
          // },
        ],
        // 销售属性的信息
        skuSaleAttrValueList: [
          // {
          //   // saleAttrId: 0,
          //   // saleAttrName: "string",
          //   // saleAttrValueId: 0,
          //   // saleAttrValueName: "string",
          //   // skuId: 0,
          //   // spuId: 0,
          // },
        ],
      },
      // shou收集图片信息
      skuImages: [],
      spu: {},
    };
  },
  methods: {
    // 来自父组件的数据，发请求
    async getSkuInfo(row, category1Id, category2Id, category3Id) {
      // 收集来自父组件的数据
      this.spuInfo.category3Id = category3Id;
      this.spuInfo.spuId = row.id;
      this.spuInfo.tmId = row.tmId;
      this.spu = row;
      // 获取平台属性
      let attrInfo = await this.$API.sku.reqAttrInfo(
        category1Id,
        category2Id,
        category3Id
      );
      if (attrInfo.code == 200) {
        this.attrInfos = attrInfo.data;
      }
      // 获取图片属性
      let image = await this.$API.sku.reqSkuImages(row.id);
      if (image.code == 200) {
        let list = image.data;
        // 获取图片属性的时候，加上一个isDefault属性 控制两个按钮的切换
        list.forEach((item) => {
          item.isDefault = 0;
        });
        this.images = list;
      }
      // 获取销售属性
      let saleList = await this.$API.sku.reqSaleList(row.id);
      if (saleList.code == 200) {
        this.saleLists = saleList.data;
      }
    },
    // 取消按钮的回调
    goShow() {
      this.$emit("changeShow", { show: 0, flag: "" });
    },
    // 勾选框切换的回调
    handleSelectionChange(params) {
      // 收集图片的信息
      this.skuImages = params;
    },
    // 点击设置默认按钮时，切换按钮
    changes(row) {
      this.images.forEach((item) => {
        item.isDefault = 0;
      });
      row.isDefault = 1;
      this.skuDefaultImg = row.imgUrl;
    },
    // 点击保存按钮时，整理数据，发请求
    async setSkuInfo() {
      // 整理平台属性
      // 第一种方法
      // let attr = []
      // this.attrInfos.forEach((item) => {
      //   if (item.attrIdAndAttrValueId) {
      //     const [attrId, valueId] = item.attrIdAndAttrValueId.split(":");
      //     let obj = {attrId,valueId};
      //     attr.push(obj);
      //   }
      // });
      // this.spuInfo.skuAttrValueList = attr;
      // 第二种方法 用reduce
      this.spuInfo.skuAttrValueList = this.attrInfos.reduce((p, item) => {
        if (item.attrIdAndAttrValueId) {
          const [attrId, valueId] = item.attrIdAndAttrValueId.split(":");
          p.push({attrId,valueId});
        }
        return p;
      }, []);
      // 收集销售属性
      let attr1 = [];
      this.saleLists.forEach(item =>{
        if(item.saleIdAndSaleValueId){
          const [saleAttrId,saleAttrValueId] = item.saleIdAndSaleValueId.split(':');
          let obj = {saleAttrId,saleAttrValueId};
          attr1.push(obj);
        }
      })
      this.spuInfo.skuSaleAttrValueList = attr1;
      // 整理图片属性
      //map 映射数组，返回一个新数组
      this.spuInfo.skuImageList = this.images.map(item =>{
        return {
            imgName:item.imgName,
            imgUrl:item.imgUrl,
            isDefault:item.isDefault,
            spuImgId:item.id,
        }
      });
      // 整理完毕，发请求，更新数据
      let result =  await this.$API.sku.reqSkuInfo(this.spuInfo);
      console.log(result);
      if(result.code == 200){
        this.$message({type:'success',message:'保存成功'});
        // 跳转到父组件
        this.$emit("changeShow", { show: 0, flag: "" });

      }
    },
  },
};
</script>

<style>
</style>