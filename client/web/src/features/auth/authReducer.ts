import { UNSET_AUTH, SET_AUTH } from './actionTypes'
import { AuthActionTypes, AuthState } from './types'

const initialState: AuthState = {
  auth: null,
}

export default (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, auth: action.user }
    case UNSET_AUTH:
      return { ...state, auth: null }
    default:
      return state
  }
}
