const routes = [
    //根组件
    {
        path: "/",
        name: "layout",
        redirect: "/index",
        component: "Layout",
        children: [
            //首页
            {
                component: "index/index",
            },
            //相册管理
            {
                component: "image/index",
                meta: {
                    title: "相册管理"
                }
            },
            //商品列表
            {
                component: "shop/goods/list",
                meta:{
                    title:"商品列表"
                }
            },
            //商品分类
            {
                component: "shop/category/list",
                meta: {
                    title: "商品分类"
                }
            },
            //商品规格
            {
                component: "shop/sku/list",
                meta: {
                    title: "商品规格"
                }
            },
            //商品类型
            {
                component: "shop/type/list",
                meta: {
                    title: "商品类型"
                }
            },
            //商品评价
            {
                component: "shop/comment/list",
                meta: {
                    title: "商品评价"
                }
            },
            //订单管理
            {
                component: "order/order/list",
                meta: {
                    title: "订单管理"
                }
            },
            //发票管理
            {
                component: "order/invoice/list",
                meta: {
                    title: "发票管理"
                }
            },
            //售后服务
            {
                component: "order/after-sale/list",
                meta: {
                    title: "售后服务"
                }
            },
            //用户列表
            {
                component: "user/user-list/list",
                meta: {
                    title: "用户列表"
                }
            },
            //用户等级
            {
                component: "user/user-level/list",
                meta: {
                    title: "用户等级"
                }
            },
            //基础设置
            {
                component: "set/base/index",
                meta: {
                    title: "基础设置"
                }
            },
            //物流设置
            {
                component: "set/express/index",
                meta: {
                    title: "物流设置"
                }
            },
            //管理员管理
            {
                component: "set/manager/index",
                meta: {
                    title: "管理员管理"
                }
            },
            //交易设置
            {
                component: "set/payment/index",
                meta: {
                    title: "交易设置"
                }
            },
        ]
    },
    //登录
    {
        component: "login/index"
    },
    //404处理
    {
        path: "*",
        redirect: "/index"
    }

]


//封装获取路由信息的方法
let getRoutes = function () {
    //调用自动生成路由方法
    createRoute(routes);
    //返回创建的路由配置
    return routes;
}

//封装自动生成路由方法
function createRoute(arr) {

    //遍历routes路由配置内容
    for (let i = 0; i < arr.length; i++) {

        //如果数组元素中没有component，直接return 
        if (!arr[i].component) return;

        //去除index
        let val = removeIndex(arr[i].component);

        //自动生成name
        arr[i].name = arr[i].name || val.replace(/\//g, "_");

        //自动生成path
        arr[i].path = arr[i].path || `/${val}`

        //将 login/index 转成  import("../views/login/index.vue")
        let componentFun = import(`../../views/${arr[i].component}.vue`);

        //将component 转成 component: () => import("../../views/login/index.vue")
        arr[i].component = () => componentFun;

        //判断是否有子路由，如果有，递归调用
        if (arr[i].children && arr[i].children.length !== 0) {
            createRoute(arr[i].children);
        }

    }

}

//定义去除index方法
function removeIndex(str) {

    //判断最后一个“/”后面的值是不是index
    let lastIndex = str.lastIndexOf("/");
    //截取“/”后面的index
    let val = str.substring(lastIndex + 1, str.length);
    //判断截取'/'后面的值是不是index
    if (val === "index") {
        return str.substring(lastIndex, -1)
    }
    return str;
}

//导出路由配置
export default getRoutes();

