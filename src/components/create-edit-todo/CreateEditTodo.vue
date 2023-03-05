<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import Button from '../shared/button/Button.vue'

const props = defineProps({
  editTodo: Object
})

const emit = defineEmits(['close'])


const formData = ref({
  color: props.editTodo?.color ?? '#000000',
  title: props.editTodo?.title ?? '',
  priority: props.editTodo?.priority ?? '0',
  description: props.editTodo?.description ?? '',
})

const isValidInput = computed(() => {
  const data = formData.value;

  if (!data.color) return false

  if (data.title === '') return false

  if (data.description === '') return false

  if (data.priority === '0') return false

  return true
})

const store = useStore();

const handleFormSubmit = async () => {
  const payload = {
    ...(props.editTodo ? props.editTodo : {}),
    title: formData.value.title,
    description: formData.value.description,
    color: formData.value.color,
    priority: formData.value.priority
  }

  if (props.editTodo?.id) {
    await store.dispatch('updateTodo', {
      id: props.editTodo?.id,
      data: payload
    })
  } else {
    await store.dispatch('storeTodo', payload)
  }

  emit('close')
}

</script>

<template>
  <div>
    <div class="py-3 px-5 text-gray-800 text-xl border-b mb-5">
      Create New Todo
    </div>

    <form @submit.prevent="handleFormSubmit">
      <section class="px-5 flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <label class="text-lg font-medium text-gray-800">Todo Color</label>
          <input v-model="formData.color" type="color" class="border w-full p-2 h-10" placeholder="Todo Tilte here ..."/>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-lg font-medium text-gray-800">Todo Title</label>
          <input v-model="formData.title" type="text" class="border w-full p-2" placeholder="Todo Tilte here ..."/>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-lg font-medium text-gray-800">Description</label>
          <textarea v-model="formData.description" class="border w-full p-2" placeholder="Todo Description here ..."></textarea>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-lg font-medium text-gray-800">Todo Priority</label>
          <select v-model="formData.priority" class="border w-full p-2">
            <option value="0">Select</option>
            <option value="low">low</option>
            <option value="normal">normal</option>
            <option value="high">high</option>
            <option value="critical">critical</option>
          </select>
        </div>
      </section>

      <footer class="flex justify-between px-5 py-3 mt-10 border-t">
        <div>
          <Button v-show="!props.editTodo?.id" type="reset" color="danger">Reset</Button>
        </div>
        <div class="flex gap-2">
          <Button  type="button" @click="emit('close')">Cancel</Button>
          <Button :class="{ 'cursor-not-allowed': !isValidInput }" :disabled="!isValidInput" type="submit" color="primary">Save</Button>
        </div>
      </footer>
    </form>
  </div>
</template>