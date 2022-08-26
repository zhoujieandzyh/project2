// 引入request
import request from '@/utils/request'


// spu
//获取图片的接口
export const reqSkuImages = (spuId) =>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})

// 获取销售属性GET /admin/product/spuSaleAttrList/{spuId}
export const reqSaleList = (spuId) =>request({url: `/admin/product/spuSaleAttrList/${spuId}`,method:'get'})

// 获取品牌列表的接口
export const  reqAttrInfo =(category1Id,category2Id,category3Id)=>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})

// 
export const reqSkuInfo =(spuInfo) =>request({url:'/admin/product/saveSkuInfo',method:'post',data:spuInfo})

// 查询spu的sku信息/admin/product/findBySpuId/{spuId}
export const reqFindSkuList =(spuId) =>request({url:`/admin/product/findBySpuId/${spuId}`,method:'get'})

// sku
// 获取sku展示数据/admin/product/list/{page}/{limit}
export const reqSkuInfoList =(page,limit) =>request({url:`/admin/product/list/${page}/${limit}`,method:'get'})

// 控制sku上架的接口GET  /admin/product/onSale/{skuId}
export const reqSkuTop = (skuId) =>request({url:`/admin/product/onSale/${skuId}`,method:'get'})

// 控制sku下架的接口/admin/product/cancelSale/{skuId
export const reqSkuButtom =(skuId)=>request({url:`/admin/product/cancelSale/${skuId}`,method:'get'})

//显示sku的信息的接口 /admin/product/getSkuById/{skuId}
export const reqSku = (skuId)=>request({url:`/admin/product/getSkuById/${skuId}`,method:'get'})