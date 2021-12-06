<template>
  <v-container>
    <v-sheet
      color="white"
      elevation="1"
    >
      <v-snackbar
        v-model="snackBar"
        :timeout="3000"
        color="success"
        top
      >
        메일 전송에 성공했습니다.
        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="snackBar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <div>
        <h1>문의하기</h1>
      </div>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-container>
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="이름"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="이메일 주소"
            required
          ></v-text-field>

          <v-textarea
            v-model="content"
            counter
            label="문의 내용"
            type="email"
            :rules="contentRules"
          ></v-textarea>

          <v-btn
            class="ma-2"
            color="grey"
            dark
            @click="formReset"
          >
            내용 지우기
            <v-icon
              dark
              right
            >mdi-cached</v-icon>
          </v-btn>
          <v-btn
            class="ma-2"
            color="primary"
            dark
            @click="resetValidation"
          >
            보내기
            <v-icon
              dark
              right
            >mdi-email</v-icon>
          </v-btn>
        </v-container>
      </v-form>
    </v-sheet>
    <spinner :isLoading="isLoading"></spinner>
  </v-container>
</template>

<script>
import axios from "axios";
import Spinner from '../components/Spinner.vue';
import { mapState } from "vuex";

  export default {
    components: {
      Spinner,
    },
    computed: {
      ...mapState(['isLoading'])
    },
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || '이름을 입력해주세요.',
        v => (v && v.length <= 10) || '이름은 최대 10자를 넘길 수 없습니다.',
      ],
      email: '',
      emailRules: [
        v => !!v || '이메일을 입력해주세요.',
        v => !!(v || '').match(/@/) || '이메일 형식에 맞지 않습니다.',
      ],
      content: '',
      contentRules: [
        v => !!v || '내용을 입력해주세요.',
        v => (v && v.length <= 2000) || '내용은 최대 2000글자를 넘길 수 없습니다.'
      ],
      snackBar: false,
    }),

    methods: {
      // 내용비우기
      formReset() {
        this.$refs.form.reset()
      },
      // 메일보내기
      resetValidation () {
        const validate = this.$refs.form.validate();
        if (validate) {
          this.$store.commit("setLoading");
          let params = {
            name : this.name,
            mailAddr : this.email,
            content : this.content,
            ipAddr : this.$store.state.clientIp
          }
          var url = "http://localhost:1323/api/contact";
          axios
            .post(url, params)
            .then(res => {
              console.log(res)
              this.$store.commit("setLoadingClose");
              this.formReset()
              this.snackBar = true
            })
            .catch(err => {
              console.log(err)
              this.$store.commit("setLoadingClose");
              alert("전송중 에러가 발생했습니다.")
            })
        }
      },
    },
  }
</script>