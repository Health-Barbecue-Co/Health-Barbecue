import React from 'react'

import { Switch, useRouteMatch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box } from '@material-ui/core'

import { SeriesList, SeriesInfo } from '../components/series'
import { ConnectedRoute, Toolbar } from '../components/common'

export const Series: React.FC = () => {
  const { t } = useTranslation()
  const match = useRouteMatch()

  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <Switch>
        <ConnectedRoute
          path={`${match.path}/show/:id`}
          render={(routeMatch) => {
            const { id } = routeMatch.match.params
            return <SeriesInfo id={id} />
          }}
          exact
        />

        <ConnectedRoute>
          <Toolbar label={t('Series list')} />
          <SeriesList />
        </ConnectedRoute>
      </Switch>
    </Box>
  )
}
