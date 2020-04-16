import React from 'react'
import { Divider, Typography } from '@material-ui/core'
import { SeriesList } from '../components/series'

export const Series: React.FC = () => (
  <>
    <Typography variant="h2">Series Page</Typography>
    <Divider />
    <SeriesList />
  </>
)
