import { put, takeLatest, call, all } from 'redux-saga/effects'

import * as actionTypes from './actionTypes'
import userService from './userService'

export function* fetchUsers() {
  const { data: users } = yield call([userService, 'getAll'])
  yield put({
    type: actionTypes.SET_ALL_USERS,
    users,
  })
}

export function* actionWatcher() {
  yield takeLatest(actionTypes.FETCH_ALL_USERS, fetchUsers)
}

export default function* userSaga() {
  yield all([actionWatcher()])
}
