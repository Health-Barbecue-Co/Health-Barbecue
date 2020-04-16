import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import { Container } from '@material-ui/core'
import { useSelector } from 'react-redux'

import { Navbar } from './components/common'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { User } from './pages/User'
import { Studies } from './pages/Studies'

import { selectors } from './features/user'

const App: React.FC = () => {
  const { user } = useSelector(selectors.getUser)

  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Switch>
          <Route path="/home" component={Home} exact />
          <Route path="/about" component={About} exact />
          <Route path="/user" component={User} />
          <Route exact path="/">
            {!user ? <Redirect to="/user" /> : <Home />}
          </Route>
          <Route path="/studies" component={Studies} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
