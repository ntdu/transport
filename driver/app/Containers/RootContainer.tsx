import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import ReduxNavigation from '@/Navigation/ReduxNavigation'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import StartupActions from '@/Redux/StartupRedux'
import PhaseActions from '@/Redux/PhaseRedux'
import { RootState } from '@/Types'

// Components
import { BNetWork, RateStarModal } from '@/Components'

// // Constants
import { PhaseRider } from '@/Constants/PhaseReduxConstants'

const RootContainer = () => {
  console.log("RootContainer")
  const dispatch = useDispatch()

  // const { phase } = useSelector((state: RootState) => state.phase)

  const [isVisible, setIsVisible] = useState(false)

  const toggleVisible = () => setIsVisible(!isVisible)

  useEffect(() => {
    dispatch(StartupActions.startup())
  }, [])

  // useEffect(() => {
  //   if (phase === PhaseRider.RIDE_COMPLETE_EVENT) {
  //     setTimeout(() => {
  //       setIsVisible(true)
  //       dispatch(PhaseActions.setPhase(PhaseRider.CHOOSE_LOCATION))
  //     }, 1000)
  //   }
  // }, [phase])

  return (
    <>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />
      <ReduxNavigation />
      <BNetWork />
      {/* <RateStarModal isVisible={isVisible} toogleVisible={toggleVisible} /> */}
    </>
  )
}

export default RootContainer
