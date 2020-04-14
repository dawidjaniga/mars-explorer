import React from 'react'
import './App.css'

import {
  Arwes,
  ThemeProvider,
  createTheme,
  Button,
  Header,
  Paragraph
} from 'arwes'

import { produce } from 'immer'
import { defaults } from 'react-sweet-state'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Images from 'pages/mars/Images'

defaults.devtools = true
defaults.mutator = (currentState, producer) => produce(currentState, producer)

function App () {
  return (
    <ThemeProvider theme={createTheme()}>
      <Arwes>
        <Header animate>
          <h1 style={{ margin: 0 }}>Arwes - Cyberpunk UI Framework</h1>
          <Paragraph>A SciFi Project</Paragraph>
          <p>A SciFi Project</p>
        </Header>
        <Button>My Button</Button>

        <Router>
          <Switch>
            <Route path='/images/:rover?/:sol?/:camera?' component={Images} />
          </Switch>
        </Router>
      </Arwes>
    </ThemeProvider>
  )
}

export default App
