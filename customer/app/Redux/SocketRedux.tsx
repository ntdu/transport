import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

import { SocketState } from '@/Types'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  initSocket: [''],
  initSocketSuccess: [''],
  initSocketError: ['error'],
  emitHeartBeat: ['longitude', 'latitude'],
  listenChooseBiker: ['payloadChooseBiker'],

  emitConfirmRide: ['customer', 'rideHash'],
  emitConfirmRideResult: [''],
  emitConfirmRideError: ['error'],

  emitCancelRide: ['customer', 'rideHash'],
  emitCancelRideResult: [''],
  emitCancelRideError: ['error'],

  emitBikerWaiting: [''],
  emitBikerWaitingError: ['error'],

  emitCompleteRide: ['phone_number', 'rideHash'],
  emitCompleteRideError: ['error']
})

export const SocketTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE: Immutable.ImmutableObject<SocketState> = Immutable({
  isInitSocket: false,
  genericError: null,
  currentLocation: {
    lng: 0,
    lat: 0
  },
  coordinates: {
    origin: {
      lng: 0,
      lat: 0
    },
    destination: {
      lng: 0,
      lat: 0
    }
  },
  _id: '',
  address: {
    origin: '',
    destination: ''
  },
  customer: {
    id: 0,
    account__username: '',
    phone_number: ''
  },
  biker: 1,
  rideHash: '',
  price: 0
})

/* ------------- Reducers ------------- */

// SOCKETS
export const initSocket = (state = INITIAL_STATE) => state
export const initSocketSuccess = (state = INITIAL_STATE) =>
  state.merge({ isInitSocket: true })
export const initSocketError = (state = INITIAL_STATE, { error }: any) =>
  state.merge({ genericError: error })

export const emitHeartBeat = (
  state = INITIAL_STATE,
  { longitude, latitude }: any
) =>
  state.merge({
    currentLocation: {
      lng: longitude,
      lat: latitude
    }
  })

export const listenChooseBiker = (
  state = INITIAL_STATE,
  { payloadChooseBiker }: any
) => {
  const { biker, address, coordinates, customer, rideHash } = payloadChooseBiker

  return state.merge({ biker, address, coordinates, customer, rideHash })
}

export const emitConfirmRide = (state = INITIAL_STATE) => state
export const emitConfirmRideError = (state = INITIAL_STATE, { error }: any) =>
  state.merge({ genericError: error })

export const emitCancelRide = (state = INITIAL_STATE) => state
export const emitCancelRideError = (state = INITIAL_STATE, { error }: any) =>
  state.merge({ genericError: error })

export const emitBikerWaiting = (state = INITIAL_STATE) => state
export const emitBikerWaitingError = (state = INITIAL_STATE, { error }: any) =>
  state.merge({ genericError: error })

export const emitCompleteRide = (state = INITIAL_STATE) => state
export const emitCompleteRideError = (state = INITIAL_STATE, { error }: any) =>
  state.merge({ genericError: error })

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.EMIT_HEART_BEAT]: emitHeartBeat,
  [Types.INIT_SOCKET]: initSocket,
  [Types.INIT_SOCKET_SUCCESS]: initSocketSuccess,
  [Types.INIT_SOCKET_ERROR]: initSocketError,
  [Types.LISTEN_CHOOSE_BIKER]: listenChooseBiker,

  [Types.EMIT_CONFIRM_RIDE]: emitConfirmRide,
  [Types.EMIT_CONFIRM_RIDE_ERROR]: emitConfirmRideError,

  [Types.EMIT_CANCEL_RIDE]: emitCancelRide,
  [Types.EMIT_CANCEL_RIDE_ERROR]: emitCancelRideError,

  [Types.EMIT_BIKER_WAITING]: emitBikerWaiting,
  [Types.EMIT_BIKER_WAITING_ERROR]: emitBikerWaitingError,

  [Types.EMIT_COMPLETE_RIDE]: emitCompleteRide,
  [Types.EMIT_COMPLETE_RIDE_ERROR]: emitCompleteRideError
})
