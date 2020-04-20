import React, { useEffect } from 'react'
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

import { useDispatch, useSelector } from 'react-redux'

import { actionTypes, selectors } from '../../../features/series'
import styles from './SeriesList.style'

const useStyles = makeStyles(styles)

type SeriesListProps = {}

export const SeriesList: React.FC<SeriesListProps> = () => {
  const { list } = useSelector(selectors.getSeriesStore)

  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: actionTypes.FETCH_ALL_SERIES })
  }, [dispatch])

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
          {list &&
            list.map(({ id, seriesInstanceUID }) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {seriesInstanceUID}
                </TableCell>
                <TableCell align="right">---</TableCell>
                <TableCell align="right">---</TableCell>
                <TableCell align="right">---</TableCell>
                <TableCell align="right">---</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
