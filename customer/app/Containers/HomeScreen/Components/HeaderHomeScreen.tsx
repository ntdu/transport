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

  const isPower = useContext(HomeScreenContext)?.state.isPower
  const isReady = useContext(HomeScreenContext)?.state.isReady

  const dispatchPhase = useContext(HomeScreenContext)?.dispatchPhase

  const tooglePower = () => {
    if (isPower) {
      dispatchPhase && dispatchPhase({ type: Action.PHASE_0 })
      dispatch(PhaseRiderActions.setPhaseRider(PhaseRider.NEED_A_RIDE))
    } else {
      dispatchPhase && dispatchPhase({ type: Action.PHASE_1 })
    }
  }

  const toogleReady = () => {
    if (isPower) {
      if (!isReady) {
        dispatchPhase && dispatchPhase({ type: Action.PHASE_2 })
      } else {
        dispatchPhase && dispatchPhase({ type: Action.PHASE_1 })
      }
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.valhalla}
        translucent={false}
        barStyle='light-content'
      />
      <View style={styles.blankView} />

      <TouchableOpacity
        style={[styles.powerButton, !isPower && styles.powerOn]}
        onPress={tooglePower}
      >
        <Power width={20} height={20} />
      </TouchableOpacity>

      <SwitchToggle
        containerStyle={styles.switchView}
        circleStyle={styles.circle}
        switchOn={isReady}
        onPress={toogleReady}
        circleColorOff={Colors.whisper}
        circleColorOn={Colors.whisper}
        backgroundColorOn={Colors.screaminGreen}
        backgroundColorOff={Colors.silver}
        duration={400}
      />
    </View>
  )
}

export default HeaderHomeScreen
