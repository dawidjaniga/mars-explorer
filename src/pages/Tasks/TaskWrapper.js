import React from 'react'
import TaskItem from 'components/TaskItem'
import { useTaskStore } from './store'

export function TaskWrapper ({ id }) {
  const [state, actions] = useTaskStore()
  const task = state.tasks.find(task => task.id === id)

  function handleToggle () {
    actions.toggleTaskChecked(id)
  }

  function handleRemove () {
    actions.removeTask(id)
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
