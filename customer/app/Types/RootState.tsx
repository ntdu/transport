import { AddressAndCoordinates, UserDetail } from './CommonTypes'

type fetchingErrorType = null | undefined | string
// type fetchingErrorType = null | string

type Coordinates = {
  lng: number
  lat: number
}

export type PackageState = {
  deliverySuccessProof: string | null
  bikerReceivedPackageProof: string | null
  senderProof: string | null
  // category: number
  weight: number
  // owner: string
}

export type RideInforState = {
  addressAndCoordinates: AddressAndCoordinates

  // previousOriginalCoordinates: Coordinates

  customer?: UserDetail
  sender?: UserDetail
  receiver?: {
    phone: string
    name: string
  }
  package?: PackageState

  rideHash: string
  price: number
}

export type AuthState = {
  fetchingSignInRequest: boolean
  errorSignIn: fetchingErrorType

  fetchingSignUpRequest: boolean
  errorSignUp: fetchingErrorType

  otpToken: string
  token: string

  fetchingVerifyRequest: boolean
  errorVerify: fetchingErrorType

  fetchingRefreshToken: boolean
  errorRefreshToken: fetchingErrorType

  accessToken: string
  refreshToken: string
}

export type PhaseRiderState = {
  phaseRider: string
  service: string
}

export type SocketState = {
  isInitSocket: boolean
  genericError: fetchingErrorType

  isEmitHeartbeat: boolean

  currentLocation: Coordinates
}

export interface RootState {
  auth: AuthState
  phaseRider: PhaseRiderState
  ride: RideInforState
}