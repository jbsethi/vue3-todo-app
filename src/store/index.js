import { createStore } from 'vuex'

const initializeTodos = () => {
  if (localStorage.getItem('todosData')) return JSON.parse(localStorage.getItem('todosData'))

  return []
}

const store = createStore({
  state: {
    todos: initializeTodos()
  },
  actions: {
    storeTodo: ({ rootState, commit }, payload) => {
      const todos = [...rootState.todos];
      const date = new Date()

      const newTodo = {
        ...payload,
        createdAt: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
        id: (todos[todos.length - 1]?.id ?? 0) + 1
      }

      todos.push(newTodo);

      const storageString = JSON.stringify(todos)

      localStorage.setItem('todosData', storageString)

      commit('UPDATE_TODOS', todos)
    },
    updateTodo: ({ rootState, commit }, payload) => {
      const todos = [...rootState.todos].map(todo => {
        if (todo.id == payload.id) return { ...payload.data }
        return todo
      })

      const storageString = JSON.stringify(todos)

      localStorage.setItem('todosData', storageString)

      commit('UPDATE_TODOS', todos)
    },
    removeAllCompleted: ({ rootState, commit }) => {
      const todos = [...rootState.todos].filter(todo => !todo.isCompleted)
      
      const storageString = JSON.stringify(todos);
      localStorage.setItem('todosData', storageString);

      commit('REMOVE_ALL_COMPLETED')
    },
    removeTodo: ({ rootState, commit }, payload) => {
      const todos = [...rootState.todos].filter(todo => todo.id !== payload)
      
      const storageString = JSON.stringify(todos);
      localStorage.setItem('todosData', storageString);

      commit('REMOVE_TODO', payload)
    },
    markComplete: ({ rootState, commit }, payload) => {
      const todos = [...rootState.todos].map(todo => {
        if (todo.id == payload) return { ...todo, isCompleted: true }
        return todo
      })
      
      const storageString = JSON.stringify(todos);
      localStorage.setItem('todosData', storageString);

      commit('MARK_COMPLETE', payload)
    }
  },
  mutations: {
    UPDATE_TODOS: (state, payload) => {
      state.todos = payload;
    },
    REMOVE_ALL_COMPLETED: (state) => {
      state.todos = state.todos.filter(todo => !todo.isCompleted)
    },
    REMOVE_TODO: (state, payload) => {
      state.todos = state.todos.filter(todo => todo.id !== payload)
    },
    MARK_COMPLETE: (state, payload) => {
      state.todos = state.todos.map(todo => {
        if (todo.id == payload) return { ...todo, isCompleted: true }
        return todo
      })
    }
  },
  getters: {
    totalCompleted: (state) => state.todos?.filter(todo => todo.isCompleted)?.length ?? 0
  },
  modules: {}
})

export default store