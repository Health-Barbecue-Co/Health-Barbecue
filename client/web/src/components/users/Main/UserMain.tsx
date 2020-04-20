import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRouteMatch, Switch, Route, Link } from 'react-router-dom'
import { Typography, Toolbar, Button, makeStyles } from '@material-ui/core'

import PersonAddIcon from '@material-ui/icons/PersonAdd'

import styles from './UserMain.style'

import { UserList } from '../List/UserList'
import { UserRegister } from '../Register/RegisterUser'

const useStyle = makeStyles(styles)

export const UserMain: React.FC = () => {
  const match = useRouteMatch()
  const classes = useStyle()
  const { t } = useTranslation()

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          {t('user:title')}
        </Typography>
        <Button component={Link} to={`${match.url}/create`}>
          <PersonAddIcon />
        </Button>
      </Toolbar>

      <Switch>
        <Route path={`${match.path}/list`} component={UserList} exact />
        <Route path={`${match.path}/create`} component={UserRegister} exact />
      </Switch>
    </>
  )
}
