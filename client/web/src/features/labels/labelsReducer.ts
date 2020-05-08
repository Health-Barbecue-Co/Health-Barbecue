import {
  SET_ALL_LABELS
} from './actionTypes'
import { LabelsActionTypes, LabelsState } from './types'

const initialState = {
  labelsList: []
}

export default (
  state = initialState,
  action: LabelsActionTypes
): LabelsState => {
  switch (action.type) {
    case SET_ALL_LABELS:
      return { ...state, labelsList: action.labelsList  }
    default:
      return state
  }
}
