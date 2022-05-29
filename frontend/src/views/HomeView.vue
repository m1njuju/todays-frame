<template>
  <div class="home">
    <!-- 메인 섹션 -->
            <v-main>
                <MainList />

                    <!-- 일기 작성칸 -->
                    <v-container>
                        <WriteField />
                    </v-container>
            </v-main>
            
  </div>
</template>

<script>
import MainList from '../components/MainList.vue'
import WriteField from '../components/WriteField.vue'

export default {
  name: 'HomeView',
  components: {
    MainList,
    WriteField
  }
}
</script>
