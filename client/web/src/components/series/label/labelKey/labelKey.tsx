import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
import {
  TextField,
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem
} from '@material-ui/core'
import { LabelsActionTypes, LabelsSelectors } from '../../../../features/labels'
import { ILabel } from './../../../../models/ILabel';


type LabelKeyProps = { 

}

export const LabelKey: React.FC<LabelKeyProps> = (props: LabelKeyProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { labelsList } = useSelector(LabelsSelectors.getLabelStore)
  const [selectedLabel, setSelectedLabel] = React.useState('toto');

  useEffect(() => {
    dispatch({ type: LabelsActionTypes.FETCH_ALL_LABELS })
  }, [dispatch])

  
  const handleChange = (event: any) => {
    console.log(event);
    setSelectedLabel(event.target.value);
  };


  return (
    <FormControl>
      <InputLabel>Labels</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedLabel}
        onChange={handleChange}
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
    </FormControl>
  )
}
