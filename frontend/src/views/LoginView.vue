<template>
  <v-container class="mt-16">
    <v-card class="pa-10">
      <v-text-field label="email" v-model="sEmail"></v-text-field>
      <v-text-field
        label="password"
        type="password"
        v-model="sPassword"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-btn @click="fnDoLogin">로그인</v-btn>
        <v-btn @click="$router.go(-1)">취소</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="$router.push('/register')">회원가입</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "LoginView",
  data: () => ({
    sEmail: "",
    sPassword: "",
  }),
  methods: {
    fnDoLogin() {
      this.$store.dispatch("fnDoLogin", {
        pEmail: this.sEmail,
        pPassword: this.sPassword,
      });
    },
  },
};
</script>
