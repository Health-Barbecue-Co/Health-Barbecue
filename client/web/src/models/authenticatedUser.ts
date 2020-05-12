import { IUserSetting } from './user'

export interface IAuthenticatedUser {
  id: string
  firstname: string
  lastname: string
  login: string
  role: string
  token: string
  settings?: IUserSetting
}
