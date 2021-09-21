import { io, Socket } from 'socket.io-client'

// Redux
import { store } from '@/Containers/App'
import SocketActions from '@/Redux/SocketRedux'
import PhaseRiderActions from '@/Redux/PhaseRiderRedux'
import AuthActions from '@/Redux/AuthRedux'

// Functions
import { requestUserPermissionAndGetToken } from '@/Functions/FCMToken'

// Constants
// import {
//   BIKER_CHOSEN_EVENT,
//   TOKEN_EXPIRED_ERROR,
//   TOKEN_IS_NOT_AUTHENTICATED_BY_SERVER_ERROR
// } from '@/Constants/SocketEventConstants'
import { PhaseRider } from '@/Constants/PhaseRiderConstants'

let socketIo: Socket
let isInitSocketIo = false

let token: string
let isGetToken = false

export const accessToken = () => {
  const state: any = store.getState()
  return state.auth.accessToken
}

export const initSocket = async () => {
  console.log("initSocket")
  console.log("----------------------------------------")
  // token = accessToken()
  // isGetToken = true

  // const fcmToken = await requestUserPermissionAndGetToken()

  // if (!!fcmToken) {
  //   isInitSocketIo = true
  //   socketIo = io(`https://waybox-realtime-staging.herokuapp.com/`, {
  //     path: '/socket.io',
  //     transports: ['websocket'],
  //     auth: {
  //       token
  //     },
  //     query: { fcmToken }
  //   })
  //   if (socketIo) {
  //     store.dispatch(SocketActions.initSocketSuccess())
  //     startListening()
  //   } else {
  //     store.dispatch(SocketActions.initSocketError())
  //   }
  // }
}

export const getRideHash = () => {
  const state: any = store.getState()
  return state.socket.rideHash
}

// export const initSocket = () => {
//   token = accessToken()
//   isGetToken = true

//   isInitSocketIo = true
//   socketIo = io(`http://${IP_ADDRESS}:3000`, {
//     path: '/socket.io',
//     transports: ['websocket'],
//     auth: {
//       token
//     }
//   })
// }

export const getSocket = () => {
  if (!isInitSocketIo) {
    throw 'Socket is not ready'
  }
  return socketIo
}

export const getAccessToken = () => {
  if (!isGetToken) {
    throw 'Can not find token'
  }
  return token
}

export const wrapperEmitSocket = (EmitFunction: () => void) => {
  console.log("wrapperEmitSocket")
  console.log("------------------------------")
  // let socketIo = getSocket()
  // let isRetrying = false
  // EmitFunction()
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
