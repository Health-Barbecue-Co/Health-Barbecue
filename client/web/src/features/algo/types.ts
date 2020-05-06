
import { 
  EXECUTE_ALGO,
  SET_ALGO_RESULT,
  SET_ALGO_LIST,
  DELETE_ALGO,
  CREATE_ALGO
} from './actionTypes'
import { IAlgo } from '../../models/IAlgo'
import { IAlgoExeInfo } from '../../models/IAlgoExeInfo'

export interface ExecuteAlgoAction {
  type: typeof EXECUTE_ALGO
  algoExeInfo: IAlgoExeInfo
}

interface SetAlgoResultAction {
  type: typeof SET_ALGO_RESULT
  algoResult: string
}

interface SetAlgoListAction {
  type: typeof SET_ALGO_LIST
  algoList: IAlgo[]
}

export interface DeleteAlgoAction {
  type: typeof DELETE_ALGO
  algo: IAlgo
}

export interface CreateAlgoAction{
  type: typeof CREATE_ALGO
  algo: IAlgo
}

export type AlgoActionTypes =
  | ExecuteAlgoAction
  | SetAlgoResultAction
  | SetAlgoListAction
  | DeleteAlgoAction
  | CreateAlgoAction


export interface AlgoState {
  algoList: IAlgo[]
  algoResult: string
}
