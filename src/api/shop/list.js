import request from "../../utils/request"

export default {
    //获取商品列表
    getGoodsList(page, limit, tab, title) {
        return request({
            url: `/admin/goods/${page}?limit=${limit}&tab=${tab}&title=${title}`,
            method: "GET",

        })
    },
    //批量删除接口
    deleteAll(ids) {
        return request({
            url: "/admin/goods/delete_all",
            method: "POST",
            data: {
                ids
            }
        })
    },
    //审核接口
    check(id, ischeck) {
        return request({
            url: `/admin/goods/${id}/check`,
            method: "POST",
            data: {
                ischeck
            }
        })
    },
    //批量上架接口
    changestatus(ids, status) {
        return request({
            url: "/admin/goods/changestatus",
            method: "POST",
            data: {
                ids, status
            }
        })
    },
    //获取商品分类接口
    categoryData() {
        return request({
            url: "/admin/category",
            method: "GET"
        })
    }
}