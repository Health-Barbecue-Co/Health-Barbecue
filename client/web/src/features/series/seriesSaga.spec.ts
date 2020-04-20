import { put, takeLatest, all } from 'redux-saga/effects'
import seriesSaga, { fetchSeries, actionWatcher } from './seriesSaga'
import * as actionTypes from './actionTypes'

jest.mock('../common/HttpRequest')

describe('Series saga', () => {
  it(`should dispatch action "${actionTypes.FETCH_ALL_SERIES}"`, () => {
    const generator = actionWatcher()
    expect(generator.next().value).toEqual(
      takeLatest(actionTypes.FETCH_ALL_SERIES, fetchSeries)
    )
    expect(generator.next().done).toBeTruthy()
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

  it('runs Saga', async () => {
    const task = seriesSaga()
    expect(task.next().value).toEqual(all([actionWatcher()]))
  })
})
