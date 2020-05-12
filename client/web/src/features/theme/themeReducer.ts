import { SET_THEME, UNSET_THEME } from './actionTypes'
import { ThemeActionTypes } from './types'

import { ITheme } from '../../models/user'

const initialState: ITheme | null = null

export default (state = initialState, action: ThemeActionTypes) => {
  switch (action.type) {
    case SET_THEME:
      return action.theme
    case UNSET_THEME:
      return initialState
    default:
      return state
  }
}
