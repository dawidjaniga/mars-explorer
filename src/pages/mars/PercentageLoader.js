import React from 'react'
import styled from 'styled-components'
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
export function PercentageLoader ({ progress, children }) {
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
