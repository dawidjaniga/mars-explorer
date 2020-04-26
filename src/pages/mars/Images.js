import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import createDebug from 'debug'

import Page from 'components/Page'
import Content from 'components/Content'
import Project from 'components/Project'
import Footer from 'components/Footer'
import ButtonLink from 'components/ButtonLink'

import Rover from './components/Rover'

import { RoverContainer } from 'stores/RoverStore'
import { CameraContainer } from 'stores/CameraStore'

export const debug = createDebug('mars:images')

const RoverMenu = styled.div`
  display: flex;
  justify-content: space-evenly;
`

export default function Images () {
  const { rover, camera } = useParams()

  return (
    <>
      <Page>
        <Content>
          <>
            <Project animate header='Rover'>
              {anim => (
                <RoverMenu>
                  <ButtonLink to='/images/curiosity/'>Curiosity</ButtonLink>
                  <ButtonLink to='/images/opportunity'>Opportunity</ButtonLink>
                  <ButtonLink to='/images/spirit'>Spirit</ButtonLink>
                </RoverMenu>
              )}
            </Project>
          </>
          {rover && (
            <RoverContainer scope={rover}>
              <CameraContainer scope={`${rover}  ${camera}`}>
                <Rover />
              </CameraContainer>
            </RoverContainer>
          )}
        </Content>
      </Page>
      <Footer />
    </>
  )
}
