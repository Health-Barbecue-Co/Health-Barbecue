import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
// import { useDispatch } from 'react-redux'
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
} from '@material-ui/core'

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import style from './RegisterUser.style'

type UserRegisterProps = {}
const useStyle = makeStyles(style)

export const UserRegister: React.FC<UserRegisterProps> = () => {
  const { t } = useTranslation()
  const classes = useStyle()
  // const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      login: '',
      password: '',
      role: 'admin',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

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
      <div className={classes.paper}>
        <form onSubmit={formik.handleSubmit}>
          <Box display="flex" flexDirection="row" p={1}>
            <Box width={1 / 2} pr={1}>
              <TextField
                error
                id="firstname"
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
                id="lastname"
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
              id="login"
              label={t('user:field.login')}
              defaultValue={formik.values.login}
              variant="outlined"
              required
              helperText={formik.errors.login}
              onChange={formik.handleChange}
            />
          </Box>
          <Box p={1}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="password">
                {t('user:field.password')}
              </InputLabel>
              <OutlinedInput
                id="password"
                fullWidth
                type={showPassword ? 'text' : 'password'}
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
              id="role"
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
            >
              {t('action.save')}
            </Button>
          </Box>
        </form>
      </div>
    </Container>
  )
}
