import { createStyles, Theme } from '@material-ui/core'

export default (theme: Theme) =>
  createStyles({
    labelItem: {
      padding: theme.spacing(1),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  })
