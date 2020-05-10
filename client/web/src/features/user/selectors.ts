import { IUser } from '../../models/user'

export const getSelected = (state: any): IUser | null => {
  const { user } = state
  return user.user
}
export const getList = (state: any): IUser[] => {
  const { user } = state
  return user.list
}

export const getFormResult = (state: any) => {
  const { user } = state
  return user.form
}
