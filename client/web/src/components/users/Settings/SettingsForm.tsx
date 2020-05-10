import React from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  makeStyles,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import style from './UserSettings.style'
import { themes } from '../../../config/theme'

const useStyle = makeStyles(style)

type SettingsFormProps = {
  handleSubmit: (e: React.FormEvent<any>) => void
  handleChange: (e: React.ChangeEvent<any>) => void
  handleBlur: (e: any) => void
  values: { [field: string]: any }
  submitForm: () => Promise<any>
}

export const SettingsForm: React.FC<SettingsFormProps> = (
  props: SettingsFormProps
) => {
  const { handleSubmit, handleChange, values, submitForm } = props

  const classes = useStyle()
  const { t } = useTranslation()

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Box
        display="flex"
        flexDirection="row"
        p={1}
        alignContent="center"
        alignItems="center"
      >
        <Box width={1 / 2} pr={1}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="theme-label">{t('theme')}</InputLabel>
            <Select
              labelId="theme-label"
              id="theme"
              value={values.settings.theme.index}
              onChange={(evt) => {
                handleChange(evt)
                submitForm()
              }}
              label={t('theme')}
              name="settings.theme.index"
            >
              {themes.map((theme, index) => {
                const key = `_theme_${index}`
                return (
                  <MenuItem value={index} key={key}>
                    {`theme ${index + 1}`}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Box>
        <Box width={1 / 2} pl={1}>
          <FormControlLabel
            control={
              <Switch
                checked={values.settings.theme.dark}
                onChange={(evt) => {
                  handleChange(evt)
                  submitForm()
                }}
                name="settings.theme.dark"
              />
            }
            label={t('Dark mode')}
          />
        </Box>
      </Box>
    </form>
  )
}
