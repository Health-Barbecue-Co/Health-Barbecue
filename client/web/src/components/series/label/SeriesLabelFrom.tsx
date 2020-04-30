import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'

import { actionTypes } from '../../../features/series'
import { ILabel } from '../../../models/ILabel'
import { ISeries } from '../../../models/series'
import { LabelsSelectors, LabelsActionTypes } from '../../../features/labels'

type SeriesLabelFromProps = { 
  series: ISeries, 
  onCreate?: () => void ,
  onCancel?: () => void
}

const defaultLabel: ILabel = {
  id: '',
  user: '',
  labelKey: '',
  labelType: '',
  labelValue: [],
  isPublic: true,
  isApproved: true,
  assignedValue: '',
}

export const SeriesLabelFrom: React.FC<SeriesLabelFromProps> = (props: SeriesLabelFromProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { labelsList } = useSelector(LabelsSelectors.getLabelStore)
  const [selectedLabel, setSelectedLabel] = React.useState<ILabel>(defaultLabel);
  const [selectedLabelValue, setSelectedLabelValue] = React.useState<string>('');
  const localSeries = props.series;

  useEffect(() => {
    dispatch({ type: LabelsActionTypes.FETCH_ALL_LABELS })
  }, [dispatch])

  const onCancel = () => {
    if(props.onCancel !== undefined) props.onCancel();
  }

  const handleChange1 = (event: any, labelsList: ILabel[]) => {
    let newSelectedLabel = labelsList.find( (label: ILabel) => (
      label.labelKey === event.target.value
    ));
    if (newSelectedLabel !== undefined)
    {
      setSelectedLabel(newSelectedLabel);
    }
  }

  const handleSelectLabelMultiValue = (event: any) => {
    let newSelectedLabel = selectedLabel;
    newSelectedLabel.assignedValue = event.target.value;
    if (newSelectedLabel !== undefined)
    {
      setSelectedLabel(newSelectedLabel);
    }
    setSelectedLabelValue(event.target.value);
  }

  const handleSelectLabelValueChange = (event: any) => {
    let newSelectedLabel = selectedLabel;
    newSelectedLabel.assignedValue = event.target.value;
    if (newSelectedLabel !== undefined)
    {
      setSelectedLabel(newSelectedLabel);
    }
    setSelectedLabelValue(event.target.value);
  }

  const handleSubmit = () => {
    if(props.series == null)
    {
      throw Error("No series selected")
    }
    if(props.series.labels == null)
    {
      props.series.labels = new Array<ILabel>();
    }
    props.series.labels.push(selectedLabel);
    dispatch({ type: actionTypes.UPDATE_SERIES, series: localSeries});
    if(props.onCreate !== undefined) props.onCreate();
  }

  return (
    <form>
      <InputLabel>Labels available</InputLabel>
      <Select
        value={selectedLabel?.labelKey}
        onChange={(event: any) => handleChange1(event, labelsList)}
      >
        {
          labelsList && labelsList.map((label: ILabel) => (
            <MenuItem 
              key={label.labelKey}
              value={label.labelKey}
            >
              {label.labelKey}
            </MenuItem>
          ))
        }
      </Select>
      { selectedLabel?.labelType === 'Multi' 
        ? <div>
            <InputLabel>Predefined Label values</InputLabel>
            <Select
              value={selectedLabelValue}
              onChange={handleSelectLabelMultiValue}
            >
              {
                selectedLabel?.labelValue && selectedLabel?.labelValue.map((value: string) => (
                  <MenuItem
                    key={value}
                    value={value}
                  >
                    {value}
                  </MenuItem>
                ))
              }
            </Select>
          </div>
        : null 
      }
      {selectedLabel?.labelType === 'String' 
        ? <TextField
            label="Value"
            onChange={handleSelectLabelValueChange}
            value={selectedLabelValue}
            fullWidth
          />
        : null
      }
      <Button color="primary" onClick={onCancel}>
        {t("Cancel")}
      </Button>
      <Button color="primary" onClick={handleSubmit}>
        {t("Add")}
      </Button>
    </form>
  )
}
