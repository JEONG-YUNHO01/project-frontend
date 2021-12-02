import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchKeyword: "",
    radioSelected: "itemName",
  },
  mutations: {
    setSearchKeyword(state, data) {
      state.searchKeyword = data
    },
    setSearchRadio(state, data) {
      state.radioSelected = data
    }
  },
  actions: {},
  modules: {},
});
