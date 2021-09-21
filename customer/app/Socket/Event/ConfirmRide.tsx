import { getSocket, getAccessToken } from '../Socket'

// Constants
import { RIDE_CONFIRMED_EVENT } from '@/Constants/SocketEventConstants'

export default (customer: string, rideHash: string) => {
  let Socket = getSocket()
  const token = getAccessToken()

  Socket.emit(RIDE_CONFIRMED_EVENT, {
    payload: {
      token,
      data: {
        customer,
        rideHash
      }
    }
  })
}
