import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import SyncIcon from '@material-ui/icons/Sync'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import MaterialTable from 'material-table'

import { actionTypes, selectors } from '../../../features/series'
import { mirrorPacsActionTypes } from '../../../features/mirrorPacs'

type SeriesListProps = {}

export const SeriesList: React.FC<SeriesListProps> = () => {
  const { list } = useSelector(selectors.getSeriesStore)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: actionTypes.FETCH_ALL_SERIES })
  }, [dispatch])

  const synchronize = () => {
    dispatch({ type: mirrorPacsActionTypes.DO_A_MIRROR_UPDATE })
  }

  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        title="Series list"
        columns={[
          { title: 'Series instance UID', field: 'seriesInstanceUID' },
          { title: 'Series description', field: 'seriesDescription' },
          { title: 'Modality', field: 'modality' },
          { title: 'Number Of Instances', field: 'numberOfSeriesRelatedInstances' },
          { title: 'Body part', field: 'birthCity' },
        ]}
        data={list}
        options={{
          filtering: true
        }}
        actions={[
          {
            icon: () => <SyncIcon />,
            tooltip: t('Refresh'),
            isFreeAction: true,
            onClick: (event) => synchronize()
          }
        ]}
      />
    </div>
  )
}
