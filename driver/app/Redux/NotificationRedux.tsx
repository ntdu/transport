import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

// Types
import { NotificationState } from '@/Types/RootState'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  refreshDataWithRideHash: ['rideHash'],
  refreshDataWithRideHashSuccess: [''],
  refreshDataWithRideHashError: ['error']
})

export const NotificationTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE: Immutable.ImmutableObject<NotificationState> = Immutable(
  {
    fetchingRefreshData: false,
    errorRefreshData: null
  }
)

/* ------------- Reducers ------------- */
export const refreshDataWithRideHash = (state = INITIAL_STATE) =>
  state.merge({
    fetchingRefreshData: true,
    errorRefreshData: null
  })
export const refreshDataWithRideHashSuccess = (state = INITIAL_STATE) =>
  state.merge({
    fetchingRefreshData: false,
    errorRefreshData: null
  })
export const refreshDataWithRideHashError = (
  state = INITIAL_STATE,
  { error }: any
) =>
  state.merge({
    fetchingRefreshData: false,
    errorRefreshData: error
  })

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.REFRESH_DATA_WITH_RIDE_HASH]: refreshDataWithRideHash,
  [Types.REFRESH_DATA_WITH_RIDE_HASH_SUCCESS]: refreshDataWithRideHashSuccess,
  [Types.REFRESH_DATA_WITH_RIDE_HASH_ERROR]: refreshDataWithRideHashError
})
