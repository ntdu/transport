import { createReducer, createActions } from 'reduxsauce'
import Immutable, { asMutable } from 'seamless-immutable'

// Constants
import {
  PhaseBookingBeforeRide,
  PhaseGiveDestinationInfo,
  NumberOfDestinations,
  SERVICE
} from '@/Constants/PhaseReduxConstants'

// Types
import { PhaseState } from '@/Types'

const { Types, Creators } = createActions({
  setPhase: ['phase'],
  setPhaseDestination: ['phaseDestination'],
  setnumberOfDestinations: ['numberOfDestinations'],

  chooseService: ['service'],

  eventFoundBikerResult: ['bikers', 'rideHash'],

  setIndexChooseBiker: ['index'],

  setIndexOfPhaseRide: ['index'],

  findRideAfterQuitRequest: [''],
  findRideAfterQuitSuccess: [''],
  findRideAfterQuitError: ['error']
})

export const PhaseTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE: Immutable.ImmutableObject<PhaseState> = Immutable({
  phase: PhaseBookingBeforeRide.CHOOSE_LOCATION,
  phaseDestination: PhaseGiveDestinationInfo.DES_1,
  numberOfDestinations: NumberOfDestinations.NUM_1,
  service: '',
  resultFoundBikers: {
    bikers: [
      {
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
        distance: 0,
        price: 0
      }
    ],
    rideHash: ''
  },
  indexChooseBiker: 0,
  indexOfPhaseRide: 0,

  fetchingRequestFindBikerAfterQuit: false,
  errorRequestFindBikerAfterQuit: null
})

/* ------------- Reducers ------------- */
export const setPhase = (state = INITIAL_STATE, { phase }: any) =>
  state.merge({ phase })

export const setPhaseDestination = (state = INITIAL_STATE, { phaseDestination }: any) =>
  state.merge({ phaseDestination })

export const setnumberOfDestinations = (state = INITIAL_STATE, { numberOfDestinations }: any) =>
  state.merge({ numberOfDestinations })

export const chooseService = (state = INITIAL_STATE, { service }: any) =>
  state.merge({ service })

export const setIndexChooseBiker = (state = INITIAL_STATE, { index }: any) =>
  state.merge({ indexChooseBiker: index })

export const eventFoundBikerResult = (
  state = INITIAL_STATE,
  { bikers, rideHash }: any
) => {
  const tempResultFoundBikers = asMutable(state.resultFoundBikers, {
    deep: true
  })

  tempResultFoundBikers.bikers = bikers
  tempResultFoundBikers.rideHash = rideHash

  return state.merge({
    resultFoundBikers: tempResultFoundBikers
  })
}

export const setIndexOfPhaseRide = (state = INITIAL_STATE, { index }: any) =>
  state.merge({ indexOfPhaseRide: index })

export const findRideAfterQuitRequest = (state = INITIAL_STATE) =>
  state.merge({
    errorRequestFindBikerAfterQuit: null,
    fetchingRequestFindBikerAfterQuit: true
  })
export const findRideAfterQuitSuccess = (state = INITIAL_STATE) =>
  state.merge({
    fetchingRequestFindBikerAfterQuit: false,
    errorRequestFindBikerAfterQuit: null
  })
export const findRideAfterQuitError = (state = INITIAL_STATE, { error }: any) =>
  state.merge({
    errorRequestFindBikerAfterQuit: error,
    fetchingRequestFindBikerAfterQuit: false
  })

  /* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_PHASE]: setPhase,
  [Types.SET_PHASE_DESTINATION]: setPhaseDestination,
  [Types.SETNUMBER_OF_DESTINATIONS]: setnumberOfDestinations,
  [Types.CHOOSE_SERVICE]: chooseService,
  [Types.EVENT_FOUND_BIKER_RESULT]: eventFoundBikerResult,

  [Types.SET_INDEX_CHOOSE_BIKER]: setIndexChooseBiker,

  [Types.SET_INDEX_OF_PHASE_RIDE]: setIndexOfPhaseRide,

  [Types.FIND_RIDE_AFTER_QUIT_REQUEST]: findRideAfterQuitRequest,
  [Types.FIND_RIDE_AFTER_QUIT_SUCCESS]: findRideAfterQuitSuccess,
  [Types.FIND_RIDE_AFTER_QUIT_ERROR]: findRideAfterQuitError
})
