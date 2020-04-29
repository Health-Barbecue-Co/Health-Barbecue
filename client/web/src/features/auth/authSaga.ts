import { put, takeLatest, call, all } from 'redux-saga/effects'
import authService, { AuthService } from './authService'

import * as actionTypes from './actionTypes'
import { LogoutAction, LoginAction } from './types'

export function* authenticate(action: LoginAction) {
  const { login, password } = action

  try {
    yield put({ type: actionTypes.UNSET_MESSAGE })
    const auth = yield call([authService, 'login'], login, password)
    yield put({ type: actionTypes.SET_AUTH, auth })
  } catch (error) {
    yield put({ type: actionTypes.SET_MESSAGE, message: error })
  }
}

export function* logout(action: LogoutAction) {
  const { callback } = action
  yield call(AuthService.logout)
  yield put({ type: actionTypes.UNSET_AUTH })
  yield call(callback)
}

export function* checkAuth() {
  try {
    const { data: auth } = yield call([authService, 'checkAuth'])
    yield put({ type: actionTypes.SET_AUTH, auth })
  } catch (e) {
    yield call(AuthService.logout)
  }
}

export function* actionWatcher() {
  yield takeLatest(actionTypes.AUTH_LOGIN, authenticate)
  yield takeLatest(actionTypes.AUTH_LOGOUT, logout)
  yield takeLatest(actionTypes.AUTH_CHECK, checkAuth)
}

export default function* authSaga() {
  yield all([actionWatcher()])
}
