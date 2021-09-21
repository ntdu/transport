import Heartbeat from '@/Socket/Event/Heartbeat'
import { initSocket, wrapperEmitSocket } from '@/Socket/Socket'
import ConfirmRide from '@/Socket/Event/ConfirmRide'
import CancelRide from '@/Socket/Event/CancelRide'
import BikerWaiting from '@/Socket/Event/BikerWaiting'
import CompleteRide from '@/Socket/Event/CompleteRide'

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
