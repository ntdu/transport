import { call, put } from 'redux-saga/effects'

// Redux
import AuthAction from '@/Redux/AuthRedux'
// import SocketActions from '@/Redux/SocketRedux'

// Api
import AuthApi from '@/Services/AuthApi'

// Types
import { ResponseTypes, AuthenticateRes } from '@/Types'

const AuthAPI = AuthApi.create()

export function* signInSaga(signInPayload: any) {
  try {
    console.log("signInSaga")
    console.log("-------------------------------------------------")
    const { userName, password } = signInPayload
    const response: ResponseTypes<AuthenticateRes> = yield call<any>(
      AuthAPI.signInRequest,
      userName,
      password
    )
    console.log(response.ok);
    console.log(response.data);
    // if (response.ok && response.status === 200) {
    //   yield put(AuthAction.signInSuccess(response.data?.token))
    // } else {
    //   yield put(AuthAction.signInFailure(response.data))
    // }
  } catch (error) {
    console.log(error)
  }
}

export function* signUpSaga(signUpPayload: any) {
  try {
    console.log("signUpSaga")
    console.log("-------------------------------------------------")
    const { registerDetail } = signUpPayload
    const response: ResponseTypes<AuthenticateRes> = yield call<any>(
      AuthAPI.signUpRequest,
      registerDetail
    )
    console.log(response.ok)
    console.log(response.status)
    console.log(response.data)
    // if (response.ok && response.status === 200) {
    //   yield put(AuthAction.signUpSuccess(response.data?.otpToken))
    // } else {
    //   yield put(AuthAction.signUpFailure(response.data))
    // }
  } catch (error) {
    console.log('error', error)
    yield put(AuthAction.signUpFailure('Sign up Fail'))
  }
}

// export function* verifySaga(verifyPayload: any) {
//   try {
//     const { userName, otpToken, otpCode } = verifyPayload

//     const response: ResponseTypes<AuthenticateRes> = yield call<any>(
//       AuthAPI.verifyRequest,
//       userName,
//       otpToken,
//       otpCode
//     )

//     if (response.ok && response.status === 200) {
//       yield put(
//         AuthAction.verifySuccess(
//           userName,
//           response.data?.accessToken,
//           response.data?.refreshToken
//         )
//       )

//       yield put(SocketActions.initSocket())
//     } else {
//       yield put(AuthAction.verifyFailure(response.data))
//     }
//   } catch (error) {
//     console.log('error', error)
//     yield put(AuthAction.verifyFailure('Verify Fail'))
//   }
// }

// export function* refreshTokenSaga(refreshPayload: any) {
//   try {
//     const { userName, refreshToken } = refreshPayload

//     const response: ResponseTypes<AuthenticateRes> = yield call<any>(
//       AuthAPI.refreshTokenRequest,
//       userName,
//       refreshToken
//     )

//     if (response.ok && response.status === 200) {
//       yield put(
//         AuthAction.refreshTokenSuccess(
//           userName,
//           response.data?.accessToken,
//           response.data?.refreshToken
//         )
//       )

//       yield put(SocketActions.initSocket())
//     } else {
//       yield put(AuthAction.refreshTokenFailure(response.data))
//     }
//   } catch (error) {
//     console.log('error', error)
//     yield put(AuthAction.verifyFailure('Verify Fail'))
//   }
// }
