import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

import routes from "../common/config/routes"


const router = new VueRouter({
  routes,
});

//使用路由守卫对路由进行拦截
router.beforeEach((to, from, next) => {
  //获取vuex里面存储的token
  const token = window.localStorage.getItem('token');
  if (!token) {
    if (to.path == "/login") {
      next();
    } else {
      next("/login");
    }
  } else {
    if (to.path !== "/login") {
      //判断是否是404页面，如果不是进行权限验证
      if (to.name != "404") {
        //获取本地存储的当前用户页面权限的规则
        let rule = window.sessionStorage.getItem('rule')
        rule = rule ? JSON.parse(rule) : []

        let index = rule.findIndex(item => {
          return item.rule_id > 0 && item.desc === to.name
        })
        if (index === -1) {
          return next({ name: '404' })
        }
      }
      next();
    } else {
      next(from.path);
    }
  }
})



//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}
export default router;
