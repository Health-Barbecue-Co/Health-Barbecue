import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import { Container } from '@material-ui/core'
import { useSelector } from 'react-redux'

import { Navbar } from './components/common'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { User } from './pages/User'
import { Projects } from './pages/Projects'
import { Series } from './pages/Series'

import { selectors } from './features/user'

const App: React.FC = () => {
  const { user } = useSelector(selectors.getUser)

  return (
    <BrowserRouter>
      <Navbar />
      <Container>
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
          <Route path="/projects" exact>
            {!user ? <Redirect to="/user" /> : <Projects />}
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
