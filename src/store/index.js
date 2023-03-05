import { createStore } from 'vuex'

const store = createStore({
  state: {
    todos: [
      {
        id: 1,
        title: 'Title of the todo 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint amet deleniti omnis cumque hic, similique tempore voluptate earum illo in soluta assumenda dolore magni ea rerum dicta eveniet odio rem.',
        createdAt: '12-1-2022',
        color: 'gray',
        isCompleted: false
      },
      {
        id: 2,
        title: 'Title of the todo 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint amet deleniti omnis cumque hic, similique tempore voluptate earum illo in soluta assumenda dolore magni ea rerum dicta eveniet odio rem.',
        createdAt: '12-1-2022',
        color: 'purple',
        isCompleted: true
      }
    ],
  },
  actions: {
    removeAllCompleted: ({ commit }) => commit('REMOVE_ALL_COMPLETED'),
    removeTodo: ({ commit }, payload) => commit('REMOVE_TODO', payload),
    markComplete: ({ commit }, payload) => commit('MARK_COMPLETE', payload)
  },
  mutations: {
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