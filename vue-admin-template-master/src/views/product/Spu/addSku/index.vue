<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="spu名称">
        <el-input placeholder="Spu名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="品牌" v-model="spu.tmId">
          <el-option
            :label="tr.tmName"
            :value="tr.id"
            v-for="(tr, index) in tradeList"
            :key="tr.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="spu描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="Spu描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="Spu照片">
        <!-- 照片墙，可以上传多张照片 
        file-list 上传图片的文件列表，必须有name与url两个字段 on-preview照片墙预览的功能 已经有了数据，不需要再收集  
        :on-remove 照片删除，需要收集数据-->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImage"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <!-- 收集销售属性的name与id attrID -->
        <el-select
          :placeholder="`还有${unselete.length}个未选择`"
          v-model="attrID"
        >
          <el-option
            :label="unselete.name"
            :value="`${unselete.id}:${unselete.name}`"
            v-for="(unselete, index) in unselete"
            :key="unselete.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrID"
          @click="saleInfo"
          >添加销售属性</el-button
        >
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column
            prop="saleAttrName"
            label="属性名"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="prop" label="属性名称列表" width="width">
            <template slot-scope="{ row, $index }">
              <!-- @close="handleClose(tag)"删除属性的属性值的操作-->
              <el-tag
                :key="tag.id"
                v-for="(tag,index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                 @close="row.spuSaleAttrValueList.splice(index,1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!--  @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm" -->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <!--  @click="showInput" -->
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleList(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="80" align="center">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteRow(row,$index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addAndUpdataSpu">保存</el-button>
        <el-button @click="goShow" >取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "addspu",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      attrID: "",
      // 收集spu的全部信息
      //spu属性初始化的时候是一个空的对象,在修改SPU的时候，会想服务器发请求，返回SPU信息（对象），在修改的时候可以利用服务器返回的这个对象收集最新的数据提交给服务器
      //添加SPU，如果是添加SPU的时候并没有向服务器发请求，数据收集到哪里呀[SPU]，收集数据的时候有哪些字段呀，看文档
      spu: {
        //三级分类的id
        category3Id: 0,
        //
        //描述
        description: "",
        //spu名称
        spuName: "",
        //平台的id
        tmId: "",
        //收集SPU图片的信息
        spuImageList: [
          // {
            // id: 0,
            // imgName: "string",
            // imgUrl: "string",
            // spuId: 0,
          // },
        ],
        //平台属性与属性值收集
        spuSaleAttrList: [
        //   {
        //     // baseSaleAttrId: 0,
        //     // id: 0,
        //     // saleAttrName: "string",
        //     // spuId: 0,
        //     spuSaleAttrValueList: [
        //       {
        //         // baseSaleAttrId: 0,
        //         // id: 0,
        //         // isChecked: "string",
        //         // saleAttrName: "string",
        //         // saleAttrValueName: "string",
        //         // spuId: 0,
        //       },
        //     ],
        //   },
        ],
      },
      tradeList: [], //储存品牌的信息
      spuImage: [], //储存品牌图片
      spuSale: [], //储存品牌的销售属性
    };
  },
  methods: {
    // 照片墙删除的回调
    handleRemove(file, fileList) {
      // file删除的那张图片
      // fileList剩余还有多少张图片
      // console.log(file, fileList);
      // 删除图片后，将剩余图片收集到spuImage中，但图片中含有name与url字段，需要处理
      this.spuImage = fileList;
    },
    // 照片墙预览功能的回调
    handlePictureCardPreview(file) {
      // 将照片的地址赋值给dialogImageUrl
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片上传成功的回调
    handleSuccess(response, file, fileList) {
      this.spuImage = fileList;
    },
    // 自定义事件，控制show的值
    goShow() {
      // 取消的回调
      this.$emit("changeShow", {show:0,flag:''});
       //清理数据
      //Object.assign:es6中新增的方法可以合并对象
      //组件实例this._data,可以操作data当中响应式数据
      //this.$options可以获取配置对象，配置对象的data函数执行，返回的响应式数据为空的
      Object.assign(this._data, this.$options.data());
    },
    // 初始化数据，在这里发请求
    // 不能在mounted中发请求
    async initSpuList(spu) {
      // 获取spu信息
      let spuList = await this.$API.spu.reqInfoSou(spu.id);
      if (spuList.code == 200) {
        this.spu = spuList.data;
      }
      // 获取全部的品牌的信息
      let tradeList = await this.$API.spu.reqTradeMarkListss();
      if (tradeList.code == 200) {
        this.tradeList = tradeList.data;
      }

      // 获取品牌图片
      let spuImages = await this.$API.spu.reqIamgesList(spu.id);
      if (spuImages.code == 200) {
        let listA = spuImages.data;
        // 遍历数据，添加name与url，动态
        listA.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuImage = spuImages.data;
      }

      // 获取销售属性
      let saleList = await this.$API.spu.reqSaleAttrList();
      if (saleList.code == 200) {
        this.spuSale = saleList.data;
      }
    },
    // 添加销售属性的回调，将收集到的name与Id 添加给spu.spuSaleAttrValueList
    saleInfo() {
      const [baseSaleAttrId, saleAttrName] = this.attrID.split(":");
      let newAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] };
      this.spu.spuSaleAttrList.push(newAttr);
      // 清空saleAttrname
      this.attrID = "";
    },
    // 添加销售属性值
    addSaleList(row) {
      // row代表整个属性值的一行，给row上添加inputVisible：控制input与按钮 inputValue：收集添加的属性值
      // 添加响应式的inputVisible 用$set
      this.$set(row, "inputVisible", true);
      // 添加响应式的inputValue
      this.$set(row, "inputValue", "");
    },
    // input失去焦点时
    handleInputConfirm(row) {
      // 将收集到的inputValue丢到属性值的数组中，还需要
      const { baseSaleAttrId, inputValue } = row;
      // 需要判断添加的属性值,不能为空
      if(inputValue.trim() == "") {
        this.$message("不能为空");
        return;
      }
      // 判断属性值是否重复 逻辑有问题
      let result = row.spuSaleAttrValueList.some(item =>{
        item.saleAttrValueName != inputValue;
      })

      row.spuSaleAttrValueList.push({
        baseSaleAttrId,
        saleAttrValueName: inputValue,
      });
      // 修改inputVisible的值
      row.inputVisible = false;
    },
    // 删除销售属性的操作
    deleteRow(row,index){
      // row是当前的属性，index是当前属性的序号
      this.spu.spuSaleAttrList.splice(index,1)
    },
    // 点击保存的回调，将收集的数据整理上传给服务器
    async addAndUpdataSpu(){
        // 整理参数
        // 将imageSpu的数据放到spu中
       this.spu.spuImageList = this.spuImage.map((item) =>{
          return {
            imageName:item.name,
            imageUrl:(item.response&&item.response.data) || item.url
          }
        })
        let result = await this.$API.spu.reqAddOrUpdataSpu(this.spu);
        if(result.code == 200){
          // 弹窗保存成功
           this.$message({ type: "success", message: "保存成功" });
          // 回到父组件
          this.$emit("changeShow", {show:0,flag:this.spu.id?'修改':'添加'});
        }
        // 清楚数据
        Object.assign(this._data, this.$options.data());
    },
    //获取添加的数据
    async getInfo(category3Id){
      // 收集三级Id
      this.spu.category3Id = category3Id;
        // 获取全部的品牌的信息
      let tradeList = await this.$API.spu.reqTradeMarkListss();
      if (tradeList.code == 200) {
        this.tradeList = tradeList.data;
      }
      // 获取销售属性
      let saleList = await this.$API.spu.reqSaleAttrList();
      if (saleList.code == 200) {
        this.spuSale = saleList.data;
      }

    }
  },
  computed: {
    // 计算剩余的销售属性
    unselete() {
      // spuSale:总的销售属性
      // spuSaleAttrList已有的销售属性
      // filter过滤真的留下
      let result = this.spuSale.filter((item) => {
        // every会返回一个bleaon值
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
      return result;
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
