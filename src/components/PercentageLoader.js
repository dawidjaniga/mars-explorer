import React from 'react'
import Centered from 'components/Centered'

export default function PercentageLoader ({ progress }) {
  return (
    <Centered>
      <p>{(progress * 100).toFixed(0)}%</p>
    </Centered>
  )
}
