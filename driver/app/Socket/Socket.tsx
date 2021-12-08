// import { io, Socket } from 'socket.io-client'
// import { getUniqueId } from 'react-native-device-info'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { mapBikerFoundResultToFrontEnd } from '@/Functions/MapDataToFrontendFunctions'
import PhaseActions from '@/Redux/PhaseRedux'

// Redux
import { store } from '@/Containers/App'
// // Redux
// import { store } from '@/Containers/App'
// import SocketActions from '@/Redux/SocketRedux'
// import RideInforActions from '@/Redux/RideInforRedux'
// import PhaseActions from '@/Redux/PhaseRedux'
// import AuthActions from '@/Redux/AuthRedux'
// import UserActions from '@/Redux/UserRedux'
import { useSelector, useDispatch } from 'react-redux'
import RideInforActions from '@/Redux/RideInforRedux'

import {
  PhaseBookingBeforeRide,
  PhaseBookingInRide,
  PhaseBookingAfterRide,
  SERVICE
} from '@/Constants/PhaseReduxConstants'

// // Constants
// import {
//   FIND_BIKER_NO_RESULTS,
//   RETRY_FIND_BIKER,
//   FOUND_BIKERS_EVENT,
//   GENERIC_ERROR,
//   RONT_RIDEHASH,
//   TOKEN_EXPIRED_ERROR,
//   TOKEN_IS_NOT_AUTHENTICATED_BY_SERVER_ERROR,
//   LOCATION_UPDATE
// } from '@/Constants/SocketEventConstants'

// // Functions
// import { requestUserPermissionAndGetToken } from '@/Functions/FCMFunctions'
// import { mapBikerFoundResultToFrontEnd } from '@/Functions/MapDataToFrontendFunctions'

// let socketIo: Socket
// let isInitSocketIo = false

// const userAgent = getUniqueId()

// export const initSocket = async (accessToken: string) => {
//   const fcmToken = await requestUserPermissionAndGetToken()

//   store.dispatch(UserActions.setUserAgent(userAgent))

//   if (!!fcmToken) {
//     isInitSocketIo = true
//     socketIo = io(`https://waybox-realtime-staging.herokuapp.com/`, {
//       path: '/socket.io',
//       transports: ['websocket'],
//       auth: {
//         token: accessToken
//       },
//       query: { fcmToken, UID: userAgent }
//     })
//     if (socketIo) {
//       store.dispatch(SocketActions.initSocketSuccess())
//       startListening()
//     } else {
//       store.dispatch(SocketActions.initSocketError())
//     }
//   }
// }
let client: any
// let isInitSocketIo = false

export const initSocket = async () => {
  client = new W3CWebSocket('wss://transport-server.herokuapp.com/ws/chat/abc/');
  startListening()
}

export const getSocket = () => {
  return client
}

export const wrapperEmitSocket = (EmitFunction: () => void) => {
  EmitFunction()
}

export const startListening = () => {
  const Socket = getSocket()
  

  Socket.onmessage = function(e: any) {
    if (typeof e.data === 'string') {
      const type = JSON.parse(e.data)['message']['type']
      const data = JSON.parse(e.data)['message']['data']
      console.log(type)
      const time = Date.now()
      switch (type) {
        case 'ready':
          console.log('ready')
          break
        
        case 'DELIVERY_BOOKING':
          const rideHash = '123'
          const dataBikers = data.map((biker: any) => 
            mapBikerFoundResultToFrontEnd(biker)
          )
          store.dispatch(PhaseActions.eventFoundBikerResult(dataBikers, rideHash))

          break
        
        case 'DELIVERY_BIKER_CHOSEN_EVENT':
          console.log('DELIVERY_BIKER_CHOSEN_EVENT')
          console.log(data)
          break
        
        case 'DELIVERY_CONFIRMED_EVENT':
          store.dispatch(RideInforActions.setPhaseRide(PhaseBookingInRide.CONFIRM_RIDE, time))
          break

        case 'DELIVERY_BIKER_WAITING':
          store.dispatch(RideInforActions.setPhaseRide(PhaseBookingInRide.BIKER_WAITING, time))
          break

        case 'BIKER_RECEIVED_PACKAGE':
          store.dispatch(RideInforActions.setPhaseRide(PhaseBookingInRide.BIKER_RECEIVED_PACKAGE, time))
          break

        case 'DELIVERY_COMPLETE_EVENT':
          store.dispatch(RideInforActions.setPhaseRide(PhaseBookingAfterRide.RIDE_COMPLETE_EVENT, time))
          break

        default:
          console.log("don't match")
      }
    }
  };
}