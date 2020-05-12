import React from 'react'
import { Switch, useRouteMatch, Route, useHistory } from 'react-router-dom'
import {
  SignIn,
  ForgottenPassword,
  UserRegister,
  UserMain,
} from '../components/users'
import { ConnectedRoute } from '../components/common'

export const User: React.FC = () => {
  const match = useRouteMatch()
  const history = useHistory()

  return (
    <>
      <Switch>
        <Route path={`${match.path}/signIn`} component={SignIn} exact />
        <Route
          path={`${match.path}/forgetten-password`}
          component={ForgottenPassword}
          exact
        />

        <Route path={`${match.path}/register`} exact>
          <UserRegister
            afterValidate={() => {
              history.goBack()
            }}
          />
        </Route>

        <ConnectedRoute path={`${match.path}/main`}>
          <UserMain />
        </ConnectedRoute>

        <Route component={SignIn} />
      </Switch>
    </>
  )
}
