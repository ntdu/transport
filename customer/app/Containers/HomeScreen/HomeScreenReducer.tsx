export const initialState: INITIAL_STATE_PHASE = {
  phase: 0,
  isReady: false
}

export enum Action {
  PHASE_0 = 'PHASE_NOT_READY',
  PHASE_1 = 'PHASE_ON_READY'
}

export type PhaseActions = {
  type: Action.PHASE_0 | Action.PHASE_1
}

export type INITIAL_STATE_PHASE = {
  phase: number
  isReady: boolean
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
        isReady: false
      }
    case Action.PHASE_1:
      return {
        ...state,
        phase: 1,
        isReady: true,
      }
    default:
      return state
  }
}
