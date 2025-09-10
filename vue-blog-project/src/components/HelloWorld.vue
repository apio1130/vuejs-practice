<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const props = defineProps<{
  msg: string
}>()

// Use Pinia counter store
const counter = useCounterStore()
const { count, doubleCount } = storeToRefs(counter)
const { increment } = counter
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ props.msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>

    <div class="counter">
      <p>Count: {{ count }}</p>
      <p>Double: {{ doubleCount }}</p>
      <button type="button" @click="increment">Increment</button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
