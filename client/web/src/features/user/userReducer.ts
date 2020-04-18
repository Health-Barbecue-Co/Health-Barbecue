import { UNSET_CURRENT_USER, SET_CURRENT_USER } from './actionTypes'
import { UserActionTypes } from './types'

const initialState = {
  user: null,
}

export default (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.user }
    case UNSET_CURRENT_USER:
      return { ...state, user: null }
    default:
      return state
  }
}
