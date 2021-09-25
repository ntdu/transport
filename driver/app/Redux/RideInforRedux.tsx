import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

// Types
import { RideInforState } from '@/Types/RootState'
import { PhaseBookingBeforeRide } from '@/Constants/PhaseReduxConstants'
import {
  mapDataUserToFrontEnd,
  mapRideStateAfterRefresh
} from '@/Functions/MapDataToFrontendFunctions'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateLocationBiker: ['lng', 'lat'],

  refreshRideDataAfterQuit: ['data'],

  setLocationByMap: ['coordinates', 'address'],

  setBikerAndRideHash: ['biker', 'rideHash'],

  setPhaseRide: ['phase', 'time'],

  setPriceRide: ['price']
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE: Immutable.ImmutableObject<RideInforState> = Immutable(
  {
    phaseBooking: PhaseBookingBeforeRide.CHOOSE_SERVICE,
    time: 0,
    price: '',
    biker: {
      phone: '',
      userDetail: {
        accountUsername: '',
        address: '',
        dateOfBirth: '',
        firstName: '',
        gender: true,
        lastName: '',
        phoneNumber: '',
        createdDate: ''
      },
      distance: 0
    },
    rideHash: '',

    bikerLocationUpdate: undefined
  }
)

/* ------------- Reducers ------------- */

export const setLocationByMap = (
  state = INITIAL_STATE,
  { coordinates, address }: any
) =>
  state.merge({
    addressAndCoordinates: {
      coordinates,
      address
    }
  })

export const updateLocationBiker = (state = INITIAL_STATE, { lng, lat }: any) =>
  state.merge({
    bikerLocationUpdate: { lng, lat }
  })

export const setBikerAndRideHash = (
  state = INITIAL_STATE,
  { biker, rideHash }: any
) =>
  state.merge({
    biker,
    rideHash
  })

export const setPhaseRide = (state = INITIAL_STATE, { phase, time }: any) =>
  state.merge({ phaseBooking: phase, time })

export const setPriceRide = (state = INITIAL_STATE, { price }: any) =>
  state.merge({ price })

export const refreshRideDataAfterQuit = (
  state = INITIAL_STATE,
  { data }: any
) => {
  const {
    coordinates,
    address,
    price,
    biker,
    rideHash,
    isRideConfirmed,
    isRideCancelled,
    haveBikerArrived
  } = data

  const tempBikerUserDetail = mapDataUserToFrontEnd(biker.userDetail)

  return state.merge({
    phaseBooking: mapRideStateAfterRefresh({
      isRideConfirmed,
      isRideCancelled,
      haveBikerArrived
    }),
    time: Date.now(),
    price,
    rideHash,
    biker: {
      phone: biker.phone,
      userDetail: tempBikerUserDetail
    },
    addressAndCoordinates: {
      address: {
        addressDestination: address.destination,
        addressOriginalLocation: address.origin
      },
      coordinates: {
        originalLat: coordinates.origin.lat,
        originalLng: coordinates.origin.lng,
        destinationLat: coordinates.destination.lat,
        destinationLng: coordinates.destination.lng
      }
    }
  })
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_LOCATION_BIKER]: updateLocationBiker,

  [Types.SET_LOCATION_BY_MAP]: setLocationByMap,

  [Types.SET_BIKER_AND_RIDE_HASH]: setBikerAndRideHash,

  [Types.SET_PHASE_RIDE]: setPhaseRide,

  [Types.SET_PRICE_RIDE]: setPriceRide,

  [Types.REFRESH_RIDE_DATA_AFTER_QUIT]: refreshRideDataAfterQuit
})
