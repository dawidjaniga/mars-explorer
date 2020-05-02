import React from 'react'
import { Heading } from 'arwes'
import styled from 'styled-components'

import Page from 'components/Page'
import Content from 'components/Content'
import ButtonLink from 'components/ButtonLink'
import Footer from 'components/Footer'

const Inner = styled.article`
  flex-direction: column;
  display: flex;
  align-items: center;
  text-align: center;
  z-index: 4;
`

const Landscape = styled.img`
  background: url(/mars-landspace.jpg);
  min-height: 100vh;
  position: absolute;
  width: 100%;
  background-position: top center;
  background-size: auto 100%;
  top: 0;
  z-index: 0;
`

const Title = styled.div`
  color: #000;
  font-family: 'Electrolize', 'sans-serif';
  font-weight: bold;
  text-transform: uppercase;
  font-size: 60px;
`

const Description = styled.h2`
  font-size: 40px;
`

const CallToAction = styled.p`
  font-size: 40px;
  padding: 20px;
  margin: 0;
`

export default function Index () {
  return (
    <>
      <Page>
        <Content>
          <Inner>
            <Heading node='h1'>
              <Title>
                Mars Explorer
                <Description>Discover NASA Mars footage</Description>
              </Title>
            </Heading>
            <ButtonLink to='photos'>
              <CallToAction>Explore</CallToAction>
            </ButtonLink>
          </Inner>
        </Content>
      </Page>
      <Landscape />
      <Footer />
    </>
  )
}
