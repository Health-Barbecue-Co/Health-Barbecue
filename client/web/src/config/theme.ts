import secondary from '@material-ui/core/colors/lightBlue'

import { ThemeOptions } from '@material-ui/core'
import theme1 from './theme/theme1.json'

export const themes: ThemeOptions[] = [
  theme1 as ThemeOptions,
  {
    palette: {
      secondary,
    },
  },
]
