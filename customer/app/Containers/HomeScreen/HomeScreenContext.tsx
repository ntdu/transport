import { createContext } from 'react'
import { INITIAL_STATE_PHASE, PhaseActions } from './HomeScreenReducer'

type HomeScreenContextType = {
  state: INITIAL_STATE_PHASE
  dispatchPhase: React.Dispatch<PhaseActions>
}

export default createContext<HomeScreenContextType | null>(null)
