import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Select,
  MenuItem,
  CircularProgress,
  makeStyles,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import styles from './AlgoResultDialog.style'
import { AlgoSelectors, algoActionTypes } from '../../../features/algo'
import { IUser } from '../../../models/user'
import { selectors } from '../../../features/auth'
import { ISeries } from '../../../models/series'
import { IAlgo } from '../../../models/IAlgo'
import { IAlgoExeInfo } from '../../../models/IAlgoExeInfo'

const useStyle = makeStyles(styles)

type AlgoResultDialogProps = {
  open: boolean
  selectedSeriesList: ISeries[]
  onClose?: () => void
}

export const AlgoResultDialog: React.FC<AlgoResultDialogProps> = (
  props: AlgoResultDialogProps
) => {
  const { open, selectedSeriesList, onClose } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const classes = useStyle()
  const { algoResult, algoList } = useSelector(AlgoSelectors.getAlgoStore)
  const user: IUser = useSelector(selectors.getAuth)
  const [selectedAlgoValue, setSelectedAlgoValue] = useState<string>('')
  const [executing, setExecuting] = React.useState(false)
  const selectedSeries = selectedSeriesList[0]

  useEffect(() => {
    dispatch({ type: algoActionTypes.FETCH_ALL_ALGO })
  }, [dispatch])

  const handleClose = () => {
    setExecuting(false)
    if (onClose !== undefined) {
      onClose()
    }
    dispatch({ type: algoActionTypes.SET_ALGO_RESULT, algoResult: '' })
  }

  const shouldBeOpen = () => {
    return algoResult !== ''
  }

  const handleSelectedAlgoValueChange = (event: any) => {
    setSelectedAlgoValue(event.target.value)
  }

  const executeAlgo = () => {
    setExecuting(true)
    const selectedAlgo = algoList.filter(
      (algo) => algo.name === selectedAlgoValue
    )[0]
    const algoInfo: IAlgoExeInfo = {
      user: user.id,
      mainFile: selectedAlgo.mainFile,
      seriesInstanceUID: selectedSeries.seriesInstanceUID,
      folder: '',
    }
    dispatch({
      type: algoActionTypes.EXECUTE_ALGO,
      algoExeInfo: algoInfo,
    })
  }

  return (
    <div>
      {shouldBeOpen() ? (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{t('Algo result')}</DialogTitle>
          <DialogContent>
            <DialogContentText>{algoResult}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {t('Close')}
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {t('Algo selection')}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t('Select the algorithm to execute.')}
            </DialogContentText>
            <Select
              value={selectedAlgoValue}
              onChange={handleSelectedAlgoValueChange}
              variant="outlined"
              margin="dense"
            >
              {algoList &&
                algoList.map((algo: IAlgo) => (
                  <MenuItem key={algo.name} value={algo.name}>
                    {algo.name}
                  </MenuItem>
                ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {t('Close')}
            </Button>
            <Button
              onClick={executeAlgo}
              disabled={selectedAlgoValue === '' || executing}
              color="primary"
            >
              {t('Execute')}
              {executing && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}
