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
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { actionTypes, SeriesService } from '../../../features/series'
import { ILabel } from '../../../models/ILabel'
import { ISeries } from '../../../models/series'
import { SeriesLabelFrom } from './SeriesLabelFrom'

type SeriesLabelProps = { series: ISeries }

export const SeriesLabel: React.FC<SeriesLabelProps> = (props: SeriesLabelProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  let labels = props.series.labels;

  // For form
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (localSeries: ISeries | null) => {
    setOpen(true);
    dispatch({ type: actionTypes.SET_CURRENT_SERIES, series: localSeries })
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (localSeries: ISeries | null, labelClicked: ILabel) => {
    dispatch({ type: actionTypes.SET_CURRENT_SERIES, series: localSeries })
    if(localSeries == null)
    {
      throw Error("No series selected")
    }
    if(localSeries.labels == null)
    {
      localSeries.labels = new Array<ILabel>();
    }
    localSeries.labels.forEach((label: ILabel) => {
      var newLabels = localSeries.labels.filter((label) => { 
        if(label !== labelClicked){
          return label;
        }
        return null;
      });
      localSeries.labels = newLabels;
    });
    SeriesService.update(localSeries.id, localSeries).then(()=> {dispatch({ type: actionTypes.FETCH_ALL_SERIES })});
  }

  return (
    <div>
      <Box >
      <Chip 
        label='Add label'
        size="small" 
        onClick={() => handleClickOpen(props.series)}
        icon={<AddCircleOutlineIcon />}
      />
      </Box>
      {labels &&
        labels.map((label: ILabel, index) => (
          <Chip 
            key={index}
            label={label.labelKeyId + ': ' + label.assignedValue} 
            color="primary" 
            size="small" 
            onDelete={() => handleDelete(props.series, label)}
          />
      ))}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{t("Create new label")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {t("To create a new label, please enter following values.")}
          </DialogContentText>
          <SeriesLabelFrom series={props.series} onCreate={handleClose} onCancel={handleClose}/>
        </DialogContent>
      </Dialog>
    </div>
  )
}
