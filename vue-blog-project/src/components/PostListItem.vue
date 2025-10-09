<script setup lang="ts">
defineProps({
  id: Number,
  title: String,
  content: String,
  createdAt: String,
  updatedAt: String,
})
</script>

<template>
  <router-link :to="`/posts/${id}`" class="post-list-item">
    <h3>{{title}}</h3>
    <p>{{createdAt}}</p>
    <p>{{updatedAt}}</p>
  </router-link>
</template>

<style scoped>
.post-list-item {
  display: block;
  padding: 1rem;
  border-bottom: 1px solid var(--vt-c-divider-light-2);
}

.post-list-item:hover {
  background-color: #f0f0f0;
}
</style>
