import React from 'react'
import CollectionIcon from '@material-ui/icons/Collections'
import StudiesIcon from '@material-ui/icons/CollectionsBookmark'
import HomeIcon from '@material-ui/icons/Home'

export default () => [
  {
    icon: <HomeIcon />,
    label: 'menu.home',
    url: '/home',
  },
  {
    icon: <StudiesIcon />,
    label: 'menu.studies',
    url: '/studies',
  },
  {
    icon: <CollectionIcon />,
    label: 'menu.series',
    url: '/series',
  },
]
