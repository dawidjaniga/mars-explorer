import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { Button } from 'arwes'
import createDebug from 'debug'

import Loader from 'components/Loader'
import Slider from 'components/Slider'
import ButtonLink from 'components/ButtonLink'
import Project from 'components/Project'
import Error from 'components/Error'

import { Photos } from './Photos'
import { useRoverStore } from 'stores/RoverStore'

const debug = createDebug('mars:rover')
const MIN_SOL = 0

export const cameras = {
  fhaz: 'Front Hazard Avoidance',
  rhaz: 'Rear Hazard Avoidance',
  mast: 'Mast',
  chemcam: 'Chemistry',
  mahli: 'Mars Hand Lens Imager',
  mardi: 'Mars Descent Imager',
  navcam: 'Navigation',
  pancam: 'Panoramic',
  minites: 'Miniature Thermal Emission Spectrometer (Mini-TES)',
  NAVCAM_LEFT: 'Engineering Cameras_navigation_camera___left',
  NAVCAM_RIGHT: 'Engineering Cameras_navigation_camera___right',
  FRONT_HAZCAM_LEFT_A: 'Engineering Cameras_front_hazcam___left',
  FRONT_HAZCAM_RIGHT_A: 'Engineering Cameras_front_hazcam___right',
  REAR_HAZCAM_LEFT: 'Engineering Cameras_rear_hazcam___left',
  REAR_HAZCAM_RIGHT: 'Engineering Cameras_rear_hazcam___right',
  MCZ_LEFT: 'Science Cameras_mastcam_z___left',
  MCZ_RIGHT: 'Science Cameras_mastcam_z___right',
  SKYCAM: 'Science Cameras_meda_skycam',
  SHERLOC_WATSON: 'Science Cameras_sherloc___watson',
  EDL_PUCAM1: 'Entry, Descent and Landing Cameras_parachute_up_look_camera_a',
  EDL_PUCAM2: 'Entry, Descent and Landing Cameras_parachute_up_look_camera_b',
  EDL_DDCAM:
    'Entry, Descent and Landing Cameras_descent_stage_down_look_camera',
  EDL_RUCAM: 'Entry, Descent and Landing Cameras_rover_up_look_camera',
  EDL_RDCAM: 'Entry, Descent and Landing Cameras_rover_down_look_camera'
}
const camerasByRover = {
  perseverance: [
    'NAVCAM_LEFT',
    'NAVCAM_RIGHT',
    'FRONT_HAZCAM_LEFT_A',
    'FRONT_HAZCAM_RIGHT_A',
    'REAR_HAZCAM_LEFT',
    'REAR_HAZCAM_RIGHT',
    'MCZ_LEFT',
    'MCZ_RIGHT',
    'SKYCAM',
    'SHERLOC_WATSON',
    'EDL_PUCAM1',
    'EDL_PUCAM2',
    'EDL_DDCAM',
    'EDL_RUCAM',
    'EDL_RDCAM'
  ],
  curiosity: ['fhaz', 'rhaz', 'mast', 'chemcam', 'mahli', 'mardi', 'navcam'],
  opportunity: ['fhaz', 'rhaz', 'navcam', 'pancam', 'minites'],
  spirit: ['fhaz', 'rhaz', 'navcam', 'pancam', 'minites']
}

const SolSelector = styled.div`
  display: flex;
  align-items: center;
`

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
  const [{ isLoading, error, maxSol }, roverActions] = useRoverStore()

  useEffect(() => {
    if (rover) {
      debug(`Fetching "${rover}" data...`)
      roverActions.fetchDetails({
        rover
      })
    }
  }, [roverActions, rover])

  function setSolUrl (sol) {
    history.push(`/photos/${rover}/${sol}`)
  }

  function handleAfterSolChange (newSol) {
    setSolUrl(newSol)
  }

  function handleIncrementClick () {
    const newSol = +sol + 1

    if (newSol <= maxSol) {
      setSolUrl(newSol)
    }
  }

  function handleDecrementClick () {
    const newSol = sol - 1

    if (newSol >= MIN_SOL) {
      setSolUrl(newSol)
    }
  }

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <Error>{error}</Error>
  }

  debug('data loaded.')

  return (
    <RoverWrapper>
      <Project animate header='Sol'>
        <SolSelector>
          <Button animate layer='success' onClick={handleDecrementClick}>
            -
          </Button>
          <Slider
            min={1}
            max={maxSol}
            value={sol}
            onAfterChange={handleAfterSolChange}
          />
          <Button animate layer='success' onClick={handleIncrementClick}>
            +
          </Button>
        </SolSelector>
      </Project>

      {sol && (
        <Project animate header='Camera'>
          <CamerasList>
            {camerasByRover[rover].map(camera => (
              <CameraLink key={camera}>
                <ButtonLink to={`/photos/${rover}/${sol}/${camera}`}>
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
