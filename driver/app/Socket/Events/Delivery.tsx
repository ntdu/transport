import { getSocket } from '../Socket'

// Types
import { AddressAndCoordinates, PackageInfor, ReceiverInfor } from '@/Types'
import { w3cwebsocket as W3CWebSocket } from "websocket";

// Constants
import { DELIVERY_BOOKING } from '@/Constants/SocketEventConstants'
import { mapBikerFoundResultToFrontEnd } from '@/Functions/MapDataToFrontendFunctions'
// Redux
import { store } from '@/Containers/App'

import PhaseActions from '@/Redux/PhaseRedux'

export default (
  token: string,
  packageInfor: PackageInfor
) => {
  const Socket = getSocket()
  Socket.onopen = () => {
    Socket.send(JSON.stringify({
      'type': 'DELIVERY_BOOKING',
      'message': {
        token: token,
        data: {
          packageInfor
        }
      }
    }));
  };
  
  // Socket.onmessage = function(e: any) {
  //   if (typeof e.data === 'string') {
  //     const message = JSON.parse(e.data)['message']

  //     if (typeof message == 'object' && 'driverList' in message) {
  //       console.log(typeof message['driverList'])
  //       const driverList = message['driverList']
  //       const rideHash = '123'
  //       const dataBikers = driverList.map((biker: any) => 
  //         mapBikerFoundResultToFrontEnd(biker)
  //       )
  //       console.log(dataBikers)
  //       console.log("mapBikerFoundResultToFrontEnd OK")
  //       store.dispatch(PhaseActions.eventFoundBikerResult(dataBikers, rideHash))
  //     }

  //   }
  // };
}
