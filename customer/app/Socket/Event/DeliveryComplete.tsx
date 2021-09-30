import { getSocket } from '../Socket'
import { w3cwebsocket as W3CWebSocket } from "websocket";

// Constants
import { DELIVERY_COMPLETE_EVENT } from '@/Constants/SocketEventConstants'

export default (
  token: string,
  rideHash: string,
  image: string,
) => {
  let Socket = new W3CWebSocket('wss://transport-server.herokuapp.com/ws/chat/abc/');
  
  Socket.onopen = () => {
    Socket.send(JSON.stringify({
      'type': 'DELIVERY_COMPLETE_EVENT',
      'message': {
        token,
        data: {
          deliveryHash: rideHash,
          deliverySuccessProof: `data:image/jpeg;base64,${image}`
        }
      }
    }));
    Socket.close()
  };
}
