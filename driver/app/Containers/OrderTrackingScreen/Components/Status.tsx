import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'

// Components
import { StatusDetail } from './SmallComponents'
import {
  PhaseWaiting,
  PhaseBikerWait,
  PhaseConfirmRide,
  PhaseReject,
  PhaseCompleteRide,
  PhaseBikerReceivedPackage
} from './SmallComponents/PhaseConstants'

// Redux
import { useSelector } from 'react-redux'
import { RootState } from '@/Types'

// Constants
import {
  PhaseBookingAfterRide,
  PhaseBookingBeforeRide,
  PhaseBookingInRide
} from '@/Constants/PhaseReduxConstants'

// Styles
import styles from './Styles/StatusStyles'

// Language
import { translate } from '@/Language'

const Status = () => {
  const [phaseBooking, setPhaseBooking] = useState(PhaseWaiting)

  const indexOfPhaseRide = useSelector(
    (state: RootState) => state.phase.indexOfPhaseRide
  )

  // const phase =
  //   indexOfPhaseRide === 0
  //     ? useSelector((state: RootState) => state.rideInfor.phaseBooking)
  //     : useSelector(
  //         (state: RootState) =>
  //           state.package.package[indexOfPhaseRide - 1].phaseBooking
  //       )

  const phase = useSelector((state: RootState) => {
    if (indexOfPhaseRide === 0) {
      return state.rideInfor.phaseBooking
    }
    // return state.package.package[indexOfPhaseRide - 1].phaseBooking
    return PhaseBookingBeforeRide.CONFIRM_BOOK
  })

  // const time =
  //   indexOfPhaseRide === 0
  //     ? useSelector((state: RootState) => state.rideInfor.time)
  //     : useSelector(
  //         (state: RootState) => state.package.package[indexOfPhaseRide - 1].time
  //       )

  const time = useSelector((state: RootState) => {
    if (indexOfPhaseRide === 0) {
      return state.rideInfor.time
    }
    // return state.package.package[indexOfPhaseRide - 1].time
    return 123
  })
  useEffect(() => {
    switch (phase) {
      case PhaseBookingBeforeRide.CONFIRM_BOOK:
        setPhaseBooking(PhaseWaiting)
        break
      case PhaseBookingInRide.CONFIRM_RIDE:
        setPhaseBooking(PhaseConfirmRide)
        break
      case PhaseBookingInRide.BIKER_WAITING:
        setPhaseBooking(PhaseBikerWait)
        break
      case PhaseBookingInRide.REJECT_RIDE:
        setPhaseBooking(PhaseReject)
        break
      case PhaseBookingInRide.BIKER_RECEIVED_PACKAGE:
        setPhaseBooking(PhaseBikerReceivedPackage)
        break
      case PhaseBookingAfterRide.RIDE_COMPLETE_EVENT:
        setPhaseBooking(PhaseCompleteRide)
        break
      default:
        break
    }
  }, [phase])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translate('status')}</Text>
      <StatusDetail phase={phaseBooking} time={time} />
    </View>
  )
}

export default Status
