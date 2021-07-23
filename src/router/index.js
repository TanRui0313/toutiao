/*
 * @Author: TR
 * @Date: 2021-07-23 19:43:19
 * @LastEditors: no BUG
 * @LastEditTime: 2021-07-23 20:29:37
 * @Description: line code four BUG
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login")
  }
];

const router = new VueRouter({
  routes
});

export default router;
