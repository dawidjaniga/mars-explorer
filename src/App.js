import React from 'react'
import './App.css'

import {
  Arwes,
  SoundsProvider,
  createSounds,
  ThemeProvider,
  createTheme
} from 'arwes'

import { produce } from 'immer'
import { defaults } from 'react-sweet-state'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Images from 'pages/mars/Images'

defaults.devtools = true
defaults.mutator = (currentState, producer) => produce(currentState, producer)

const mySounds = {
  shared: { volume: 1 },
  players: {
    click: {
      sound: { src: ['/sound/click.mp3'] }
    },
    typing: {
      sound: { src: ['/sound/typing.mp3'] },
      settings: { oneAtATime: true }
    },
    deploy: {
      sound: { src: ['/sound/deploy.mp3'] },
      settings: { oneAtATime: true }
    }
  }
}

function App () {
  return (
    <ThemeProvider theme={createTheme()}>
      <SoundsProvider sounds={createSounds(mySounds)}>
        <Arwes background='/bg.jpg' pattern='/glow.png'>
          <Router>
            <Switch>
              <Route path='/images/:rover?/:sol?/:camera?' component={Images} />
            </Switch>
          </Router>
        </Arwes>
      </SoundsProvider>
    </ThemeProvider>
  )
}

export default App
