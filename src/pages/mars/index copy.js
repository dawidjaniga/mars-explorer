import React, { useEffect } from 'react'
import { Slider, Radio, Spin, Typography } from 'antd'
import styled from 'styled-components'

import Content from 'components/Content'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Page from 'components/Page'

import { useMarsStore } from './store'

const { Title } = Typography

const Photos = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
const CameraWrapper = styled.div`
  width: 25%;
`

const Photo = styled.div`
  width: 100%;
  display: ${props => (props.show ? 'initial' : 'none')};

  img {
    width: 100%;
  }
`

class Carousel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPhoto: 0,
      ticker: 0
    }
  }

  componentDidMount () {
    this.startInterval()
  }

  componentWillUnmount () {
    this.stopInterval()
  }

  selectNextPhoto () {
    const ticker = this.state.ticker + 1
    const currentPhoto = ticker % this.props.photos.length

    this.setState({
      ticker,
      currentPhoto
    })
  }

  handleWrapperClick () {
    if (this.intervalHandler) {
      this.stopInterval()
    } else {
      this.startInterval()
    }
  }

  startInterval () {
    this.intervalHandler = setInterval(() => {
      this.selectNextPhoto()
    }, 250)
  }

  stopInterval () {
    clearInterval(this.intervalHandler)
    this.intervalHandler = null
  }

  handleImageLoad () {
    this.props.onImageLoaded()
  }

  render () {
    return (
      <div onClick={this.handleWrapperClick.bind(this)}>
        {this.props.photos.map((photo, index) => (
          <Photo key={photo.id} show={index === this.state.currentPhoto}>
            <img src={photo.img_src} onLoad={this.handleImageLoad.bind(this)} />
            {/* <a href={photo.img_src} target='_blank' rel='noopener noreferrer'>
            </a> */}
          </Photo>
        ))}
      </div>
    )
  }
}

const PercentageLoaderOuter = styled.div`
  position: relative;
`
const PercentageLoaderWrapper = styled.div`
  opacity: ${props => props.progress};
`
const AnotherWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  font-size: 2em;
  align-items: center;
`

function PercentageLoader ({ progress, children }) {
  return (
    <PercentageLoaderOuter>
      {!progress && (
        <AnotherWrapper>
          <h3>{progress * 100}%</h3>
        </AnotherWrapper>
      )}
      <PercentageLoaderWrapper progress={progress}>
        {children}
      </PercentageLoaderWrapper>
    </PercentageLoaderOuter>
  )
}

const Loader = styled.div`
  width: 100%;
  height: 24em;
  justify-content: center;
  align-items: center;
  display: flex;
`

function Camera ({ name, photos }) {
  const [state, actions] = useMarsStore()
  const { progress } = state.cameras[state.sol][name]

  function imageLoaded () {
    actions.addCameraImageLoaded(name)
  }

  return (
    <CameraWrapper>
      <h2>{name}</h2>
      <PercentageLoader progress={progress}>
        <Carousel photos={photos} onImageLoaded={imageLoaded} />
      </PercentageLoader>
    </CameraWrapper>
  )
}

const options = [
  { label: 'Curiosity', value: 'curiosity' },
  { label: 'Opportunity', value: 'opportunity' },
  { label: 'Spirit', value: 'spirit' }
]

export default function Mars () {
  const [state, actions] = useMarsStore()

  useEffect(() => {
    actions.load()
  }, [actions])

  function handleSolChange (value) {
    actions.setSol(value)
  }

  function handleAfterSolChange () {
    actions.setPage(1)
    actions.load()
  }

  function handleRoverChange (event) {
    actions.setRover(event.target.value)
    actions.load()
  }

  return (
    <Page>
      <Header />
      <Content>
        <Title level={1}>Mars</Title>
        <Title level={2}>Rover</Title>
        <Radio.Group
          options={options}
          onChange={handleRoverChange}
          value={state.rover}
        />
        <Radio.Group
          options={options}
          onChange={handleRoverChange}
          value={state.rover}
        />
        Sol:{' '}
        <Slider
          value={state.sol}
          max={state.maxSol}
          onChange={handleSolChange}
          onAfterChange={handleAfterSolChange}
        />
        {state.isLoading ? (
          <Loader>
            <Spin />
          </Loader>
        ) : (
          <Photos>
            {state.cameras[state.sol] &&
              Object.entries(state.cameras[state.sol]).map(
                ([cameraName, camera]) => (
                  <Camera
                    key={cameraName}
                    name={cameraName}
                    photos={camera.photos}
                  />
                )
              )}
          </Photos>
        )}
      </Content>
      <Footer />
    </Page>
  )
}
