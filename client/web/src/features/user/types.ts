import { IUser } from '../../models/user'
import {
  SET_CURRENT_USER,
  UNSET_CURRENT_USER,
  SET_ALL_USERS,
  FETCH_ALL_USERS,
  SAVE_ONE_USER,
  RESET_USER_FORM_RESULT,
  SET_USER_FORM_RESULT,
  FETCH_ONE_USER,
} from './actionTypes'

interface FetchUsersAction {
  type: typeof FETCH_ALL_USERS
}

interface FetchOneUserAction {
  type: typeof FETCH_ONE_USER
  userId: string
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
  | FetchOneUserAction
  | SaveUserAction
  | SetUserFormResultAction
  | UnsetUserFormResultAction

export interface UserState {
  user: IUser | null
  list: IUser[]
  form: any | null
}
