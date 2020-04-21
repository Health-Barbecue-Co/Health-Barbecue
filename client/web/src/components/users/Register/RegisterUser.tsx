import React, { useState, useEffect, useCallback } from 'react'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  makeStyles,
  Container,
  CssBaseline,
  Backdrop,
  Snackbar,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import CircularProgress from '@material-ui/core/CircularProgress'

import style from './RegisterUser.style'
import { actionTypes, selectors } from '../../../features/user'

type UserRegisterProps = {
  afterValidate: () => void
}
const useStyle = makeStyles(style)

export const UserRegister: React.FC<UserRegisterProps> = (
  props: UserRegisterProps
) => {
  const { afterValidate } = props
  const { t } = useTranslation()
  const classes = useStyle()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formResult = useSelector(selectors.getFormResult)

  const resetFormResult = useCallback(() => {
    dispatch({ type: actionTypes.RESET_USER_FORM_RESULT })
  }, [dispatch])

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      login: '',
      password: '',
      role: 'admin',
    },
    onSubmit: (user) => {
      setIsSubmitting(true)
      dispatch({ type: actionTypes.SAVE_ONE_USER, user })
    },
  })

  useEffect(() => {
    // clean store
    resetFormResult()
  }, [resetFormResult])

  useEffect(() => {
    if (formResult) {
      // finish loading
      setIsSubmitting(false)

      if (formResult.success) {
        afterValidate()
      }
    }
  }, [formResult, afterValidate])

  // useEffect(() => {
  //   console.log(formik)
  // }, [formik])

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Backdrop className={classes.backdrop} open={isSubmitting}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={!!formResult} autoHideDuration={6000}>
        <Alert
          severity={formResult && formResult.success ? 'success' : 'error'}
        >
          {t(
            `user:message.register${
              formResult && formResult.success ? 'Success' : 'Error'
            }`
          )}
        </Alert>
      </Snackbar>
      <div className={classes.paper}>
        <form onSubmit={formik.handleSubmit}>
          <Box display="flex" flexDirection="row" p={1}>
            <Box width={1 / 2} pr={1}>
              <TextField
                error
                name="firstname"
                label={t('user:field.firstname')}
                defaultValue={formik.values.firstname}
                variant="outlined"
                required
                helperText={formik.errors.firstname}
                onChange={formik.handleChange}
              />
            </Box>
            <Box width={1 / 2} pl={1}>
              <TextField
                error
                name="lastname"
                label={t('user:field.lastname')}
                defaultValue={formik.values.lastname}
                variant="outlined"
                required
                helperText={formik.errors.lastname}
                onChange={formik.handleChange}
              />
            </Box>
          </Box>
          <Box p={1}>
            <TextField
              error
              fullWidth
              name="login"
              label={t('user:field.login')}
              defaultValue={formik.values.login}
              variant="outlined"
              required
              helperText={formik.errors.login}
              onChange={formik.handleChange}
              autoComplete="username"
            />
          </Box>
          <Box p={1}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="password">
                {t('user:field.password')}
              </InputLabel>
              <OutlinedInput
                name="password"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
          </Box>
          <Box p={1}>
            <TextField
              error
              fullWidth
              name="role"
              label={t('user:field.role')}
              defaultValue={formik.values.role}
              variant="outlined"
              required
              helperText={formik.errors.role}
              onChange={formik.handleChange}
            />
          </Box>
          <Box p={1}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={formik.isValidating && formik.isSubmitting}
            >
              {t('action.save')}
            </Button>
          </Box>
        </form>
      </div>
    </Container>
  )
}
