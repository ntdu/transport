import React from 'react'
import { View, Text } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/Types'
import UserActions from '@/Redux/UserRedux'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Constants
import { PhaseBookingAfterRide } from '@/Constants/PhaseReduxConstants'

// Styles
import styles from './Styles/RateStarStyles'

// Language
import { translate } from '@/Language'
import { Colors } from '@/Themes'
import { stat } from 'react-native-fs'

const RateStar = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const indexOfPhaseRide = useSelector(
    (state: RootState) => state.phase.indexOfPhaseRide
  )

  const phaseBooking = useSelector((state: RootState) => {
    if (indexOfPhaseRide === 0) {
      return state.rideInfor.phaseBooking
    }
    // return state.package.package[indexOfPhaseRide - 1].phaseBooking
    return ''
  })

  const rideHash = useSelector((state: RootState) => {
    if (indexOfPhaseRide === 0) {
      return state.rideInfor.rideHash
    }
    // return state.package.package[indexOfPhaseRide - 1].rideHash
    return 'ABC'
  })

  const rateCompleted = (rating: number) => {
    const reviewData = {
      rating,
      rideHash
    }
    dispatch(UserActions.createReviewRequest(reviewData))
    navigation.goBack()
  }

  return phaseBooking === PhaseBookingAfterRide.RIDE_COMPLETE_EVENT ? (
    <View style={styles.container}>
      <Text style={styles.request}>{translate('rateStar')}</Text>

      <AirbnbRating
        onFinishRating={rateCompleted}
        selectedColor={Colors.summerSky}
        unSelectedColor={Colors.whisper}
        showRating={false}
        starStyle={styles.rating}
        defaultRating={0}
      />
    </View>
  ) : (
    <></>
  )
}

export default RateStar
