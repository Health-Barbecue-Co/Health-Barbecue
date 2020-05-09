import React, { ReactNode, Fragment } from 'react'
import {
  makeStyles,
  Toolbar as ToolbarCore,
  Typography,
} from '@material-ui/core'

import style from './Toolbar.style'

const useStyle = makeStyles(style)

type ToolbarProps = {
  label: string
  rightActions?: ReactNode[]
  leftActions?: ReactNode[]
}

export const Toolbar: React.FC<ToolbarProps> = (props: ToolbarProps) => {
  const { label, rightActions, leftActions } = props
  const classes = useStyle()

  return (
    <ToolbarCore className={classes.toolbar}>
      {leftActions
        ? leftActions.map((elt, idx) => (
            <Fragment key={`toolbar-leftAction-${idx + 1}`}>{elt}</Fragment>
          ))
        : null}
      <Typography variant="h6" className={classes.title}>
        {label}
      </Typography>
      {rightActions
        ? rightActions.map((elt, idx) => (
            <Fragment key={`toolbar-rightAction-${idx + 1}`}>{elt}</Fragment>
          ))
        : null}
    </ToolbarCore>
  )
}
