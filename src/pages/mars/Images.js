import React, { useEffect, useState } from 'react'
import { Slider, Button, Radio, Spin, Typography } from 'antd'
import styled from 'styled-components'
import { useLocation, Link, useParams, useHistory } from 'react-router-dom'

import Content from 'components/Content'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Page from 'components/Page'

import Carousel from './components/Carousel'

import { useCameraStore, CameraContainer } from './CameraStore'
import { useRoverStore, RoverContainer } from './RoverStore'
import { PercentageLoader } from './PercentageLoader'

const { Title } = Typography

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

const CameraWrapper = styled.div`
  width: 100%;
`

export const Photo = styled.div`
  width: 100%;
  display: ${props => (props.show ? 'initial' : 'none')};

  img {
    width: 100%;
  }
`

const Loader = styled.div`
  width: 100%;
  height: 24em;
  justify-content: center;
  align-items: center;
  display: flex;
`

function Photos () {
  const { rover, camera, sol } = useParams()
  const [cameraState, cameraActions] = useCameraStore()
  // const { progress } = state.cameras[state.sol][camera]

  useEffect(() => {
    cameraActions.fetchPhotos({ rover, camera, sol })
  }, [cameraActions, rover, camera, sol])

  function imageLoaded () {
    cameraActions.addCameraImageLoaded()
  }

  console.log(cameraState.photos)
  if (!cameraState.photos.length) {
    return 'No photos, try another camera'
  }

  return (
    <CameraWrapper>
      <Carousel photos={cameraState.photos} onImageLoaded={imageLoaded} />
      {/* <PercentageLoader progress={progress}>
        <Carousel photos={photos} onImageLoaded={imageLoaded} />
      </PercentageLoader> */}
    </CameraWrapper>
  )
}

function CameraLink ({ to, children }) {
  const { pathname } = useLocation()
  const isActive = to === pathname
  const type = isActive ? 'primary' : ''

  return (
    <Link to={to}>
      <Button type={type}>{children}</Button>
    </Link>
  )
}

function Rover () {
  const { rover, sol, camera } = useParams()
  const history = useHistory()
  const [roverState, roverActions] = useRoverStore()
  console.log('useParams()', useParams())

  useEffect(() => {
    if (rover) {
      roverActions.fetchDetails({ rover })
    }
  }, [roverActions, rover])

  function handleAfterSolChange (sol) {
    history.push(`/images/${rover}/${sol}`)
  }

  if (roverState.isLoading) {
    return (
      <Loader>
        <Spin />
      </Loader>
    )
  }

  return (
    <>
      <Title level={3}>Select sol</Title>
      <Slider
        min={1}
        max={roverState.maxSol}
        defaultValue={sol}
        onAfterChange={handleAfterSolChange}
      />

      {camerasByRover[rover].map(camera => (
        <CameraLink key={camera} to={`/images/${rover}/${sol}/${camera}`}>
          {cameras[camera]}
        </CameraLink>
      ))}

      {camera && <Photos />}
    </>
  )
}

export default function Images () {
  const { rover, camera } = useParams()
  console.log('params', useParams())

  return (
    <Page>
      <Header />
      <Content>
        <Title level={1}>Explore Mars Images</Title>

        <Link to='/images/curiosity/1000/'>curiosity</Link>
        <Link to='/images/opportunity/1000'>opportunity</Link>
        <Link to='/images/spirit/1000'>spirit</Link>

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
