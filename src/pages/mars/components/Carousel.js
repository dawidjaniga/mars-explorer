import React from 'react'
import { Photo } from '../Images'
import {
  FiArrowLeft,
  FiPlay,
  FiPause,
  FiArrowRight,
  FiVoicemail
} from 'react-icons/fi'
import styled from 'styled-components'

const Controlls = styled.div``
export default class Carousel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPhoto: 0,
      ticker: 0,
      isPlaying: false
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
    }, 250)
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

  handleImageLoad () {
    this.props.onImageLoaded()
  }

  render () {
    return (
      <div>
        <Controlls>
          <FiArrowLeft onClick={this.selectPreviousPhoto.bind(this)} />
          {this.state.isPlaying ? (
            <FiPause onClick={this.handlePlayPauseClick.bind(this)} />
          ) : (
            <FiPlay onClick={this.handlePlayPauseClick.bind(this)} />
          )}

          <FiArrowRight onClick={this.selectNextPhoto.bind(this)} />
          <FiVoicemail />
        </Controlls>
        {this.props.photos.map((src, index) => (
          <Photo key={src} show={index === this.state.currentPhoto}>
            <img src={src} onLoad={this.handleImageLoad.bind(this)} />
          </Photo>
        ))}
      </div>
    )
  }
}
