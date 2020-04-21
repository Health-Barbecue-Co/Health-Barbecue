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
import { useTranslation } from 'react-i18next'

import { actionTypes } from '../../../features/user'

import style from './SignIn.style'

const useStyles = makeStyles(style)

export const SignIn: React.FC = () => {
  const classes = useStyles()
  const location = useRouteMatch()
  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation()

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
          {t('user:signin.title')}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('user:signin.login')}
            name="login"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('user:signin.password')}
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
            {t('user:signin.action')}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                component={RouterLink}
                to={`${location.url}/forgetten-password`}
              >
                {t('user:signin.forgotten_password_link')}
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to={`${location.url}/register`}>
                {t('user:signin.create_link')}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
