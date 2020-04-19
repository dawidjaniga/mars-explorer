import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Button } from 'arwes'

export default function ButtonLink ({ to, children }) {
  const { pathname } = useLocation()
  const isActive = pathname.includes(to)
  const layer = isActive ? 'success' : 'control'

  return (
    <Link to={to}>
      <Button animate layer={layer}>
        {children}
      </Button>
    </Link>
  )
}
