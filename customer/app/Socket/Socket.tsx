import { io, Socket } from 'socket.io-client'

// Redux
import { store } from '@/Containers/App'
import SocketActions from '@/Redux/SocketRedux'
import PhaseRiderActions from '@/Redux/PhaseRiderRedux'
import RideInforActions from '@/Redux/RideInforRedux'
import AuthActions from '@/Redux/AuthRedux'
import { w3cwebsocket as W3CWebSocket } from "websocket";

// Functions
import { requestUserPermissionAndGetToken } from '@/Functions/FCMToken'
import {
  mapDeliveryDataToFrontEnd,
  // mapRideDataToFrontEnd
} from '@/Functions/MapDataToFrontendFunctions'

// Constants
// import {
//   BIKER_CHOSEN_EVENT,
//   TOKEN_EXPIRED_ERROR,
//   TOKEN_IS_NOT_AUTHENTICATED_BY_SERVER_ERROR
// } from '@/Constants/SocketEventConstants'
import { PhaseRider, SERVICE } from '@/Constants/PhaseRiderConstants'

let socketIo: Socket
let isInitSocketIo = false

let token: string
let isGetToken = false

export const accessToken = () => {
  const state: any = store.getState()
  return state.auth.accessToken
}

// export const initSocket = async () => {
//   token = accessToken()
//   isGetToken = true

//   const fcmToken = await requestUserPermissionAndGetToken()

//   if (!!fcmToken) {
//     isInitSocketIo = true
//     socketIo = io(`https://waybox-realtime-staging.herokuapp.com/`, {
//       path: '/socket.io',
//       transports: ['websocket'],
//       auth: {
//         token
//       },
//       query: { fcmToken }
//     })
//     if (socketIo) {
//       store.dispatch(SocketActions.initSocketSuccess())
//       startListening()
//     } else {
//       store.dispatch(SocketActions.initSocketError())
//     }
//   }
// }
let socket: any;
export const initSocket = () => {
  socket = new W3CWebSocket('wss://transport-server.herokuapp.com/ws/chat/abc/');
  startListening()
}

export const getRideHash = () => {
  const state: any = store.getState()
  return state.socket.rideHash
}

export const getSocket = () => {
  return socket
}

export const getAccessToken = () => {
  if (!isGetToken) {
    throw 'Can not find token'
  }
  return token
}

export const getToken = () => {
  const state: any = store.getState()
  return state.auth.token
}

export const wrapperEmitSocket = (EmitFunction: () => void) => {
  console.log("wrapperEmitSocket")
  console.log("------------------------------")
  // let socketIo = getSocket()
  // let isRetrying = false
  EmitFunction()
  // const state: any = store.getState()

  // socketIo.onAny(async (event, __) => {
  //   if (isRetrying) {
  //     return
  //   }
  //   switch (event) {
  //     case TOKEN_IS_NOT_AUTHENTICATED_BY_SERVER_ERROR:
  //       store.dispatch(
  //         AuthActions.refreshTokenFailure(
  //           TOKEN_IS_NOT_AUTHENTICATED_BY_SERVER_ERROR
  //         )
  //       )
  //       return
  //     case TOKEN_EXPIRED_ERROR:
  //       const userName = state.auth.userName
  //       const refreshToken = state.auth.refreshToken
  //       store.dispatch(AuthActions.refreshTokenRequest(userName, refreshToken))
  //       break
  //     default:
  //       return
  //   }
  //   EmitFunction()
  //   isRetrying = true
  // })
}

export const startListening = () => {
  const Socket = getSocket()

  Socket.onmessage = function(e: any) {
    if (typeof e.data === 'string') {
      const type = JSON.parse(e.data)['message']['type']
      const data = JSON.parse(e.data)['message']['data']

      if (type == 'DELIVERY_BOOKING') {
        
      }
      switch (type) {
        case 'ready':
          console.log('ready')
          break
        
        case 'BIKER_WAITING_SUCCESS':
          console.log('BIKER_WAITING_SUCCESS')
          // // const driverList = data['driverList']
          // const rideHash = '123'
          // const dataBikers = data.map((biker: any) => 
          //   mapBikerFoundResultToFrontEnd(biker)
          // )
          // store.dispatch(PhaseActions.eventFoundBikerResult(dataBikers, rideHash))

          break
        
        case 'DELIVERY_BIKER_CHOSEN_EVENT':
          console.log('DELIVERY_BIKER_CHOSEN_EVENT')
          console.log(data)
          console.log("----------------------------------------")
          // const deliveryData = mapDeliveryDataToFrontEnd(data)

          store.dispatch(RideInforActions.getInforDelivery(data))
          store.dispatch(PhaseRiderActions.setService(SERVICE.DELIVERY))
          store.dispatch(PhaseRiderActions.setPhaseRider(PhaseRider.GET_A_RIDE))
          
          break

        case 'DELIVERY_CONFIRMED_EVENT':
          console.log('DELIVERY_CONFIRMED_EVENT')
          console.log(data)
            
          break
        default:
          console.log("don't match")
      }
    }
  };
}
// export const startListening = () => {
//   const socketIo = getSocket()
//   socketIo.onAny(async (event, ...args) => {
//     const socketEvent = args[0].event
//     const payload = args[0].payload

//     switch (socketEvent) {
//       case 'ready':
//         console.log('ready')
//       case BIKER_CHOSEN_EVENT:
//         store.dispatch(SocketActions.listenChooseBiker(payload))
//         store.dispatch(PhaseRiderActions.setPhaseRider(PhaseRider.GET_A_RIDE))
//         return
//       case 'found_bikers':
//         console.log('pay', payload)
//         break
//       case 'error':
//         console.log('er', payload)
//         break
//       default:
//         return
//     }
//   })
// }
