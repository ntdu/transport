import { getSocket, getToken } from '../Socket'
import { w3cwebsocket as W3CWebSocket } from "websocket";

export default (longitude: number, latitude: number) => {
  // let Socket = getSocket()
  let Socket = new W3CWebSocket('wss://transport-server.herokuapp.com/ws/chat/abc/');
  const token = getToken()
  console.log("Heartbeat")

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

  // Socket.onmessage = function(e: any) {
  //   console.log(e)
  //   // if (typeof e.data === 'string') {
  //   //     console.log("Received: '" + e.data + "'");
  //   // }
  // };
}
