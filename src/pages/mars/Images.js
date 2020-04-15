import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useLocation, Link, useParams, useHistory } from 'react-router-dom'
import createDebug from 'debug'

import { Button, Frame } from 'arwes'

import Content from 'components/Content'
import Footer from 'components/Footer'
import Slider from 'components/Slider'
import Page from 'components/Page'
import Loader from 'components/Loader'

import { CameraContainer } from './CameraStore'
import { useRoverStore, RoverContainer } from './RoverStore'
import { Photos } from './containers/Photos'

export const debug = createDebug('mars:images')

export const cameras = {
  fhaz: 'Front Hazard Avoidance Camera',
  rhaz: 'Rear Hazard Avoidance Camera',
  mast: 'Mast Camera',
  chemcam: 'Chemistry and Camera',
  mahli: 'Mars Hand Lens Imager',
  mardi: 'Mars Descent Imager',
  navcam: 'Navigation Camera',
  pancam: 'Panoramic Camera',
  minites: 'Miniature Thermal Emission Spectrometer (Mini-TES)'
}

const camerasByRover = {
  curiosity: ['fhaz', 'rhaz', 'mast', 'chemcam', 'mahli', 'mardi', 'navcam'],
  opportunity: ['fhaz', 'rhaz', 'navcam', 'pancam', 'minites'],
  spirit: ['fhaz', 'rhaz', 'navcam', 'pancam', 'minites']
}

function ButtonLink ({ to, children }) {
  const { pathname } = useLocation()
  const isActive = pathname.includes(to)
  const layer = isActive ? 'success' : 'control'

  return (
    <Link to={to}>
      <Button animate layer={layer}>
        {children}
      </Button>
    </Link>
  )
}

const CamerasList = styled.div`
  display: flex;
`

const CameraLink = styled.div`
  padding: 1em;
`

const RoverWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

const RoverTop = styled.div``

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
      <RoverTop>
        <h3>Select sol</h3>
        <Slider
          min={1}
          max={roverState.maxSol}
          value={sol}
          onAfterChange={handleAfterSolChange}
        />
      </RoverTop>

      {sol && (
        <CamerasList>
          {camerasByRover[rover].map(camera => (
            <CameraLink key={camera}>
              <ButtonLink to={`/images/${rover}/${sol}/${camera}`}>
                {cameras[camera]}
              </ButtonLink>
            </CameraLink>
          ))}
        </CamerasList>
      )}
      {camera && <Photos />}
    </RoverWrapper>
  )
}

const Top = styled.div``

export default function Images () {
  const { rover, camera } = useParams()
  console.log('params', useParams())

  return (
    <Page>
      <Content>
        <Top>
          <Frame animate level={2} corners={3}>
            <ButtonLink to='/images/curiosity/'>curiosity</ButtonLink>
            <ButtonLink to='/images/opportunity'>opportunity</ButtonLink>
            <ButtonLink to='/images/spirit'>spirit</ButtonLink>
          </Frame>
        </Top>
        {rover && (
          <RoverContainer scope={rover}>
            <CameraContainer scope={`${rover}  ${camera}`}>
              <Rover />
            </CameraContainer>
          </RoverContainer>
        )}
      </Content>
      <Footer />
    </Page>
  )
}
