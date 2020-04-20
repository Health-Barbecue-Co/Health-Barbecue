export const getSelected = (state: any) => {
  const { user } = state
  return user.user
}
export const getList = (state: any) => {
  const { user } = state
  return user.list
}
