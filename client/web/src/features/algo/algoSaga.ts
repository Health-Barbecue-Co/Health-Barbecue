import { put, takeLatest, call, all } from 'redux-saga/effects'

import * as actionTypes from './actionTypes'
import algoService from './algoService'
import { ExecuteAlgoAction } from './types'

export function* executeAlgo(action: ExecuteAlgoAction) {
  try
  {
    const res = yield call([algoService, 'executeAlgo'], action.algoExeInfo)
    yield put(
    { 
      type: actionTypes.SET_ALGO_RESULT,
      algoResult: res.data
    })
  } catch (error) {
    console.log(error)
  }
}


export function* actionWatcher() {
  yield takeLatest(actionTypes.EXECUTE_ALGO, executeAlgo)
}

export default function* algoSaga() {
  yield all([actionWatcher()])
}
