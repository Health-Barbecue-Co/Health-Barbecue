/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
export const ConnectedRoute: React.FC<RouteProps> = (
  routeProps: RouteProps
) => {
  const { children, ...rest } = routeProps
  return (
    <Route
      {...rest}
      render={(props) => {
        // eslint-disable-next-line react/prop-types
        const { location } = props
        return localStorage.getItem('user') ? (
          children
        ) : (
          <Redirect to={{ pathname: '/user', state: { from: location } }} />
        )
      }}
    />
  )
}
