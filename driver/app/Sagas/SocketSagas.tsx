import { put, select } from 'redux-saga/effects'

// import Booking from '@/Socket/Events/Booking'
// import ChooseBiker from '@/Socket/Events/ChooseBiker'
// import ChooseBikerDelivery from '@/Socket/Events/ChooseBikerDelivery'
import Delivery from '@/Socket/Events/Delivery'
// import { initSocket, wrapperEmitSocket } from '@/Socket/Socket'
import { getUserAgent } from '@/Redux/UserRedux'

// Redux
import SocketActions from '@/Redux/SocketRedux'

// Types
import { RootState } from '@/Types'

const selectUserAgent = (state: RootState) => getUserAgent(state.user)

// export function* emitBooking({ accessToken, addressAndCoordinates }: any) {
//   try {
//     const userAgent: string = yield select(selectUserAgent)
//     yield wrapperEmitSocket(() =>
//       Booking(accessToken, addressAndCoordinates, userAgent)
//     )
//   } catch (error) {
//     console.log(error)
//   }
// }

// export function* InitSocket({ accessToken }: any) {
//   try {
//     yield initSocket(accessToken)
//   } catch (error) {
//     console.log(error)
//   }
// }

// export function* emitChooseBiker({
//   accessToken,
//   phoneNumber,
//   rideHash,
//   price
// }: any) {
//   try {
//     const userAgent: string = yield select(selectUserAgent)
//     console.log('heer', userAgent)
//     yield wrapperEmitSocket(() =>
//       ChooseBiker(accessToken, phoneNumber, rideHash, price, userAgent)
//     )
//     yield put(SocketActions.emitChooseBikerSuccess())
//   } catch (error) {
//     console.log(error)
//   }
// }

// export function* emitChooseBikerDelivery({
//   accessToken,
//   phoneNumber,
//   rideHash,
//   price
// }: any) {
//   try {
//     const userAgent: string = yield select(selectUserAgent)
//     yield wrapperEmitSocket(() =>
//       ChooseBikerDelivery(accessToken, phoneNumber, rideHash, price, userAgent)
//     )
//     yield put(SocketActions.emitChooseBikerDeliverySuccess())
//   } catch (error) {
//     console.log(error)
//   }
// }

export function* emitDelivery({
  token,
  addressAndCoordinates,
  receiverInfor,
  packageInfor
}: any) {
  try {
    const userAgent: string = yield select(selectUserAgent)
    yield Delivery(
      token,
      addressAndCoordinates,
      receiverInfor,
      packageInfor,
      userAgent
    )
    yield put(SocketActions.emitDeliverySuccess())
  } catch (error) {
    console.log(error)
  }
}
