import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ThemeProvider, Box } from '@material-ui/core'

import { Navbar, ConnectedRoute } from './components/common'
import { AuthProvider } from './components/auth'

import { About } from './pages/About'
import { Home } from './pages/Home'
import { User } from './pages/User'
import { Projects } from './pages/Projects'
import { Series } from './pages/Series'
import { Algorithms } from './pages/Algorithms'

import setupTheme from './setupTheme'
import { selectors as themeSelector } from './features/theme'

const App: React.FC = () => {
  const themeSettings = useSelector(themeSelector.getTheme)
  let theme = setupTheme()
  if (themeSettings) {
    theme = setupTheme(themeSettings.index, themeSettings.dark)
  }

  return (
    <ThemeProvider theme={theme}>
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
              <ConnectedRoute exact path="/">
                <Home />
              </ConnectedRoute>
              <ConnectedRoute path="/projects" exact>
                <Projects />
              </ConnectedRoute>
              <ConnectedRoute path="/series">
                <Series />
              </ConnectedRoute>
              <ConnectedRoute path="/algorithms" exact>
                <Algorithms />
              </ConnectedRoute>

              <Route path="/user" component={User} />
            </Switch>
          </Box>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
