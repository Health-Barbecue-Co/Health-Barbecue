import React, { useEffect } from 'react'
import SyncIcon from '@material-ui/icons/Sync'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import MaterialTable from 'material-table'

import { actionTypes, selectors } from '../../../features/series'
import { mirrorPacsActionTypes } from '../../../features/mirrorPacs'
import { SeriesLabel } from '../../../components/series'
import { ISeries } from '../../../models/series'

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

  const customLabelFilter = (term: string, rowData: ISeries) => {
    // If no label no matching
    if (rowData.labels === null) { return false }
    // Get array of label matching the filter
    let labelMatching = rowData.labels.filter((value) => {
      if (value.labelKeyId.includes(term)) {return value}
      if (value.assignedValue.includes(term)) {return value}
      return null;
    });
    // Returns if a label matching the filter is found
    let isMatching = false;
    if(labelMatching.length !== 0) {isMatching = true}
    return isMatching;
  }

  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        title={t('Series list')}
        columns={[
          { title: t('Patient name'), field: 'patientsName' },
          { title: t('Series instance UID'), field: 'seriesInstanceUID' },
          { title: t('Series description'), field: 'seriesDescription' },
          { title: t('Modality'), field: 'modality' },
          { title: t('Number of instances'), field: 'numberOfSeriesRelatedInstances' },
          { title: t('Body part'), field: 'bodyPartExamined' },
          {
            title: t('Labels'),
            field: 'url',
            render: rowData =>  <SeriesLabel series={rowData}/>,
            customFilterAndSearch: (term, rowData) => customLabelFilter(term, rowData),
          }
        ]}
        data={list}
        options={{
          filtering: true,
          exportButton: true
        }}
        actions={[
          {
            icon: () => <SyncIcon />,
            tooltip: t('Refresh'),
            isFreeAction: true,
            onClick: () => synchronize()
          }
        ]}
        localization={{
          body: {
            emptyDataSourceMessage: t('No records to display'),
            filterRow: {
              filterTooltip: t('Filter'),
            }
          },
          toolbar: {
            searchTooltip: t('Search'),
            searchPlaceholder: t('Search')
          },
          pagination: {
            labelRowsSelect: t('rows'),
            labelDisplayedRows: '{from}-{to} ' + t('of') + ' {count}',
            firstTooltip: t('First Page'),
            previousTooltip: t('Previous Page'),
            nextTooltip: t('Next Page'),
            lastTooltip: t('Last Page')
          }
        }}
      />
    </div>
  )
}
