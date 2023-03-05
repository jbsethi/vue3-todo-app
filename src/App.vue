<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { mdiPlus } from '@mdi/js';

import Icon from './components/shared/icon/Icon.vue'
import Button from './components/shared/button/Button.vue'
import TodoSearch from './components/search-component/SearchComponent.vue'
import TodoList from './components/todo-list/TodoList.vue'
import TodoListItem from './components/todo-list/TodoListItem.vue'
import CreateEditTodo from './components/create-edit-todo/CreateEditTodo.vue'

const TIMEOUT_TIMER = 300;
const FILTERS = {
  ALL: 0,
  ACTIVE: 1,
  COMPLETED: 2
};

let inputTimer = null;

const store = useStore();

const addIconPath = ref(mdiPlus)
let activeFilter = ref(FILTERS.ALL)
let searchKeyword = ref('')

const todos = computed(() => {
  return store?.state?.todos?.filter(
    todo => todo.title.match(new RegExp(searchKeyword.value, 'i'))
  )?.filter(
    todo => {
      if (activeFilter.value === FILTERS.COMPLETED) return todo.isCompleted;
      else if (activeFilter.value === FILTERS.ACTIVE) return !todo.isCompleted
      
      return true
    }
  )
})
const totalCompleted = computed(() => store.getters.totalCompleted)

const setActiveFilter = (filterCode) => {
  activeFilter.value = filterCode
}

const searchTodo = (event) => {
  if (inputTimer) {
    clearTimeout(inputTimer)
  }

  inputTimer = setTimeout(() => {
    searchKeyword.value = event.target.value
  }, TIMEOUT_TIMER)
  
}

const createNewTodoForm = ref(false)
const editTodoForm = ref(null)

const createNewTodo = () => {
  createNewTodoForm.value = true
}

const closeCreateNewTodo = () => {
  createNewTodoForm.value = false
  editTodoForm.value = null
}

const markComplete = (id) => {
  store.dispatch('markComplete', id)
}

const removeTodo = (id) => {
  store.dispatch('removeTodo', id)
}

const editTodo = (id) => {
  editTodoForm.value = todos.value.find(todo => todo.id === id) ?? null
}

const removeAllCompleted = () => {
  store.dispatch('removeAllCompleted')
}
</script>

<template>
  <div class="relative bg-gray-100 h-screen p-5 md:p-8 z-10">
    <div class="fixed bg-gradient-to-r from-cyan-500 to-blue-500 top-0 left-0 h-2/6 w-full -z-10"></div>
    <div class="w-full md:max-w-screen-sm m-auto bg-white rounded">
      <header class="mt-16 relative">
        <h1 class="text-3xl text-center py-4 border-b">
          Todo App
        </h1>

        <div v-if="!createNewTodoForm" class="absolute top-4 right-5">
          <Button @click="createNewTodo">
            <span class="flex items-center">
              <Icon :path="addIconPath"></Icon>
              <span class="hidden md:inline ml-1">Create</span>
            </span>
          </Button>
        </div>
      </header>

      <template v-if="createNewTodoForm || !!editTodoForm">
        <CreateEditTodo :editTodo="editTodoForm" @close="closeCreateNewTodo"></CreateEditTodo>
      </template>
      <template v-else>
        <TodoSearch @input="searchTodo"></TodoSearch>

        <TodoList :todos="todos">
          <template v-slot:todo="{ todo }">
            <TodoListItem
              :todo="todo"
              @onComplete="markComplete"
              @onDelete="removeTodo"
              @onEdit="editTodo"
            ></TodoListItem>
          </template>
        </TodoList>

        <footer class="px-5">
          <div class="flex justify-between">
            <div>{{ totalCompleted }} Items Completed</div>
            <div v-if="totalCompleted > 0">
              <span @click="removeAllCompleted" class="text-red-500 cursor-pointer hover:underline">Remove All Completed</span>
            </div>
          </div>

          <div class="mt-3 pt-3 pb-5">
            <div class="flex justify-center">
              <ul class="inline-flex gap-3">
                <li @click="setActiveFilter(FILTERS.ALL)" :class="{ 'text-purple-500': activeFilter === FILTERS.ALL }" class="cursor-pointer">All</li>
                <li @click="setActiveFilter(FILTERS.ACTIVE)" :class="{ 'text-purple-500': activeFilter === FILTERS.ACTIVE }" class="cursor-pointer">Active</li>
                <li @click="setActiveFilter(FILTERS.COMPLETED)" :class="{ 'text-purple-500': activeFilter === FILTERS.COMPLETED }" class="cursor-pointer">Completed</li>
              </ul>
            </div>
          </div>
        </footer>
      </template>
    </div>
  </div>
</template>
