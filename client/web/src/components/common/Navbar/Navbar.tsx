import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
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

import axios, { AxiosResponse } from 'axios'
import { useTranslation } from 'react-i18next'

import { selectors, actionTypes } from '../../../features/user'
import { Version } from '../../../models/version'
import menu from '../../../config/menu'

import styles from './Navbar.style'

const useStyles = makeStyles(styles)

export const Navbar: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const user = useSelector(selectors.getSelected)
  const theme = useTheme()
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)

  const [version, setVersion] = useState('')

  useEffect(() => {
    // @todo use Redux-Saga
    axios.get('/api/version').then((response: AxiosResponse) => {
      const vers: Version = response.data
      const displayVersion = `${vers.major}.${vers.minor}.${vers.build}.${vers.revision}`
      setVersion(displayVersion)
    })
  }, [])

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const logout = () => {
    handleDrawerClose()
    dispatch({ type: actionTypes.UNSET_CURRENT_USER })
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

          <Typography variant="subtitle1">{version}</Typography>
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
