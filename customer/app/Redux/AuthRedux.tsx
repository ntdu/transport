import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable';

// Types
import { AuthState } from '@/Types/RootState'

/* ------------- Initial State ------------- */
export const INITIAL_STATE: Immutable.ImmutableObject<AuthState> = Immutable({
    fetchingSignInRequest: false,
    errorSignIn: null,
  
    fetchingSignUpRequest: false,
    errorSignUp: null,
    otpToken: '',
    token: '',
  
    fetchingVerifyRequest: false,
    errorVerify: null,
  
    fetchingRefreshToken: false,
    errorRefreshToken: null,
  
    accessToken: '',
    refreshToken: ''
  })

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    signInRequest: ['userName', 'password'],
    signInSuccess: ['otpToken'],
    signInFailure: ['errorSignIn'],
  
    signUpRequest: ['registerDetail'],
    signUpSuccess: ['otpToken'],
    signUpFailure: ['errorSignUp'],
  
    verifyRequest: ['userName', 'otpToken', 'otpCode'],
    verifySuccess: ['accessToken', 'refreshToken'],
    verifyFailure: ['errorVerify'],
  
    refreshTokenRequest: ['userName', 'refreshToken'],
    refreshTokenSuccess: ['accessToken', 'refreshToken'],
    refreshTokenFailure: ['errorRefreshToken']
})

export const AuthTypes = Types
export default Creators

/* ------------- Reducers ------------- */
// Sign In
export const signInRequest = (state = INITIAL_STATE) =>
  state.merge({ fetchingSignInRequest: true, errorSignIn: null })

export const signInSuccess = (state = INITIAL_STATE, { token }: any) =>
  state.merge({
    token,
    fetchingSignInRequest: false,
    errorSignIn: null
  })

export const signInFailure = (state = INITIAL_STATE, { errorSignIn }: any) =>
  state.merge({
    fetchingSignInRequest: false,
    errorSignIn: errorSignIn.message
  })

// Sign Up
export const signUpRequest = (state = INITIAL_STATE) =>
  state.merge({ fetchingSignUpRequest: true, errorSignUp: null })

export const signUpSuccess = (state = INITIAL_STATE, { otpToken }: any) =>
  state.merge({
    otpToken,
    fetchingSignUpRequest: false,
    errorSignUp: null
  })

export const signUpFailure = (state = INITIAL_STATE, { errorSignUp }: any) =>
  state.merge({
    fetchingSignUpRequest: false,
    errorSignUp: errorSignUp.message
  })

  /* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.SIGN_IN_REQUEST]: signInRequest,
    [Types.SIGN_IN_SUCCESS]: signInSuccess,
    [Types.SIGN_IN_FAILURE]: signInFailure,
  
    [Types.SIGN_UP_REQUEST]: signUpRequest,
    [Types.SIGN_UP_SUCCESS]: signUpSuccess,
    [Types.SIGN_UP_FAILURE]: signUpFailure,
  
    // [Types.VERIFY_REQUEST]: verifyRequest,
    // [Types.VERIFY_SUCCESS]: verifySuccess,
    // [Types.VERIFY_FAILURE]: verifyFailure,
  
    // [Types.REFRESH_TOKEN_REQUEST]: refreshTokenRequest,
    // [Types.REFRESH_TOKEN_SUCCESS]: refreshTokenSuccess,
    // [Types.REFRESH_TOKEN_FAILURE]: refreshTokenFailure
})