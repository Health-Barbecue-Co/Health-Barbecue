import { Theme, createStyles } from '@material-ui/core'

export default (theme: Theme) =>
  createStyles({
    toolbar: {
      background: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
    title: {
      flexGrow: 1,
    },
  })
