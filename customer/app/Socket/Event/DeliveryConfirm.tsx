import { getSocket } from '../Socket'
import { w3cwebsocket as W3CWebSocket } from "websocket";

// Constants
import { DELIVERY_CONFIRMED_EVENT } from '@/Constants/SocketEventConstants'

export default (
  token: string,
  customer: string,
  rideHash: string
) => {
  // let Socket = getSocket()

  console.log('rei', rideHash)
  console.log('ss', customer)

  // Socket.emit(DELIVERY_CONFIRMED_EVENT, {
  //   payload: {
  //     token: token,
  //     data: {
  //       customer,
  //       deliveryHash: rideHash
  //     }
  //   }
  // })

  let Socket = new W3CWebSocket('wss://transport-server.herokuapp.com/ws/chat/abc/');
  
  Socket.onopen = () => {
    Socket.send(JSON.stringify({
      'type': 'DELIVERY_CONFIRMED_EVENT',
      'message': {
        token,
        data: {
          customer
        }
      }
    }));
    Socket.close()
  };
}
