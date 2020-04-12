import React from 'react'
import TaskItem from 'components/TaskItem'
import { useTaskStore } from './store'
import api from 'api'

export function TaskWrapper ({ id }) {
  const [state, actions] = useTaskStore()
  const task = state.tasks.find(task => task.id === id)

  function handleToggle () {
    actions.toggleTaskChecked(id)
  }

  async function handleRemove () {
    await api.tasks.delete(id)
    actions.load()
  }

  return (
    <TaskItem
      checked={task.checked}
      key={task.name}
      name={task.name}
      onToggle={handleToggle}
      onRemove={handleRemove}
    />
  )
}
