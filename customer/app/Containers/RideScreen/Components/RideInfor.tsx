import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/Types'
import SocketActions from '@/Redux/SocketRedux'
import PhaseActions from '@/Redux/PhaseRiderRedux'

// Components
import { Location } from '@/Components'

// Constants
import { PhaseRider, SERVICE } from '@/Constants/PhaseRiderConstants'

// Styles
import styles from './Styles/RideInforStyles'

// Language
import { translate } from '@/Language'

type RideInforProps = {
  navigateToPhaseRider: () => void
}

const RideInfor = (props: RideInforProps) => {
  const dispatch = useDispatch()

  const { rideHash, originAndDestiationInfo } = useSelector(
    (state: RootState) => state.ride
  )
  console.log('RideInfor')
  console.log(originAndDestiationInfo)
  console.log('----------------------------')

  const service = useSelector((state: RootState) => state.phaseRider.service)

  const token = useSelector((state: RootState) => state.auth.token)

  const {
    sender,
    address
  } = originAndDestiationInfo.origin

  const { list_destination } = originAndDestiationInfo

  const addressDestination = '109 Lý thường kiệt, phường 3, Quận 10, Thành phố Hồ Chí Minh'
  const confirmRide = () => {
    if (service === SERVICE.RIDE) {
      // console.log('serviceride')
      // dispatch(
      //   SocketActions.emitConfirmRide(
      //     accessToken,
      //     customer?.phoneNumber,
      //     rideHash
      //   )
      // )
    } else {
      dispatch(
        SocketActions.emitConfirmDelivery(
          token,
          sender?.phoneNumber,
          rideHash
        )
      )
    }
    dispatch(PhaseActions.setPhaseRider(PhaseRider.PICK_UP_CUSTOMER))
    props.navigateToPhaseRider()
  }
  return (
    <View style={styles.mainContainer}>
      {addressDestination && address && (
        <Location
          origin={address}
          list_destination={list_destination}
        />
      )}
      <TouchableOpacity style={styles.confirmButton} onPress={confirmRide}>
        <Text style={styles.confirmText}>{translate('confirm')}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default RideInfor
