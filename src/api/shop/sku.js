import request from "../../utils/request";

export default {
    //获取商品规格列表的分页数据
    skuList(page, limit) {
        return request({
            url: `/admin/skus/${page}?limit=${limit}`,
            method: 'GET'
        })
    },
    //增加商品规格 //name,status,order,type,default
    addSku(data) {
        return request({
            url: "/admin/skus",
            method: 'POST'
        })
    },
    //修改商品规格//name,status,order,type,default
    editSku(id, data) {
        return request({
            url: `/admin/skus/${id}`,
            method: 'PUT',
            data
        })
    },
    //修改商品规格状态
    changeStatus(id, status) {
        return request({
            url: `/admin/skus/${id}/update_status`,
            method: 'POST',
            data: {
                status,
            }
        })
    },
    //删除商品规格
    removeSkuItem(id) {
        return request({
            url: `/admin/skus/${id}/delete`,
            method: 'POST',
        })
    },
    //批量删除商品规格
    removeSkuItems(ids) {
        return request({
            url: "/admin/skus/delete_all",
            method: "POST",
            data: {
                ids,
            }
        })
    }
}