import { getSocket, getAccessToken } from '../Socket'

// Constants
import { RIDE_COMPLETE_EVENT } from '@/Constants/SocketEventConstants'

export default (phone_number: string, rideHash: string) => {
  let Socket = getSocket()
  const token = getAccessToken()

  Socket.emit(RIDE_COMPLETE_EVENT, {
    payload: {
      token,
      data: {
        rideHash,
        phone: phone_number
      }
    }
  })
}
