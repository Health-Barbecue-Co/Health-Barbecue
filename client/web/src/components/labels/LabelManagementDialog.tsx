import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core'

import { LabelAdding } from './LabelAdding'
import { LabelCreation } from './LabelCreation';
import { ILabelizable } from '../../models/ILabelizable'

type LabelManagementDialogProps = { 
  open: boolean, 
  itemLabelizable: ILabelizable,
  onClose?: () => void
}

enum Mode {
  Creation = 1,
  Adding,
} 

export const LabelManagementDialog: React.FC<LabelManagementDialogProps> = (props: LabelManagementDialogProps) => {
  const { t } = useTranslation()
  const { open: propIsOpen, itemLabelizable, onClose } = props
  const [mode, setMode] = useState<Mode>(Mode.Adding);

  const handleClose = () => {
    if(onClose !== undefined) onClose();
  };

  const handleLabelCreation = () => {
    setMode(Mode.Creation)
  };

  const handleLabelAdding = () => {
    setMode(Mode.Adding)
  };

  return (
      <Dialog open={propIsOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          { mode === Mode.Adding
            ? t("Add new label to the series")
            : t("Create new label")
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {
              mode === Mode.Adding
              ? t("To add a new label, please enter following values.")
              : t("To create a new label, please enter following values.")
            }
          </DialogContentText>
          {
            mode === Mode.Adding
            ? <LabelAdding itemLabelizable={itemLabelizable} onCancel={handleClose} onCreate={handleClose}/>
            : <LabelCreation onCreate={handleLabelAdding} onCancel={handleLabelAdding}/>
          }
        </DialogContent>
        <DialogActions>
          {
            mode === Mode.Adding
            ? <Button onClick={handleLabelCreation} color="primary">
                {t("Create a new label")}
              </Button>
            : null
          }
        </DialogActions>
      </Dialog>
  )
}
