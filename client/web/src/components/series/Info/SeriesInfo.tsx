import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Paper, Box, IconButton, Divider } from '@material-ui/core'
import BackIcon from '@material-ui/icons/ArrowBack'
import { actionTypes, selectors } from '../../../features/series'
import { ISeries } from '../../../models/series'
import { Toolbar } from '../../common'
import { ILabel } from '../../../models/ILabel'

type SeriesInfoProps = {
  id: string
}

export const SeriesInfo: React.FC<SeriesInfoProps> = (
  props: SeriesInfoProps
) => {
  const { id } = props
  const dispatch = useDispatch()
  const history = useHistory()
  const series: ISeries = useSelector(selectors.getCurrent)

  useEffect(() => {
    dispatch({ type: actionTypes.FETCH_ONE_SERIES, id })
  }, [id, dispatch])

  return (
    <>
      <Toolbar
        label="Serie"
        leftActions={[
          <IconButton onClick={() => history.goBack()}>
            <BackIcon />
          </IconButton>,
        ]}
      />
      <Box p={1}>
        {series ? (
          <Paper>
            <Box p={1}>
              <p>id: {series.id}</p>
              <p>description: {series.seriesDescription}</p>
              <p>modality: {series.modality}</p>
              <p>
                Nb of Series related instances:{' '}
                {series.numberOfSeriesRelatedInstances}
              </p>
              <p>patient name: {series.patientsName}</p>
              <p>series instance UID: {series.seriesInstanceUID}</p>
              <p>Body part examined: {series.bodyPartExamined}</p>
              <Divider />
              {series.labels.map((label: ILabel) => (
                <span key={`label-${label.id}`}>
                  {label.labelKeyId}
                  -&gt;
                  {label.assignedValue}
                </span>
              ))}
            </Box>
          </Paper>
        ) : null}
      </Box>
    </>
  )
}
