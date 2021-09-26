import { takeLatest, all } from 'redux-saga/effects'

/* ------------- Types ------------- */
import { StartupTypes } from '@/Redux/StartupRedux'
import { AuthTypes } from '@/Redux/AuthRedux'
import { SocketTypes } from '@/Redux/SocketRedux'
// import { NotificationTypes } from '@/Redux/NotificationRedux'
// import { UserTypes } from '@/Redux/UserRedux'
/* ------------- Sagas ------------- */
import { startup } from './StartupSagas'
import {
  signInSaga,
  signUpSaga,
  // verifySaga,
  // refreshTokenSaga
} from './AuthSagas'
import {
  // InitSocket,
  // emitBooking,
  // emitChooseBiker,
  emitDelivery,
  // emitChooseBikerDelivery
} from './SocketSagas'

// import { refreshDataWithRideHashSaga } from './NotificationSagas'

// import { getUserDetailSaga } from './UserSagas'
/* ------------- API ------------- */

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // Auth
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signInSaga),
    takeLatest(AuthTypes.SIGN_UP_REQUEST, signUpSaga),
    // takeLatest(AuthTypes.VERIFY_REQUEST, verifySaga),
    // takeLatest(AuthTypes.REFRESH_TOKEN_REQUEST, refreshTokenSaga),

    // Sockets
    takeLatest(SocketTypes.EMIT_DELIVERY_REQUEST, emitDelivery),
    
    // // Notification
    // takeLatest(
    //   NotificationTypes.REFRESH_DATA_WITH_RIDE_HASH,
    //   refreshDataWithRideHashSaga
    // ),

    // // User
    // takeLatest(UserTypes.GET_USER_DATA_REQUEST, getUserDetailSaga)
  ])
}
