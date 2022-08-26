<template>
   <el-card>
    <div class="search">
        <span>线上用户搜素</span>
        <i class="el-icon-more"></i>
    </div>
    <div class="echarts">
        <div class="outer">
            <span>搜索用户数</span>
            <i class="el-icon-info"></i>
        </div>
    </div>
   </el-card>
</template>

<script>
export default {

}
</script>

<style>
.search{
    display: flex;
    justify-content: space-between;
}
.echarts{
    border-top: 1px solid #eee;
}
.outer{
    margin: 10px 0px;
}
</style>