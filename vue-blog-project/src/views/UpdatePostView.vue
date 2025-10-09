<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { type Post, usePostsStore } from '@/stores/posts'
import { ref, onMounted } from 'vue'

const router = useRouter()
const route = useRoute()
const postsStore = usePostsStore()
const post = ref<Post | undefined>(undefined)

onMounted(() => {
  const postId = Number(route.params.id)
  post.value = postsStore.getPost(postId)
})

function updatePost() {
  if (!post.value?.title || !post.value?.content) {
    alert('제목과 내용을 모두 입력해주세요.')
    return
  }
  postsStore.updatePost(post.value.id, post.value.title, post.value.content)
  router.push(`/posts/${post.value.id}`)
}
</script>

<template>
  <div v-if="post">
    <h1>글 수정하기</h1>
    <input v-model="post.title" placeholder="제목" class="input-title" />
    <textarea v-model="post.content" placeholder="내용" class="input-content" />
    <button @click="updatePost">저장</button>
  </div>
  <div v-else>
    <p>게시물을 찾을 수 없습니다.</p>
  </div>
</template>

<style scoped>
.input-title,
.input-content {
  display: block;
  width: 100%;
  margin-bottom: 15px;
}

.input-content {
  height: 100px;
}
</style>
