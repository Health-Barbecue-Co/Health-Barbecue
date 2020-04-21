import { IUser } from '../../models/user'
import {
  SET_CURRENT_USER,
  UNSET_CURRENT_USER,
  SET_ALL_USERS,
  FETCH_ALL_USERS,
  SAVE_ONE_USER,
  RESET_USER_FORM_RESULT,
  SET_USER_FORM_RESULT,
} from './actionTypes'

interface FetchUsersAction {
  type: typeof FETCH_ALL_USERS
}

interface SaveUserAction {
  type: typeof SAVE_ONE_USER
  user: IUser
}

interface SetUserFormResultAction {
  type: typeof SET_USER_FORM_RESULT
  result: any
}

interface UnsetUserFormResultAction {
  type: typeof RESET_USER_FORM_RESULT
}

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
  | FetchUsersAction
  | SaveUserAction
  | SetUserFormResultAction
  | UnsetUserFormResultAction

export interface UserState {
  user: IUser | null
  list: IUser[]
  lastModification: string | null
}
