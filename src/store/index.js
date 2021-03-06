import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import storage from "../utils/storage/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: storage.readUserInfo() || {},
    token: storage.getToken() || "",
    rule: storage.readRule() || [],
  },
  mutations: {
    //保存用户信息
    setUserInfo(state, data) {
      state.userInfo = data;
      storage.saveUserInfo(state.userInfo);
    },
    //保存token
    setToken(state, val) {
      state.token = val;
      storage.saveToken(state.token);
    },
    //清空vuex
    clearVueX(state) {
      // state.userInfo = {};
      // state.token = null;
      // state.rule = [];
      state = {}
    },
    //保存
    setRule(state, val) {
      state.rule = val;
      storage.saveRule(state.rule)
    }
  },
  actions: {
    changeSetToken({ commit }, token) {
      commit("setToken", token);
    },
    changeSetUser({ commit }, user) {
      commit("setUserInfo", user);
    },
    changeSetRule({ commit }, rule) {
      commit("setRule", rule);
    },
    clearVueX({ commit }) {
      commit("clearVueX");
    }
  },
  getters: {
    getRules(state) {
      return state.userInfo.ruleNames;
    },
    getRule(state) {
      return state.rule;
    }
  },
  modules: {

  }
});
