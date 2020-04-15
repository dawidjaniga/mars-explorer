import React from 'react'
import './App.css'

import {
  Arwes,
  Puffs,
  SoundsProvider,
  createSounds,
  ThemeProvider,
  createTheme
} from 'arwes'

import { produce } from 'immer'
import { defaults } from 'react-sweet-state'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import Puffs from 'components/Puffs'
import Images from 'pages/mars/Images'

defaults.devtools = true
defaults.mutator = (currentState, producer) => produce(currentState, producer)

const mySounds = {
  shared: { volume: 1 }, // Shared sound settings
  players: {
    // The player settings
    click: {
      // With the name the player is created
      sound: { src: ['/sound/click.mp3'] } // The settings to pass to Howler
    },
    typing: {
      sound: { src: ['/sound/typing.mp3'] },
      settings: { oneAtATime: true } // The custom app settings
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
        <Arwes>
          <Router>
            <Switch>
              <Route path='/images/:rover?/:sol?/:camera?' component={Images} />
            </Switch>
          </Router>
          {/* <Puffs /> */}
        </Arwes>
      </SoundsProvider>
    </ThemeProvider>
  )
}

export default App
