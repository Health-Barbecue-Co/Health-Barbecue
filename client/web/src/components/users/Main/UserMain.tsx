import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  useRouteMatch,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom'
import { Button, IconButton } from '@material-ui/core'

import PersonAddIcon from '@material-ui/icons/PersonAdd'
import EditIcon from '@material-ui/icons/Edit'
import BackIcon from '@material-ui/icons/ArrowBack'

import { UserList } from '../List/UserList'
import { UserRegister } from '../Register/RegisterUser'
import { IUser } from '../../../models/user'
import { Toolbar } from '../../common'
import { UserSettings } from '../Settings/UserSettings'

export const UserMain: React.FC = () => {
  const match = useRouteMatch()
  const history = useHistory()
  const { t } = useTranslation()

  const listItemAction = (user: IUser) => [
    {
      icon: <EditIcon />,
      link: `${match.url}/edit/${user.id}`,
    },
  ]

  return (
    <>
      <Switch>
        <Route path={`${match.path}/list`} exact>
          <>
            <Toolbar
              label={t('user:title')}
              rightActions={[
                <Button component={Link} to={`${match.url}/create`}>
                  <PersonAddIcon />
                </Button>,
              ]}
            />
            <UserList rowActions={listItemAction} />
          </>
        </Route>

        <Route
          path={`${match.path}/edit/:id`}
          exact
          render={(routerProps) => {
            const { match: routeMatch } = routerProps
            return (
              <>
                <Toolbar
                  label={t('user:title')}
                  leftActions={[
                    <IconButton onClick={() => history.goBack()}>
                      <BackIcon />
                    </IconButton>,
                  ]}
                />
                <UserRegister
                  afterValidate={() => {
                    history.goBack()
                  }}
                  id={routeMatch.params.id}
                />
              </>
            )
          }}
        />

        <Route path={`${match.path}/create`} exact>
          <>
            <Toolbar
              label={t('user:title')}
              leftActions={[
                <IconButton onClick={() => history.goBack()}>
                  <BackIcon />
                </IconButton>,
              ]}
            />
            <UserRegister
              afterValidate={() => {
                history.goBack()
              }}
            />
          </>
        </Route>

        <Route path={`${match.path}/settings`} exact>
          <UserSettings />
        </Route>
      </Switch>
    </>
  )
}
