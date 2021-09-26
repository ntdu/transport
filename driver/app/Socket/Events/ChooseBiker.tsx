import { getSocket } from '../Socket'

// Constants
import { BIKER_CHOSEN_EVENT } from '@/Constants/SocketEventConstants'

export default (
  accessToken: string,
  phoneNumber: string,
  rideHash: string,
  price: string,
  userAgent: string
) => {
  const Socket = getSocket()
  console.log('????', userAgent)
  Socket.emit(BIKER_CHOSEN_EVENT, {
    payload: {
      token: accessToken,
      UID: userAgent,
      data: {
        rideHash: rideHash,
        biker: phoneNumber,
        price
      }
    }
  })
}
