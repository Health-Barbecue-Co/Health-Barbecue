import React, { useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'

import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { Link, Box } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { Link as RouterLink, useRouteMatch, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { Formik } from 'formik'
import { Alert } from '@material-ui/lab'
import { actionTypes, selectors } from '../../../features/auth'
import { SignInForm } from './SignInForm'

import style from './SignIn.style'

const useStyles = makeStyles(style)

export const SignIn: React.FC = () => {
  const classes = useStyles()
  const location = useRouteMatch()
  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation()
  const auth = useSelector(selectors.getAuth)
  const authMessage = useSelector(selectors.getAuthMessage)

  useEffect(() => {
    // User is authenticated, redirect to main page
    if (auth) {
      history.push('/')
    }
  }, [auth, history])

  const handleSubmit = (formData: any) => {
    const { login, password } = formData
    // Call the API to login & returns informations about logged user
    dispatch({
      type: actionTypes.AUTH_LOGIN,
      login,
      password,
    })
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

        <Formik
          initialValues={{
            login: '',
            password: '',
          }}
          onSubmit={handleSubmit}
          component={SignInForm}
        />

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
            <Link component={RouterLink} to={`${location.url}/register`} data-testid="create-user-link">
              {t('user:signin.create_link')}
            </Link>
          </Grid>
        </Grid>
        <Box p={1}>
          {authMessage ? (
            <Alert severity="error">{authMessage.message}</Alert>
          ) : null}
        </Box>
      </div>
    </Container>
  )
}
