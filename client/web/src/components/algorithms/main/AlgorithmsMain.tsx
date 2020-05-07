import React from 'react'
import { useTranslation } from 'react-i18next'
import { Toolbar } from '../../common'

export const AlgorithmsMain: React.FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <Toolbar label={t('Algorithms')} />
    </>
  )
}
