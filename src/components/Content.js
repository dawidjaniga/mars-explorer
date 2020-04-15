import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  padding: 50px;
  min-height: calc(100% - var(--footer-height));
  display: flex;
  flex-direction: column;
`

export default function ({ children }) {
  return <Content>{children}</Content>
}
