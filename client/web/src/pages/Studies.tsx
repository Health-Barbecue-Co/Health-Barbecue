import React from 'react'
import { Divider, Typography } from '@material-ui/core'
import { StudiesList } from '../components/studies'

export const Studies: React.FC = () => (
  <>
    <Typography variant="h5">Studies Page</Typography>
    <Divider />
    <StudiesList />
  </>
)
