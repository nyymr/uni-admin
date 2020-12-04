import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import routes from "../common/config/routes"



const router = new VueRouter({
  routes
});



export default router;
