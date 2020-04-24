import { UNSET_AUTH, SET_AUTH } from './actionTypes'
import { IUser } from '../../models/user'

interface UnsetAuthAction {
  type: typeof UNSET_AUTH
}

interface SetAuthAction {
  type: typeof SET_AUTH
  user: IUser
}

export type AuthActionTypes = SetAuthAction | UnsetAuthAction

export interface AuthState {
  auth: IUser | null
}
