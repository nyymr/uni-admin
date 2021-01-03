// 导入axios对象
import axios from "axios"
import { Loading } from 'element-ui';
const loading = {
    LoadingService: null,
    open() {
        if (this.LoadingService == null) {
            this.LoadingService = Loading.service({
                target: '#loading',
                text: '正在加载中请稍后·······',
                background: 'rgba(255,255,255,0.8)',
            })
        }
    },
    close() {
        if (this.LoadingService != null) {
            this.LoadingService.close()
        }
        this.LoadingService = null
    },
}

// loading.open()
// loading.close()

// 2.用axios创建一个axios的实例
const Server = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, //根域名
    timeout: 10000, //超时时间
})

// 3.定义请求拦截器
Server.interceptors.request.use((config) => {

    loading.open()
    //请求头中添加token
    let token = window.localStorage.getItem('token');
    if (token) {
        config.headers['token'] = token
    }



    return config
}), (error) => {
    loading.close()
    return Promise.reject(error)
}

// 定义相应拦截器
Server.interceptors.response.use((response) => {
    // 过滤响应回来的数据，取出data中的值
    loading.close()
    if (response.status == 200) {
        return response.data
    }

}), (error) => {
    loading.close()
    return Promise.reject(error)
}

// 定义抛出对象
export default Server