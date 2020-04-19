import React from 'react'
import { Footer, Link } from 'arwes'
import styled from 'styled-components'

const Wrapper = styled(Footer)`
  min-height: var(--footer-height);
`

const Inner = styled.div`
  text-align: center;
  padding: 30px;
`

export default function () {
  return (
    <Wrapper animate>
      <Inner>
        <Link href='https://www.youtube.com/channel/UCG9Outqf6WCz_bb7jFXUQOA'>
          Janigowski
        </Link>{' '}
        2020
      </Inner>
    </Wrapper>
  )
}
