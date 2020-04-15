import React from 'react'
import styled from 'styled-components'
import { Puffs } from 'arwes'

const Styled = styled(Puffs)`
  width: 100%;
  height: 100%;
  position: absolute;
`

export default function PuffsComponent () {
  return <Styled />
}
