// 引入request
import request from '@/utils/request'


// 引入spu列表数据
export const reqSpuList = (page,limit,category3Id) =>request({url:`/admin/product/${page}/${limit}`,method:'get',params:{category3Id}})

// 获取Spu信息
export const reqInfoSou = (spuId) =>request({url:`/admin/product/getSpuById/${spuId}`,method:'get'})

// 获取品牌的数据接口
export const reqTradeMarkListss = ()=>request({url:'/admin/product/baseTrademark/getTrademarkList',method:'get'})

// 获取品牌图片的接口
export const reqIamgesList =(spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})

// 获取品牌的销售属性 一共就三个销售属性
export const reqSaleAttrList =()=>request({url:'/admin/product/baseSaleAttrList',method:'get'})

// 修改数据和添加数据的接口
export const reqAddOrUpdataSpu =(spuInfo) =>{
    if(spuInfo.id){
        return request({url:'/admin/product/updateSpuInfo',method:'post',data:spuInfo})
    }else{
        return request({url:'/admin/product/saveSpuInfo',method:'post',data:spuInfo})
    }
}

// 删除spu的接口DELETE /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) =>request({url:`/admin/product/deleteSpu/${spuId}`,method:'delete'})
