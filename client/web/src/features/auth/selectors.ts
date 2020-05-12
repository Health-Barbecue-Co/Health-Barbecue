import { IAuthenticatedUser } from '../../models/authenticatedUser'

export const getAuth = (state: any): IAuthenticatedUser | null => {
  const { auth } = state
  return auth.auth
}

export const getAuthMessage = (state: any) => {
  const { auth } = state
  return auth.message
}
