<template>
  <div id="app">
    <v-app>
      <!-- 상단 툴바 -->
      <AppToolbar />
      <router-view />
      <!-- 푸터 영역 -->
      <v-footer color="info lighten-2" dark app padless>
        <div class="mx-auto">
          <small
            >Copyright &copy; {{ new Date().getFullYear() }} 송민주. m1njuju ,
            Ltd. All Rights Reserved</small
          >
        </div>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import AppToolbar from "./components/AppToolbar.vue";

export default {
  name: "App",
  components: {
    AppToolbar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
