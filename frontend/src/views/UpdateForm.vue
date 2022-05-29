<template>
  <div>
    <v-container>
      <v-card class="mt-4">
        <v-row>
          <v-col cols="12">
            <v-img
              :src="memo.img"
              aspect-ratio="1"
              class=".float-left ml-4 mt-5"
              max-width="600px"
            >
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
          </v-col>

          <v-col>
            <v-card-text>
              <h2>{{ memo.date }}</h2>
            </v-card-text>
            <v-card-text
              >오늘의 기분
              <v-row justify="space-around">
                <v-col cols="12" sm="10" md="8">
                  <v-chip-group mandatory active-class="pink--text">
                    <v-chip v-for="tag in tags" :key="tag">
                      <v-icon>
                        {{ tag }}
                      </v-icon>
                    </v-chip>
                  </v-chip-group>
                </v-col>
              </v-row>
            </v-card-text>
          </v-col>
        </v-row>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="memo.todo"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="memo.meal"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-row>
          <v-col cols="12">
            <v-textarea outlined auto-grow v-model="memo.memo"></v-textarea>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="updatememo">완료</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      memo: {
        todo: "",
        meal: "",
        memo: "",
      },
    };
  },
  created() {
    this.$http.get(`/api/memo/${this.$route.params.id}`).then((response) => {
      this.memo = response.data;
    });
  },
  methods: {
    updatememo() {
      this.$http
        .put("/api/memo/updateform", {
          data: {
            memo: this.memo,
          },
        })
        .then((response) => {
          console.log(response.data);
        });
      this.$router.push("/sub");
    },
  },
};
</script>
