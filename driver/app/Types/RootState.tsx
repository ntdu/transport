import {
  AddressAndCoordinates,
  OriginAndDestiationInfo,
  Coordinates,
  UserDetail,
  ReceiverInfor
} from './CommonTypes'

export type fetchingErrorType = null | undefined | string
export type ResultFoundBikers = {
  bikers: PayloadFoundBikers[]
  rideHash: string
}

export type PayloadFoundBikers = {
  phone: string
  distance: number
  price: number
  userDetail: UserDetail
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

  fetchingChangePassword: boolean
  errorChangePassword: fetchingErrorType

  accessToken: string
  refreshToken: string
  userName: string
}

export type PhaseState = {
  phase: string
  phaseDestination: any
  numberOfDestinations: any
  service: string
  resultFoundBikers: ResultFoundBikers

  indexChooseBiker: number

  indexOfPhaseRide: number

  fetchingRequestFindBikerAfterQuit: boolean
  errorRequestFindBikerAfterQuit: fetchingErrorType
}

export type MapState = {
  // addressAndCoordinates: AddressAndCoordinates
  originAndDestiationInfo: OriginAndDestiationInfo
  distance: number
}

// export type PackageInfor = {
//   phaseBooking: string
//   time: number
//   price?: string | undefined

//   category: number
//   weight: number
//   receiverInfor: ReceiverInfor
//   senderProof: Buffer | null

  // biker?: PayloadFoundBikers
//   rideHash?: string
//   bikerLocationUpdate?: Coordinates | undefined

//   addressAndCoordinates?: AddressAndCoordinates
// }

export type PayloadFoundDrivers = {
  phone: string
  distance: number
  userDetail: UserDetail
}

export type PackageInfor = {
  weight: number
  senderProof: Buffer | null
  originAndDestiationInfo: OriginAndDestiationInfo
  driver?: PayloadFoundDrivers
}

export type RideInforState = {
  phaseBooking: string
  time: number
  // price: string

  // biker: PayloadFoundBikers
  // rideHash: string
  bikerLocationUpdate: Coordinates | undefined

  // addressAndCoordinates?: AddressAndCoordinates
}

export type SocketState = {
  isInitSocket: boolean
  genericError: fetchingErrorType

  isFindingBikers: boolean
  errorEmitBooking: fetchingErrorType

  isChooseBikerRequest: boolean
  errorEmitChooseBiker: fetchingErrorType
}

export type NotificationState = {
  fetchingRefreshData: boolean
  errorRefreshData: fetchingErrorType
}

export type UserState = {
  fetchingGetUserDetail: boolean
  errorGetUserDetail: fetchingErrorType

  userDetail: UserDetail

  userAgent: string

  fetchingReviewTrip: boolean
  errorFetchingReviewTrip: fetchingErrorType
}

export type PackageState = {
  package: PackageInfor[]
}

export type ReportHistory = {
  date: string
  amount: number
  countSuccess: number
  countCancel: number
}

export type HistoryByDate = {
  originLng: number
  originLat: number
  destinationLng: number
  destinationLat: number
  addressOrigin: string
  addressDestination: string
  isRideConfirmed: boolean
  isRideCancelled: boolean
  price: number
  rideHash: string
  date: string
  createdDate: string
  // bikerFirstName: string
  // bikerIsActive: boolean
  // bikerLastName: string
  // bikerGender: boolean
  // bikerPhoneNumber: string
  // bikerDateOfBirth: string
  // bikerAddress: string
  // bikerEmail: string
  customerFirstName: string
  customerLastName: string
  customerIsActive: boolean
  customerGender: boolean
  customerPhoneNumber: string
  customerDateOfBirth: string
  customerAddress: string
  customerEmail: string
}

export type HistoryState = {
  fetchingHistory: boolean
  errorFetchingHistory: fetchingErrorType
  history: HistoryByDate[][]
  historyRequested: string[]

  fetchingReport: boolean
  errorFetchingReport: fetchingErrorType
  report: ReportHistory[]
}

export interface RootState {
  auth: AuthState
  rideInfor: RideInforState
  phase: PhaseState
  socket: SocketState
  notification: NotificationState
  user: UserState
  map: MapState 
  // package: PackageState
  package: PackageInfor
  history: HistoryState
}
