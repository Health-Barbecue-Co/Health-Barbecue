import {
  put,
  takeLatest,
  call,
  all,
  delay,
  takeEvery,
} from 'redux-saga/effects'
import { IUser } from '../../models/user'

import * as actionTypes from './actionTypes'
import userService from './userService'
import { SET_THEME } from '../theme/actionTypes'

export function* fetchUsers() {
  const { data: users } = yield call([userService, 'getAll'])
  yield put({
    type: actionTypes.SET_ALL_USERS,
    users,
  })
}

export function* fetchOneUser(action: any) {
  const { userId } = action
  const { data: user } = yield call([userService, 'getOne'], userId)

  if (!user.settings) {
    user.settings = {
      theme: {
        index: 0,
        dark: false,
      },
    }
  }

  yield put({ type: actionTypes.SET_CURRENT_USER, user })
}

export function* createOrUpdateUser(action: any) {
  try {
    const { user } = action

    let success: IUser
    if (user.id) {
      success = yield call([userService, 'update'], user.id, user)
    } else {
      success = yield call([userService, 'create'], user)
    }

    yield put({ type: actionTypes.SET_USER_FORM_RESULT, result: { success } })
    yield delay(2000)
    yield put({ type: actionTypes.RESET_USER_FORM_RESULT })
  } catch (error) {
    yield put({ type: actionTypes.SET_USER_FORM_RESULT, result: { error } })
  }
}

export function* setSettings(action: any) {
  const { user, settings, callback } = action
  yield call([userService, 'setSettings'], user.id, settings)
  yield put({ type: SET_THEME, theme: settings.theme })
  yield call(callback)
}

export function* actionWatcher() {
  yield takeEvery(actionTypes.FETCH_ALL_USERS, fetchUsers)
  yield takeLatest(actionTypes.SAVE_ONE_USER, createOrUpdateUser)
  yield takeLatest(actionTypes.FETCH_ONE_USER, fetchOneUser)
  yield takeLatest(actionTypes.SET_USER_SETTINGS, setSettings)
}

export default function* userSaga() {
  yield all([actionWatcher()])
}
