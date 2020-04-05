import React from 'react'
import { Checkbox } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import styled, { css } from 'styled-components'

const DeleteIcon = styled(DeleteOutlined)`
  color: #c53f3f;
`

const Check = styled(Checkbox)`
  ${props =>
    props.checked &&
    css`
      text-decoration: line-through;
      opacity: 0.5;
    `}
`

const Wrapper = styled.div`
  margin: 1em;

  ${DeleteIcon} {
    visibility: hidden;
  }

  &:hover ${DeleteIcon} {
    visibility: visible;
  }
`

export default function TaskItem ({ name, checked, onToggle, onRemove }) {
  return (
    <Wrapper checked={checked}>
      <Check checked={checked} onChange={onToggle}>
        {name}
      </Check>
      <DeleteIcon onClick={onRemove} />
    </Wrapper>
  )
}
