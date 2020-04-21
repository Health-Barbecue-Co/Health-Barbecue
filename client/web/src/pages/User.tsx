import React from 'react'
import { Switch, useRouteMatch, Route } from 'react-router-dom'
import { SignIn, ForgottenPassword, RegisterUser } from '../components/users'

export const User: React.FC = () => {
  const match = useRouteMatch()

  return (
    <>
      <Switch>
        <Route path={`${match.path}/signIn`} component={SignIn} exact />
        <Route
          path={`${match.path}/forgetten-password`}
          component={ForgottenPassword}
          exact
        />
        <Route path={`${match.path}/register`} component={RegisterUser} exact />
        <Route component={SignIn} />
      </Switch>
    </>
  )
}
