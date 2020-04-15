import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import Carousel from 'components/Carousel'
import Centered from 'components/Centered'
import PercentageLoader from 'components/PercentageLoader'
import { useCameraStore } from '../CameraStore'
import createDebug from 'debug'
import { FiCameraOff } from 'react-icons/fi'
import Loader from 'components/Loader'

const debug = createDebug('mars:photos')

export const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
`

export function Photos () {
  const { rover, camera, sol } = useParams()
  const [{ isLoading, progress, photos }, { fetchPhotos }] = useCameraStore()

  useEffect(() => {
    debug('fetching photos')
    fetchPhotos({ rover, camera, sol })
  }, [rover, camera, sol])

  if (isLoading) {
    return <Loader />
  }

  if (!photos.length) {
    return (
      <Centered>
        <FiCameraOff />
        <div>No photos, try another camera</div>
      </Centered>
    )
  }

  if (progress < 1) {
    return <PercentageLoader progress={progress} />
  }

  return (
    <Wrapper>
      <Carousel photos={photos} />
    </Wrapper>
  )
}
