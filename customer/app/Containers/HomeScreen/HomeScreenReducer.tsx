export const initialState: INITIAL_STATE_PHASE = {
  phase: 0,
  isReady: false,
  isPower: false
}

export enum Action {
  PHASE_0 = 'PHASE_POWER_OFF',
  PHASE_1 = 'PHASE_POWER_ON_NOT_READY',
  PHASE_2 = 'PHASE_POWER_ON_READY'
}

export type PhaseActions = {
  type: Action.PHASE_0 | Action.PHASE_1 | Action.PHASE_2
}

export type INITIAL_STATE_PHASE = {
  phase: number
  isReady: boolean
  isPower: boolean
}

export default function PhaseReducer(
  state: INITIAL_STATE_PHASE,
  action: PhaseActions
) {
  switch (action.type) {
    case Action.PHASE_0:
      return {
        ...state,
        phase: 0,
        isReady: false,
        isPower: false
      }
    case Action.PHASE_1:
      return {
        ...state,
        phase: 1,
        isPower: true,
        isReady: false
      }
    case Action.PHASE_2:
      return {
        ...state,
        phase: 2,
        isPower: true,
        isReady: true
      }
    default:
      return state
  }
}
