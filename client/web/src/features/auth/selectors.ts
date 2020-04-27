export const getAuth = (state: any) => {
  const { auth } = state
  return auth.auth
}

export const getAuthMessage = (state: any) => {
  const { auth } = state
  return auth.message
}
