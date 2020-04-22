import React, { useEffect } from 'react'
import {
  makeStyles,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
} from '@material-ui/core'

import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'

import styles from './UserList.style'
import { actionTypes, selectors } from '../../../features/user'
import { IUser } from '../../../models/user'
import { UserListRow } from './UserListRow'
import { IColAction } from './IColAction'

type UserListProps = {
  rowActions: (item: IUser) => IColAction[]
}

const useStyle = makeStyles(styles)

export const UserList: React.FC<UserListProps> = (props: UserListProps) => {
  const { rowActions } = props
  const classes = useStyle()
  const { t } = useTranslation()
  const list = useSelector(selectors.getList)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: actionTypes.FETCH_ALL_USERS })
  }, [dispatch])

  return (
    <Box p={1}>
      <TableContainer
        component={Paper}
        classes={{ root: classes.tableContainer }}
      >
        <Table className={classes.table} aria-label="User list">
          <TableHead>
            <TableRow>
              <TableCell>{t('user:field.firstname')}</TableCell>
              <TableCell align="right">{t('user:field.lastname')}</TableCell>
              <TableCell align="right">{t('user:field.login')}</TableCell>
              <TableCell align="right">{t('user:field.role')}</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {list &&
              list.map((user: IUser) => (
                <UserListRow
                  user={user}
                  key={user.id}
                  actionCol={rowActions(user)}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
