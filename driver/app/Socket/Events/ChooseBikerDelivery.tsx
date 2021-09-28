import { getSocket, startListening } from '../Socket'
import { w3cwebsocket as W3CWebSocket } from "websocket";

// Constants
import { DELIVERY_BIKER_CHOSEN_EVENT } from '@/Constants/SocketEventConstants'

export default (
  token: string,
  phoneNumber: string,
  rideHash: string,
  price: number,
  userAgent: string
) => {
  // const Socket = getSocket()
  // console.log(Socket)
  console.log("DELIVERY_BIKER_CHOSEN_EVENT")
  console.log("------------------------")
  const Socket = new W3CWebSocket('wss://transport-server.herokuapp.com/ws/chat/abc/');
  // const Socket = getSocket()
  // Socket.emit(DELIVERY_BIKER_CHOSEN_EVENT, {
  //   payload: {
  //     token: token,
  //     UID: userAgent,
  //     data: {
  //       deliveryHash: rideHash,
  //       biker: phoneNumber,
  //       price
  //     }
  //   }
  // })

  Socket.onopen = () => {
    Socket.send(JSON.stringify({
      'type': 'DELIVERY_BIKER_CHOSEN_EVENT',
      'message': {
        token: token,
        // UID: userAgent,
        data: {
          deliveryHash: rideHash,
          biker: phoneNumber,
          price
        }
      }
    }));
  }
}
