import React, { ReactNode, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { actionTypes } from '../../features/auth'

type AuthProviderType = {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderType> = (
  props: AuthProviderType
) => {
  const { children } = props
  const dispatch = useDispatch()
  const checkAuth = useCallback(() => {
    dispatch({ type: actionTypes.AUTH_CHECK })
  }, [dispatch])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return <>{children}</>
}
