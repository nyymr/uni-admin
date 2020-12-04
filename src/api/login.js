import request from "../utils/request";

//登录接口
export function login(username, password) {
    return request({
        url: "/admin/login",
        method: "POST",
        data: {
            username,
            password
        }
    })
}

//退出登录接口
export function logout() {
    return request({
        url: "/admin/logout",
        method: "POST",
    })
}