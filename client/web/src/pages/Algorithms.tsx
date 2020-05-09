import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, TextField, Grid, Card } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import { AlgoSelectors, algoActionTypes } from '../features/algo'
import MaterialTable from 'material-table'
import { IAlgo } from './../models/IAlgo';
import { IUser } from '../models/user'
import { selectors } from '../features/auth'

export const Algorithms: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const fileInput = React.createRef<HTMLInputElement>();
  const { algoList } = useSelector(AlgoSelectors.getAlgoStore);
  const user: IUser = useSelector(selectors.getAuth)
  const [algoName, setAlgoName] = useState<string>('');
  const [algoDesc, setAlgoDesc] = useState<string>('');
  const [areInputsValid, setAreInputsValid] = useState<boolean>(false);

  useEffect(() => {
    dispatch({ type: algoActionTypes.FETCH_ALL_ALGO })
  }, [dispatch])

  const handleAlgoNameChange = (event: any) => {
    setAlgoName(event.target.value);
  }

  const handleAlgoDescChange = (event: any) => {
    setAlgoDesc(event.target.value);
  }

  const checkInputs = () => {
    if(algoName !== ''
    && algoDesc !== '')
    {
      setAreInputsValid(true);
    } else 
    {
      setAreInputsValid(false);
    }
  }

  useEffect(checkInputs, [algoName, algoDesc]);

  const sendFile = () => {
    var reader = new FileReader(); 
    reader.onload = function(evt) {
      if(evt === null 
        || evt.target === null
        || evt.target.result === null){ throw(new Error("")) }
      if(fileInput === null 
        || fileInput.current === null
        || fileInput.current.files === null){ throw(new Error("")) }
      let algo: IAlgo = {
        id: '',
        user: user.id,
        name: algoName,
        mainFile: fileInput.current.files[0].name,
        description: algoDesc,
        contentFile: evt.target.result as string
      }
      dispatch({ type: algoActionTypes.CREATE_ALGO, algo: algo })
    };
    if(fileInput === null 
      || fileInput.current === null
      || fileInput.current.files === null){ throw(new Error("")) }
    reader.readAsBinaryString(fileInput.current.files[0]);
  }

  return (
    <Fragment>
      <h1>{t('Algorithms')}</h1>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <form>
              <div>{t("Add new Algorithm:")}</div>
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
              <label>Select files:</label>
              <input type="file" id="myfile" name="myfile" ref={fileInput} />
              <Button color="primary" onClick={sendFile} disabled={!areInputsValid} variant="outlined"> Send algo </Button>
            </form>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <MaterialTable
              title={t('Algorithms list')}
              columns={[
                { title: t('Name'), field: 'name' },
                { title: t('Desciption'), field: 'description' },
                { title: t('File'), field: 'mainFile' },
              ]}
              data={algoList}
              options={{
                selection: true
              }}
              actions={[
                {
                  tooltip: 'Remove All Selected algos',
                  icon: 'delete',
                  onClick: (evt, data) => {
                    (data as IAlgo[]).forEach((algo) =>{
                      dispatch({ type: algoActionTypes.DELETE_ALGO, algo: algo })
                    })
                  }
                }
              ]}
            />
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  )
}