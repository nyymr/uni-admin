import request from '@/utils/request';
export default {
    //获取相册分类列表的分页数据
    getAlbumList(page, limit) {
        return request({
            url: `/admin/imageclass/${page}?limit=${limit}`,
            method: 'GET',

        })
    },
    //获取图片列表的分页数据
    albumClass(id, page, limit, order, keyword) {
        return request({
            url: `/admin/imageclass/${id}/image/${page}?limit=${limit}&order=${order}&keyword=${keyword}`,
            method: "GET",
        })
    },
    //增加相册分类
    addAlbumName(order, name) {
        return request({
            url: "/admin/imageclass",
            method: "POST",
            data: {
                order,
                name
            }
        })
    },

    //修改相册分类
    editAlbumName(id, order, name) {
        return request({
            url: `/admin/imageclass/${id}`,
            method: "POST",
            data: {
                order,
                name
            }
        })
    },
    //删除相册分类
    albumDeleteImg(id) {
        return request({
            url: `/admin/imageclass/${id}`,
            method: "DELETE"
        })
    },
    //上传图片接口
    uploadImage(img, image_class_id) {
        return request({
            url: "/admin/image/upload",
            method: "POST",
            data: {
                img,
                image_class_id
            }
        })
    },
    //修改图片名称
    updateImgName(id, name) {
        return request({
            url: `/admin/image/${id}`,
            method: "POST",
            data: {
                name
            }
        })
    },
    //删除图片接口
    removeOneImage(id) {
        return request({
            url: `/admin/image/${id}`,
            method: "DELETE",
            data: {
                name
            }
        })
    },
    //批量删除接口
    removeActive(ids) {
        return request({
            url: "/admin/image/delete_all",
            method: "POST",
            data: {
                ids
            }
        })
    }
}