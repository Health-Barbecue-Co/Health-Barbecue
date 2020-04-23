import React from 'react'
import { Divider, Typography } from '@material-ui/core'
import { StudiesList } from '../components/studies'

export const Projects: React.FC = () => (
  <>
    <Typography variant="h5">Projects Page</Typography>
    <Divider />
    <StudiesList />
  </>
)
