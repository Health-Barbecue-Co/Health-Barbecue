import React, { useEffect, useState } from 'react'
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
  const [selectedLabel, setSelectedLabel] = useState<ILabel>(defaultLabel);
  const [selectedLabelValue, setSelectedLabelValue] = useState<string>('');
  const [areInputsValid, setAreInputsValid] = useState<boolean>(false);
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
    setSelectedLabelValue('');
  }

  const handleSelectedLabelValueChange = (event: any) => {
    setSelectedLabelValue(event.target.value);
  }

  const handleSubmit = () => {
    if(itemLabelizable.labels == null)
    {
      itemLabelizable.labels = new Array<ILabel>();
    }
    
    let newSelectedLabel = selectedLabel;
    newSelectedLabel.assignedValue = selectedLabelValue;

    itemLabelizable.labels.push(newSelectedLabel);
    dispatch({ type: actionTypes.UPDATE_SERIES, series: itemLabelizable});
    if(props.onCreate !== undefined) props.onCreate();
  }

  const checkInputs = () => {
    setAreInputsValid(selectedLabelValue !== '')
  }

  useEffect(checkInputs, [selectedLabelValue]);

  return (
    <form>
      <InputLabel>{t("Labels available")}</InputLabel>
      <Select
        value={selectedLabel?.labelKey}
        onChange={(event: any) => handleSelectedLabelChange(event, labelsList)}
        variant="outlined"
        margin="dense" 
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
              variant="outlined"
              margin="dense" 
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
        ? <div>
            <InputLabel>{t("Label value")}</InputLabel>
            <TextField
              label="Value"
              onChange={handleSelectedLabelValueChange}
              value={selectedLabelValue}
              variant="outlined"
              margin="dense" 
            />
          </div>
        : null
      }
      <div>
        <Button color="primary" onClick={onCancel}>
          {t("Cancel")}
        </Button>
        <Button color="primary" onClick={handleSubmit} disabled={!areInputsValid}>
          {t("Add")}
        </Button>
      </div>
    </form>
  )
}
