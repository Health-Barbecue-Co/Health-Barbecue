import {
  SET_ALGO_RESULT
} from './actionTypes'
import { AlgoActionTypes, AlgoState } from './types'

const initialState: AlgoState = {
   algoResult: "",
   selectedAlgo: {
     name: '',
     user:'',
     seriesUid:''
   }  

}

export default (
  state = initialState,
  action: AlgoActionTypes
): AlgoState => {
  switch (action.type) {
    case SET_ALGO_RESULT:
      return { ...state, algoResult: action.algoResult }
    default:
      return state
  }
}
