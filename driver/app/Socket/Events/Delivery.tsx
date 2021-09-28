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
  addressAndCoordinates: AddressAndCoordinates,
  receiverInfor: ReceiverInfor,
  packageInfor: any,
  userAgent: string
) => {
  console.log('-------------------------------------------------------------')
  const Socket = getSocket()

  const { address, coordinates } = addressAndCoordinates

  const { addressDestination, addressOriginalLocation } = address
  const {
    originalLat,
    originalLng,
    destinationLng,
    destinationLat
  } = coordinates

  const { phoneNumber, name } = receiverInfor

  const { senderProof, weight, category } = packageInfor

  Socket.onopen = () => {
    Socket.send(JSON.stringify({
      'type': 'DELIVERY_BOOKING',
      'message': {
        token: token,
        UID: userAgent,
        data: {
          coordinates: {
            origin: {
              lng: originalLng,
              lat: originalLat
            },
            destination: {
              lng: 106.6253054,
              lat: 10.7531708
            }
          },
          address: {
            origin: addressOriginalLocation,
            // origin: '19/9 Trần Bình Trọng, Phường 5, Quận Bình Thạnh, TP Hồ Chí Minh',
            destination:
              '268 Lý Thường Kiệt, Phường 10, Quận Tân Bình, TP Hồ Chí Minh'
          },
          receiver: {
            phone: phoneNumber,
            name: name
          },
          package: {
            senderProof: `data:image/jpeg;base64,${senderProof}`,
            weight: weight,
            category: category
          }
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
