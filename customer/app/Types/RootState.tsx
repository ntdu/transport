type fetchingErrorType = null | undefined | string
// type fetchingErrorType = null | string

type Coordinates = {
    lng: number
    lat: number
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
}

export type SocketState = {
    isInitSocket: boolean
    genericError: fetchingErrorType
  
    currentLocation: Coordinates
  
    // Ride data
    coordinates: {
      origin: Coordinates
      destination: Coordinates
    }
    _id: string
    address: {
      destination: string
      origin: string
    }
    customer: {
      id: number
      account__username: string
      phone_number: string
    }
    biker: number
    rideHash: string
    price: number
    // End ride data
  }

export interface RootState {
  auth: AuthState
  phaseRider: PhaseRiderState
}