// import messaging from '@react-native-firebase/messaging'
// import { store } from '@/Containers/App'

// // Redux
// import { useSelector } from 'react-redux'
// import { RootState } from '@/Types'
// import PhaseActions from '@/Redux/PhaseRedux'
// import NotificationActions from '@/Redux/NotificationRedux'

// // Functions
// import {
//   getAsyncStorage,
//   removeAsyncStorage
// } from '@/Functions/AsyncStorageFunctions'

// import {
//   RIDE_COMPLETE_EVENT,
//   BIKER_WAITING,
//   TOKEN_IS_NOT_AUTHENTICATED_BY_SERVER_ERROR
// } from '@/Constants/SocketEventConstants'
// import { PhaseRider } from '@/Constants/PhaseReduxConstants'
// import { RIDE_HASH } from '@/Constants/AsyncStorageKey'

// const requestUserPermissionAndGetToken = async () => {
//   const authStatus = await messaging().requestPermission()
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL
//   let fcmToken: string | undefined = ''
//   if (enabled) {
//     fcmToken = await getFCMToken()
//     if (fcmToken) {
//       return fcmToken
//     }
//   } else {
//     console.log('Not authorize message')
//   }
// }

// const getFCMToken = async () => {
//   const fcmToken = await messaging().getToken()
//   if (fcmToken) {
//     console.log('Your Firebase Token is:', fcmToken)
//     return fcmToken
//   } else {
//     console.log('Failed', 'No token received')
//   }
// }

// const getMessageOnForeground = () =>
//   messaging().onMessage((data: any) => {
//     console.log('data', data)
//     if (data) {
//       switch (data.data.event) {
//         case BIKER_WAITING:
//           store.dispatch(PhaseActions.setPhase(PhaseRider.BIKER_WAITING))
//           return
//         case RIDE_COMPLETE_EVENT:
//           store.dispatch(PhaseActions.setPhase(PhaseRider.RIDE_COMPLETE_EVENT))
//           removeAsyncStorage(RIDE_HASH)
//           return
//         default:
//           return
//       }
//     }
//   })

// const getMessageOnBackground = (phase: string) =>
//   messaging().onNotificationOpenedApp((data: any) => {
//     if (data) {
//       switch (data.data.event) {
//         case BIKER_WAITING:
//           store.dispatch(PhaseActions.setPhase(PhaseRider.BIKER_WAITING))
//           break
//         case RIDE_COMPLETE_EVENT:
//           if (phase === PhaseRider.CONFIRM_RIDE) {
//             store.dispatch(PhaseActions.setPhase(PhaseRider.BIKER_WAITING))
//           }
//           store.dispatch(PhaseActions.setPhase(PhaseRider.RIDE_COMPLETE_EVENT))
//           removeAsyncStorage(RIDE_HASH)
//           break
//         default:
//           break
//       }
//     }
//   })

// const getMessageOnQuitWithoutInteract = (rideHash: string) =>
//   store.dispatch(NotificationActions.refreshDataWithRideHash(rideHash))

// const getMessageHandlerOnBackground = (phase: string, rideHash: string) =>
//   messaging().setBackgroundMessageHandler(async (data) => {
//     if (data) {
//       switch (data.data?.event) {
//         case BIKER_WAITING:
//           store.dispatch(PhaseActions.setPhase(PhaseRider.BIKER_WAITING))
//           break
//         case RIDE_COMPLETE_EVENT:
//           if (phase === PhaseRider.CONFIRM_RIDE) {
//             store.dispatch(PhaseActions.setPhase(PhaseRider.BIKER_WAITING))
//           }

//           store.dispatch(PhaseActions.setPhase(PhaseRider.RIDE_COMPLETE_EVENT))
//           removeAsyncStorage(RIDE_HASH)
//           break
//         default:
//           break
//       }
//     }
//   })

// export {
//   getFCMToken,
//   requestUserPermissionAndGetToken,
//   getMessageHandlerOnBackground,
//   getMessageOnBackground,
//   getMessageOnForeground,
//   getMessageOnQuitWithoutInteract
// }
