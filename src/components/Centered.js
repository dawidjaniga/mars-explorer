import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  width: 100%;
`

export default function Centered ({ children }) {
  return <Wrapper>{children}</Wrapper>
}
