import { put, takeLatest, call, all } from 'redux-saga/effects'

import * as actionTypes from './actionTypes'
import seriesService from './seriesService'

export function* fetchSeries() {
  const { data: series } = yield call([seriesService, 'getAll'])

  yield put({
    type: actionTypes.SET_ALL_SERIES,
    series,
  })
}

export function* actionWatcher() {
  yield takeLatest(actionTypes.FETCH_ALL_SERIES, fetchSeries)
}

export default function* seriesSaga() {
  yield all([actionWatcher()])
}
