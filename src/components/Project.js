import React from 'react'
import { Project as ProjectBase } from 'arwes'

export default function Project ({ children, ...props }) {
  return (
    <ProjectBase style={{ marginBottom: '40px' }} {...props}>
      {children}
    </ProjectBase>
  )
}
