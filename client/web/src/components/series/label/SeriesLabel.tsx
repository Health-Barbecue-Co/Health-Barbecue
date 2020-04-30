import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import {
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

import { actionTypes } from '../../../features/series'
import { ILabel } from '../../../models/ILabel'
import { ISeries } from '../../../models/series'
import { SeriesLabelFrom } from './SeriesLabelFrom'

type SeriesLabelProps = { series: ISeries }

export const SeriesLabel: React.FC<SeriesLabelProps> = (
  props: SeriesLabelProps
) => {
  const { series } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { labels } = series

  // For form
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = (localSeries: ISeries | null) => {
    setOpen(true)
    dispatch({ type: actionTypes.SET_CURRENT_SERIES, series: localSeries })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = (localSeries: ISeries | null, labelClicked: ILabel) => {
    if (localSeries == null) {
      throw Error('No series selected')
    }
    const toUpdate = localSeries

    if (localSeries.labels == null) {
      toUpdate.labels = new Array<ILabel>()
    }
    toUpdate.labels = localSeries.labels.filter(
      (label: ILabel) => label !== labelClicked
    )
    dispatch({ type: actionTypes.UPDATE_SERIES, series: toUpdate })
  }

  return (
    <div>
      <Box>
        <Chip
          label="Add label"
          size="small"
          onClick={() => handleClickOpen(props.series)}
          icon={<AddCircleOutlineIcon />}
        />
      </Box>
      {labels &&
        labels.map((label: ILabel) => (
          <Chip
            key={label.id}
            label={`${label.labelKeyId}: ${label.assignedValue}`}
            color="primary"
            size="small"
            onDelete={() => handleDelete(props.series, label)}
          />
        ))}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {t('Create new label')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('To create a new label, please enter following values.')}
          </DialogContentText>
          <SeriesLabelFrom
            series={series}
            onCreate={handleClose}
            onCancel={handleClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
