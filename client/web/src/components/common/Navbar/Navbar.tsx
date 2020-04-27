import React, { useState, useEffect, useCallback } from 'react'
import clsx from 'clsx'
import { Link, useHistory } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  CssBaseline,
  Box,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Logout from '@material-ui/icons/ExitToApp'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import HelpIcon from '@material-ui/icons/Help'
import UsersIcon from '@material-ui/icons/PeopleAlt'

import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { selectors, actionTypes } from '../../../features/auth'
import {
  selectors as versionSelector,
  actionTypes as versionActionTypes,
} from '../../../features/version'

import menu from '../../../config/menu'

import styles from './Navbar.style'

const useStyles = makeStyles(styles)

export const Navbar: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const user = useSelector(selectors.getAuth)
  const version = useSelector(versionSelector.getVersion)
  const theme = useTheme()
  const dispatch = useDispatch()
  const history = useHistory()

  const [open, setOpen] = useState(false)

  const fetchVersion = useCallback(() => {
    dispatch({ type: versionActionTypes.FETCH_VERSION })
  }, [dispatch])

  useEffect(() => {
    fetchVersion()
  }, [fetchVersion])

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const logout = () => {
    handleDrawerClose()
    dispatch({
      type: actionTypes.AUTH_LOGOUT,
      callback: () => {
        history.push('/')
      },
    })
  }

  return (
    <>
      <CssBaseline />
      <AppBar className={clsx(classes.appBar, { [classes.appBarShift]: open })}>
        <Toolbar>
          {user ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Typography variant="h6" className={classes.title}>
            Health-Barbecue
          </Typography>

          {version ? (
            <Typography variant="subtitle1">
              {`${version.major}.${version.minor}.${version.build}.${version.revision}`}
            </Typography>
          ) : null}
        </Toolbar>
      </AppBar>
      {user ? (
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {menu().map(({ icon, label, url }) => (
              <ListItem button key={label} component={Link} to={url}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={t(label)} />
              </ListItem>
            ))}
          </List>
          <Box flexGrow={1} />
          <Divider />
          <List>
            <ListItem button component={Link} to="/user/main/list">
              <ListItemIcon>
                <UsersIcon />
              </ListItemIcon>
              <ListItemText primary={t('users')} />
            </ListItem>

            <ListItem button component={Link} to="/about">
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary={t('about')} />
            </ListItem>

            <ListItem button onClick={logout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary={t('logout')} />
            </ListItem>
          </List>
        </Drawer>
      ) : null}
    </>
  )
}
