<template>
  <el-row :gutter="10">
    <el-col :span="12">
            <Search></Search>
    </el-col>
    <el-col :span="12">
        <el-card>
            <Category></Category>
        </el-card>
    </el-col>
  </el-row>
</template>

<script>
import Search from './Search';
import Category from './Category';
export default {
    components:{
        Search,Category
    }
}
</script>

<style>

</style>