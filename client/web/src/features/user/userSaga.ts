import { put, takeLatest, call, all } from 'redux-saga/effects'

import * as actionTypes from './actionTypes'
import UserService from './userService'

function* fetchUsers() {
  const users = yield call(UserService.getAll)
  yield put({
    type: actionTypes.SET_ALL_USERS,
    users,
  })
}

function* actionWatcher() {
  yield takeLatest(actionTypes.FETCH_ALL_USERS, fetchUsers)
}

export default function* userSaga() {
  yield all([actionWatcher()])
}
