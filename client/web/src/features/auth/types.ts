import {
  UNSET_AUTH,
  SET_AUTH,
  SET_MESSAGE,
  UNSET_MESSAGE,
  AUTH_LOGOUT,
  AUTH_LOGIN,
  AUTH_CHECK,
} from './actionTypes'
import { AuthenticatedUser } from '../../models/authenticatedUser'

interface UnsetAuthAction {
  type: typeof UNSET_AUTH
}

interface SetAuthAction {
  type: typeof SET_AUTH
  auth: AuthenticatedUser
}

interface SetAuthMessageAction {
  type: typeof SET_MESSAGE
  message: any
}

interface UnsetAuthMessageAction {
  type: typeof UNSET_MESSAGE
}

export interface LogoutAction {
  type: typeof AUTH_LOGOUT
  callback: () => void
}

export interface LoginAction {
  type: typeof AUTH_LOGIN
  login: string
  password: string
}

export interface CheckAuthAction {
  type: typeof AUTH_CHECK
}

export type AuthActionTypes =
  | SetAuthAction
  | UnsetAuthAction
  | SetAuthMessageAction
  | UnsetAuthMessageAction
  | LogoutAction
  | LoginAction
  | CheckAuthAction

export interface AuthState {
  auth: AuthenticatedUser | null
  message: any | null
}
