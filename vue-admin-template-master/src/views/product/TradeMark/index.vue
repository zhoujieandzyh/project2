<template>
  <div>
    <!-- el按钮 -->
    <el-button type="primary" @click="changeTrue">+ 添加</el-button>
    <!-- 表格 -->
    <!--
      data：数据 （是数组） 
      lable 标题 
        width：列的宽度
        align：是否居中，左，右
        prop:对应列内容的字段名，
        index:序号
    -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="品牌LOGO" width="width">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-close-notification"
            @click="updataTradeMark"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 
      分页器
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      总数据：total page-size current-page：当前是第几页 
       -->
    <el-pagination
      style="margin-top: 20px; textalign: center"
      :current-page="page"
      :page-sizes="[3, 5, 7]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,total, sizes"
      :total="total"
      @current-change="getTradeMarkList"
      @size-change="handleSizeChange"
    >
    </el-pagination>

    <!-- 显示对话框 
      dialogFormVisible：显示或隐藏对话框
    -->
    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <!-- 表单  :model 将表单收集到的数据放到一个对象中，将来表单验证需要
      Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可
      -->
      <el-form :model="tmform" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmform.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- 上传图片 upload 
          action 表单上传数据的地址
          :on-success 图片上传成功
          ：before-upload 图片上传成功之前
          -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmform.logoUrl" :src="tmform.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件,且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "trademark",
  data() {
    return {
      //代表分页器在第几页
      page: 1,
      //当前页展示多少数据
      limit: 3,
      // 数据
      list: [],
      // 总共多少条数据
      total: 0,
      dialogFormVisible: false,
      // 收集表单元素，内容不能瞎写，需要根据文档
      tmform: {
        tmName: "",
        logoUrl: "",
      },
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名字", trigger: "blur" },
          {
            min: 2,
            max: 5,
            message: "长度在 2 到 5 个字符",
            trigger: "change",
          },
        ],
        logoUrl: [
          { required: true, message: "请添加品牌LOGO", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    //获取商品列表接口
    this.getTradeMarkList();
  },
  methods: {
    //派发请求
    async getTradeMarkList(pager = 1) {
      this.page = pager;
      // console.log(this.$API);
      // console.log(this.API.trademark);
      //派发请求，获取品牌接口 需要参数，在data中初始化两个参数
      let result = await this.$API.trademark.reqGetTradeMark(
        this.page,
        this.limit
      );
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    //动态的修改当前页面有多少数据
    handleSizeChange(limit) {
      this.limit = limit;
      this.getTradeMarkList();
    },
    //显示或隐藏对话框
    changeTrue() {
      this.dialogFormVisible = true;
      (this.tmform.tmName = ""), (this.tmform.logoUrl = "");
    },
    //修改品牌
    updataTradeMark() {
      this.dialogFormVisible = true;
      (this.tmform.tmName = ""), (this.tmform.logoUrl = "");
    },
    // handleCurrentChange(pager){
    //   //修改当前的页数，pager可以获取分页器点击的页数
    //   this.page = pager;
    //   //重新派发请求
    //   this.getTradeMarkList();
    // }
    //图片上传成功时
    handleAvatarSuccess(res, file) {
      // res 图片上传成功的地址 file 图片的信息
      this.tmform.logoUrl = res.data;
    },
    // 图片上传成功之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //发请求，添加或者修改商品
    addInfo() {
      //进行表单验证
      this.$refs.ruleForm.validate(async (success) => {
        if (success) {
          // 点击确定，隐藏对话框
          this.dialogFormVisible = false;
          let result = await this.$API.trademark.reqUpdataInfo(this.tmform);
          if (result.code == 200) {
            // 判断是修改品牌还是添加品牌
            this.$message(this.tmform.id ? "修改品牌成功" : "添加品牌成功");
            //  派发请求
            this.getTradeMarkList();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除品牌 有bug
    deleteTradeMark(row) {
      this.$confirm(`是否删除${row.tmName}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await this.$API.trademark.reqDeletTradeMark(row.id);
          console.log(result);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getTradeMarkList(
              this.list.length > 1 ? this.page : this.page - 1
            );
          }
        })
        .catch(() => {
          // 删除失败的回调
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>