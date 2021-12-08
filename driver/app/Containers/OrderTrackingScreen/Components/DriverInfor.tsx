import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

// Redux
import { useSelector } from 'react-redux'
import { RootState } from '@/Types'

// Components
import { Circle } from './SmallComponents'

// Style
import styles from './Styles/DriverInforStyles'
import { Normalize } from '@/Themes'

// Svgs
import Driver from '@/Svgs/Icons/taxiDriver.svg'

// Language
import { translate } from '@/Language'

const DriverInfor = () => {
  const indexOfPhaseRide = useSelector(
    (state: RootState) => state.phase.indexOfPhaseRide
  )

  // const userDetail =
  //   indexOfPhaseRide === 0
  //     ? useSelector((state: RootState) => state.rideInfor.biker.userDetail)
  //     : useSelector(
  //         (state: RootState) =>
  //           state.package.package[indexOfPhaseRide - 1].biker?.userDetail
  // )

  // const userDetail = useSelector((state: RootState) => {
  //   if (indexOfPhaseRide === 0) {
  //     return state.rideInfor.biker.userDetail
  //   }
  //   return state.package.driver?.userDetail
  // })
  const { bikers } = useSelector(
    (state: RootState) => state.phase.resultFoundBikers
  )

  const { userDetail } = bikers[0]

  return (
    <View style={styles.container}>
      <View style={styles.inforView}>
        <Circle
          image={<Driver width={Normalize(25)} height={Normalize(25)} />}
        />
        <View style={styles.infor}>
          {userDetail && (
            <Text style={styles.name}>
              {userDetail.firstName + ' ' + userDetail.lastName}
            </Text>
          )}
          {userDetail && <Text style={styles.name}>49D1 - 37338</Text>}
        </View>
      </View>
      <TouchableOpacity style={styles.map}>
        <Text style={styles.trackingDriver}>
          {translate('tracking').toUpperCase()}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default DriverInfor
