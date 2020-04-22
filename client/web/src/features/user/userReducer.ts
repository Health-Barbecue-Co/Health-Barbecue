import {
  UNSET_CURRENT_USER,
  SET_CURRENT_USER,
  SET_ALL_USERS,
  RESET_USER_FORM_RESULT,
  SET_USER_FORM_RESULT,
} from './actionTypes'
import { UserActionTypes, UserState } from './types'

const initialState: UserState = {
  list: [],
  user: null,
  form: null,
}

export default (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.user }
    case UNSET_CURRENT_USER:
      return { ...state, user: null }
    case SET_ALL_USERS:
      return { ...state, list: action.users }
    case SET_USER_FORM_RESULT:
      return { ...state, form: action.result }
    case RESET_USER_FORM_RESULT:
      return { ...state, form: null }
    default:
      return state
  }
}
