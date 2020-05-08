import React, { useEffect, useState } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import CornerstoneViewport from 'react-cornerstone-viewport'
import axios from 'axios'

import style from './ImagesViewport.Style'

const useStyle = makeStyles(style)

type ImagesViewportProps = {
  seriesInstanceUID: string
}

export const ImagesViewport: React.FC<ImagesViewportProps> = (props: ImagesViewportProps) => {
  const classes = useStyle()
  const [instancesURI, setInstancesURI] = useState<string[]>([])

  const getAllInstancesURI = () => {
    axios.get(`/orthanc/dicom-web/instances?SeriesInstanceUID=${props.seriesInstanceUID}`).then((response) => {
      const arrayOfInstance = response.data;
      arrayOfInstance.sort((instance1: any, instance2: any) => {
        return instance1["00200013"]['Value'][0] - instance2["00200013"]['Value'][0];
      })
      const arrayOfInstancesURI: string[] = arrayOfInstance.map((instance: any )=> {
        const objectUID = instance["00080018"]['Value'][0];
        const transferSyntax = instance["00080016"]['Value'][0];
        return `wadouri:/orthanc/wado?requestType=WADO&objectUID=${objectUID}&contentType=application%2Fdicom&transferSyntax=${transferSyntax}`;
      });
      setInstancesURI(arrayOfInstancesURI);
    })
  }
  
  useEffect(() => {
    getAllInstancesURI();
  }, [])

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
    // http://localhost:8042/instances/4640bd76-e07eced4-b4621273-ddad479f-40500e91/preview
    imageIds: instancesURI,
  }

  return (
    <Box flex={1} display="flex" flexDirection="column">
      {
        state.imageIds.length !== 0
        ? <CornerstoneViewport
          tools={state.tools}
          imageIds={state.imageIds}
          className={classes.root}
        />
        : null
      }

    </Box>
  )
}
