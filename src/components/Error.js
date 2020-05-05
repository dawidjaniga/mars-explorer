import React from 'react'
import { Blockquote } from 'arwes'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 24em;
  justify-content: center;
  align-items: center;
  display: flex;
`

export default function Error ({ children }) {
  return (
    <Wrapper>
      <Blockquote data-layer='alert'>{children}</Blockquote>
    </Wrapper>
  )
}
