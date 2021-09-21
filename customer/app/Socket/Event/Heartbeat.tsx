import { getSocket, getAccessToken } from '../Socket'

export default (longitude: number, latitude: number) => {
  let Socket = getSocket()
  const token = getAccessToken()

  Socket.emit('heartbeat', {
    payload: {
      token,
      data: {
        coordinates: [longitude, latitude]
      }
    }
  })
}
