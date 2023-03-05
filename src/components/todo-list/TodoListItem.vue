<script setup>
import { mdiCheck, mdiDelete, mdiCogOutline } from '@mdi/js';
import { ref } from 'vue'

import Icon from '../shared/icon/Icon.vue'
import Button from '../shared/button/Button.vue'

const { todo } = defineProps({
  todo: Object
})

const emit = defineEmits(['onComplete', 'onDelete', 'onEdit'])

const doneIconPath = ref(mdiCheck);
const removeIconPath = ref(mdiDelete);
const editIconPath = ref(mdiCogOutline)

let showDescription = ref(false);

const toggleShowDescription = () => {
  showDescription.value = !showDescription.value
}

</script>

<template>
  <div class="shadow hover:shadow-md p-3">
    <header @click="toggleShowDescription" class="relative flex items-start justify-between cursor-pointer">
      <div class="pt-10 md:pt-0">
        <div class="flex gap-2 items-center">
          <div class="h-6 w-6 rounded-full" :style="{ backgroundColor: todo.color }"></div>
          <div>
            <div class="flex gap-3 items-center" :class="{ 'line-through': todo.isCompleted }">
              <span class="text-xl text-gray-900">{{ todo.title }}</span>
              <div v-if="todo.isCompleted" class="inline-flex gap-2 text-xs text-white bg-green-500 rounded py-1 px-2">
                <Icon class="h-4 w-4" :path="doneIconPath"></Icon>
                <scan>Completed</scan>
              </div>
            </div>
            <div class="text-xs text-gray-500">
              {{ todo.createdAt }}
            </div>
          </div>
        </div>
      </div>
      <div class="absolute top-0 right-0 md:static mb-5 md:mb-0 scale-75 md:scale-100 flex items-center justify-end gap-2">
        <Button v-if="!todo.isCompleted" @click.stop="emit('onComplete', todo.id)" color="primary" >
          <span class="flex gap-1 items-center">
            <Icon :path="doneIconPath"></Icon>
            <span class="hidden md:inline">Complete</span>
          </span>
        </Button>
        <Button v-if="!todo.isCompleted" @click.stop="emit('onEdit', todo.id)" >
          <span class="flex gap-1 items-center">
            <Icon :path="editIconPath"></Icon>
            <span class="hidden md:inline">Edit</span>
          </span>
        </Button>
        <Button @click.stop="emit('onDelete', todo.id)" color="danger" >
          <span class="flex gap-1 items-center">
            <Icon :path="removeIconPath"></Icon>
            <span class="hidden md:inline">Remove</span>
          </span>
        </Button>
      </div>
    </header>

    <section v-if="showDescription" class="mt-2">
        <div class="text-lg text-gray-900">
          Description :
        </div>
        <p class="text-gray-800 text-sm">
          {{ todo.description }}
        </p>
    </section>
  </div>
</template>