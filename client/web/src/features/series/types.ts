import { ISerie } from '../../models/serie'
import {
  SET_CURRENT_SERIE,
  UNSET_CURRENT_SERIE,
  SET_ALL_SERIES,
  FETCH_ALL_SERIES,
} from './actionTypes'

interface FetchSeriesAction {
  type: typeof FETCH_ALL_SERIES
}
interface SetCurrentSerieAction {
  type: typeof SET_CURRENT_SERIE
  serie: ISerie
}
interface UnsetCurrentSerieAction {
  type: typeof UNSET_CURRENT_SERIE
}

interface SetAllSeriesAction {
  type: typeof SET_ALL_SERIES
  series: ISerie[]
}

export type SerieActionTypes =
  | UnsetCurrentSerieAction
  | SetCurrentSerieAction
  | SetAllSeriesAction
  | FetchSeriesAction

export interface SerieState {
  serie: ISerie | null
  list: ISerie[]
}
