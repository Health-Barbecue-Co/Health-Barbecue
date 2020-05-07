import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import {
  Chip,
  Box
} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { actionTypes } from '../../features/series'
import { ILabel } from '../../models/ILabel'
import { ISeries } from '../../models/series'
import { LabelManagementDialog } from './LabelManagementDialog';

type SeriesLabelProps = { series: ISeries, isSelected: boolean }

export const SeriesLabel: React.FC<SeriesLabelProps> = (props: SeriesLabelProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [openLabelManagementDialog, 
    setOpeLabelManagementDialog] = React.useState<boolean>(false);
  const labels: ILabel[] = props.series.labels;

  const handleClickOpen = (localSeries: ISeries | null) => {
    setOpeLabelManagementDialog(true);
    dispatch({ type: actionTypes.SET_CURRENT_SERIES, series: localSeries })
  };

  const handleClose = () => {
    setOpeLabelManagementDialog(false);
  };

  const handleDelete = (localSeries: ISeries | null, labelClicked: ILabel) => {
    if(localSeries == null)
    {
      throw Error("No series selected")
    }
    if(localSeries.labels == null)
    {
      localSeries.labels = new Array<ILabel>();
    }
    localSeries.labels = localSeries.labels.filter((label: ILabel) => label !== labelClicked)
    dispatch({ type: actionTypes.UPDATE_SERIES, series: localSeries});
  }

  return (
    <div>
      <Box>
      {
        props.isSelected ?
        <Chip 
          label={t('Add label')}
          size="small" 
          onClick={() => handleClickOpen(props.series)}
          icon={<AddCircleOutlineIcon />}
        /> : null
      }
      </Box>
      {labels &&
        labels.map((label: ILabel, index) => (
          <Chip 
            key={index}
            label={label.labelKey + ': ' + label.assignedValue} 
            color="primary" 
            size="small" 
            onDelete={() => handleDelete(props.series, label)}
          />
        ))
      }
      <LabelManagementDialog open={openLabelManagementDialog} itemLabelizable={props.series}  onClose={handleClose}/>
    </div>
  )
}
