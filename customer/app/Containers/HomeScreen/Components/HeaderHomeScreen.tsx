import React, { useContext } from 'react'
import { View, StatusBar, TouchableOpacity } from 'react-native'
import SwitchToggle from '@dooboo-ui/native-switch-toggle'

// Redux
import { useDispatch } from 'react-redux'
import PhaseRiderActions from '@/Redux/PhaseRiderRedux'

// Context
import HomeScreenContext from '../HomeScreenContext'

// Constants
import { PhaseRider } from '@/Constants/PhaseRiderConstants'

// Styles
import styles from './Styles/HeaderHomeScreenStyles'
import { Colors } from '@/Themes'
import { Action } from '../HomeScreenReducer'

// Svgs
import Power from '@/Svgs/Icons/power.svg'

const HeaderHomeScreen = () => {
  const dispatch = useDispatch()

  const isReady = useContext(HomeScreenContext)?.state.isReady

  const dispatchPhase = useContext(HomeScreenContext)?.dispatchPhase

  const toogleReady = () => {
    if (isReady) {
      dispatchPhase && dispatchPhase({ type: Action.PHASE_0 })
    }
    else {
      dispatchPhase && dispatchPhase({ type: Action.PHASE_1 })
      dispatch(PhaseRiderActions.setPhaseRider(PhaseRider.NEED_A_RIDE))
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.valhalla}
        translucent={false}
        barStyle='light-content'
      />
      <TouchableOpacity
        style={[styles.powerButton, !isReady && styles.powerOn]}
        onPress={toogleReady}
      >
        <Power width={20} height={20} />
      </TouchableOpacity>
    </View>
  )
}

export default HeaderHomeScreen
