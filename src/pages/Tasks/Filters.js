import React from 'react'
import styled from 'styled-components'
import { useTaskStore } from './store'

const FilterWrapper = styled.a`
  padding: 1em;
  text-decoration: ${props => props.checked && 'underline'};
`

export const Filters = styled.div`
  margin: 2em;
`

export function Filter ({ children, value }) {
  const [state, actions] = useTaskStore()
  const checked = state.filter === value

  function onClick () {
    actions.setFilter(value)
  }

  return (
    <FilterWrapper checked={checked} onClick={onClick}>
      {children}
    </FilterWrapper>
  )
}
