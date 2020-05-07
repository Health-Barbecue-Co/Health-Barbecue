import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Chip, Box } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

import { actionTypes } from '../../features/series'
import { ILabel } from '../../models/ILabel'
import { ISeries } from '../../models/series'
import { LabelManagementDialog } from './LabelManagementDialog'

type SeriesLabelProps = {
  series: ISeries
  isSelected: boolean
}

export const SeriesLabel: React.FC<SeriesLabelProps> = (
  props: SeriesLabelProps
) => {
  const { series, isSelected } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { labels } = series
  const [
    openLabelManagementDialog,
    setOpenLabelManagementDialog,
  ] = React.useState<boolean>(false)

  // For form
  const handleClickOpen = (localSeries: ISeries | null) => {
    setOpenLabelManagementDialog(true)
    dispatch({ type: actionTypes.SET_CURRENT_SERIES, series: localSeries })
  }

  const handleClose = () => {
    setOpenLabelManagementDialog(false)
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
        {isSelected ? (
          <Chip
            label={t('Add label')}
            size="small"
            onClick={() => handleClickOpen(props.series)}
            icon={<AddCircleOutlineIcon />}
          />
        ) : null}
      </Box>
      {labels &&
        labels.map((label: ILabel) => (
          <Chip
            key={label.labelKey}
            label={`${label.labelKey}: ${label.assignedValue}`}
            color="primary"
            size="small"
            onDelete={() => handleDelete(series, label)}
          />
        ))}
      <LabelManagementDialog
        open={openLabelManagementDialog}
        itemLabelizable={series}
        onClose={handleClose}
      />
    </div>
  )
}
