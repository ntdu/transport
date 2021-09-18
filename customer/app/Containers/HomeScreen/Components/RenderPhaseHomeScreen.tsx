import React, { useContext } from 'react'

// Context
import HomeScreenContext from '../HomeScreenContext'

// Components
import OfflineMode from './OfflineMode'
import Notification from './Notification'

const RenderPhaseHomeScreen = () => {
  const phase = useContext(HomeScreenContext)?.state.phase

  switch (phase) {
    case 0:
      return <OfflineMode />
    case 1:
      return <Notification />
    case 2:
      return <Notification />
    default:
      return <></>
  }
}

export default RenderPhaseHomeScreen
