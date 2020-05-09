import React from 'react'
import SeriesIcon from '@material-ui/icons/StorageRounded'
import ProjectIcon from '@material-ui/icons/Collections'
import HomeIcon from '@material-ui/icons/Home'
import AlgorithmIcon from '@material-ui/icons/CameraRounded'

export default () => [
  {
    icon: <HomeIcon id="home-icon"/>,
    label: 'menu.home',
    url: '/home',
  },
  {
    icon: <ProjectIcon id="project-icon"/>,
    label: 'menu.projects',
    url: '/projects',
  },
  {
    icon: <SeriesIcon  id="series-icon"/>,
    label: 'menu.series',
    url: '/series',
  },
  {
    icon: <AlgorithmIcon  id="algorithm-icon"/>,
    label: 'menu.algorithms',
    url: '/algorithms',
  },
]
