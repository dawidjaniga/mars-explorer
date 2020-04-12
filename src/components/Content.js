import React from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'

const Content = styled(Layout.Content)`
  background: #fff;
  padding: 50px;
  /* max-width: ${props => (props.fullwidth ? '100%' : '960px')}; */
  width: 100%;
  margin: 40px;
`

export default function ({ children }) {
  return <Content>{children}</Content>
}
