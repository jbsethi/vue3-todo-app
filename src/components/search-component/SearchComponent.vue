<script setup>
import { ref } from 'vue'
import { mdiMagnify } from '@mdi/js'
import Icon from '../shared/icon/Icon.vue'

const searchIconPath = ref(mdiMagnify)
</script>

<template>
  <div class="relative px-5 mt-5">
    <div class="absolute top-3 left-8">
      <Icon :path="searchIconPath"></Icon>
    </div>
    <input
      class="rounded border border-gray-500 py-3 px-4 pl-12 w-full"
      placeholder="Search Todo ..."
    />
  </div>
</template>