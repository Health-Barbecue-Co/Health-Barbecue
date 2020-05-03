
import { 
  EXECUTE_ALGO,
  SET_ALGO_RESULT
} from './actionTypes'
import { IAlgoExeInfo } from '../../models/IAlgo'

export interface ExecuteAlgoAction {
  type: typeof EXECUTE_ALGO
  algoExeInfo: IAlgoExeInfo
}

interface SetAlgoResultAction {
  type: typeof SET_ALGO_RESULT
  algoResult: string
}


export type AlgoActionTypes =
  | ExecuteAlgoAction
  | SetAlgoResultAction


export interface AlgoState {
  selectedAlgo: IAlgoExeInfo
  algoResult: string
}
