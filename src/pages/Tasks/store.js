import api from 'api'
import { createHook, createStore } from 'react-sweet-state'

const initialState = {
  tasks: [],
  filter: 'all',
  isLoading: false
}

const actions = {
  load: () => async ({ getState, setState }) => {
    // if (getState().isLoading) {
    //   return
    // }

    setState(draft => {
      draft.isLoading = true
    })

    const tasks = await api.tasks.read()

    setState(draft => {
      draft.tasks = tasks
      draft.isLoading = false
    })
  },
  toggleTaskChecked: id => ({ getState, setState }) => {
    const { tasks } = getState()
    const taskIndex = tasks.findIndex(task => task.id === id)

    setState(draft => {
      draft.tasks[taskIndex].checked = !tasks[taskIndex].checked
    })
  },
  setFilter: filter => ({ getState, setState }) => {
    setState(draft => {
      draft.filter = filter
    })
  }
}

const TaskStore = createStore({
  initialState,
  actions
})

export const useTaskStore = createHook(TaskStore)

function getFilteredTasks (state) {
  const tasks = state.tasks

  switch (state.filter) {
    case 'checked':
      return tasks.filter(task => task.checked)

    case 'todo':
      return tasks.filter(task => !task.checked)

    case 'all':
    default:
      return tasks
  }
}

export const useFilteredTasks = createHook(TaskStore, {
  selector: getFilteredTasks
})

export const useActions = createHook(TaskStore, {
  selector: null
})
