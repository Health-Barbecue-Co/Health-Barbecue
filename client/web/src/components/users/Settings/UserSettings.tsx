import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Backdrop,
  CircularProgress,
  CssBaseline,
  makeStyles,
  Paper,
} from '@material-ui/core'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

import { Toolbar } from '../../common'
import { SettingsForm } from './SettingsForm'
import style from './UserSettings.style'
import { selectors as authSelectors } from '../../../features/auth'
import { actionTypes, selectors as userSelector } from '../../../features/user'

const useStyle = makeStyles(style)

export const UserSettings: React.FC = () => {
  const classes = useStyle()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const auth = useSelector(authSelectors.getAuth)
  const currentUser = useSelector(userSelector.getSelected)

  useEffect(() => {
    if (auth) {
      const { id } = auth
      dispatch({ type: actionTypes.FETCH_ONE_USER, userId: id })
    }
  }, [auth, dispatch])

  const defaultValues = currentUser || {
    settings: {
      theme: {
        index: 0,
        dark: false,
      },
    },
  }

  return (
    <>
      <Toolbar label={t('settings')} />
      <CssBaseline />
      <Box flexGrow={1} display="flex" flexDirection="column">
        <Backdrop className={classes.backdrop} open={isSubmitting}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Paper
          classes={{
            root: classes.paper,
          }}
        >
          <Formik
            enableReinitialize
            initialValues={defaultValues}
            onSubmit={(user) => {
              setIsSubmitting(true)
              dispatch({
                type: actionTypes.SET_USER_SETTINGS,
                user,
                settings: user.settings,
                callback: () => {
                  setIsSubmitting(false)
                },
              })
            }}
            component={SettingsForm}
          />
        </Paper>
      </Box>
    </>
  )
}
