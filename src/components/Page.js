import React from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'

const Page = styled(Layout)`
  display: flex;
  align-items: center;
`

export default function ({ children }) {
  return <Page className='layout'>{children}</Page>
}
