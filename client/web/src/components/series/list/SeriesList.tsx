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
} from '@material-ui/core'

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
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>seriesInstanceUID</TableCell>
            <TableCell align="right">title 2</TableCell>
            <TableCell align="right">title 3</TableCell>
            <TableCell align="right">title 4</TableCell>
            <TableCell align="right">title 5</TableCell>
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
