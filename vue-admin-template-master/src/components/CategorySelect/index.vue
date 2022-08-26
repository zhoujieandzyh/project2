<template>
  <div>
    <el-form label-width="80px" :inline="true" :v-model="cForm">
      <el-form-item label="一级分类">
        <!-- 表单内容发生变化的时候发送请求 -->
        <el-select  placeholder="请选择" v-model="cForm.category1Id" @change="handle1" :disabled="show">
          <!-- v-model收集到的是value的值 -->
          <el-option :label="c1.name" :value="c1.id" v-for="(c1,index) in list1" :key="c1.id"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="二级分类"  >
        <el-select  placeholder="请选择" v-model="cForm.category2Id"  @change="handle2" :disabled="show">
          <el-option :label="c2.name" :value="c2.id" v-for="(c2,index) in list2" :key="c2.id"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="三级分类" >
        <el-select  placeholder="请选择" v-model="cForm.category3Id" @change="handle3" :disabled="show">
          <el-option :label="c3.name" :value="c3.id" v-for="(c3,index) in list3" :key="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props:['show'],
  data() {
    return {
      // 储存一级分类的数组
      list1:[],
      // 储存二级分类的数组
      list2:[],
      // 储存三级分类数组
      list3:[],
      // 收集一级二级三级的id
      cForm:{
        category1Id:'',
        category2Id:'',
        category3Id:'',
      },
      keyword:-1
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 获取一级分类的数据
    async getData(){
      let result =await this.$API.attr.reqGetCategory1List();
      if(result.code==200){
        this.list1 = result.data;
      }
      
    },
    // 获取二级列表,当一级分类表单发生变化时，触发
    async handle1(){
      // 当表单发生变化的时候，清除上次请求残留的数据
      this.list2 = [];
      this.list3 = [];
      this.cForm.category2Id = '';
      this.cForm.category3Id = '';
      this.$emit('getCategoryId',{categoryId:this.cForm.category1Id,levent:1});
     let result = await this.$API.attr.reqGetCategory2List(this.cForm.category1Id);
     if(result.code == 200){
      this.list2 = result.data;
     }
    },
    // 获取三级分类，当二级分类表单发生变化时，触发
    async handle2(){
      // 当表单发生变化的时候，清除上次请求残留的数据
      // this.list2 = [];
      this.list3 = [];
      // this.cForm.category1Id = '';
      this.cForm.category3Id = '';
      this.$emit('getCategoryId',{categoryId:this.cForm.category2Id,levent:2});
     let result = await this.$API.attr.reqGetCategory3List(this.cForm.category2Id);
     if(result.code == 200){
      this.list3 = result.data;
     }
    },
    handle3(){
      this.$emit('getCategoryId',{categoryId:this.cForm.category3Id,levent:3});
    }
  },
};
</script>

<style>
</style>