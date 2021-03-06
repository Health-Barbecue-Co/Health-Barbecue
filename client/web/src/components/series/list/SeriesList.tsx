import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import MaterialTable from 'material-table'
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core'
import { useHistory, useRouteMatch } from 'react-router-dom'

import SyncIcon from '@material-ui/icons/Sync'
import DescriptionIcon from '@material-ui/icons/Description'
import OutdoorGrillIcon from '@material-ui/icons/OutdoorGrill'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import { CsvBuilder } from 'filefy'

import style from './SeriesList.style'
import { actionTypes, seriesSelectors } from '../../../features/series'
import { mirrorPacsActionTypes } from '../../../features/mirrorPacs'
import { ISeries } from '../../../models/series'
import { SeriesLabel } from '../../labels/SeriesLabel'
import { AlgoResultDialog } from '../../algorithms'
import { ILabel } from '../../../models/ILabel'

const useStyle = makeStyles(style)

type SeriesListProps = {}

export const SeriesList: React.FC<SeriesListProps> = () => {
  const classes = useStyle()
  const { list } = useSelector(seriesSelectors.getSeriesStore)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()
  const match = useRouteMatch()
  const [selectedSeriesList, setSelectedSeriesList] = useState<ISeries[]>([])
  const [algoDialogOpen, setAlgoDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    dispatch({ type: actionTypes.FETCH_ALL_SERIES })
  }, [dispatch])

  const synchronize = () => {
    dispatch({ type: mirrorPacsActionTypes.DO_A_MIRROR_UPDATE })
  }

  const customLabelFilter = (term: string, rowData: ISeries) => {
    // If no label no matching
    if (rowData.labels === null) {
      return false
    }
    // Get array of label matching the filter
    const labelMatching = rowData.labels.filter((value) => {
      if (value.labelKey.includes(term)) {
        return value
      }
      if (value.assignedValue.includes(term)) {
        return value
      }
      return null
    })
    // Returns if a label matching the filter is found
    let isMatching = false
    if (labelMatching.length !== 0) {
      isMatching = true
    }
    return isMatching
  }

  const checkDisplay = (rowData: ISeries) => {
    return selectedSeriesList.includes(rowData)
  }

  const openAlgoSelection = () => {
    setAlgoDialogOpen(true)
  }

  const closeAlgoSelection = () => {
    setAlgoDialogOpen(false)
  }

  const exportSelected = (data: any) => {
    // Get all labels of all selected series
    const labels: any = {}
    data.forEach((dataElement: ISeries) => {
      dataElement.labels?.forEach((labelElement: ILabel) => {
        labels[labelElement.labelKey] = ''
      })
    })
    // Copy all labels as property of series
    data.forEach((dataElement: any) => {
      Object.assign(dataElement, labels)
      // Set series labels with corresponding values
      dataElement.labels?.forEach((labelElement: any) => {
        // eslint-disable-next-line no-param-reassign
        dataElement[labelElement.labelKey] = labelElement.assignedValue
      })
    })
    // Get all properties with string value as columns header
    const columns = Object.keys(data[0]).filter((element) => {
      return typeof data[0][element] === 'string'
    })
    // Get rows data for each series
    const rows = data.map((dataElement: any) =>
      columns.map((column) => dataElement[column])
    )
    // Save the csv file
    new CsvBuilder('series_list.csv')
      .setColumns(columns)
      .addRows(rows)
      .exportFile()
  }

  const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#3f51b5',
      },
    },
  })

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <MaterialTable
          title={t('Series list')}
          columns={[
            { title: t('Patient name'), field: 'patientsName' },
            // { title: t('Series instance UID'), field: 'seriesInstanceUID' },
            // { title: t('Series description'), field: 'seriesDescription' },
            { title: t('Modality'), field: 'modality' },
            {
              title: t('Number of instances'),
              field: 'numberOfSeriesRelatedInstances',
            },
            { title: t('Body part'), field: 'bodyPartExamined' },
            {
              title: t('Labels'),
              field: 'url',
              render: (rowData) => (
                <SeriesLabel
                  series={rowData}
                  isSelected={checkDisplay(rowData)}
                />
              ),
              customFilterAndSearch: (term, rowData) =>
                customLabelFilter(term, rowData),
            },
          ]}
          data={list}
          options={{
            filtering: true,
            showTitle: false,
            selection: true,
          }}
          actions={[
            {
              icon: () => <SyncIcon id="synchronize-pacs-icon" />,
              tooltip: t('Refresh'),
              isFreeAction: true,
              onClick: () => synchronize(),
            },
            {
              icon: () => <OutdoorGrillIcon />,
              tooltip: t('Launch IA'),
              onClick: () => openAlgoSelection(),
            },
            {
              icon: () => <DescriptionIcon />,
              tooltip: t('Show'),
              onClick: (event, rowData: ISeries | ISeries[]) => {
                const elt: ISeries = Array.isArray(rowData)
                  ? rowData[0]
                  : rowData
                history.push(`${match.url}/show/${elt.id}`)
              },
            },
            {
              icon: () => <CloudDownloadIcon />,
              tooltip: t('Export csv'),
              onClick: (evt, data) => exportSelected(data),
            },
          ]}
          onSelectionChange={(rows) => {
            setSelectedSeriesList(rows)
          }}
          localization={{
            body: {
              emptyDataSourceMessage: t('No records to display'),
              filterRow: {
                filterTooltip: t('Filter'),
              },
            },
            toolbar: {
              searchTooltip: t('Search'),
              searchPlaceholder: t('Search'),
            },
            pagination: {
              labelRowsSelect: t('rows'),
              labelDisplayedRows: `{from}-{to} ${t('of')} {count}`,
              firstTooltip: t('First Page'),
              previousTooltip: t('Previous Page'),
              nextTooltip: t('Next Page'),
              lastTooltip: t('Last Page'),
            },
          }}
        />
        <AlgoResultDialog
          open={algoDialogOpen}
          onClose={closeAlgoSelection}
          selectedSeriesList={selectedSeriesList}
        />
      </MuiThemeProvider>
    </div>
  )
}
