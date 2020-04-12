import React from 'react'
import './App.css'
import { produce } from 'immer'
import { defaults } from 'react-sweet-state'
import Mars from 'pages/mars'

// import Tasks from 'pages/Tasks'
defaults.devtools = true
defaults.mutator = (currentState, producer) => produce(currentState, producer)

function App () {
  return <Mars />
}

export default App
