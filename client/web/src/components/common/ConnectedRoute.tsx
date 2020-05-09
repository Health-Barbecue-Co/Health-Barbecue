/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
export const ConnectedRoute: React.FC<RouteProps> = (
  routeProps: RouteProps
) => {
  const { children, render: routeRender, ...rest } = routeProps
  return (
    <Route
      {...rest}
      render={(props) => {
        // eslint-disable-next-line react/prop-types
        const { location } = props
        const fromLocalstorage = localStorage.getItem('user')
        const authInfo = fromLocalstorage ? JSON.parse(fromLocalstorage) : false

        if (authInfo && authInfo.token) {
          return routeRender ? routeRender(props) : children
        }
        return (
          <Redirect to={{ pathname: '/user', state: { from: location } }} />
        )
      }}
    />
  )
}
