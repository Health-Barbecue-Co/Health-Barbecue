import React, { useState } from 'react'
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
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import style from './RegisterUser.style'

const useStyle = makeStyles(style)

type UserFormProps = {
  handleSubmit: (e: React.FormEvent<any>) => void
  handleChange: (e: React.ChangeEvent<any>) => void
  handleBlur: (e: any) => void
  values: { [field: string]: any }
  errors?: any
  isValidating: boolean
}

export const UserForm: React.FC<UserFormProps> = (props: UserFormProps) => {
  const { handleSubmit, handleChange, values, errors, isValidating } = props

  const classes = useStyle()
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useTranslation()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="row" p={1}>
        <Box width={1 / 2} pr={1}>
          <TextField
            error
            name="firstname"
            id="firstname-field"
            label={t('user:field.firstname')}
            value={values.firstname}
            variant="outlined"
            required
            helperText={errors.firstname}
            onChange={handleChange}
          />
        </Box>
        <Box width={1 / 2} pl={1}>
          <TextField
            error
            name="lastname"
            id="lastname-field"
            label={t('user:field.lastname')}
            value={values.lastname}
            variant="outlined"
            required
            helperText={errors.lastname}
            onChange={handleChange}
          />
        </Box>
      </Box>
      <Box p={1}>
        <TextField
          error
          fullWidth
          name="login"
          id="login-field"
          label={t('user:field.login')}
          value={values.login}
          variant="outlined"
          required
          helperText={errors.login}
          onChange={handleChange}
          autoComplete="username"
        />
      </Box>
      <Box p={1}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="password">{t('user:field.password')}</InputLabel>
          <OutlinedInput
            name="password"
            id="password-field"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            value={values.password}
            onChange={handleChange}
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
            required={!values.id}
          />
        </FormControl>
      </Box>
      <Box p={1}>
        <TextField
          error
          fullWidth
          name="role"
          label={t('user:field.role')}
          value={values.role}
          variant="outlined"
          required
          helperText={errors.role}
          onChange={handleChange}
        />
      </Box>
      <Box p={1}>
        <Button
          type="submit"
          id="save-button"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={isValidating}
        >
          {t('action.save')}
        </Button>
      </Box>
    </form>
  )
}
