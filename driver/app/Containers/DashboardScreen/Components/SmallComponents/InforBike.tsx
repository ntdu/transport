import React, { memo } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/Types'
import PhaseActions from '@/Redux/PhaseRedux'
import SocketActions from '@/Redux/SocketRedux'
import RideInforActions from '@/Redux/RideInforRedux'

// Functions
import Call from '@/Functions/CallBikerFunctions'

// Styles
import styles from './Styles/RenderListBikersStyles'
import { Metrics } from '@/Themes'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Language
import { translate } from '@/Language'
import {
  PhaseBookingBeforeRide,
  PhaseBookingInRide,
  SERVICE
} from '@/Constants/PhaseReduxConstants'
// Svgs
import DeliverMan from '@/Svgs/Icons/licensePlate.svg'
import Phone from '@/Svgs/Icons/phone.svg'
import Money from '@/Svgs/Icons/money.svg'

type InforBikeProps = {
  index: number
}

const InforBike = (props: InforBikeProps) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const { bikers } = useSelector(
    (state: RootState) => state.phase.resultFoundBikers
  )
  const price = bikers[0].price

  const { index } = props
  const token = useSelector((state: RootState) => state.auth.token)
  const phoneNumber = bikers[index].userDetail.phoneNumber
  const callBiker = (phoneNumber: string, index: number) => () => {
    
    dispatch(
      SocketActions.emitChooseBikerDeliveryRequest(
        token,
        phoneNumber,
        'rideHash',
        price
      )
    )
    const time = Date.now()
    dispatch(RideInforActions.setPhaseRide(PhaseBookingBeforeRide.CONFIRM_BOOK, time))

    navigation.navigate('OrderTrackingScreen')

    // Call(phoneNumber)

    // setTimeout(() => {
    //   dispatch(PhaseActions.setIndexChooseBiker(index))
    //   dispatch(PhaseActions.setPhase(PhaseBookingBeforeRide.CHOOSE_BIKER))
    // }, 1000)
  }

  return (
    <>
    <View style={styles.rowView}>
      <View style={styles.imageView}>
        <DeliverMan
          width={Metrics.defaultImageWidth}
          height={Metrics.defaultImageHeight}
        />
      </View>
      <Text style={styles.name}>{'49D1-37338'}</Text>
      <TouchableOpacity
        style={styles.callButton}
        onPress={callBiker(phoneNumber, index)}
      >
        {/* <Phone width={20} height={20} style={styles.imagePhone} /> */}
        <Text style={styles.callText}>{'Order'}</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.rowView}>
      <View style={styles.imageView}>
        <Money
          width={Metrics.defaultImageWidth}
          height={Metrics.defaultImageHeight}
        />
      </View>
      <Text style={styles.price}>{price}</Text>
      {/* <TouchableOpacity
        style={styles.callButton}
        onPress={callBiker(phoneNumber, index)}
      >
        <Phone width={20} height={20} style={styles.imagePhone} />
        <Text style={styles.callText}>{translate('call')}</Text>
      </TouchableOpacity> */}
    </View>
    </>
    
  )
}

export default memo(InforBike)
