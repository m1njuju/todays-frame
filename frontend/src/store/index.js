import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

import "@/datasources/firebase";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const auth = getAuth();
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    oUser: null,
    nickname: null,
  },
  getters: {
    fnGetNickname(state) {
      return state.nickname;
    },
    fnGetUser(state) {
      return state.oUser;
    },
    fnGetAuthStatus(state) {
      return state.oUser != null;
    },
  },
  mutations: {
    fnSetNickname(state, nickname) {
      state.nickname = nickname;
      console.log(state.nickname);
    },
    fnSetUser(state, payload) {
      state.oUser = payload;
    },
  },
  actions: {
    // 회원가입
    fnRegisterUser({ commit }, payload) {
      createUserWithEmailAndPassword(auth, payload.pEmail, payload.pPassword)
        .then((pUserInfo) => {
          commit("fnSetUser", {
            email: pUserInfo.user.email,
          });
          router.push("/");
        })
        .catch((err) => {
          console.log(err.message);
        });
    },

    // 로그인
    fnDoLogin({ commit }, payload) {
      signInWithEmailAndPassword(auth, payload.pEmail, payload.pPassword)
        .then((pUserInfo) => {
          commit("fnSetUser", {
            id: pUserInfo.user.uid,
            name: pUserInfo.user.displayName,
            email: pUserInfo.user.email,
            photoURL: pUserInfo.user.photoURL,
          });
          router.push("/");
        })
        .catch((err) => {
          console.log(err.message);
        });
    },

    // 로그아웃
    fnDoLogout({ commit }) {
      signOut(auth);
      commit("fnSetUser", null);
      router.go(0);
    },

    // 회원탈퇴
    fnDoDelete({ commit }) {
      const user = auth.currentUser;
      deleteUser(user);
      commit("fnSetUser", null);
      router.go(0);
    },
  },
});
