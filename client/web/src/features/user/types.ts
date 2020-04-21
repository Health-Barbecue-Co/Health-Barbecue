import { IUser } from '../../models/user'
import {
  SET_CURRENT_USER,
  UNSET_CURRENT_USER,
  SET_ALL_USERS,
} from './actionTypes'

interface SetCurrentUserAction {
  type: typeof SET_CURRENT_USER
  user: any
}
interface UnsetCurrentUserAction {
  type: typeof UNSET_CURRENT_USER
}

interface SetAllUserAction {
  type: typeof SET_ALL_USERS
  users: IUser[]
}

export type UserActionTypes =
  | UnsetCurrentUserAction
  | SetCurrentUserAction
  | SetAllUserAction

export interface SystemState {
  user: any
  list: IUser[]
}
