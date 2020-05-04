import React from 'react'
import { TextField, Button, makeStyles } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import style from './SignInForm.style'

const useStyles = makeStyles(style)

type SignInFormProps = {
  handleSubmit: (e: React.FormEvent<any>) => void
  handleChange: (e: React.ChangeEvent<any>) => void
  handleBlur: (e: any) => void
  values?: { [field: string]: any }
  errors?: any
}

export const SignInForm: React.FC<SignInFormProps> = (
  props: SignInFormProps
) => {
  const { handleSubmit, handleChange, values } = props
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label={t('user:signin.login')}
        name="login"
        data-testid="login-field"
        value={values?.login}
        autoComplete="username"
        autoFocus
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        data-testid="password-field"
        label={t('user:signin.password')}
        type="password"
        value={values?.password}
        onChange={handleChange}
        autoComplete="current-password"
      />
      <Button
        type="submit"
        data-testid="signin-button"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        {t('user:signin.action')}
      </Button>
    </form>
  )
}
