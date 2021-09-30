import Heartbeat from '@/Socket/Event/Heartbeat'
import { initSocket, wrapperEmitSocket } from '@/Socket/Socket'
import ConfirmRide from '@/Socket/Event/ConfirmRide'
import CancelRide from '@/Socket/Event/CancelRide'
import BikerWaiting from '@/Socket/Event/BikerWaiting'
import CompleteRide from '@/Socket/Event/CompleteRide'
import ConfirmDelivery from '@/Socket/Event/DeliveryConfirm'
import DeliveryBikerWaiting from '@/Socket/Event/DeliveryBikerWaiting'
import BikerReceivedPackage from '@/Socket/Event/BikerReceivedPackage'
import DeliveryComplete from '@/Socket/Event/DeliveryComplete'


export function* emitHeartBeat({ longitude, latitude }: any) {
  try {
    // Notify current location to server
    yield wrapperEmitSocket(() => Heartbeat(longitude, latitude))
  } catch (error) {
    console.log(error) // yield emit error here
  }
}

export function* InitSocket() {
  try {
    yield initSocket()
  } catch (error) {
    console.log(error) // yield emit error here
  }
}

export function* emitConfirmRide({ customer, rideHash }: any) {
  try {
    yield wrapperEmitSocket(() => ConfirmRide(customer, rideHash))
  } catch (error) {
    console.log(error) // yield emit error here
  }
}

export function* emitCancelRide({ customer, rideHash }: any) {
  try {
    yield wrapperEmitSocket(() => CancelRide(customer, rideHash))
  } catch (error) {
    console.log(error) // yield emit error here
  }
}

export function* emitBikerWaiting() {
  try {
    yield wrapperEmitSocket(() => BikerWaiting())
  } catch (error) {
    console.log(error) // yield emit error here
  }
}

export function* emitCompleteRide({ phone_number, rideHash }: any) {
  try {
    yield wrapperEmitSocket(() => CompleteRide(phone_number, rideHash))
  } catch (error) {
    console.log(error) // yield emit error here
  }
}

export function* emitConfirmDelivery({ token, customer, rideHash }: any) {
  try {
    // const userAgent: string = yield select(selectUserAgent)
    yield wrapperEmitSocket(() =>
      ConfirmDelivery(token, customer, rideHash)
    )
  } catch (error) {
    console.log(error) // yield emit error here
  }
}

export function* emitDeliveryBikerWaiting({ token }: any) {
  try {
    // const userAgent: string = yield select(selectUserAgent)
    yield wrapperEmitSocket(() =>
      DeliveryBikerWaiting(token)
    )
  } catch (error) {
    console.log(error) // yield emit error here
  }
}

export function* emitBikerReceivedPackage({
  token,
  rideHash,
  image
}: any) {
  try {
    // const userAgent: string = yield select(selectUserAgent)
    yield wrapperEmitSocket(() =>
      BikerReceivedPackage(token, rideHash, image)
    )
  } catch (error) {
    console.log(error) // yield emit error here
  }
}

export function* emitCompleteDelivery({ token, rideHash, image }: any) {
  try {
    // const userAgent: string = yield select(selectUserAgent)
    yield wrapperEmitSocket(() =>
      DeliveryComplete(token, rideHash, image)
    )
  } catch (error) {
    console.log(error) // yield emit error here
  }
}