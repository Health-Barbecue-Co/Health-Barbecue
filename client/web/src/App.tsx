import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Box } from '@material-ui/core'

import { Navbar, ConnectedRoute } from './components/common'
import { AuthProvider } from './components/auth'

import { About } from './pages/About'
import { Home } from './pages/Home'
import { User } from './pages/User'
import { Projects } from './pages/Projects'
import { Series } from './pages/Series'
import { AlgorithmsMain } from './components/algorithms'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Box display="flex" flex={1} flexDirection="column">
          <Switch>
            <ConnectedRoute path="/home" exact>
              <Home />
            </ConnectedRoute>
            <ConnectedRoute path="/about" exact>
              <About />
            </ConnectedRoute>
            <Route path="/user" component={User} />
            <ConnectedRoute exact path="/">
              <Home />
            </ConnectedRoute>
            <ConnectedRoute path="/projects" exact>
              <Projects />
            </ConnectedRoute>
            <ConnectedRoute path="/series">
              <Series />
            </ConnectedRoute>
            <ConnectedRoute path="/algorithms">
              <AlgorithmsMain />
            </ConnectedRoute>
          </Switch>
        </Box>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
