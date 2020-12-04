import METHODS from "./core";
import KEY from "./constant";

export default {
    install(Vue) {
        Vue.prototype.$storage = this
    },
    //保存导航状态
    setActive(val) {
        console.log(val);
        METHODS.setSession(KEY.ACTIVE, val)
    },
    //读取导航状态
    getActive() {
        return METHODS.getSession(KEY.ACTIVE)
    },
    //保存token
    saveToken(val) {
        METHODS.setLocal(KEY.TOKEN, val);
    },
    //读取token
    getToken() {
        return METHODS.getLocal(KEY.TOKEN);
    },
    //退出登录
    exit() {
        METHODS.removeLocalStorage(KEY.TOKEN);
        this.removeUserInfo();
    },
    //保存用户信息
    saveUserInfo(val) {
        METHODS.setLocalStorage(KEY.USERINFO, val);
    },
    //读取用户信息
    readUserInfo() {
        return METHODS.getLocalStorage(KEY.USERINFO);
    },
    //删除用户信息
    removeUserInfo() {
        METHODS.removeLocalStorage(KEY.USERINFO);
    },
    //保存用户页面权限
    saveRule(val) {
        METHODS.setSessionStorage(KEY.RULE, val);
    },
    //读取用户页面权限数据
    readRule() {
        return METHODS.getSessionStorage(KEY.RULE);
    }
}