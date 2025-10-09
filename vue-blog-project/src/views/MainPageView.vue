<script setup lang="ts">
import { usePostsStore} from '@/stores/posts'
import PostListItem from '@/components/PostListItem.vue'

const postsStore = usePostsStore();
</script>

<template>
  <div class="main-page">
    <h1>최근 글 목록</h1>
    <div v-for="post in postsStore.posts" :key="post.id">
      <PostListItem :id="post.id" :title="post.title" :content="post.content" :createdAt="post.createdAt" :updatedAt="post.updatedAt" />
    </div>
  </div>
</template>

<style scoped>

</style>
