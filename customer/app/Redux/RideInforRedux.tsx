import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

import { RideInforState } from '@/Types'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getInforRide: ['rideInfor'],
  getInforDelivery: ['deliveryData'],

  setOriginalLocationBeforeRide: ['longitude', 'latitude']
})

export const RideInforTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE: Immutable.ImmutableObject<RideInforState> = Immutable(
  {
    originAndDestiationInfo: {
      origin: {
        originalLat: 0,
        originalLng: 0,
        address: ''
      },
      list_destination: []
    },
    rideHash: '',
    price: 0
  }
)

/* ------------- Reducers ------------- */

// export const getInforRide = (state = INITIAL_STATE, { rideInfor }: any) => {
//   const { originAndDestiationInfo, rideHash, price } = rideInfor

//   return state.merge({
//     originAndDestiationInfo,
//     rideHash,
//     price
//   })
// }

export const getInforDelivery = (
  state = INITIAL_STATE,
  { deliveryData }: any
) => {
  const {
    originAndDestiationInfo,
    rideHash,
    price
  } = deliveryData
  return state.merge({
    originAndDestiationInfo,
    package: deliveryData.package,
    rideHash,
    price
  })
}

// export const setOriginalLocationBeforeRide = (
//   state = INITIAL_STATE,
//   { longitude, latitude }: any
// ) =>
//   state.merge({
//     previousOriginalCoordinates: {
//       lat: state.addressAndCoordinates.coordinates.originalLat,
//       lng: state.addressAndCoordinates.coordinates.originalLng
//     },
//     addressAndCoordinates: {
//       coordinates: {
//         originalLat: latitude,
//         originalLng: longitude
//       }
//     }
//   })

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  // [Types.GET_INFOR_RIDE]: getInforRide,

  [Types.GET_INFOR_DELIVERY]: getInforDelivery,

  // [Types.SET_ORIGINAL_LOCATION_BEFORE_RIDE]: setOriginalLocationBeforeRide
})
