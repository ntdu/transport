import React, { useEffect, useReducer } from 'react'
import { Platform } from 'react-native'
import Geolocation from 'react-native-geolocation-service'

// Navigation
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { MainStackParams } from '@/Navigation/AppNavigationType'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import SocketActions from '@/Redux/SocketRedux'
import { RootState } from '@/Types'

// Context
import HomeScreenContext from './HomeScreenContext'

// Phase Reducer
import PhaseReducer, { Action, initialState } from './HomeScreenReducer'

// Components
import { HeaderHomeScreen, RenderPhaseHomeScreen } from './Components'

// Functions
import {
  checkDeviceLocationPermissionAndroid,
  checkDeviceLocationPermissionIOS
} from '@/Functions/AppPermissionFunctions'

// Constants
import { PhaseRider } from '@/Constants/PhaseRiderConstants'

// Styles
import { RAlert } from '@/Functions/AlertFunctions'

// Language
import { translate } from '@/Language'

type HomeScreenNavigationProps = StackNavigationProp<
  MainStackParams,
  'TabScreen'
>

const HomeScreen = () => {
  console.log("HomeScreen");
  console.log("----------------------------");

  const navigation = useNavigation<HomeScreenNavigationProps>()

  const dispatch = useDispatch()

  const { phaseRider } = useSelector((state: RootState) => state.phaseRider)

  const [state, dispatchPhase] = useReducer(PhaseReducer, initialState)

  const { isPower, isReady } = state

  // const cancleReadyPhase = () => dispatchPhase({ type: Action.PHASE_0 })

  const findCoordinates = () => {
    // Geolocation.getCurrentPosition(
    //   (position) => {
    //     const { longitude, latitude } = position.coords
    //     console.log(longitude);
    //     console.log(latitude);
    //     dispatch(SocketActions.emitHeartBeat(longitude, latitude))
    //   },
    //   () => {
    //     console.log("RAlert")
    //     // RAlert({
    //     //   title: translate('errorLocation'),
    //     //   content: translate('errorLocationContent'),
    //     //   onPressOK: cancleReadyPhase,
    //     //   onPressCancel: cancleReadyPhase
    //     // })
    //   },
    //   {
    //     enableHighAccuracy: true
    //   }
    // )

    dispatch(SocketActions.emitHeartBeat('106.625305', '10.753171'))
  }

  const navigateToRideScreen = () => {
    console.log("navigateToRideScreen");
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'RideScreen'
        }
      ]
    })
  }

  useEffect(() => {
    let findEver30Seconds: NodeJS.Timeout
    if (isPower && isReady) {
      console.log("isPower && isReady");
      console.log("--------------------------------");
      findCoordinates()
      // findEver30Seconds = setInterval(findCoordinates, 10000)
    }
    return () => clearInterval(findEver30Seconds)
  }, [isPower, isReady])

  useEffect(() => {
    phaseRider === PhaseRider.GET_A_RIDE && navigateToRideScreen()
  }, [phaseRider])

  useEffect(() => {
    dispatch(SocketActions.initSocket())
    Platform.OS === 'android'
      ? checkDeviceLocationPermissionAndroid()
      : checkDeviceLocationPermissionIOS()
  }, [])

  return (
    <HomeScreenContext.Provider value={{ state, dispatchPhase }}>
      <RenderPhaseHomeScreen />
      <HeaderHomeScreen />
    </HomeScreenContext.Provider>
  )
}
export default HomeScreen
