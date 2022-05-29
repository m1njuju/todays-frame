<template>
  <div>
    <!-- 갤러리 형식으로 정렬 -->
    <v-container>
      <v-row>
        <v-col
          v-for="memo in memo"
          :key="memo.id"
          class="d-flex child-flex"
          cols="4"
          sm="4"
          md="3"
          lg="2"
        >
          <button @click="$router.push(`/page/${memo.id}`)">
            <v-img :src="memo.img" max-width="200px" aspect-ratio="1">
              <!--이미지 로딩 진행 써클 -->
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </button>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "MainList",
  data: function () {
    return {
      tags: [
        "mdi-emoticon-excited-outline",
        "mdi-emoticon-happy-outline",
        "mdi-emoticon-neutral-outline",
        "mdi-emoticon-sad-outline",
        "mdi-emoticon-angry-outline",
      ],
      memo: [],
      imagelist: [],
      imagecnt: 0,
    };
  },
  created() {
    this.$http.get("/api/memo").then((response) => {
      console.log(response.data);
      this.memo = response.data;
    });
  },
  methods: {},
};
</script>
