import { put, takeLatest, call, all } from 'redux-saga/effects'

import * as actionTypes from './actionTypes'
import SerieService from './serieService'

function* fetchSeries() {
  const { data: series } = yield call([SerieService, 'getAll'])

  yield put({
    type: actionTypes.SET_ALL_SERIES,
    series,
  })
}

function* actionWatcher() {
  yield takeLatest(actionTypes.FETCH_ALL_SERIES, fetchSeries)
}

export default function* userSaga() {
  yield all([actionWatcher()])
}
