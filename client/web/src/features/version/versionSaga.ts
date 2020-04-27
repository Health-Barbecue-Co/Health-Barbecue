import { put, takeLatest, call, all } from 'redux-saga/effects'

import * as actionTypes from './actionTypes'
import versionService from './versionService'

export function* fetchVersion() {
  const { data: version } = yield call([versionService, 'get'])
  yield put({
    type: actionTypes.SET_VERSION,
    version,
  })
}

export function* actionWatcher() {
  yield takeLatest(actionTypes.FETCH_VERSION, fetchVersion)
}

export default function* userSaga() {
  yield all([actionWatcher()])
}
