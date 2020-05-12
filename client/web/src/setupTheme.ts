import { createMuiTheme } from '@material-ui/core'

import { themes } from './config/theme'

export default (themeIndex = 0, darkMode = false) => {
  const index = themeIndex < themes.length ? themeIndex : 0
  const currentTheme = themes[index]
  const { palette: currentPalette } = currentTheme
  const theme = {
    ...currentTheme,
    palette: {
      ...currentPalette,
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.1,
    },
  }
  theme.palette.type = darkMode ? 'dark' : 'light'
  return createMuiTheme(theme)
}
