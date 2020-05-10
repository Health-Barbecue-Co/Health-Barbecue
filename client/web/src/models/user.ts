export interface ITheme {
  index: number
  dark: boolean
}

export interface IUserSetting {
  theme: ITheme
}

export interface IUser {
  id: string
  firstname: string
  lastname: string
  login: string
  role: string
  settings?: IUserSetting
}
