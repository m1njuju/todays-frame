<template>
  <div>
    <!--일기 작성란 -->
    <v-container fluid>
      <v-dialog v-model="dialog" max-width="800px">
        <v-card>
          <v-row>
            <v-col cols="3">
              <!-- 이미지 업로드 부분 -->
              <div>
                <input
                  style="display: block"
                  type="file"
                  accept="image/*"
                  id="inputImage"
                  name="inputImage"
                  @change="changeEvent"
                />
                <img
                  id="preview-image"
                  src="https://dummyimage.com/500x500/ffffff/000000.png&text=preview+image"
                  alt=""
                  style="width: 150px"
                />
              </div>
            </v-col>

            <v-col cols="9">
              <!--날짜 입력 -->
              <v-card-text>
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateFormatted"
                      label="Date"
                      hint="MM/DD/YYYY"
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      @blur="date = parseDate(dateFormatted)"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    no-title
                    @input="menu1 = false"
                  ></v-date-picker>
                </v-menu>
                <h3>
                  Today: <strong>{{ date }}</strong>
                </h3>
              </v-card-text>

              <!-- 기분 선택칸 -->
              <v-row>
                <v-col cols="12">
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
                    <v-text-field
                      v-model="todo"
                      :append-outer-icon="'mdi-check'"
                      clear-icon="mdi-close-circle"
                      clearable
                      label="오늘의 할 일"
                      type="text"
                      @click:append-outer="saveMessage"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="meal"
                      :append-outer-icon="'mdi-check'"
                      clear-icon="mdi-close-circle"
                      clearable
                      label="오늘의 식사"
                      type="text"
                      @click:append-outer="saveMessage"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>

          <v-divider class="mx-4"></v-divider>

          <!-- 긴 문장 작성 칸 -->
          <v-row>
            <v-col cols="12">
              <v-textarea
                outlined
                label="오늘의 하루를 기록하세요"
                auto-grow
                v-model="memo"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn justify-center @click="addmemo">완료</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "WriteField",
  data: function () {
    return {
      dialog: false,
      iconIndex: 0,
      memos: {
        todo: "",
        meal: "",
        memo: "",
        img: "",
      },
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu1: false,
      tags: [
        "mdi-emoticon-excited-outline",
        "mdi-emoticon-happy-outline",
        "mdi-emoticon-neutral-outline",
        "mdi-emoticon-sad-outline",
        "mdi-emoticon-angry-outline",
      ],
    };
  },
  created() {
    this.$EventBus.$on("click", () => {
      this.dialog = true;
    });
  },
  methods: {
    saveMessage() {
      this.iconIndex = 0;
    },

    // 이미지 미리보기
    readImage(input) {
      // input 태그에 파일이 있는 경우
      if (input.files && input.files[0]) {
        // FileReader 인스턴스 생성
        const reader = new FileReader();

        // 이미지가 로드된 경우
        reader.onload = (e) => {
          const previewImage = document.getElementById("preview-image");
          previewImage.src = e.target.result;
        };

        // reader가 이미지 읽도록 하기
        reader.readAsDataURL(input.files[0]);
      }
    },
    changeEvent(e) {
      this.readImage(e.target);
      let imageFile = e.target.files;
      //console.log(imageFile[0]);
      let url = URL.createObjectURL(imageFile[0]);
      console.log(url);
      this.memos.img = url;
    },

    // 메모에 추가
    addmemo() {
      this.$http
        .post("/api/memo", {
          data: {
            todo: this.todo,
            meal: this.meal,
            memo: this.memo,
            img: this.memos.img,
          },
        })
        .then((response) => {
          console.log(response.data);
        });
      this.dialog = false;
      this.memos = {
        todo: "",
        meal: "",
        memo: "",
        img: "",
      };
      this.$router.push("/sub");
    },
  },
};
</script>
