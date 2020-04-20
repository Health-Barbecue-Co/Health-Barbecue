import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import { Container, makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux'

import { Navbar } from './components/common'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { User } from './pages/User'
import { Studies } from './pages/Studies'
import { Series } from './pages/Series'

import { selectors } from './features/user'
import style from './App.style'

const useStyles = makeStyles(style)

const App: React.FC = () => {
  const user = useSelector(selectors.getSelected)
  const classes = useStyles()

  return (
    <BrowserRouter>
      <Navbar />
      <Container
        classes={{
          root: classes.container,
        }}
      >
        <Switch>
          <Route path="/home" exact>
            {!user ? <Redirect to="/user" /> : <Home />}
          </Route>
          <Route path="/about" exact>
            {!user ? <Redirect to="/user" /> : <About />}
          </Route>
          <Route path="/user" component={User} />
          <Route exact path="/">
            {!user ? <Redirect to="/user" /> : <Home />}
          </Route>
          <Route path="/studies" exact>
            {!user ? <Redirect to="/user" /> : <Studies />}
          </Route>
          <Route path="/series" exact>
            {!user ? <Redirect to="/user" /> : <Series />}
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
