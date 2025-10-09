<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { usePostsStore, type Post } from '@/stores/posts'
import { ref, onMounted } from 'vue'

const router = useRouter()
const route = useRoute()
const postsStore = usePostsStore()
const post = ref<Post | undefined>(undefined)

onMounted(() => {
  const postId = Number(route.params.id)
  post.value = postsStore.getPost(postId)
});

function moveUpdate() {
  if (post.value) {
    router.push(`/posts/${post.value.id}/update`)
  }
}
</script>

<template>
<div v-if="post">
  <h1>{{ post.title }}</h1>
  <p>작성일: {{ post.createdAt }}</p>
  <p>수정일: {{ post.updatedAt }}</p>
  <div>{{ post.content}}</div>
  <button @click="moveUpdate">수정하기</button>
</div>
<div v-else>
  <p>게시물을 찾을 수 없습니다.</p>
</div>
</template>

<style scoped></style>
