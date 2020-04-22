import { put, takeLatest, call, all, delay } from 'redux-saga/effects'
import { IUser } from '../../models/user'

import * as actionTypes from './actionTypes'


export function* actionWatcher() { }

export default function* userSaga() {
  yield all([actionWatcher()])
}
