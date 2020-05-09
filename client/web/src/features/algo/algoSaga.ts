import { put, takeLatest, call, all, delay } from 'redux-saga/effects'

import * as actionTypes from './actionTypes'
import algoService from './algoService'
import { ExecuteAlgoAction, DeleteAlgoAction, CreateAlgoAction } from './types'

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

export function* fetchAllAlgo() {
  try
  {
    const res = yield call([algoService, 'getAllAlgo'])
    yield put({
      type: actionTypes.SET_ALGO_LIST,
      algoList: res.data,
    })
  } catch (error) {
    console.log(error)
  }
}

export function* deleteAlgo(action: DeleteAlgoAction) {
  try
  {
    yield call([algoService, 'DeleteAlgo'], action.algo)
    yield delay(1000)
    yield call(fetchAllAlgo)
  } catch (error) {
    console.log(error)
  }
}

export function* createAlgo(action: CreateAlgoAction) {
  try
  {
    yield call([algoService, 'CreateAlgo'], action.algo)
    yield delay(1000)
    yield call(fetchAllAlgo)
  } catch (error) {
    console.log(error)
  }
}

export function* actionWatcher() {
  yield takeLatest(actionTypes.EXECUTE_ALGO, executeAlgo)
  yield takeLatest(actionTypes.FETCH_ALL_ALGO, fetchAllAlgo)
  yield takeLatest(actionTypes.DELETE_ALGO, deleteAlgo)
  yield takeLatest(actionTypes.CREATE_ALGO, createAlgo)
}

export default function* algoSaga() {
  yield all([actionWatcher()])
}
