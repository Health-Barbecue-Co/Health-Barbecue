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
} from '@material-ui/core'

import styles from './SeriesList.style'

const useStyles = makeStyles(styles)

type SeriesListProps = {}

export const SeriesList: React.FC<SeriesListProps> = () => {
  const [list, setList] = useState([])
  const classes = useStyles()

  useEffect(() => {
    axios.get('/api/series').then((response) => {
      setList(response.data)
    })
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>seriesInstanceUID</TableCell>
            <TableCell align="right">title</TableCell>
            <TableCell align="right">title</TableCell>
            <TableCell align="right">title</TableCell>
            <TableCell align="right">title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(({ id, seriesInstanceUID }) => (
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
