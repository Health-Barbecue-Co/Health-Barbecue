import React, { useEffect, useState, useCallback } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import CornerstoneViewport from 'react-cornerstone-viewport'

import style from './ImagesViewport.Style'
import { SeriesService } from '../../../features/series'

const useStyle = makeStyles(style)

type ImagesViewportProps = {
  seriesInstanceUID: string
}

export const ImagesViewport: React.FC<ImagesViewportProps> = (
  props: ImagesViewportProps
) => {
  const { seriesInstanceUID } = props
  const classes = useStyle()
  const [instancesURI, setInstancesURI] = useState<string[]>([])

  const getImageURIs = useCallback(async () => {
    const uris = await SeriesService.getInstanceUrls(seriesInstanceUID)
    setInstancesURI(uris)
  }, [seriesInstanceUID])

  useEffect(() => {
    getImageURIs()
  }, [seriesInstanceUID, getImageURIs])

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
    imageIds: instancesURI,
  }

  return (
    <Box flex={1} display="flex" flexDirection="column">
      {state.imageIds.length !== 0 ? (
        <CornerstoneViewport
          tools={state.tools}
          imageIds={state.imageIds}
          className={classes.root}
        />
      ) : null}
    </Box>
  )
}
