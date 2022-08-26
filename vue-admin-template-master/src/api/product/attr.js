//引入axios
import request from '@/utils/request'

// /admin/product/getCategory1 GET 一级分类接口
export const reqGetCategory1List = () =>request({url:'/admin/product/getCategory1',method:'get'})

// /admin/product/getCategory2/{getCategory1Id} GET 二级
export const reqGetCategory2List = (Category1Id) =>request({url:`/admin/product/getCategory2/${Category1Id}`,method:'get'})

// /admin/product/getCategory3/{getCategory2Id} GET 三级
export const reqGetCategory3List = (Category2Id) =>request({url:`/admin/product/getCategory3/${Category2Id}`,method:'get'})

//获取三级联动商品列表的接口 /admin/product/attrInfoList/{Category1Id}/{Category2Id}/{Category3Id}
export const reqAttrInfoList = (Category1Id,Category2Id,Category3Id) =>request({url:`/admin/product/attrInfoList/${Category1Id}/${Category2Id}/${Category3Id}`,method:'get'})

//添加属性与属性值的接口 /admin/product/saveAttrInfo post
export const reqAddInfo =(data) =>request({url:"/admin/product/saveAttrInfo",method:'post',data})