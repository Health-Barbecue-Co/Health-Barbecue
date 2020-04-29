import { UNSET_AUTH, SET_AUTH, SET_MESSAGE, UNSET_MESSAGE } from './actionTypes'
import { AuthActionTypes, AuthState } from './types'

const initialState: AuthState = {
  auth: null,
  message: null,
}

export default (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, auth: action.auth }
    case UNSET_AUTH:
      return { ...state, auth: null }
    case SET_MESSAGE:
      return { ...state, message: action.message }
    case UNSET_MESSAGE:
      return { ...state, message: null }
    default:
      return state
  }
}
