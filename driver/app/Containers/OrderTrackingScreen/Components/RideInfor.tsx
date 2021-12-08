import React from 'react'
import { View, Text } from 'react-native'

// Redux
import { useSelector } from 'react-redux'
import { RootState } from '@/Types'

// Components
import { Circle } from './SmallComponents'

// Constants
import {
  PhaseBookingAfterRide,
  PhaseBookingInRide
} from '@/Constants/PhaseReduxConstants'

// Styles
import styles from './Styles/RideInforStyles'
import { Normalize } from '@/Themes'

// Svgs
import Motorbiking from '@/Svgs/Icons/motorbiking.svg'
import { translate } from '@/Language'

const RideInfor = () => {
  const indexOfPhaseRide = useSelector(
    (state: RootState) => state.phase.indexOfPhaseRide
  )

  // const rideHash =
  //   indexOfPhaseRide === 0
  //     ? useSelector((state: RootState) => state.rideInfor.rideHash)
  //     : useSelector(
  //         (state: RootState) =>
  //           state.package.package[indexOfPhaseRide - 1].rideHash
  //       )
  
  const rideHash = 'N9TT-9G0A-B7FQ-RANC'

  const renderService = () => {
    return (
      <Text style={styles.serviceText}>
        {indexOfPhaseRide === 0
          ? translate('serviceDriver').toUpperCase()
          : translate('serviceDelivery').toUpperCase()}
      </Text>
    )
  }

  return (
    <View style={styles.container}>
      <Circle
        image={<Motorbiking width={Normalize(25)} height={Normalize(25)} />}
      />
      <View style={styles.infor}>
        {renderService()}
        <Text>
          {translate('orderNumber')}: {rideHash}
        </Text>
      </View>
    </View>
  )
}

export default RideInfor
