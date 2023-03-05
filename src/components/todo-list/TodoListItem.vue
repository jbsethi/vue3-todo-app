<script setup>
import { mdiCheck, mdiDelete } from '@mdi/js';
import { ref } from 'vue'

import Icon from '../shared/icon/Icon.vue'
import Button from '../shared/button/Button.vue'

const { todo } = defineProps({
  todo: Object
})

const emit = defineEmits(['onComplete', 'onDelete'])

const doneIconPath = ref(mdiCheck);
const removeIconPath = ref(mdiDelete);

let showDescription = ref(false);

const toggleShowDescription = () => {
  showDescription.value = !showDescription.value
}

</script>

<template>
  <div class="shadow hover:shadow-md p-3">
    <header @click="toggleShowDescription" class="flex items-start justify-between cursor-pointer">
      <div>
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
      <div class="flex items-center gap-2">
        <Button v-if="!todo.isCompleted" @click.stop="emit('onComplete', todo.id)" type="primary" >
          <span class="flex gap-1 items-center">
            <Icon :path="doneIconPath"></Icon>
            <span>Complete</span>
          </span>
        </Button>
        <Button @click.stop="emit('onDelete', todo.id)" type="danger" >
          <span class="flex gap-1 items-center">
            <Icon :path="removeIconPath"></Icon>
            <span>Remove</span>
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