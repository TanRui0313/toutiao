/**
 * vuex板块，向外导出
 */

import Vue from "vue";
import Vuex from "vuex";
import user from "./user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user
  },
  getters: {
    tokens: state => state.user.tokens
  }
});
