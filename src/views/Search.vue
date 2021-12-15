<template>
  <v-container>
    <v-card>
      <v-card-title>
        의약품 검색
        <v-spacer></v-spacer>
        <v-text-field
          ref="search"
          v-model="search"
          append-icon="mdi-magnify"
          label="키워드를 입력해주세요"
          @click:append="doSearch({ searchKeyword: search, radioSelected: radio })"
          @keypress.enter="doSearch({ searchKeyword: search, radioSelected: radio })"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <div>
        <v-alert
          v-model="alert"
          type="error"
        >
          <strong>키워드</strong>가 비어있습니다.
        </v-alert>
      </div>
      <v-card-text>
        <v-select
          v-model="radio"
          :items="selectBox"
          label="검색구분"
        ></v-select>
      </v-card-text>
      <v-data-table
        :headers="headers"
        :items="medicines"
        hide-default-footer
        @click:row="getDetail"
        :disable-sort="$vuetify.breakpoint.smAndDown"
      >
        <template v-slot:item.efcyQesitm="{ item }">
          <div v-html="item.efcyQesitm"></div>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination
          v-model="pageNo"
          :length="totalPages"
          next-icon="mdi-menu-right"
          prev-icon="mdi-menu-left"
          @input="doSearch({searchKeyword: searchKeyword, radioSelected: radio, pageNo: pageNo})"
        ></v-pagination>
      </div>
    </v-card>
    <v-dialog
      v-model="dialog"
      max-width="800"
      scrollable
    >
      <v-card
        class="mx-auto"
        outlined
      >
       <v-card-title>
          의약품 상세내역
          <v-spacer></v-spacer>
          <v-icon @click="closeDialog">mdi-close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                공개일자 : {{ drugInfo.openDe }}<br>
                수정일자 : {{ drugInfo.updateDe }}<br>
                품목기준코드 : {{ drugInfo.itemSeq }}
              </div>
              <v-list-item-title class="text-h5 mb-1 text-wrap">
                <strong>{{ drugInfo.itemName }}</strong>
              </v-list-item-title>
              <v-list-item-subtitle>{{ drugInfo.entpName }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>[의약품 사진]</v-list-item-title>
              <v-img
                max-height="200"
                max-width="300"
                :src="drugInfo.itemImage"
                eager
              ></v-img>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>[약의 효능]</v-list-item-title>
              <v-list-item-subtitle v-html="drugInfo.efcyQesitm" class="text-wrap"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>[약의 효능]</v-list-item-title>
              <v-list-item-subtitle v-html="drugInfo.efcyQesitm" class="text-wrap"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>[사용법]</v-list-item-title>
              <v-list-item-subtitle v-html="drugInfo.useMethodQesitm" class="text-wrap"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>[사용하기 전 반드시 확인해야 할 사항]</v-list-item-title>
              <v-list-item-subtitle v-html="drugInfo.atpnWarnQesitm" class="text-wrap"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>[사용시 주의사항]</v-list-item-title>
              <v-list-item-subtitle v-html="drugInfo.atpnQesitm" class="text-wrap"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>[상호작용]</v-list-item-title>
              <v-list-item-subtitle v-html="drugInfo.intrcQesitm" class="text-wrap"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>[부작용]</v-list-item-title>
              <v-list-item-subtitle v-html="drugInfo.seQesitm" class="text-wrap"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>[보관법]</v-list-item-title>
              <v-list-item-subtitle v-html="drugInfo.depositMethodQesitm" class="text-wrap"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            outlined
            rounded
            text
            @click="closeDialog"
          >
            닫기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <spinner :isLoading="isLoading"></spinner>
  </v-container>
  
</template>

<script>
import axios from "axios";
import Spinner from "../components/Spinner.vue";
import { mapState } from "vuex";

  export default {
    components: {
      Spinner,
    },
    computed: {
      ...mapState(['isLoading','totalCount', 'totalPages', 'medicines', 'searchKeyword', 'radioSelected']),
      search: {
        get() {
          return this.searchKeyword;
        },
        set(val) {
          this.$store.commit("setSearchKeyword", val);
        },
      },
      pageNo : {
        get() {
          return this.$store.state.pageNo
        },
        set(val) {
          this.$store.commit("setPageNo", val)
        }
      },
      radio: {
        get() {
          return this.radioSelected;
        },
        set(val) {
          this.$store.commit("setSearchRadio", val);
        },
      }
    },
    watch: {
      search(oldVal, NewVal) {
        if (oldVal != NewVal) {
          this.$store.commit("setClearData");
        }
      },
      radio(oldVal, NewVal) {
        if (oldVal != NewVal) {
          this.$store.commit("setClearData");
        }
      },
    },
    data: () => ({
      dialog: false,
      selectBox: [
        { text: '업체명', value: 'entpName'},
        { text: '의약품명', value: 'itemName'},
        { text: '효능', value: 'efcyQesitm'},
      ],
      headers: [
        {
          text: '업체명',
          align: 'start',
          sortable: false,
          value: 'entpName',
        },
        { text: '품목기준코드', value: 'itemSeq' },
        { text: '제품명', value: 'itemName' },
        { text: '효능', value: 'efcyQesitm' },
      ],
      drugInfo : [],
      alert : false
    }),
    methods: {
      // 의약품 검색요청
      doSearch(val) {
        if (val.radioSelected == "" || val.searchKeyword == "") {
          this.alert = true
          this.$refs.search.focus()
        } else {
          this.alert = false
          this.$store.dispatch("getMedicines", val);
        }
      },
      // 의약품 상세정보 창 닫기
      closeDialog() {
        this.dialog = false
        this.drugInfo = []
      },
      // 의약품 상세정보 취득
      getDetail(arg){
        this.$store.commit("setLoading");
        var url = process.env.VUE_APP_APIURL + "/detail?itemSeq=" + arg.itemSeq;
        axios
          .get(url)
          .then(res => {
            this.drugInfo = res.data.body.items[0]
            this.dialog = true
            this.$store.commit("setLoadingClose");
          })
          .catch(err => {
            this.$store.commit("setLoadingClose");
            console.log(err)
            alert("정보를 불러오는 도중 에러가 발생했습니다.")
          })
      },
    },
  }
</script>