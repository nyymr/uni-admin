module.exports = {
    //配置项目打包时的路径
    publicPath: "./",
    //开发服务器配置
    devServer: {
        port: "8080",//端口号
        open: false,//项目启动完成时是否自动打开浏览器
        https: false,//是否开启https协议
        host: "localhost",//设置域名  主机名
        //配置跨域代理
        proxy: {
            //代理 匹配 /dev-api 开头的请求
            [process.env.VUE_APP_BASE_API]: {
                //目标服务器
                target: process.env.VUE_APP_SERVICE_URL,
                //是否启用websockets
                ws: true,
                //开启代理
                changOrigin: true,
                //重写路径
                pathRewrite: {
                    ["^" + process.env.VUE_APP_BASE_API]: ""
                }
            }
        }
    },
    //关闭eslint(严格规范)
    lintOnSave: false,
    //打宝石不生产 .map文件，加快打包速度
    productionSourceMap: false
}