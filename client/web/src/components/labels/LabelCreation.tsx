import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { LabelsActionTypes } from '../../features/labels'
import { ILabel } from '../../models/ILabel';
import { IUser } from '../../models/user'
import { selectors } from '../../features/auth'

type LabelCreationProps = { 
  onCreate?: () => void ,
  onCancel?: () => void
}

export const LabelCreation: React.FC<LabelCreationProps> = (props: LabelCreationProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const user: IUser = useSelector(selectors.getAuth)

  const [LabelKey, setLabelKey] = useState<string>('');
  const [selectedLabelType, setSelectedLabelType] = useState<string>('');
  const [inputPredefineValue, setInputPredefineValue] = useState<string>('');
  const [listPredefineValue, setListPredefineValue] = useState<string[]>([]);

  const handleLabelKeyChange = (event: any) => {
    setLabelKey(event.target.value);
  };

  const handleLabelTypeChange = (event: any) => {
    setSelectedLabelType(event.target.value);
  };

  const onCancel = () => {
    if(props.onCancel !== undefined) props.onCancel();
  }

  const onCreate = () => {
    let newLabel: ILabel = {
      'id': '',
      'user': user.login,
      'labelKey': LabelKey,
      'labelType': selectedLabelType,
      'labelValue': listPredefineValue,
      'isPublic': true,
      'isApproved': true,
      'assignedValue': '',
    }
    dispatch({ type: LabelsActionTypes.POST_LABEL, label: newLabel});
    if(props.onCreate !== undefined) props.onCreate();
  }

  const handleAddPredefineValue = () => {
    let newListPredefineValue = listPredefineValue;
    newListPredefineValue.push(inputPredefineValue);
    setListPredefineValue(newListPredefineValue);
    setInputPredefineValue('');
  }

  const handleDeletePredefineValue = (value: string) => {
    let newListPredefineValue = listPredefineValue.filter((predefineValue) => (predefineValue !== value));
    setListPredefineValue(newListPredefineValue);
  }

  const handleInputPredefineValueChange = (event: any) => {
    setInputPredefineValue(event.target.value);
  }

  return (
    <form >
      <TextField
        autoFocus
        margin="dense"
        id="labelKey"
        label="Label Key"
        onChange={handleLabelKeyChange}
        fullWidth
        variant="outlined"
      />
      <InputLabel>Label type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedLabelType}
        onChange={handleLabelTypeChange}
        variant="outlined"
        margin="dense"
      >
        <MenuItem 
          key='Multi' 
          value='Multi' 
        >
          Multi values
        </MenuItem>
        <MenuItem 
          key='String' 
          value='String' 
        >
          Free text
        </MenuItem>
      </Select>
      {
        (selectedLabelType === 'Multi') 
        ? <div>
          <TextField label="Value"  value={inputPredefineValue} onChange={handleInputPredefineValueChange} margin="dense" variant="outlined"/>
          <IconButton color="primary" onClick={handleAddPredefineValue}>
            <AddCircleOutlineIcon />
          </IconButton>
          <List>
            {
              listPredefineValue.map((value) => (
                <ListItem key={value}>
                  <ListItemText>{value}</ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleDeletePredefineValue(value)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            }
          </List>
        </div>
        : null
      }
      <div>
        <Button color="primary" onClick={onCancel}>
          {t("Cancel")}
        </Button>
        <Button color="primary" onClick={onCreate}>
          {t("Create")}
        </Button>
      </div>
    </form>
  )
}
