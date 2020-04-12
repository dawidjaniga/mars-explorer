import { PlusOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import api from 'api'
import React, { useState } from 'react'
import { useActions } from 'pages/Tasks/store'

export function AddTask () {
  const [name, setName] = useState()
  const [, { load }] = useActions()

  async function handleAdd () {
    if (name) {
      await api.tasks.create({ name })
      setName('')
      load()
    }
  }

  function handleChange (event) {
    setName(event.target.value)
  }

  return (
    <Input.Group>
      <Input
        style={{ width: '80%' }}
        placeholder='Type task name...'
        value={name}
        onChange={handleChange}
        onPressEnter={handleAdd}
      />
      <Button type='primary' icon={<PlusOutlined />} onClick={handleAdd} />
    </Input.Group>
  )
}
