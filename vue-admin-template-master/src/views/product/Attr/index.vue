<template>
  <div>
    <el-card style="margin:20px"><CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"/></el-card>
      <el-card>
        <div v-show="isShowTable">
      <el-button type="primary" icon="el-icon-edit" @click="addAttr" :disabled="!category3Id">添加属性</el-button>
      <el-table  style="width: 100%" :data="attrList" border>
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="attrName"label="属性名称" width="150">
        </el-table-column>
        <el-table-column prop="prop" label="属性值列表"width="width">
          <template slot-scope="{row,index}">
            <el-tag v-for="(attrList,index) in row.attrValueList" :key="attrList.id" style="margin:0 20px">{{attrList.valueName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column  prop="prop" label="操作"  width="250" align="center">
          <template slot-scope="{row,$index}">
            <el-button type="success" icon="el-icon-edit" @click="addAttrUpdata(row)" size="mini">添加</el-button>
          <el-button type="primary" icon="el-icon-delete" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
        </div>
        <!-- 添加属性与修改属性 
              inline 行内表单
        -->
        <div v-show="!isShowTable">
          <!-- :model用于将表单收集到的数据给data中的attrInfo -->
            <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
              <el-form-item label="属性名">
                <!-- 收集属性名字 -->
                <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
              </el-form-item>
            </el-form>
            <el-button type="primary" icon="el-icon-plus" @click="addAttrValue"  :disabled="!attrInfo.attrName">添加属性名</el-button>
            <el-button @click="isShowTable = true">取消</el-button>
            <!-- 收集属性值  :data 用于数组-->
            <el-table style="width: 100%;margin:20px 0" border :data="attrInfo.attrValueList">
              <el-table-column type="index" label="序号"   width="100" align="center"></el-table-column>
              <el-table-column prop="prop" label="属性名名称"   width="width">  
                <template slot-scope="{row,$index}">
                  <el-input placeholder="请输入属性值" size="mini" v-model="row.valueName" v-if="row.flag" @blur="tooks(row)" @keyup.native.enter="tooks(row)" :ref="$index"> </el-input>
                  <span v-else @click="attrFocus(row,$index)" style="display:block">{{row.valueName}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="prop" label="操作"   width="200" >  
                <template slot-scope="{row,$index}">
                  <!-- el-popconfirm气泡框 -->
                  <el-popconfirm :title="`确定删除${row.valueName}`" @onConfirm="deleteAttrValue($index)">
                     <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference" ></el-button>
                  </el-popconfirm>
                </template>
                 </el-table-column>
            </el-table>
            <el-button type="primary" @click="updataAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
            <el-button @click="isShowTable = true">取消</el-button>
        </div>
    </el-card>

  </div>
</template>

<script>
// 按需引入深拷贝
import clone from "lodash/cloneDeep";
export default {
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
      isShowTable: true,
      //添加属性与修改属性d的表单
      attrInfo: {
        attrName: "",
        attrValueList: [],
        catagoryId: 0,
        categoryLevent: 3,
      },
      // 查看模式的切换
      // flag:true
    };
  },
  methods: {
    // 自定义事件的回调，获取三级联动的三个Id
    getCategoryId({ categoryId, levent }) {
      if (levent == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (levent == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        this.getAttrList();
      }
    },
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrInfoList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 添加属性
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        // 当修改属性值的时候，有三级分类的id，当新增属性值的时候，没有id 这里是响应式数据
        attrId: this.attrInfo.id,
        valueName: "",
        // 添加属性的时候，给每一个属性值携带一个glag，用于编辑模式与查看模式的切换，
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    // 切换table时，清空数据并收集三级分类的ID
    addAttr() {
      this.isShowTable = false;
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        catagoryId: this.category3Id,
        categoryLevent: 3,
      };
    },
    // 修改属性
    addAttrUpdata(row) {
      this.isShowTable = false;
      // attrInfo 里面有数组对象，所以用深拷贝
      this.attrInfo = clone(row);
      // 实现修改属性的查看模式与编辑模式
      // 不能直接添加一个flag
      this.attrInfo.attrValueList.forEach((item) => {
        // $set 第一个值 添加属性的对象 第二值 添加的属性名 第三值 属性名的属性值
        this.$set(item, "flag", false);
      });
    },
    // 查看模式与编辑模式的切换
    tooks(row) {
      // 判断用户输入的属性值是否是空白
      if (row.valueName.trim() == "") {
        this.$message("请输入正确的属性值");
        return;
      } else {
        row.flag = false;
      }
      // 判断用户输入的属性是否与已有属性相同
      // item代表属性值的所有数据
      // row代表当前属性值
      let re = this.attrInfo.attrValueList.some((item) => {
        // 需要将比较的值（row.valueName）抛出数组
        // item 代表 0 1 2    ||  row 代表 2
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      if (re) {
        return;
      } else {
        row.flag = false;
      }
    },
    // 实现表单自动聚焦
    attrFocus(row, index) {
      row.flag = true;
      this.$nextTick(() => {
        // 实现表单元素的聚焦
        this.$refs[index].focus();
      });
    },
    // 删除属性值
    deleteAttrValue(index){
       this.attrInfo.attrValueList.splice(index,1);
    },
    // 保存属性
    async updataAttr(){
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item =>{
        // 属性值的valueName不为空
        if(item.valueName != ''){
          // 删除flag
          delete item.flag;
          return true;
        }
      })
     try {
        // 成功了，发请求
        await this.$API.attr.reqAddInfo(this.attrInfo);
        this.$message(type="success", message="保存成功");
        this.getAttrList();
        this.isShowTable = true;
      } catch (error) {
        this.$message("保存失败")
      } 
      // let result =  await this.$API.attr.reqAddInfo(this.attrInfo);
      // console.log(result);
      // // this.$$message("保存成功");
      // // this.isShowTable = true;
      //  this.getAttrList();
 }
  },
};
</script>

<style>
</style>