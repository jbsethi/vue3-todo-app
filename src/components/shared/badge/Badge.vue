<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: String
})

const className = computed(() => {
  switch (props.type) {
    case 'low':
      return 'bg-gray-300 text-white'
    case 'normal':
      return 'bg-yellow-500 text-white'
    case 'high':
      return 'bg-orange-500 text-white'
    case 'critical':
      return 'bg-red-500 text-white'
    default:
      return 'bg-white text-gray-900'
  }
})
</script>

<template>
  <span :class="className" class="text-center flex-inline rounded text-xs px-2 py-0.5 uppercase">
    <slot></slot>
  </span>
</template>