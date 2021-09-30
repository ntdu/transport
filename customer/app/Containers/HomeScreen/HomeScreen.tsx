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


import {
  mapDeliveryDataToFrontEnd,
  // mapRideDataToFrontEnd
} from '@/Functions/MapDataToFrontendFunctions'
import { store } from '@/Containers/App'
import PhaseRiderActions from '@/Redux/PhaseRiderRedux'
import RideInforActions from '@/Redux/RideInforRedux'
import { SERVICE } from '@/Constants/PhaseRiderConstants'

const HomeScreen = () => {
  console.log("HomeScreen");
  console.log("----------------------------");

  const navigation = useNavigation<HomeScreenNavigationProps>()

  const dispatch = useDispatch()

  const { phaseRider } = useSelector((state: RootState) => state.phaseRider)

  const [state, dispatchPhase] = useReducer(PhaseReducer, initialState)

  const { isReady } = state

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

    temp()
  }
  const temp = () => {
    let data = {
      'originAndDestiationInfo': {
        'origin': {
          'sender': {
            'accountUsername': '0354471333',
            'address': '19/9 Trần Bình Trọng, Phường 5, Bình Thạnh, Thành phố Hồ Chí Minh',
            'dateOfBirth': '24/11/1998',
            'firstName': 'Dư',
            'gender': 'false',
            'lastName': 'Nguyễn',
            'phoneNumber': '0354471333',
            'createdDate': '30/9/2021'
          },
          'originalLng': '106.625305',
          'originalLat': '10.753171',
          'address': '19/9 Trần Bình Trọng, Phường 5, Bình Thạnh, Thành phố Hồ Chí Minh'
        },
        'list_destination': [
          {
            'phoneNumber': '0354471222',
            'name': 'Khánh Vy',
            'destinationLng': '106.625305',
            'destinationlLat': '10.753171',
            'address': '109 Lý thường kiệt, phường 3, Quận 10, Thành phố Hồ Chí Minh'
          },
          {
            'phoneNumber': '0354471223',
            'name': 'Khánh Vy',
            'destinationLng': '106.625305',
            'destinationlLat': '10.753171',
            'address': '250 Lý thường kiệt, phường 3, Quận 10, Thành phố Hồ Chí Minh'
          },
          {
            'phoneNumber': '0354471225',
            'name': 'Khánh Vy',
            'destinationLng': '106.625305',
            'destinationlLat': '10.753171',
            'address': '300 Lý thường kiệt, phường 3, Quận 10, Thành phố Hồ Chí Minh'
          }
        ],
      },
      'price': '20000',
      'rideHash': 'adfafdb',
      'package': {
        'weight': '3',
      }
    }
    // const deliveryData = mapDeliveryDataToFrontEnd(data)
    
    store.dispatch(RideInforActions.getInforDelivery(data))
    store.dispatch(PhaseRiderActions.setService(SERVICE.DELIVERY))
    store.dispatch(PhaseRiderActions.setPhaseRider(PhaseRider.GET_A_RIDE))
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
    if (isReady) {
      findCoordinates()
      // findEver30Seconds = setInterval(findCoordinates, 10000)
    }
    return () => clearInterval(findEver30Seconds)
  }, [isReady])

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
