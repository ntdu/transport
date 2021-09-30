import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

import { SocketState } from '@/Types'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  initSocket: ['accessToken'],
  initSocketSuccess: [''],
  initSocketError: ['error'],
  emitHeartBeat: ['longitude', 'latitude'],
  listenChooseBiker: ['payloadChooseBiker'],

  emitConfirmRide: ['accessToken', 'customer', 'rideHash'],
  emitConfirmRideResult: [''],
  emitConfirmRideError: ['error'],

  emitConfirmDelivery: ['token', 'customer', 'rideHash'],
  emitConfirmDeliveryResult: [''],
  emitConfirmDeliveryError: ['error'],

  emitCancelRide: ['accessToken', 'customer', 'rideHash'],
  emitCancelRideResult: [''],
  emitCancelRideError: ['error'],

  emitBikerWaiting: ['accessToken', 'rideHash'],
  emitBikerWaitingError: ['error'],

  emitDeliveryBikerWaiting: ['token'],
  emitDeliveryBikerWaitingError: ['error'],

  emitBikerReceivedPackage: ['token', 'rideHash', 'image'],
  emitBikerReceivedPackageError: ['error'],

  emitCompleteRide: ['accessToken', 'phone_number', 'rideHash'],
  emitCompleteRideError: ['error'],

  emitCompleteDelivery: ['token', 'rideHash', 'image'],
  emitCompleteDeliveryError: ['error'],

  toggleHeartbeat: ['']
})

export const SocketTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE: Immutable.ImmutableObject<SocketState> = Immutable({
  isInitSocket: false,
  genericError: null,

  isEmitHeartbeat: false,
  currentLocation: {
    lng: 0,
    lat: 0
  }
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
    },
    isEmitHeartbeat: true
  })

export const emitConfirmRide = (state = INITIAL_STATE) => state
export const emitConfirmRideError = (state = INITIAL_STATE, { error }: any) =>
  state.merge({ genericError: error })

export const emitConfirmDelivery = (state = INITIAL_STATE) => state
export const emitConfirmDeliveryError = (
  state = INITIAL_STATE,
  { error }: any
) => state.merge({ genericError: error })

export const emitCancelRide = (state = INITIAL_STATE) => state
export const emitCancelRideError = (state = INITIAL_STATE, { error }: any) =>
  state.merge({ genericError: error })

export const emitBikerWaiting = (state = INITIAL_STATE) => state
export const emitBikerWaitingError = (state = INITIAL_STATE, { error }: any) =>
  state.merge({ genericError: error })

export const emitDeliveryBikerWaiting = (state = INITIAL_STATE) => state
export const emitDeliveryBikerWaitingError = (
  state = INITIAL_STATE,
  { error }: any
) => state.merge({ genericError: error })

export const emitBikerReceivedPackage = (state = INITIAL_STATE) => state
export const emitBikerReceivedPackageError = (
  state = INITIAL_STATE,
  { error }: any
) => state.merge({ genericError: error })

export const emitCompleteRide = (state = INITIAL_STATE) => state
export const emitCompleteRideError = (state = INITIAL_STATE, { error }: any) =>
  state.merge({ genericError: error })

export const emitCompleteDelivery = (state = INITIAL_STATE) => state
export const emitCompleteDeliveryError = (
  state = INITIAL_STATE,
  { error }: any
) => state.merge({ genericError: error })

export const toggleHeartbeat = (state = INITIAL_STATE) =>
  state.merge({ isEmitHeartbeat: !state.isEmitHeartbeat })

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.EMIT_HEART_BEAT]: emitHeartBeat,
  [Types.INIT_SOCKET]: initSocket,
  [Types.INIT_SOCKET_SUCCESS]: initSocketSuccess,
  [Types.INIT_SOCKET_ERROR]: initSocketError,
  // [Types.LISTEN_CHOOSE_BIKER]: listenChooseBiker,

  [Types.EMIT_CONFIRM_RIDE]: emitConfirmRide,
  [Types.EMIT_CONFIRM_RIDE_ERROR]: emitConfirmRideError,

  [Types.EMIT_CONFIRM_DELIVERY]: emitConfirmDelivery,
  [Types.EMIT_CONFIRM_DELIVERY_ERROR]: emitConfirmDeliveryError,

  [Types.EMIT_CANCEL_RIDE]: emitCancelRide,
  [Types.EMIT_CANCEL_RIDE_ERROR]: emitCancelRideError,

  [Types.EMIT_BIKER_WAITING]: emitBikerWaiting,
  [Types.EMIT_BIKER_WAITING_ERROR]: emitBikerWaitingError,

  [Types.EMIT_DELIVERY_BIKER_WAITING]: emitDeliveryBikerWaiting,
  [Types.EMIT_DELIVERY_BIKER_WAITING_ERROR]: emitDeliveryBikerWaitingError,

  [Types.EMIT_COMPLETE_RIDE]: emitCompleteRide,
  [Types.EMIT_COMPLETE_RIDE_ERROR]: emitCompleteRideError,

  [Types.EMIT_BIKER_RECEIVED_PACKAGE]: emitBikerReceivedPackage,
  [Types.EMIT_BIKER_RECEIVED_PACKAGE_ERROR]: emitBikerReceivedPackageError,

  [Types.EMIT_COMPLETE_DELIVERY]: emitCompleteDelivery,
  [Types.EMIT_COMPLETE_DELIVERY_ERROR]: emitCompleteDeliveryError,

  [Types.TOGGLE_HEARTBEAT]: toggleHeartbeat
})
