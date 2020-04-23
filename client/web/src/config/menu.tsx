import React from 'react'
import SeriesIcon from '@material-ui/icons/StorageRounded'
import ProjectIcon from '@material-ui/icons/Collections'
import HomeIcon from '@material-ui/icons/Home'
import AlgorithmIcon from '@material-ui/icons/CameraRounded';

export default () => [
  {
    icon: <HomeIcon />,
    label: 'menu.home',
    url: '/home',
  },
  {
    icon: <ProjectIcon />,
    label: 'menu.projects',
    url: '/projects',
  },
  {
    icon: <SeriesIcon />,
    label: 'menu.series',
    url: '/series',
  },
  {
    icon: <AlgorithmIcon />,
    label: 'menu.algorithms',
    url: '/algorithms',
  },
]
