import {
  UNSET_CURRENT_SERIES,
  SET_CURRENT_SERIES,
  SET_ALL_SERIES,
} from './actionTypes'
import { SeriesActionTypes, SeriesState } from './types'

const initialState = {
  list: [],
  series: null,
}

export default (
  state = initialState,
  action: SeriesActionTypes
): SeriesState => {
  switch (action.type) {
    case SET_CURRENT_SERIES:
      return { ...state, series: action.series }
    case UNSET_CURRENT_SERIES:
      return { ...state, series: null }
    case SET_ALL_SERIES:
      return { ...state, list: action.series }
    default:
      return state
  }
}
