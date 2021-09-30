import { getSocket } from '../Socket'
import { w3cwebsocket as W3CWebSocket } from "websocket";

// Constants
import { DELIVERY_BIKER_WAITING } from '@/Constants/SocketEventConstants'

export default (token: string) => {
  let Socket = new W3CWebSocket('wss://transport-server.herokuapp.com/ws/chat/abc/');

  console.log('DELIVERY_BIKER_WAITING')
  console.log(token)

  Socket.onopen = () => {
    Socket.send(JSON.stringify({
      'type': 'DELIVERY_BIKER_WAITING',
      'message': {
        token
      }
    }));
    Socket.close()
  };
}
