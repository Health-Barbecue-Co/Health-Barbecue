import {
  SET_ALGO_RESULT,
  SET_ALGO_LIST
} from './actionTypes'
import { AlgoActionTypes, AlgoState } from './types'

const initialState: AlgoState = {
  algoList: [],
  algoResult: "",
}

export default (
  state = initialState,
  action: AlgoActionTypes
): AlgoState => {
  switch (action.type) {
    case SET_ALGO_LIST:
      return { ...state, algoList: action.algoList }
    case SET_ALGO_RESULT:
      return { ...state, algoResult: action.algoResult }
    default:
      return state
  }
}
