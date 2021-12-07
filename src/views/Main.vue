<template>
  <v-container fill-height fluid>
    <v-row class="justify-center align-center">
      <v-col cols="12" sm="4">
        <div>
          <h1>의약품 정보 검색</h1>
        </div>
        <v-radio-group v-model="radio">
          <template v-slot:label>
            <div>검색시 <strong>구분</strong>을 체크해주세요.</div>
          </template>
          <v-radio value="itemName">
            <template v-slot:label>
              <div>의약품명</div>
            </template>
          </v-radio>
          <v-radio value="entpName">
            <template v-slot:label>
              <div>업체명</div>
            </template>
          </v-radio>
          <v-radio value="efcyQesitm">
            <template v-slot:label>
              <div>효능</div>
            </template>
          </v-radio>
        </v-radio-group>
        <v-text-field
          ref="search"
          v-model="search"
          label="키워드를 입력해주세요"
          append-icon="mdi-pill"
          @click:append="doSearch({ searchKeyword: searchKeyword, radioSelected: searchKeyword })"
          @keypress.enter="doSearch({ searchKeyword: searchKeyword, radioSelected: searchKeyword })"
        >
        </v-text-field>
        <div>
          <v-alert
            v-model="alert"
            type="error"
          >
            <strong>키워드</strong> 란이 비어있습니다.
          </v-alert>
        </div>
        <div>
          <h5>본 사이트는 식품의약품안전처의 의약품개요정보(e약은요) 공공데이터를 활용한 정보를 제공하고 있습니다.</h5>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      alert : false,
    }
  },
  computed: {
    ...mapState(["searchKeyword", "radioSelected"]),
    search: {
      get() {
        return this.searchKeyword
      },
      set(val) {
        this.$store.commit("setSearchKeyword", val);
      }
    },
    radio: {
      get() {
        return this.radioSelected
      },
      set(val) {
        this.$store.commit("setSearchRadio", val);
      }
    }
  },
  methods: {
    // 검색 요청
    doSearch(val){
      if (val.radioSelected == "" || val.searchKeyword == "") {
        this.alert = true
        this.$refs.search.focus()
      } else {
        this.$store.dispatch("getMedicines", val);
        this.$router.push({ name: "Search" });
      }
    }
  }
}
</script>