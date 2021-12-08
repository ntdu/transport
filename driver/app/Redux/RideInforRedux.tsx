import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

// Types
import { RideInforState } from '@/Types/RootState'
import { PhaseBookingBeforeRide } from '@/Constants/PhaseReduxConstants'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateLocationBiker: ['lng', 'lat'],
  setPhaseRide: ['phase', 'time'],
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE: Immutable.ImmutableObject<RideInforState> = Immutable(
  {
    phaseBooking: PhaseBookingBeforeRide.CONFIRM_BOOK,
    time: 0,
    bikerLocationUpdate: undefined
  }
)

/* ------------- Reducers ------------- */
export const updateLocationBiker = (state = INITIAL_STATE, { lng, lat }: any) =>
  state.merge({
    bikerLocationUpdate: { lng, lat }
  })

export const setPhaseRide = (state = INITIAL_STATE, { phase, time }: any) =>
  state.merge({ phaseBooking: phase, time })

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_LOCATION_BIKER]: updateLocationBiker,
  [Types.SET_PHASE_RIDE]: setPhaseRide
})
