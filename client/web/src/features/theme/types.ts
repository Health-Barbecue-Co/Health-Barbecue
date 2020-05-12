import { SET_THEME, UNSET_THEME } from './actionTypes'
import { ITheme } from '../../models/user'

interface SetThemeAction {
  type: typeof SET_THEME
  theme: ITheme
}

interface UnsetThemeAction {
  type: typeof UNSET_THEME
}

export type ThemeActionTypes = SetThemeAction | UnsetThemeAction
