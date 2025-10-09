<script setup lang="ts">
import { usePostsStore } from '@/stores/posts'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const postsStore = usePostsStore()
const router = useRouter()
const title = ref('')
const content = ref('')

function savePost() {
  if (!title.value || !content.value) {
    alert('제목과 내용을 모두 입력해주세요.')
    return
  }
  postsStore.addPost(title.value, content.value)
  router.push('/')
}
</script>

<template>
  <div>
    <h1>새 글 작성하기</h1>
    <input v-model="title" placeholder="제목" class="input-title"/>
    <textarea v-model="content" placeholder="내용" class="input-content"/>
    <button @click="savePost">저장</button>
  </div>
</template>

<style scoped>
.input-title, .input-content {
  display: block;
  width: 100%;
  margin-bottom: 15px;
}

.input-content {
  height: 100px;
}
</style>
