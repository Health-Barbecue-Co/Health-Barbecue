import React from 'react'
import { useTranslation } from 'react-i18next'
import { Toolbar } from '../components/common'

export const About: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Toolbar label={t('About')} />

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        possimus doloribus error cumque autem asperiores, ullam deserunt quidem
        omnis doloremque itaque eius eaque sint facilis unde tenetur reiciendis
        aliquam soluta?
      </p>
    </>
  )
}
