import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { AlgoSelectors, algoActionTypes } from '../../features/algo'

type AlgoResultDialogProps = { 
  result: string
  onClose?: () => void
}

export const AlgoResultDialog: React.FC<AlgoResultDialogProps> = (props: AlgoResultDialogProps) => {
  const dispatch = useDispatch()
  const { algoResult } = useSelector(AlgoSelectors.getAlgoStore)

  const handleClose = () => {
    dispatch({ type: algoActionTypes.SET_ALGO_RESULT, algoResult: '' })
  };

  const shouldBeOpen = () => {
    return (algoResult !== '')
  };

  return (
      <Dialog open={shouldBeOpen()} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
        Algo result
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          {algoResult}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Close
            </Button>
        </DialogActions>
      </Dialog>
  )
}
