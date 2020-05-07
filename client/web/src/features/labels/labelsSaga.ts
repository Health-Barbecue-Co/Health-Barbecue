import { put, takeLatest, call, all } from 'redux-saga/effects'

import * as actionTypes from './actionTypes'
import labelsService from './labelsService'
import { PostLabelsAction } from './types'

export function* fetchLabels() {
  const { data: labelsList } = yield call([labelsService, 'getAll'])
  yield put({
    type: actionTypes.SET_ALL_LABELS,
    labelsList,
  })
}

export function* postLabel(action: PostLabelsAction) {
  try {
    yield call([labelsService, 'create'], action.label)
    yield call(fetchLabels)
  } catch (error) {
    console.log(error)
  }
}

export function* actionWatcher() {
  yield takeLatest(actionTypes.FETCH_ALL_LABELS, fetchLabels)
  yield takeLatest(actionTypes.POST_LABEL, postLabel)
}

export default function* labelsSaga() {
  yield all([actionWatcher()])
}
