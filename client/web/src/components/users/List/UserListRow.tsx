import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'
import { IUser } from '../../../models/user'

type UserListRowProps = {
  user: IUser
}

export const UserListRow: React.FC<UserListRowProps> = (
  props: UserListRowProps
) => {
  const { user } = props

  if (!user) {
    return null
  }

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {user.firstname}
      </TableCell>
      <TableCell align="right">{user.lastname}</TableCell>
      <TableCell align="right">{user.login}</TableCell>
      <TableCell align="right">{user.role}</TableCell>
    </TableRow>
  )
}
