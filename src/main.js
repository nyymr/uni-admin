import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;


import ele from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ele);

import axios from "./utils/request";
Vue.prototype.$axios = axios;

import storage from "./utils/storage/index";
Vue.use(storage);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
