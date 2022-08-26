import request from '@/utils/request'
//获取商品管理的信息的接口 /admin/product/baseTrademark/${page}/${limit}
export const reqGetTradeMark =(page,limit)=>request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'})

//修改品牌的接口，需要带参数 id 品牌name 品牌LOGO'/admin/product/baseTrademark/save'

//添加品牌的接口，需要带参数 品牌name 品牌LOGO /admin/product/baseTrademark/update
export const reqUpdataInfo =(trademark)=>{
    if(trademark.id){
       return  request({url:' /admin/product/baseTrademark/update',method:'put',data:trademark})
    }else{
       return  request({url:'/admin/product/baseTrademark/save',method:'post',data:trademark})
    }
}

//删除品牌的接口 /admin/product/baseTrademark/remove/{id} delete
export const reqDeleteTradeMark = (id) =>request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})