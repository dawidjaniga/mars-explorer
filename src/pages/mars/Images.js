import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import createDebug from 'debug'

import { Project as ProjectBase } from 'arwes'

import Content from 'components/Content'
import Page from 'components/Page'
import ButtonLink from 'components/ButtonLink'
import Loader from 'components/Loader'
import Slider from 'components/Slider'
import Footer from 'components/Footer'

import { CameraContainer } from './CameraStore'
import { useRoverStore, RoverContainer } from './RoverStore'
import { Photos } from './containers/Photos'

export const debug = createDebug('mars:images')

export const cameras = {
  fhaz: 'Front Hazard Avoidance',
  rhaz: 'Rear Hazard Avoidance',
  mast: 'Mast',
  chemcam: 'Chemistry',
  mahli: 'Mars Hand Lens Imager',
  mardi: 'Mars Descent Imager',
  navcam: 'Navigation',
  pancam: 'Panoramic',
  minites: 'Miniature Thermal Emission Spectrometer (Mini-TES)'
}

const camerasByRover = {
  curiosity: ['fhaz', 'rhaz', 'mast', 'chemcam', 'mahli', 'mardi', 'navcam'],
  opportunity: ['fhaz', 'rhaz', 'navcam', 'pancam', 'minites'],
  spirit: ['fhaz', 'rhaz', 'navcam', 'pancam', 'minites']
}

function Project ({ children, ...props }) {
  return (
    <ProjectBase style={{ marginBottom: '40px' }} {...props}>
      {children}
    </ProjectBase>
  )
}

const CamerasList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const CameraLink = styled.div`
  padding: 1em;
`

const RoverWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

const PhotosWrapper = styled.div`
  min-height: 90vh;
`

function Rover () {
  const { rover, sol, camera } = useParams()
  const history = useHistory()
  const [roverState, roverActions] = useRoverStore()

  useEffect(() => {
    if (rover) {
      debug('fetchinh rover data...')
      roverActions.fetchDetails({ rover })
    }
  }, [roverActions, rover])

  function handleAfterSolChange (sol) {
    history.push(`/images/${rover}/${sol}`)
  }

  if (roverState.isLoading) {
    return <Loader />
  }

  debug('rover loaded')

  return (
    <RoverWrapper>
      <Project animate header='Sol'>
        <Slider
          min={1}
          max={roverState.maxSol}
          value={sol}
          onAfterChange={handleAfterSolChange}
        />
      </Project>

      {sol && (
        <Project animate header='Camera'>
          <CamerasList>
            {camerasByRover[rover].map(camera => (
              <CameraLink key={camera}>
                <ButtonLink to={`/images/${rover}/${sol}/${camera}`}>
                  {cameras[camera]}
                </ButtonLink>
              </CameraLink>
            ))}
          </CamerasList>
        </Project>
      )}
      {camera && (
        <PhotosWrapper>
          <Photos />
        </PhotosWrapper>
      )}
    </RoverWrapper>
  )
}

const Top = styled.div``

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
          <Top>
            <Project animate header='Rover'>
              {anim => (
                <RoverMenu>
                  <ButtonLink to='/images/curiosity/'>Curiosity</ButtonLink>
                  <ButtonLink to='/images/opportunity'>Opportunity</ButtonLink>
                  <ButtonLink to='/images/spirit'>Spirit</ButtonLink>
                </RoverMenu>
              )}
            </Project>
          </Top>
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
