import React from 'react'
import {
  FiArrowLeft,
  FiPlay,
  FiPause,
  FiArrowRight,
  FiVoicemail,
  FiRotateCcw,
  FiRotateCw
} from 'react-icons/fi'
import styled from 'styled-components'
import { IconContext } from 'react-icons'

export const Photo = styled.div`
  width: 100%;
  display: ${props => (props.show ? 'initial' : 'none')};

  img {
    width: 100%;
    max-height: 90vh;
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
      ticker: 0,
      isPlaying: false,
      intervalDuration: 1000
    }
  }

  componentDidMount () {
    this.startInterval()
    document.onkeydown = this.handleKeyUp.bind(this)
  }

  handleKeyUp (event) {
    event.preventDefault()
    const keyActionMap = {
      ArrowLeft: this.selectPreviousPhoto.bind(this),
      ArrowRight: this.selectNextPhoto.bind(this),
      Space: this.handlePlayPauseClick.bind(this)
    }
    const action = keyActionMap[event.code]

    if (action) {
      action()
    }
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

  selectPreviousPhoto () {
    const ticker = this.state.ticker - 1
    const currentPhoto = ticker % this.props.photos.length

    this.setState({
      ticker,
      currentPhoto
    })
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
    const newDuration = this.state.intervalDuration + 100
    this.setState(
      {
        intervalDuration: newDuration > 5000 ? 5000 : newDuration
      },
      () => {
        this.stopInterval()
        this.startInterval()
      }
    )
  }

  speedUpInterval () {
    const newDuration = this.state.intervalDuration - 100
    this.setState(
      {
        intervalDuration: newDuration < 40 ? 40 : newDuration
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
            <span>{this.state.intervalDuration}</span>
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
