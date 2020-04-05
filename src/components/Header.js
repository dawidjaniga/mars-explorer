import React from 'react'
import styled from 'styled-components'
import { Layout } from 'antd'
const { Header } = Layout

const Wrapper = styled(Header)`
  width: 100%;
`

export default function HeaderComponent () {
  return (
    <Wrapper>
      <div className='logo' />
    </Wrapper>
  )
}
