<script setup>
const { todos } = defineProps({
  todos: Array
})
</script>

<template>
  <div v-if="todos.length > 0" class="p-5 m-h-45-screen">
    <div class="mt-2" v-for="todo in todos" :key="todo.id">
      <slot name="todo" v-bind:todo="todo"></slot>
    </div>
  </div>
  <div v-else class="p-5 m-h-45-screen text-center flex justify-center items-center">
    <p class=""><em>No Todos !</em></p>
  </div>
</template>

<style scoped>
.m-h-45-screen {
  min-height: 45vh;
}
</style>