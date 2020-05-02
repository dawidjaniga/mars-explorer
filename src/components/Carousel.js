import React from 'react'
import {
  FiArrowLeft,
  FiPlay,
  FiPause,
  FiArrowRight,
  FiRotateCcw,
  FiRotateCw
} from 'react-icons/fi'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import createDebug from 'debug'

const debug = createDebug('mars:carousel')
const DEBUG_PHOTO_TICKER = true
const ONE_SECOND_IN_MS = 1000
const MAX_ANIMATION_INTERVAL_IN_MS = 5000
const MIN_ANIMATION_INTERVAL_IN_MS = 40
const SLOW_DOWN_RATIO = 1.1
const SPEED_UP_RATIO = 0.9

const Photo = styled.div`
  width: 100%;
  display: ${props => (props.show ? 'initial' : 'none')};

  img {
    width: 100%;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`
const Controlls = styled.div`
  padding: 1em;

  svg {
    cursor: pointer;
    margin: 0 1em;
  }
`

const Photos = styled.div`
  user-select: none;
`

const Counter = styled.div`
  padding: 1em;
`

export default class Carousel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPhoto: 0,
      ticker: -1,
      isPlaying: false,
      intervalDuration: ONE_SECOND_IN_MS
    }
  }

  componentDidMount () {
    this.startInterval()
    document.onkeydown = this.handleKeyUp.bind(this)
  }

  handleKeyUp (event) {
    const keyActionMap = {
      ArrowLeft: this.selectPreviousPhoto.bind(this),
      ArrowRight: this.selectNextPhoto.bind(this),
      Space: this.handlePlayPauseClick.bind(this)
    }
    const action = keyActionMap[event.code]

    if (action) {
      event.preventDefault()
      action()
    }
  }

  componentWillUnmount () {
    this.stopInterval()
  }

  selectNextPhoto () {
    const ticker = this.state.ticker + 1
    const currentPhoto = ticker % this.props.photos.length
    this.debugPhotoTicker(ticker, currentPhoto)

    this.setState({
      ticker,
      currentPhoto
    })
  }

  selectPreviousPhoto () {
    const ticker = this.state.ticker - 1
    const currentPhoto = ticker % this.props.photos.length
    this.debugPhotoTicker(ticker, currentPhoto)

    this.setState({
      ticker,
      currentPhoto
    })
  }

  debugPhotoTicker (ticker, currentPhoto) {
    if (DEBUG_PHOTO_TICKER) {
      const photos = this.props.photos.length
      debug(
        `Photo ticker: \t ticker=${ticker} \t photos=${photos} \t currentPhoto=${currentPhoto} \t\t ${ticker} % ${photos} = ${currentPhoto}`
      )
    }
  }

  handlePlayPauseClick () {
    if (this.intervalHandler) {
      this.stopInterval()
    } else {
      this.startInterval()
    }
  }

  startInterval () {
    this.intervalHandler = setInterval(() => {
      this.selectNextPhoto()
    }, this.state.intervalDuration)

    this.setState({
      isPlaying: true
    })
  }

  stopInterval () {
    clearInterval(this.intervalHandler)
    this.intervalHandler = null

    this.setState({
      isPlaying: false
    })
  }

  slowDownInterval () {
    const newDuration = this.state.intervalDuration * SLOW_DOWN_RATIO
    this.setState(
      {
        intervalDuration:
          newDuration > MAX_ANIMATION_INTERVAL_IN_MS
            ? MAX_ANIMATION_INTERVAL_IN_MS
            : newDuration
      },
      () => {
        this.stopInterval()
        this.startInterval()
      }
    )
  }

  speedUpInterval () {
    const newDuration = this.state.intervalDuration * SPEED_UP_RATIO
    this.setState(
      {
        intervalDuration:
          newDuration < MIN_ANIMATION_INTERVAL_IN_MS
            ? MIN_ANIMATION_INTERVAL_IN_MS
            : newDuration
      },
      () => {
        this.stopInterval()
        this.startInterval()
      }
    )
  }

  render () {
    return (
      <Wrapper>
        <IconContext.Provider value={{ size: '24px' }}>
          <Counter>
            {this.state.currentPhoto + 1} / {this.props.photos.length}{' '}
            <span>
              {(ONE_SECOND_IN_MS / this.state.intervalDuration).toFixed(1)} FPS
            </span>
          </Counter>
          <Controlls>
            <FiArrowLeft onClick={this.selectPreviousPhoto.bind(this)} />
            <FiRotateCcw onClick={this.slowDownInterval.bind(this)} />
            {this.state.isPlaying ? (
              <FiPause onClick={this.handlePlayPauseClick.bind(this)} />
            ) : (
              <FiPlay onClick={this.handlePlayPauseClick.bind(this)} />
            )}
            <FiRotateCw onClick={this.speedUpInterval.bind(this)} />
            <FiArrowRight onClick={this.selectNextPhoto.bind(this)} />
          </Controlls>
        </IconContext.Provider>
        <Photos>
          {this.props.photos.map((src, index) => (
            <Photo key={src} show={index === this.state.currentPhoto}>
              <img src={src} />
            </Photo>
          ))}
        </Photos>
      </Wrapper>
    )
  }
}
