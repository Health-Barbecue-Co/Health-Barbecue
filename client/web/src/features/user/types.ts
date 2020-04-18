import { SET_CURRENT_USER, UNSET_CURRENT_USER } from './actionTypes'

interface SetCurrentUserAction {
  type: typeof SET_CURRENT_USER
  user: any
}
interface UnsetCurrentUserAction {
  type: typeof UNSET_CURRENT_USER
}
export type UserActionTypes = UnsetCurrentUserAction | SetCurrentUserAction

export interface SystemState {
  user: any
}
