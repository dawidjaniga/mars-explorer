import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import createDebug from 'debug'

import Loader from 'components/Loader'
import Slider from 'components/Slider'
import ButtonLink from 'components/ButtonLink'
import Project from 'components/Project'

import { Photos } from './Photos'
import { useRoverStore } from 'stores/RoverStore'

const debug = createDebug('mars:rover')
const cameras = {
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

export default function Rover () {
  const { rover, sol, camera } = useParams()
  const history = useHistory()
  const [roverState, roverActions] = useRoverStore()

  useEffect(() => {
    if (rover) {
      debug('fetchinh rover data...')
      roverActions.fetchDetails({
        rover
      })
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
