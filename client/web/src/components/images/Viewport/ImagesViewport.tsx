import React from 'react'
import { Box, makeStyles } from '@material-ui/core'
import CornerstoneViewport from 'react-cornerstone-viewport'

import style from './ImagesViewport.Style'

const useStyle = makeStyles(style)

export const ImagesViewport: React.FC = () => {
  const classes = useStyle()
  const state = {
    tools: [
      // Mouse
      {
        name: 'Wwwc',
        mode: 'active',
        modeOptions: { mouseButtonMask: 1 },
      },
      {
        name: 'Zoom',
        mode: 'active',
        modeOptions: { mouseButtonMask: 2 },
      },
      {
        name: 'Pan',
        mode: 'active',
        modeOptions: { mouseButtonMask: 4 },
      },
      // Scroll
      { name: 'StackScrollMouseWheel', mode: 'active' },
      // Touch
      { name: 'PanMultiTouch', mode: 'active' },
      { name: 'ZoomTouchPinch', mode: 'active' },
      { name: 'StackScrollMultiTouch', mode: 'active' },
    ],
    imageIds: [
      'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm',
      'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.12.dcm',
    ],
  }

  return (
    <Box flex={1} display="flex" flexDirection="column">
      <CornerstoneViewport
        tools={state.tools}
        imageIds={state.imageIds}
        className={classes.root}
      />
    </Box>
  )
}
