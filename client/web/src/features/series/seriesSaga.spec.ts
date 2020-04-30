import { call, put, takeLatest, all } from 'redux-saga/effects'
import seriesSaga, {
  fetchSeries,
  updateSeries,
  actionWatcher,
  fetchOneSeries,
} from './seriesSaga'
import * as actionTypes from './actionTypes'
import seriesService from './seriesService'

jest.mock('../common/HttpRequest')

describe('Series saga', () => {
  it(`should have an actionWatcher"`, () => {
    const generator = actionWatcher()
    expect(generator.next().value).toEqual(
      takeLatest(actionTypes.FETCH_ALL_SERIES, fetchSeries)
    )
    expect(generator.next().value).toEqual(
      takeLatest(actionTypes.UPDATE_SERIES, updateSeries)
    )
    expect(generator.next().value).toEqual(
      takeLatest(actionTypes.FETCH_ONE_SERIES, fetchOneSeries)
    )
  })

  it(`should dispatch action "${actionTypes.FETCH_ALL_SERIES}" with result from fetch series API`, () => {
    const mockResponse = { data: [] }
    const generator = fetchSeries()
    generator.next()

    expect(generator.next(mockResponse).value).toEqual(
      put({ type: actionTypes.SET_ALL_SERIES, series: [] })
    )
    expect(generator.next().done).toBeTruthy()
  })

  it(`should dispatch action "${actionTypes.UPDATE_SERIES}" with result from fetch series API`, () => {
    const series = {
      id: 'id',
      seriesInstanceUID: 'seriesInstanceUID',
      seriesDescription: 'seriesDescription',
      modality: 'modality',
      numberOfSeriesRelatedInstances: 'numberOfSeriesRelatedInstances',
      patientsName: 'patientsName',
      bodyPartExamined: 'bodyPartExamined',
      labels: [],
    }

    const generator = updateSeries({
      type: actionTypes.UPDATE_SERIES,
      series,
    })
    expect(generator.next().value).toEqual(
      call([seriesService, 'update'], series.id, series)
    )

    expect(generator.next().value).toEqual(call(fetchSeries))
    expect(generator.next().done).toBeTruthy()
  })

  it(`should dispatch action "${actionTypes.FETCH_ONE_SERIES}" with result from fetch one serie`, () => {
    const series = {
      id: 'id',
      seriesInstanceUID: 'seriesInstanceUID',
      seriesDescription: 'seriesDescription',
      modality: 'modality',
      numberOfSeriesRelatedInstances: 'numberOfSeriesRelatedInstances',
      patientsName: 'patientsName',
      bodyPartExamined: 'bodyPartExamined',
      labels: [],
    }

    const generator = fetchOneSeries({
      type: actionTypes.FETCH_ONE_SERIES,
      id: 'id',
    })

    expect(generator.next().value).toEqual(
      put({ type: actionTypes.UNSET_CURRENT_SERIES })
    )
    expect(generator.next({ data: { id: 'id' } }).value).toEqual(
      call([seriesService, 'getOne'], 'id')
    )

    expect(generator.next({ data: series }).value).toEqual(
      put({ type: actionTypes.SET_CURRENT_SERIES, series })
    )
  })

  it('runs Saga', async () => {
    const task = seriesSaga()
    expect(task.next().value).toEqual(all([actionWatcher()]))
  })
})
