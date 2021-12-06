import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    searchKeyword: "",
    radioSelected: "itemName",
    medicines: [],
    pageNo: 0,
    totalCount: 0,
    numOfRows: 10,
    totalPages: 0,
    clientIp: "",
  },
  mutations: {
    setSearchKeyword(state, data) {
      state.searchKeyword = data
    },
    setSearchRadio(state, data) {
      state.radioSelected = data
    },
    setPageNo(state, data) {
      state.pageNo = data
    },
    setSearchData(state, data) {
      state.pageNo = data.pageNo
      state.totalCount = data.totalCount
      state.medicines = data.items
      state.totalPages = Math.ceil( state.totalCount / state.numOfRows )
    },
    setClearData(state){
      state.pageNo = 0
      state.totalCount = 0
      state.totalPages = 0
      state.medicines = []
    },
    setLoading(state) {
      state.isLoading = true
    },
    setLoadingClose(state) {
      state.isLoading = false
    },
    setIp(state, data){
      state.clientIp = data
    },
  },
  actions: {
    // 클라이언트 아이피를 가져오는 외부API(부정 이용 클라이언트를 식별하기 위한 확장단계)
    getIp(context){
      axios
        .get("https://api.ipify.org?format=json")
        .then(res => {
          context.commit("setIp", res.data.ip)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 의약품 검색 결과 리스트 반환 API
    getMedicines(context, payload){
      context.commit("setLoading");
      var url = "http://localhost:1323/api/search?";
      if (payload.radioSelected == "itemName") {
        url += "itemName=" + payload.searchKeyword;
      } else if (payload.radioSelected == "entpName"){
        url += "entpName=" + payload.searchKeyword;
      } else {
        url += "efcyQesitm=" + payload.searchKeyword;
      }

      if (payload.pageNo == undefined) {
        url += "&pageNo=1";
        // do nothing
      } else {
        url += "&pageNo=" + payload.pageNo;
      }
      axios
        .get(url)
        .then(res => {
          if (res.data.body.totalCount == 0) {
            context.commit("setClearData")
          } else {
            context.commit("setSearchData", res.data.body)
            window.scrollTo(0, 0);
          }
          context.commit("setLoadingClose");
        })
        .catch(err => {
          context.commit("setLoadingClose");
          alert(err)
        })
    }
  },
  modules: {},
});
