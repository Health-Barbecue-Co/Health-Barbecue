import { createStyles, Theme } from '@material-ui/core'

export default (theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
      padding: theme.spacing(1),
    },
  })
