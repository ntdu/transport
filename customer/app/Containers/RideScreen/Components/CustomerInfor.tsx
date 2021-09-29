import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

// Redux
import { useSelector } from 'react-redux'
import { RootState } from '@/Types'

// Functions
import Call from '@/Functions/CallFunctions'

// Styles
import styles from './Styles/CustomerInforStyles'
import { Metrics } from '@/Themes'

// Language
import { translate } from '@/Language'

// Svgs
import Customer from '@/Svgs/Icons/customer.svg'
import Phone from '@/Svgs/Icons/phone.svg'
import { SERVICE } from '@/Constants/PhaseRiderConstants'

const CustomerInfor = () => {
  // This data will need to depend on service
  const service = useSelector((state: RootState) => state.phaseRider.service)
  console.log(service)
  console.log(useSelector((state: RootState) => state.ride.customer?.firstName))
  const firstName =
    service === SERVICE.RIDE
      ? useSelector((state: RootState) => state.ride.customer?.firstName)
      : useSelector((state: RootState) => state.ride.sender?.firstName)

  const lastName =
    service === SERVICE.RIDE
      ? useSelector((state: RootState) => state.ride.customer?.lastName)
      : useSelector((state: RootState) => state.ride.sender?.lastName)
  const phoneNumber =
    service === SERVICE.RIDE
      ? useSelector((state: RootState) => state.ride.customer?.phoneNumber)
      : useSelector((state: RootState) => state.ride.sender?.phoneNumber)

  const callCustomer = (phoneNumber: string) => () => Call(phoneNumber)

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inforView}>
        <Customer
          width={Metrics.defaultImageWidth}
          height={Metrics.defaultImageHeight}
        />
        <View style={styles.infor}>
          <Text style={styles.nameText}>
            {translate('name')}: {firstName + ' ' + lastName}
          </Text>
          <Text style={styles.phoneText}>{phoneNumber}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={callCustomer(phoneNumber || '0982336217')}>
        <Phone
          width={Metrics.defaultImageWidth}
          height={Metrics.defaultImageHeight}
        />
      </TouchableOpacity>
    </View>
  )
}

export default CustomerInfor
