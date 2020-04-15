import React from 'react'
import { Loading } from 'arwes'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 24em;
  justify-content: center;
  align-items: center;
  display: flex;
`

export default function Loader () {
  return (
    <div>
      <Wrapper>
        <Loading animate />
      </Wrapper>
    </div>
  )
}
