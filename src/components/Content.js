import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
`

export default function ({ children }) {
  return <Content>{children}</Content>
}
