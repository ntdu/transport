import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

// Types
import { PhaseRiderState } from '@/Types/RootState'

// Constants
import { PhaseRider } from '@/Constants/PhaseRiderConstants'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setPhaseRider: ['phaseRider'],
  setService: ['service']
})

export const PhaseRiderType = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE: Immutable.ImmutableObject<PhaseRiderState> = Immutable(
  {
    phaseRider: PhaseRider.NOT_READY,
    service: ''
  }
)

/* ------------- Reducers ------------- */

// Set phase rider
export const setPhaseRider = (state = INITIAL_STATE, { phaseRider }: any) =>
  state.merge({ phaseRider })

export const setService = (state = INITIAL_STATE, { service }: any) =>
  state.merge({ service })
/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_PHASE_RIDER]: setPhaseRider,

  [Types.SET_SERVICE]: setService
})
