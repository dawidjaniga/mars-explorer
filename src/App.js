import React from 'react'
import './App.css'
import { produce } from 'immer'
import { defaults } from 'react-sweet-state'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Images from 'pages/mars/Images'

defaults.devtools = true
defaults.mutator = (currentState, producer) => produce(currentState, producer)

function App () {
  return (
    <Router>
      <Switch>
        <Route path='/images/:rover?/:sol?/:camera?' component={Images} />
      </Switch>
    </Router>
  )
}

export default App
