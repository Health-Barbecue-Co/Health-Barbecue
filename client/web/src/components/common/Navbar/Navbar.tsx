import React from 'react'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
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
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Logout from '@material-ui/icons/ExitToApp'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'

import { useSelector, useDispatch } from 'react-redux'
import { version } from '../../../../package.json'
import { selectors, actionTypes } from '../../../features/user'
import styles from './Navbar.style'

const useStyles = makeStyles(styles)

export const Navbar: React.FC = () => {
  const classes = useStyles()
  const { user } = useSelector(selectors.getUser)
  const theme = useTheme()
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const logout = () => {
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

          {user ? (
            <>
              <Button
                className={classes.menuButton}
                color="inherit"
                component={NavLink}
                to="/home"
              >
                Home
              </Button>
              <Button
                className={classes.menuButton}
                color="inherit"
                component={NavLink}
                to="/about"
              >
                About
              </Button>
              <IconButton onClick={logout} color="inherit">
                <Logout />
              </IconButton>
            </>
          ) : null}

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
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      ) : null}
    </>
  )
}
