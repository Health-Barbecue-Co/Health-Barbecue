import { createStyles, Theme } from '@material-ui/core'

export default (theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    tableContainer: {
      padding: theme.spacing(1),
    },
  })
