import { getSocket } from '../Socket'
import { w3cwebsocket as W3CWebSocket } from "websocket";

// Constants
import { BIKER_RECEIVED_PACKAGE } from '@/Constants/SocketEventConstants'

export default (
  token: string,
  rideHash: string,
  image: string
) => {
  let Socket = new W3CWebSocket('wss://transport-server.herokuapp.com/ws/chat/abc/');

  Socket.onopen = () => {
    Socket.send(JSON.stringify({
      'type': 'BIKER_RECEIVED_PACKAGE',
      'message': {
        token: token,
        data: {
          deliveryHash: rideHash,
          bikerReceivedPackageProof: `data:image/jpeg;base64,${image}`
        }
      }
    }));
    Socket.close()
  };

  
}
