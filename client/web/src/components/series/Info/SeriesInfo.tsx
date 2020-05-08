import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Paper, Box, IconButton, Divider, makeStyles } from '@material-ui/core'
import BackIcon from '@material-ui/icons/ArrowBack'
import { useTranslation } from 'react-i18next'
import { actionTypes, selectors } from '../../../features/series'
import { ISeries } from '../../../models/series'
import { Toolbar } from '../../common'
import { ILabel } from '../../../models/ILabel'

import style from './SeriesInfo.style'
import { ImagesViewport } from '../../images'

type SeriesInfoProps = {
  id: string
}

const useStyle = makeStyles(style)

export const SeriesInfo: React.FC<SeriesInfoProps> = (
  props: SeriesInfoProps
) => {
  const classes = useStyle()
  const { id } = props
  const dispatch = useDispatch()
  const history = useHistory()
  const series: ISeries = useSelector(selectors.getCurrent)
  const { t } = useTranslation()

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
            <Box p={1} display="flex" flexDirection="row">
              <Box width={3 / 5}>
                <p>
                  <span>{t('id')}: </span>
                  <span>{series.id}</span>
                </p>
                <p>
                  <span>{t('description')}: </span>
                  <span>{series.seriesDescription}</span>
                </p>
                <p>
                  <span>{t('modality')}: </span>
                  <span>{series.modality}</span>
                </p>
                <p>
                  <span>{t('Nb of Series related instances')}: </span>
                  <span>{series.numberOfSeriesRelatedInstances}</span>
                </p>
                <p>
                  <span>{t('patient name')}: </span>
                  <span>{series.patientsName}</span>
                </p>
                <p>
                  <span>{t('series instance UID')}: </span>
                  <span>{series.seriesInstanceUID}</span>
                </p>
                <p>
                  <span>{t('Body part examined')}: </span>
                  <span>{series.bodyPartExamined}</span>
                </p>
                <Divider />
                <div>{t('Related labels')}</div>
                <Box display="flex" flexDirection="row" p={1}>
                  {series.labels.map((label: ILabel) => (
                    <Paper
                      key={`label-${label.labelKey}-${label.assignedValue}`}
                      className={classes.labelItem}
                      variant="outlined"
                    >
                      {label.labelKey}
                      -&gt;
                      {label.assignedValue}
                    </Paper>
                  ))}
                </Box>
              </Box>
              <Box flexGrow={1} display="flex">
                <ImagesViewport seriesInstanceUID={series.seriesInstanceUID} />
              </Box>
            </Box>
          </Paper>
        ) : null}
      </Box>
    </>
  )
}
