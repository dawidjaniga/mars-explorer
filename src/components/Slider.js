import React from 'react'
import ReactSlider from 'react-slider'
import styled from 'styled-components'
import { Button, withSounds } from 'arwes'

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 25px;
`

const StyledThumb = styled.div`
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  background-color: #000;
  color: #fff;
  cursor: grab;
`

const Thumb = (props, state) => {
  return <StyledThumb {...props}>{state.valueNow}</StyledThumb>
}

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${props => (props.index === 1 ? '#444' : '#0f0')};
`

const Track = (props, state) => <StyledTrack {...props} index={state.index} />

function Slider ({ value, max, onAfterChange, sounds }) {
  function handleSelectValue (value) {
    sounds.typing.play()
    onAfterChange(value)
  }
  return (
    <StyledSlider
      value={value}
      max={max}
      onAfterChange={handleSelectValue}
      onSliderClick={handleSelectValue}
      renderTrack={Track}
      renderThumb={Thumb}
    />
  )
}

export default withSounds()(props => <Slider {...props} />)
