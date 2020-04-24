import React from 'react'
import { TableRow, TableCell, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { IUser } from '../../../models/user'
import { IColAction } from './IColAction'

type UserListRowProps = {
  user: IUser
  actionCol: IColAction[]
}

export const UserListRow: React.FC<UserListRowProps> = (
  props: UserListRowProps
) => {
  const { user, actionCol } = props

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
      <TableCell align="right">
        {actionCol.map((action) => (
          <Button component={Link} to={action.link} key={action.link}>
            {action.icon}
          </Button>
        ))}
      </TableCell>
    </TableRow>
  )
}
