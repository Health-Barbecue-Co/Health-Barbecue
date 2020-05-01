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

import { actionTypes } from '../../features/series'
import { ILabel } from '../../models/ILabel'
import { LabelsSelectors, LabelsActionTypes } from '../../features/labels'
import { ILabelizable } from '../../models/ILabelizable'

type LabelAddingProps = { 
  itemLabelizable: ILabelizable, 
  onCreate?: () => void,
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

export const LabelAdding: React.FC<LabelAddingProps> = (props: LabelAddingProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { labelsList } = useSelector(LabelsSelectors.getLabelStore)
  const [selectedLabel, setSelectedLabel] = React.useState<ILabel>(defaultLabel);
  const [selectedLabelValue, setSelectedLabelValue] = React.useState<string>('');
  const itemLabelizable = props.itemLabelizable;

  useEffect(() => {
    dispatch({ type: LabelsActionTypes.FETCH_ALL_LABELS })
  }, [dispatch])

  const onCancel = () => {
    if(props.onCancel !== undefined) props.onCancel();
  }

  const handleSelectedLabelChange = (event: any, labelsList: ILabel[]) => {
    let newSelectedLabel = labelsList.find( (label: ILabel) => (
      label.labelKey === event.target.value
    ));
    if (newSelectedLabel !== undefined)
    {
      setSelectedLabel(newSelectedLabel);
    }
  }

  const handleSelectedLabelValueChange = (event: any) => {
    let newSelectedLabel = selectedLabel;
    newSelectedLabel.assignedValue = event.target.value;
    if (newSelectedLabel !== undefined)
    {
      setSelectedLabel(newSelectedLabel);
    }
    setSelectedLabelValue(event.target.value);
  }

  const handleSubmit = () => {
    if(itemLabelizable == null)
    {
      throw Error("No series selected")
    }
    if(itemLabelizable.labels == null)
    {
      itemLabelizable.labels = new Array<ILabel>();
    }
    itemLabelizable.labels.push(selectedLabel);
    dispatch({ type: actionTypes.UPDATE_SERIES, series: itemLabelizable});
    if(props.onCreate !== undefined) props.onCreate();
  }

  return (
    <form>
      <InputLabel>{t("Labels available")}</InputLabel>
      <Select
        value={selectedLabel?.labelKey}
        onChange={(event: any) => handleSelectedLabelChange(event, labelsList)}
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
            <InputLabel>{t("Predefined Label values")}</InputLabel>
            <Select
              value={selectedLabelValue}
              onChange={handleSelectedLabelValueChange}
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
            onChange={handleSelectedLabelValueChange}
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
