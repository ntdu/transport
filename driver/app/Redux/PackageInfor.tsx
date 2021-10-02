import { createReducer, createActions } from 'reduxsauce'
import Immutable, { asMutable } from 'seamless-immutable'

// Types
import { PackageInfor, PackageState } from '@/Types/RootState'
import {
  PhaseBookingAfterRide,
  PhaseBookingInRide
} from '@/Constants/PhaseReduxConstants'
import {
  mapDataUserToFrontEnd,
  mapDeliveryStateAfterRefresh
} from '@/Functions/MapDataToFrontendFunctions'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setPackageInfor: ['packageInfor'],
  setDestination: ['destinationInfor']
  // setPhasePackage: ['phase', 'index', 'time'],

  // setLocationByMapDelivery: ['addressAndCoordinates', 'index'],

  // setBikerAndRideHashDelivery: ['biker', 'rideHash', 'index'],

  // setPriceDelivery: ['price', 'index'],

  // refreshDeliveryDataAfterQuit: ['deliveryDatas']
})

export const PackageInforTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE: Immutable.ImmutableObject<PackageInfor> = Immutable(
  {
    weight: 0,
    senderProof: null,
    originAndDestiationInfo: {
      origin: {
        originalLat: undefined,
        originalLng: undefined,
        address: undefined,
      },
      list_destination: []
    },
    driver: undefined
  }
)

/* ------------- Reducers ------------- */
// This function need to be in PackageRedux

export const setPackageInfor = (
  state = INITIAL_STATE,
  { packageInfor }: any
) => {
  const { category, weight, receiverInfor, image } = packageInfor
  // return state.merge({
  //   package: state.package.concat({
  //     category,
  //     weight,
  //     receiverInfor,
  //     senderProof: image,
  //     phaseBooking: '',
  //     time: 0,
  //     price: '0'
  //   })
  // })
  return state
}

export const setDestination = (
  state = INITIAL_STATE,
  { destinationInfor }: any
) => {
  console.log(destinationInfor)
  console.log("destinationInfordestinationInfordestinationInfordestinationInfordestinationInfor")
  console.log("------------------------")
  const { phone, name, destinationLat, destinationLng, address } = destinationInfor
  // return state.merge({
  //   package: state.package.concat({
  //     category,
  //     weight,
  //     receiverInfor,
  //     senderProof: image,
  //     phaseBooking: '',
  //     time: 0,
  //     price: '0'
  //   })
  // })
  return state.merge({
    originAndDestiationInfo: {
      ...state.originAndDestiationInfo,
      list_destination: [
        ...state.originAndDestiationInfo.list_destination,
        {
          phone: phone,
          name: name,
          destinationLat: destinationLat,
          destinationLng: destinationLng,
          address: address
        }
      ]
    }
  })
}

// export const setPhasePackage = (
//   state = INITIAL_STATE,
//   { phase, index, time }: any
// ) => {
//   const tempPackage = asMutable(state.package, { deep: true })
//   tempPackage[index].phaseBooking = phase
//   tempPackage[index].time = time
//   return state.merge({ package: tempPackage })
// }

// export const setLocationByMapDelivery = (
//   state = INITIAL_STATE,
//   { addressAndCoordinates, index }: any
// ) => {
//   const tempPackage = asMutable(state.package, { deep: true })
//   tempPackage[index].addressAndCoordinates = addressAndCoordinates

//   return state.merge({ package: tempPackage })
// }

// export const setBikerAndRideHashDelivery = (
//   state = INITIAL_STATE,
//   { biker, rideHash, index }: any
// ) => {
//   const tempPackage = asMutable(state.package, { deep: true })
//   tempPackage[index].biker = biker
//   tempPackage[index].rideHash = rideHash

//   return state.merge({ package: tempPackage })
// }

// export const setPriceDelivery = (
//   state = INITIAL_STATE,
//   { price, index }: any
// ) => {
//   const tempPackage = asMutable(state.package, { deep: true })
//   tempPackage[index].price = price
//   return state.merge({ package: tempPackage })
// }

// export const refreshDeliveryDataAfterQuit = (
//   state = INITIAL_STATE,
//   { deliveryDatas }: any
// ) => {
//   const tempPackage = asMutable(state.package, { deep: true })

//   deliveryDatas.map((deliveryData: any, index: number) => {
//     const {
//       coordinates,
//       address,
//       deliveryHash,
//       biker,
//       price,
//       receiver,
//       isDeliveryConfirmed,
//       isDeliveryCancelled
//     } = deliveryData

//     const phone: string = biker.phone

//     const tempBikerUserDetail = mapDataUserToFrontEnd(biker.userDetail)
//     const tempAddressAndCoordinate = {
//       address: {
//         addressDestination: address.destination,
//         addressOriginalLocation: address.origin
//       },
//       coordinates: {
//         originalLat: coordinates.origin.lat,
//         originalLng: coordinates.origin.lng,
//         destinationLat: coordinates.destination.lat,
//         destinationLng: coordinates.destination.lng
//       }
//     }
//     const tempPackageIndex: any = {}
//     tempPackageIndex.addressAndCoordinates = tempAddressAndCoordinate

//     tempPackageIndex.rideHash = deliveryHash

//     tempPackageIndex.biker = {
//       phone,
//       userDetail: tempBikerUserDetail,
//       distance: 0
//     }
//     tempPackageIndex.price = price

//     const PackageData = deliveryData.package

//     tempPackageIndex.phaseBooking = mapDeliveryStateAfterRefresh({
//       isDeliveryConfirmed,
//       isDeliveryCancelled,
//       PackageData
//     })

//     tempPackageIndex.receiverInfor = {
//       phoneNumber: receiver.phone,
//       name: receiver.name
//     }

//     tempPackage.push(tempPackageIndex)
//   })

//   return state.merge({ package: tempPackage })
// }

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_PACKAGE_INFOR]: setPackageInfor,
  [Types.SET_DESTINATION]: setDestination,

  // [Types.SET_PHASE_PACKAGE]: setPhasePackage,

  // [Types.SET_LOCATION_BY_MAP_DELIVERY]: setLocationByMapDelivery,

  // [Types.SET_BIKER_AND_RIDE_HASH_DELIVERY]: setBikerAndRideHashDelivery,

  // [Types.SET_PRICE_DELIVERY]: setPriceDelivery,

  // [Types.REFRESH_DELIVERY_DATA_AFTER_QUIT]: refreshDeliveryDataAfterQuit
})
