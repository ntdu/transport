import { getSocket, getToken } from '../Socket'

export default (longitude: number, latitude: number) => {
  let Socket = getSocket()
  const token = getToken()
  console.log("Heartbeat")

  // Socket.emit('heartbeat', {
  //   payload: {
  //     token,
  //     data: {
  //       coordinates: [longitude, latitude]
  //     }
  //   }
  // })
  console.log(token)
  console.log(longitude)
  console.log(latitude)
  Socket.onopen = () => {
    console.log('WebSocket Client Connected');
    Socket.send(JSON.stringify({
      'type': 'BIKER_WAITING',
      'message': {
        token,
        data: {
          coordinates: {
            longitude: longitude,
            latitude: latitude
          }
        }
      }
    }));
    
  };

  Socket.onmessage = function(e) {
    console.log(e)
    // if (typeof e.data === 'string') {
    //     console.log("Received: '" + e.data + "'");
    // }
  };
}
