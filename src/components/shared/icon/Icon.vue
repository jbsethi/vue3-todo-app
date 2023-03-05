<script setup>
import SvgIcon from '@jamescoyle/vue-icon'

const { path } = defineProps({
  path: Element
})
</script>

<template>
  <SvgIcon type="mdi" :path="path"></SvgIcon>
</template>