import {
  UNSET_CURRENT_USER,
  SET_CURRENT_USER,
  SET_ALL_USERS,
} from './actionTypes'
import { UserActionTypes } from './types'

const initialState = {
  list: [],
  user: null,
}

export default (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.user }
    case UNSET_CURRENT_USER:
      return { ...state, user: null }
    case SET_ALL_USERS:
      return { ...state, list: action.users }
    default:
      return state
  }
}
