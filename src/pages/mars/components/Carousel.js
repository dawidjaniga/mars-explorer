import React from 'react'
import { Photo } from '../Images'

export default class Carousel extends React.Component {
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
        {this.props.photos.map((src, index) => (
          <Photo key={src} show={index === this.state.currentPhoto}>
            <img src={src} onLoad={this.handleImageLoad.bind(this)} />
          </Photo>
        ))}
      </div>
    )
  }
}
