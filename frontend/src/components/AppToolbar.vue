<template>
  <div>
    <!-- 상단 툴바 -->
    <v-app-bar clipped-left app color="info lighten-2" dark class="mb-10">
      <!-- class를 통해 sm크기보다 크면 숨긴다 -->
      <v-app-bar-nav-icon
        @click="ndrawer = true"
        class="hidden-sm-and-up"
      ></v-app-bar-nav-icon>
      <router-link to="/">
        <!-- class를 통해 xs크기일 때 숨긴다-->
        <v-icon class="hidden-xs-only">mdi-home</v-icon>
      </router-link>
      <v-toolbar-title class="headline white--text"
        >Today's Frame</v-toolbar-title
      >
      <v-spacer></v-spacer>

      <!--툴바 메뉴 -->
      <v-toolbar-title v-if="fnGetAuthStatus" class="caption hidden-xs-only"
        >{{ fnGetNickname }}님 환영합니다</v-toolbar-title
      >

      <div v-if="fnGetAuthStatus">
        <!-- 날짜 선택으로 검색할 수 있게 -->
        <v-menu
          bottom
          left
          :close-on-content-click="closeOnContentClick"
          class="position:relative;overflow-x:hidden;"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-calendar-month-outline</v-icon>
            </v-btn>
          </template>

          <!-- 캘린더 부분 -->
          <div>
            <v-date-picker
              v-model="date1"
              :events="arrayEvents"
              color="info lighten-2"
              event-color="pink lighten-4"
              no-title
            ></v-date-picker>
          </div>
          <!-- 캘린더 끝 -->
        </v-menu>

        <!--사진만 보일 시 나타날 아이콘-->
        <v-btn icon @click="toggleShow1" v-if="toggle">
          <v-icon>mdi-format-list-bulleted-square</v-icon>
        </v-btn>

        <!-- 리스트가 보일 시 나타날 아이콘-->
        <v-btn icon @click="toggleShow2" v-else>
          <v-icon>mdi-apps</v-icon>
        </v-btn>

        <!-- 버튼 클릭 시 일기 작성 칸 나오게-->
        <v-btn icon @click="addWrite">
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-btn>

        <!-- 설정 버튼 -->
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="hidden-xs-only" dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <!-- 로그인 버튼 -->
      <v-btn icon v-else @click="$router.push('/login')">
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

    <!--내비게이션 서랍 시작 -->
    <v-navigation-drawer clipped app v-model="ndrawer">
      <v-toolbar flat>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-icon class="grey white--text">mdi-account</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title> {{ fnGetNickname }} 님</v-list-item-title>
              <v-list-item-subtitle>
                {{ new Date().toLocaleString() }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>
      <!-- 내비게이션 서랍 메뉴 리스트 -->
      <v-list>
        <v-list-item v-for="(menu, i) in fnGetMenuItems" :key="i" :to="menu.to">
          <v-list-item-action>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- 로그인이 된 경우에만 로그아웃 버튼 표시 -->
        <v-list-item @click="fnDoLogout" v-if="fnGetAuthStatus">
          <v-list-item-action>
            <v-icon>mdi-arrow-right-bold-box-outline</v-icon>
          </v-list-item-action>
          <v-list-item-title>로그아웃</v-list-item-title>
        </v-list-item>

        <!-- 로그인이 된 경우에만 회원탈퇴 버튼 표시 -->
        <v-list-item @click="fnDoDelete" v-if="fnGetAuthStatus">
          <v-list-item-action>
            <v-icon>mdi-arrow-right-bold-box</v-icon>
          </v-list-item-action>
          <v-list-item-title>회원탈퇴</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <WriteField v-if="dialog" />
  </div>
</template>

<script>
import WriteField from "./WriteField.vue";

export default {
  name: "AppToolbar",
  components: {
    WriteField,
  },
  data: function () {
    return {
      memo: {},
      login: false,
      ndrawer: false,
      items: [
        { title: "내정보", to: "" },
        { title: "설정", to: "/setting" },
        { title: "버전확인", to: "/" },
        { title: "문의", to: "/" },
      ],
      focus: "",
      type: "month",
      closeOnContentClick: false,
      toggle: true,
      dialog: false,
      show: true,
      arrayEvents: null,
      date1: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    };
  },
  mounted() {
    this.arrayEvents = [...Array()].map(() => {
      const day = this.memo.date; //Math.floor(Math.random() * 30);
      console.log(this.memo.date);
      const d = new Date();
      d.setDate(day);
      console.log(d);
      return d.toISOString().substr(0, 10);
    });
  },
  created() {
    this.$http.get("/api/memo").then((response) => {
      this.memo = response.data;
    });
  },
  methods: {
    addWrite() {
      this.dialog = true;
      this.$EventBus.$emit("click");
      console.log(this.dialog);
    },
    toggleShow1() {
      this.toggle = !this.toggle;
      this.$router.push("/sub");
    },
    toggleShow2() {
      this.toggle = !this.toggle;
      this.$router.push("/");
    },
    path() {
      this.items[0].to = `/about/${this.user}`;
    },
    fnDoLogout() {
      this.$store.dispatch("fnDoLogout");
    },
    fnDoDelete() {
      this.$store.dispatch("fnDoDelete");
    },
  },
  updated() {
    this.path();
  },
  computed: {
    fnGetNickname() {
      return this.$store.getters.fnGetNickname;
    },
    fnGetAuthStatus() {
      return this.$store.getters.fnGetAuthStatus;
    },
    // 로그인 여부에 따라 다르게 배열 반환
    fnGetMenuItems() {
      if (!this.login) {
        return [
          {
            title: "회원가입",
            icon: "mdi-lock-open-outline",
            to: "/register",
          },
        ];
      } else {
        return [
          {
            title: "내 정보",
            icon: "mdi-information-outline",
            to: `/about/${this.user}`,
          },
          {
            title: "설정",
            icon: "mdi-cog-outline",
            to: "/setting",
          },
          {
            title: "커뮤니티",
            icon: "mdi-comment-processing-outline",
            to: "/",
          },
        ];
      }
    },
  },
};
</script>
