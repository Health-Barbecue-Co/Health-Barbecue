import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Container, makeStyles } from '@material-ui/core'

import { Navbar, ConnectedRoute } from './components/common'
import { AuthProvider } from './components/auth'

import { About } from './pages/About'
import { Home } from './pages/Home'
import { User } from './pages/User'
import { Projects } from './pages/Projects'
import { Series } from './pages/Series'

import style from './App.style'

const useStyles = makeStyles(style)

const App: React.FC = () => {
  const classes = useStyles()

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Container
          classes={{
            root: classes.container,
          }}
        >
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
          </Switch>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
