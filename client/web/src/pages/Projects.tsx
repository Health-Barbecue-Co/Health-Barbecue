import React from 'react'
import { useTranslation } from 'react-i18next'
import { Switch } from 'react-router-dom'
import { StudiesList } from '../components/studies'

import { ConnectedRoute, Toolbar } from '../components/common'

export const Projects: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Toolbar label={t('Projects')} />
      <Switch>
        <ConnectedRoute>
          <StudiesList />
        </ConnectedRoute>
      </Switch>
    </>
  )
}
