export const authHeader = () => {
  // return authorization header with jwt token
  const userFromLocalStorage = localStorage.getItem('user')

  if (userFromLocalStorage) {
    const user = JSON.parse(userFromLocalStorage)
    return user && user.token ? { Authorization: `Bearer ${user.token}` } : {}
  }

  return {}
}
