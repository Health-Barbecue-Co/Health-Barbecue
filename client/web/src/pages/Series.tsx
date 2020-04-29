import React from 'react'

import { Switch, useRouteMatch, Route, Redirect, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import DescriptionIcon from '@material-ui/icons/Description'
import {
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core'

import { SeriesList, SeriesInfo } from '../components/series'
import { selectors } from '../features/auth'

const useStyle = makeStyles((theme: Theme) => createStyles({
    toolbar: {
      background: theme.palette.secondary.main,
    },
    title: {
      flexGrow: 1,
    },
  })
)

export const Series: React.FC = () => {
  const classes = useStyle()
  const { t } = useTranslation()
  const match = useRouteMatch()
  const user = useSelector(selectors.getAuth)

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          {t('series:title')}
        </Typography>
        <Button component={Link} to={`${match.url}/show/2`}>
          <DescriptionIcon />
        </Button>
      </Toolbar>

      <Switch>
        <Route
          path={`${match.path}/show/:id`}
          render={(routeMatch) => {
            const { id } = routeMatch.match.params
            return !user ? <Redirect to="/user" /> : <SeriesInfo id={id} />
          }}
          exact
        />

        <Route>{!user ? <Redirect to="/user" /> : <SeriesList />}</Route>
      </Switch>
    </>
  )
}
