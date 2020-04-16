import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { Link as RouterLink, useRouteMatch, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { actionTypes } from '../../../features/user'

import style from './SignIn.style'

const useStyles = makeStyles(style)

export const SignIn: React.FC = () => {
  const classes = useStyles()
  const location = useRouteMatch()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Call the API to login & returns informations about logged user
    dispatch({
      type: actionTypes.SET_CURRENT_USER,
      user: { lastname: 'damien' },
    })

    history.push('/')
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                component={RouterLink}
                to={`${location.url}/forgetten-password`}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to={`${location.url}/register`}>
                Create new account
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
