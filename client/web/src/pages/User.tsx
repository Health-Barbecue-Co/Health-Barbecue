import React from 'react'
import {
  Switch,
  useRouteMatch,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  SignIn,
  ForgottenPassword,
  UserRegister,
  UserMain,
} from '../components/users'
import { selectors } from '../features/auth'

export const User: React.FC = () => {
  const match = useRouteMatch()
  const user = useSelector(selectors.getAuth)
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

        <Route path={`${match.path}/main`}>
          {!user ? <Redirect to="/user" /> : <UserMain />}
        </Route>

        <Route component={SignIn} />
      </Switch>
    </>
  )
}
