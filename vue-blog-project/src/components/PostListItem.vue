<script setup lang="ts">
defineProps({
  id: Number,
  title: String,
  content: String,
  createdAt: Date,
  updatedAt: Date,
})

function formatDate(date: Date | undefined | null) {
  if (!date) return ''
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })
}
</script>

<template>
  <router-link :to="`/posts/${id}`" class="post-list-item">
    <h3>{{title}}</h3>
    <p>{{formatDate(createdAt)}}</p>
    <p>{{formatDate(updatedAt)}}</p>
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
