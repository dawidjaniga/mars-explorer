import React from 'react'
import styled from 'styled-components'

const Page = styled.main`
  max-width: 960px;
  margin: auto;
  min-height: calc(100% - var(--footer-height));
`

export default function ({ children }) {
  return <Page>{children}</Page>
}
