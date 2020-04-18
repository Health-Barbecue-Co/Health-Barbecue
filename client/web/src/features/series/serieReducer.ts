import {
  UNSET_CURRENT_SERIE,
  SET_CURRENT_SERIE,
  SET_ALL_SERIES,
} from './actionTypes'
import { SerieActionTypes, SerieState } from './types'

const initialState = {
  list: [],
  serie: null,
}

export default (state = initialState, action: SerieActionTypes): SerieState => {
  switch (action.type) {
    case SET_CURRENT_SERIE:
      return { ...state, serie: action.serie }
    case UNSET_CURRENT_SERIE:
      return { ...state, serie: null }
    case SET_ALL_SERIES:
      return { ...state, list: action.series }
    default:
      return state
  }
}
