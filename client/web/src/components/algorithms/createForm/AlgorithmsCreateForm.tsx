import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { TextField, Button, Box } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { algoActionTypes } from '../../../features/algo'
import { IAlgo } from '../../../models/IAlgo'
import { selectors } from '../../../features/auth'

type AlgorithmsCreateFormProps = {
  onSave?: () => void
}

export const AlgorithmsCreateForm: React.FC<AlgorithmsCreateFormProps> = (
  props: AlgorithmsCreateFormProps
) => {
  const { onSave } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const user = useSelector(selectors.getAuth)
  const fileInput = React.createRef<HTMLInputElement>()

  const [algoName, setAlgoName] = useState<string>('')
  const [algoDesc, setAlgoDesc] = useState<string>('')
  const [areInputsValid, setAreInputsValid] = useState<boolean>(false)

  const handleAlgoNameChange = (event: any) => {
    setAlgoName(event.target.value)
  }

  const handleAlgoDescChange = (event: any) => {
    setAlgoDesc(event.target.value)
  }

  const checkInputs = () => {
    setAreInputsValid(algoName !== '' && algoDesc !== '')
  }

  const sendFile = () => {
    const reader = new FileReader()
    reader.onload = (evt) => {
      if (evt === null || evt.target === null || evt.target.result === null) {
        throw new Error('')
      }

      if (
        fileInput === null ||
        fileInput.current === null ||
        fileInput.current.files === null
      ) {
        throw new Error('')
      }

      const algo: IAlgo = {
        id: '',
        user: user?.id ? user.id : '',
        name: algoName,
        mainFile: fileInput.current.files[0].name,
        description: algoDesc,
        contentFile: evt.target.result as string,
      }

      dispatch({ type: algoActionTypes.CREATE_ALGO, algo })
    }

    if (
      fileInput === null ||
      fileInput.current === null ||
      fileInput.current.files === null
    ) {
      throw new Error('')
    }
    reader.readAsBinaryString(fileInput.current.files[0])

    if (onSave && typeof onSave === 'function') {
      onSave()
    }
  }

  // Check input fields
  useEffect(checkInputs, [algoName, algoDesc])

  return (
    <Box p={1}>
      <form>
        <div>{t('Add new Algorithm:')}</div>
        <TextField
          autoFocus
          margin="dense"
          id="AlgoName"
          label="Algo name"
          onChange={handleAlgoNameChange}
          fullWidth
          variant="outlined"
        />
        <TextField
          margin="dense"
          id="AlgoDesc"
          label="Algo description"
          onChange={handleAlgoDescChange}
          fullWidth
          variant="outlined"
        />
        <Box
          display="flex"
          flexDirection="row"
          alignContent="center"
          justifyContent="center"
        >
          <Box alignContent="center" alignItems="center">
            <label htmlFor="myfile">{t('Select files:')}</label>
            <input type="file" id="myfile" name="myfile" ref={fileInput} />
          </Box>
          <Box flexGrow={1} />
          <Button
            color="primary"
            onClick={sendFile}
            disabled={!areInputsValid}
            variant="outlined"
          >
            {t('Send algo')}
          </Button>
        </Box>
      </form>
    </Box>
  )
}
