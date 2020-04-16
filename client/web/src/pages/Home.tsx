import React, { Fragment } from 'react'

import { useTranslation } from 'react-i18next'
import { StudiesList } from '../components/studies'
import { SeriesList } from '../components/series'

export const Home: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Fragment>
      <h1>{t('Translation test')}</h1>
      <p>
        Hello and welcome! :) This app was generated by the Create React App
        template and bootstrapped with Redux, React Router, TypeScript, ESlint,
        Prettier for you. Take a look around ;)
      </p>
      <StudiesList />
      <hr />
      <SeriesList />
    </Fragment>
  )
}
