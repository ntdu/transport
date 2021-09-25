import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

// Types
import { MapState } from '@/Types/RootState'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setOriginalLocation: ['lng', 'lat', 'address'],
  setDestination: ['lng', 'lat', 'address'],
  getDistance: ['distance']
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE: Immutable.ImmutableObject<MapState> = Immutable({
  addressAndCoordinates: {
    address: {
      addressOriginalLocation: undefined,
      addressDestination: undefined
    },
    coordinates: {
      originalLat: 107.122123,
      originalLng: 106.123123,
      destinationLat: undefined,
      destinationLng: undefined
    }
  },
  distance: 0
})

/* ------------- Reducers ------------- */
export const setOriginalLocation = (
  state = INITIAL_STATE,
  originalLocationPayload: {
    lng: number
    lat: number
    address: string | undefined
  }
) => {
  const { lat, lng, address } = originalLocationPayload
  return state.merge({
    addressAndCoordinates: {
      coordinates: {
        ...state.addressAndCoordinates.coordinates,
        originalLat: lat,
        originalLng: lng
      },
      address: {
        ...state.addressAndCoordinates.address,
        addressOriginalLocation: address
      }
    }
  })
}

export const setDestination = (
  state = INITIAL_STATE,
  destinationPayload: { lng: number; lat: number; address: string }
) => {
  const { lat, lng, address } = destinationPayload
  return state.merge({
    addressAndCoordinates: {
      coordinates: {
        ...state.addressAndCoordinates.coordinates,
        destinationLat: lat,
        destinationLng: lng
      },
      address: {
        ...state.addressAndCoordinates.address,
        addressDestination: address
      }
    }
  })
}

export const getDistance = (
  state = INITIAL_STATE,
  distancePayload: {
    distance: number
  }
) => state.merge({ distance: distancePayload.distance })

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_ORIGINAL_LOCATION]: setOriginalLocation,
  [Types.SET_DESTINATION]: setDestination,
  [Types.GET_DISTANCE]: getDistance
})
