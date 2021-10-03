import React from 'react'
import { StatusBar, ScrollView, View, Text } from 'react-native'

// Redux
import { useSelector } from 'react-redux'
import { RootState } from '@/Types'
import { translate } from '@/Language'

// Components
import { Header, TripDetails } from '@/Components'
import QRCode from 'react-native-qrcode-svg';
// import {
//   RideInfor,
//   DriverInfor,
//   Status,
//   PaymentDetails,
//   RateStar
// } from './Components'

// Style
import styles from './Styles/QRScreen'
import { Colors } from '@/Themes'

const QRScreen = () => {
  const indexOfPhaseRide = useSelector(
    (state: RootState) => state.phase.indexOfPhaseRide
  )

  const phoneNumber = useSelector((state: RootState) => {
    if (indexOfPhaseRide === 0) {
      return state.rideInfor.biker.userDetail.phoneNumber
    }
    return state.package.driver?.userDetail
      .phoneNumber
  })

  return (
    <ScrollView>
      <StatusBar
        backgroundColor={Colors.royalBlue}
        hidden={false}
        barStyle={'light-content'}
      />
      <Header
        hasBackButton={true}
        title={'PARCEL'}
        titleStyle={styles.headerTitle}
        canCall={false}
        phoneNumber={phoneNumber}
        // wrapperStyle={styles.wrapperStyle}
      />
      <View style={styles.codeView}>
        <Text style={styles.titleText}>{translate('codeShipment')}</Text>
        <Text>N9TT-9G0A-B7FQ-RANC</Text>
      </View>

      <View style={styles.qrView}>
        <Text style={styles.titleText}>{translate('qr')}</Text>
        <View style={{justifyContent: 'center', flexDirection: 'row', marginVertical: 20}}> 
          <QRCode
            value="Just some string value"
            // logoSize={60}
            logoBackgroundColor='transparent'
            size={200}
          />
        </View>
      </View>

      
      {/* <RideInfor />
      <DriverInfor />
      <RateStar />
      <TripDetails indexOfPhaseRide={indexOfPhaseRide} />
      <Status />
      <PaymentDetails /> */}
    </ScrollView>
  )
}

export default QRScreen
