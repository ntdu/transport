import React from 'react'
import { StatusBar, ScrollView } from 'react-native'

// Redux
import { useSelector } from 'react-redux'
import { RootState } from '@/Types'

// Components
import { Header, TripDetails } from '@/Components'
import {
  RideInfor,
  DriverInfor,
  Status,
  PaymentDetails,
  RateStar
} from './Components'

// Style
import styles from './Styles/OrderTrackingScreenStyles'
import { Colors } from '@/Themes'

const OrderTrackingScreen = () => {
  const indexOfPhaseRide = useSelector(
    (state: RootState) => state.phase.indexOfPhaseRide
  )

  const phoneNumber = useSelector((state: RootState) => {
    if (indexOfPhaseRide === 0) {
      return state.phase.resultFoundBikers.bikers[0].phone
    }
    return state.package.driver?.userDetail
      .phoneNumber
  })

  return (
    <>
      <StatusBar
        backgroundColor={Colors.royalBlue}
        hidden={false}
        barStyle={'light-content'}
      />
      <Header
        hasBackButton={true}
        title={'TRACKING'}
        titleStyle={styles.headerTitle}
        canCall
        phoneNumber={phoneNumber}
        wrapperStyle={styles.wrapperStyle}
      />
      <RideInfor />
      <DriverInfor />
      <RateStar />
      <TripDetails indexOfPhaseRide={indexOfPhaseRide} />
      <Status />
      <PaymentDetails />
    </>
  )
}

export default OrderTrackingScreen
