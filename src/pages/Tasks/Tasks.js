import React, { useEffect } from 'react'
import { Spin } from 'antd'
import { useFilteredTasks } from './store'
import { TaskWrapper } from './TaskWrapper'

export default function Tasks () {
  const [state, actions] = useFilteredTasks()
  const [tasks] = useFilteredTasks()

  useEffect(() => {
    actions.load()
  }, [actions])

  if (state.isLoading) {
    return <Spin />
  }

  return tasks.map(task => <TaskWrapper id={task.id} key={task.id} />)
}
