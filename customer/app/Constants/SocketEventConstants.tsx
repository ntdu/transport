export type SocketEventType =
  | 'heartbeat'
  | 'ride_confirmed'
  | 'ride_cancelled'
  | 'biker_chosen'
  | 'ride_complete'
  | 'ride_in_progress'
  | 'biker_waiting'

export type ErrorType = 'TOKEN_IS_NOT_AUTHENTICATED_BY_SERVER' | 'TOKEN_EXPIRED'

export const HEARTBEAT_EVENT: SocketEventType = 'heartbeat'
export const RIDE_CONFIRMED_EVENT: SocketEventType = 'ride_confirmed'
export const RIDE_CANCELLED_EVENT: SocketEventType = 'ride_cancelled'
export const BIKER_CHOSEN_EVENT: SocketEventType = 'biker_chosen'
export const RIDE_COMPLETE_EVENT: SocketEventType = 'ride_complete'
export const RIDE_IN_PROGRESS_EVENT: SocketEventType = 'ride_in_progress'
export const BIKER_WAITING: SocketEventType = 'biker_waiting'

export const TOKEN_IS_NOT_AUTHENTICATED_BY_SERVER_ERROR: ErrorType =
  'TOKEN_IS_NOT_AUTHENTICATED_BY_SERVER'
export const TOKEN_EXPIRED_ERROR: ErrorType = 'TOKEN_EXPIRED'
