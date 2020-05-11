import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Paper } from '@material-ui/core'

import { AlgorithmsList, AlgorithmsCreateForm } from '../components/algorithms'
import { Toolbar } from '../components/common'

export const Algorithms: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Toolbar label={t('Algorithms')} />
      <Box display="flex" flex={1} flexDirection="column" p={1}>
        <Box pb={1}>
          <Paper>
            <AlgorithmsCreateForm />
          </Paper>
        </Box>
        <Box flexGrow={1}>
          <AlgorithmsList />
        </Box>
      </Box>
    </>
  )
}
