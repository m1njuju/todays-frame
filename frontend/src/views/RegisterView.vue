<template>
  <v-container class="mt-16">
    <v-card class="pa-10">
      <form @submit.prevent="fnRegisterUser">
        <v-text-field
          label="nickname"
          v-model="nickname"
          required
        ></v-text-field>
        <v-text-field label="email" v-model="sEmail" required></v-text-field>
        <v-text-field
          label="password"
          type="password"
          v-model="sPassword"
          required
        ></v-text-field>
        <v-text-field
          label="password check"
          type="password"
          v-model="sConfirmPassword"
          required
          :rules="[fnComparePassword]"
        ></v-text-field>

        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn @click="fnRegisterUser">회원가입</v-btn>
          <v-btn @click="$router.go(-1)">취소</v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "LoginView",
  data: () => ({
    nickname: "",
    sEmail: "",
    sPassword: "",
    sConfirmPassword: "",
  }),
  computed: {
    fnComparePassword() {
      if (this.sPassword == this.sConfirmPassword) {
        return true;
      } else return "비밀번호가 일치하지 않습니다";
    },
  },
  methods: {
    fnRegisterUser() {
      this.$store.dispatch("fnRegisterUser", {
        pEmail: this.sEmail,
        pPassword: this.sPassword,
      });
      this.$store.commit("fnSetNickname", this.nickname);
    },
  },
};
</script>
