import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Button,
  Grid,
} from '@material-ui/core'
import SyncIcon from '@material-ui/icons/Sync'
import { useTranslation } from 'react-i18next'

import styles from './SeriesList.style'

const useStyles = makeStyles(styles)

type SeriesListProps = {}

export const SeriesList: React.FC<SeriesListProps> = () => {
  const [list, setList] = useState([])
  const classes = useStyles()
  const { t } = useTranslation()

  const updateSeriesList = () => {
    axios.get('/api/series').then((response) => {
      setList(response.data)
    })
  }

  const refresh = () => {
    axios.get('/api/PacsMirror').then(() => {
      updateSeriesList();
    });
  }

  useEffect(() => {
    updateSeriesList();
  }, [])

  return (
    <TableContainer component={Paper}>
      <Grid container justify="flex-end">
        <Button 
          variant="contained"
          onClick={() => refresh()}
          startIcon={<SyncIcon />}>{t('Refresh')}
        </Button>
      </Grid>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>seriesInstanceUID</TableCell>
            <TableCell align="right">Series description</TableCell>
            <TableCell align="right">Modality</TableCell>
            <TableCell align="right">Number Of Instances</TableCell>
            <TableCell align="right">Body part</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(({ id, seriesInstanceUID, seriesDescription, modality, numberOfSeriesRelatedInstances }) => (
            <TableRow key={id}>
              <TableCell component="th" scope="row">
                {seriesInstanceUID}
              </TableCell>
              <TableCell align="right">{seriesDescription}</TableCell>
              <TableCell align="right">{modality}</TableCell>
              <TableCell align="right">{numberOfSeriesRelatedInstances}</TableCell>
              <TableCell align="right">---</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
