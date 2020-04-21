import { put, takeLatest, call, all } from 'redux-saga/effects'

import * as ActionTypes from './ActionTypes'
import mirrorPacsService from './mirrorPacsService'
import * as seriesActionTypes from '../series/actionTypes'

export function* mirrorPacs() {
  yield call([mirrorPacsService, 'mirrorPacs'])
  yield put({ type: seriesActionTypes.FETCH_ALL_SERIES })
}

export function* actionWatcher() {
  yield takeLatest(ActionTypes.DO_A_MIRROR_UPDATE, mirrorPacs)
}

export default function* mirrorPacsSaga() {
  yield all([actionWatcher()])
}
