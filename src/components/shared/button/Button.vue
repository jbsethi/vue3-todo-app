<script setup>
import { ref } from 'vue'

const props = defineProps({
  type: String
})

let className = ref('text-purple-500 border-purple-500 hover:bg-purple-500');

switch (props.type) {
  case 'primary':
    className = 'text-purple-500 border-purple-500 hover:bg-purple-500'
    break
  case 'danger':
    className = 'text-red-500 border-red-500 hover:bg-red-500'
    break
  default:
    className = 'text-gray-500 border-gray-500 hover:bg-gray-500'
}
</script>

<template>
  <button
    class="py-1 px-3 border-2 rounded hover:text-white transition-colors"
    :class="className"
  >
    <slot></slot>
  </button>
</template>