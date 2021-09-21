import { getSocket, getAccessToken, getRideHash } from '../Socket'

// Constants
import { BIKER_WAITING } from '@/Constants/SocketEventConstants'

export default () => {
  let Socket = getSocket()
  const token = getAccessToken()
  const rideHash = getRideHash()

  Socket.emit(BIKER_WAITING, {
    payload: {
      token,
      data: {
        rideHash
      }
    }
  })
}
