import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import MaterialTable from 'material-table'
import { useDispatch, useSelector } from 'react-redux'

import { IAlgo } from '../../../models/IAlgo'
import { AlgoSelectors, algoActionTypes } from '../../../features/algo'

export const AlgorithmsList: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { algoList } = useSelector(AlgoSelectors.getAlgoStore)

  useEffect(() => {
    dispatch({ type: algoActionTypes.FETCH_ALL_ALGO })
  }, [dispatch])

  return (
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
            (data as IAlgo[]).forEach((algo) => {
              dispatch({ type: algoActionTypes.DELETE_ALGO, algo: algo })
            })
          }
        }
      ]}
    />
  )
}