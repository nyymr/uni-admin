import request from "../../utils/request"

export default {
    //获取商品列表
    getGoodsList(page, limit) {
        return request({
            url: `/admin/goods/${page}?limit=${limit}`,
            method:"GET",

        })
    },
    //
}