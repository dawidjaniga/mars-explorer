import { createHook, createStore, defaults } from 'react-sweet-state'
import api from 'api'
defaults.devtools = true

const initialState = {
  tasks: [],
  filter: 'all',
  isLoading: false
}

const actions = {
  load: () => async ({ getState, setState }) => {
    let newState
    if (getState().isLoading) {
      return
    }

    console.log('Loading tasks...')

    newState = { ...getState(), isLoading: true }
    setState(newState)
    console.log('isLoading set newState', newState)

    const tasks = await api.tasks.read()

    newState = { ...getState(), tasks, isLoading: false }
    console.log('isLoading set newState', newState)
    setState(newState)
  },
  removeTask: id => ({ getState, setState }) => {
    const { tasks } = getState()

    setState({ tasks: tasks.filter(task => task.id !== id) })
  },
  toggleTaskChecked: id => ({ getState, setState }) => {
    const { tasks } = getState()
    const taskIndex = tasks.findIndex(task => task.id === id)

    tasks[taskIndex].checked = !tasks[taskIndex].checked

    setState({ tasks })
  },
  setFilter: filter => ({ getState, setState }) => {
    const state = getState()
    setState({ ...state, filter })
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
