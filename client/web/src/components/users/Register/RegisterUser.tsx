import React, { useState, useEffect, useCallback } from 'react'
import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  makeStyles,
  Container,
  CssBaseline,
  Backdrop,
  Snackbar,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import CircularProgress from '@material-ui/core/CircularProgress'

import style from './RegisterUser.style'
import { actionTypes, selectors } from '../../../features/user'
import { UserForm } from './UserForm'

type UserRegisterProps = {
  afterValidate: () => void
  id?: string
}
const useStyle = makeStyles(style)

export const UserRegister: React.FC<UserRegisterProps> = (
  props: UserRegisterProps
) => {
  const { afterValidate, id } = props

  const { t } = useTranslation()
  const classes = useStyle()
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formResult = useSelector(selectors.getFormResult)
  const selected = useSelector(selectors.getSelected)

  const defaultValues = selected
    ? { ...selected, password: '' }
    : {
        firstname: '',
        lastname: '',
        login: '',
        password: '',
        role: 'admin',
      }

  const resetFormResult = useCallback(() => {
    dispatch({ type: actionTypes.RESET_USER_FORM_RESULT })
  }, [dispatch])

  // Init on component creation : clean store
  useEffect(() => {
    resetFormResult()
  }, [resetFormResult])

  // event after submitting
  useEffect(() => {
    if (formResult) {
      // finish loading
      setIsSubmitting(false)

      if (formResult.success) {
        afterValidate()
      }
    }
  }, [formResult, afterValidate])

  // fetch user if prop id is defined
  useEffect(() => {
    dispatch({ type: actionTypes.UNSET_CURRENT_USER })
    if (id) {
      dispatch({ type: actionTypes.FETCH_ONE_USER, userId: id })
    }
  }, [id, dispatch])

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
            `user:message.register.${
              formResult && formResult.success ? 'success' : 'error'
            }`
          )}
        </Alert>
      </Snackbar>
      <div className={classes.paper}>
        <Formik
          enableReinitialize
          initialValues={defaultValues}
          onSubmit={(user) => {
            setIsSubmitting(true)
            dispatch({ type: actionTypes.SAVE_ONE_USER, user })
          }}
          component={UserForm}
        />
      </div>
    </Container>
  )
}
