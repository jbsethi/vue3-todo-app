<script setup>
import { ref } from 'vue'

const props = defineProps({
  color: String,
  disabled: Boolean
})

let className = ref('text-purple-500 border-purple-500 hover:bg-purple-500');

switch (props.color) {
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
    :disabled="props.disabled"
    class="py-1 px-2 border-2 text-xs rounded hover:text-white transition-colors"
    :class="props.disabled ? 'text-gray-800 border-gray-800 hover:text-gray-900' : className"
  >
    <slot></slot>
  </button>
</template>