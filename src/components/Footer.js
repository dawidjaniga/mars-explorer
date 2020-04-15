import React from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'

const Wrapper = styled(Layout.Footer)`
  text-align: center;
  height: var(--footer-height);
`

export default function () {
  return <Wrapper>Janigowski ©2020</Wrapper>
}
