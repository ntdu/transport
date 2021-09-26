import { getSocket } from '../Socket'

// Types
import { AddressAndCoordinates, PackageInfor, ReceiverInfor } from '@/Types'
import { w3cwebsocket as W3CWebSocket } from "websocket";

// Constants
import { DELIVERY_BOOKING } from '@/Constants/SocketEventConstants'

export default (
  token: string,
  addressAndCoordinates: AddressAndCoordinates,
  receiverInfor: ReceiverInfor,
  packageInfor: any,
  userAgent: string
) => {
  console.log('test')
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

  // Socket.emit(DELIVERY_BOOKING, {
  //   payload: {
  //     token: accessToken,
  //     UID: userAgent,
  //     data: {
  //       coordinates: {
  //         origin: {
  //           lng: originalLng,
  //           lat: originalLat
  //         },
  //         destination: {
  //           lng: 106.6253054,
  //           lat: 10.7531708
  //         }
  //       },
  //       address: {
  //         origin: addressOriginalLocation,
  //         destination:
  //           '268 Lý Thường Kiệt, Phường 10, Quận Tân Bình, TP Hồ Chí Minh'
  //       },
  //       receiver: {
  //         phone: phoneNumber,
  //         name: name
  //       },
  //       package: {
  //         senderProof: `data:image/jpeg;base64,${senderProof}`,
  //         weight: weight,
  //         category: category
  //       }
  //     }
  //   }
  // })

  Socket.onopen = () => {
    console.log('WebSocket Client Connected');
    console.log(token);
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

  Socket.onmessage = function(e) {
    console.log(e)
    // if (typeof e.data === 'string') {
    //     console.log("Received: '" + e.data + "'");
    // }
  };
}
