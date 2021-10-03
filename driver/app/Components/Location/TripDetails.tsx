import React from 'react'
import { View, Text, ViewStyle, FlatList, SafeAreaView } from 'react-native'

// Redux
import { useSelector } from 'react-redux'
import { RootState } from '@/Types'

// Components
import { LocationInfor } from './Components'

// Styles
import styles from './Styles/TripDetailsStyles'

// Language
import { translate } from '@/Language'
import { Normalize } from '@/Themes'

// Svgs
import Location from '@/Svgs/Icons/location.svg'
import Destination from '@/Svgs/Icons/destination.svg'

type TripDetailsProps = {
  wrapperStyle?: ViewStyle
  indexOfPhaseRide: number
}

const TripDetails = (props: TripDetailsProps) => {
  const { wrapperStyle, indexOfPhaseRide } = props

  // const address =
  //   indexOfPhaseRide === 0
  //     ? useSelector((state: RootState) => state.rideInfor.addressAndCoordinates)
  //     : useSelector(
  //         (state: RootState) =>
  //           state.package.package[indexOfPhaseRide - 1].addressAndCoordinates
  //       )\
  const addressOriginalLocation = useSelector((state: RootState) => {
    // if (indexOfPhaseRide === 0) {
    //   return state.rideInfor.addressAndCoordinates
    // }
    return state.package.originAndDestiationInfo.origin.address
  })

  // const sender = useSelector((state: RootState) => state.user.userDetail)
  const senderName = useSelector((state: RootState) => state.auth.userName)
  const addressDestination = useSelector((state: RootState) => {
    // if (indexOfPhaseRide === 0) {
    //   return state.rideInfor.addressAndCoordinates
    // }
    return state.package.originAndDestiationInfo.list_destination[0].address
  })

  // const receiverName =
  //   indexOfPhaseRide === 0
  //     ? ''
  //     : useSelector(
  //         (state: RootState) =>
  //           state.package.package[indexOfPhaseRide - 1].receiverInfor.name
  //       )
  const receiverName = useSelector((state: RootState) => {
    if (indexOfPhaseRide === 0) {
      return ''
    }
    return state.package.originAndDestiationInfo.list_destination[0].name
  })

  const { list_destination } = useSelector((state: RootState) => state.package.originAndDestiationInfo)
  console.log(list_destination)
  // const senderName = sender.firstName + ' ' + sender.lastName

  const renderDestination = ({ item }: any) => (
    <LocationInfor
      image={<Destination width={Normalize(25)} height={Normalize(25)} />}
      // content={
      //   indexOfPhaseRide === 0
      //     ? translate('destinationPlace')
      //     : item.phoneNumber
      // }
      locationStyle={{marginBottom: Normalize(10)}}
      content={ item.name }
      address={item.address}
    />
  );

  return (
    <View style={[styles.container, wrapperStyle]}>
      <Text style={styles.title}>{translate('tripDetails')}</Text>
      <View style={styles.tripView}>
        <LocationInfor
          image={<Location width={Normalize(25)} height={Normalize(25)} />}
          content={indexOfPhaseRide === 0 ? translate('pickup') : senderName}
          address={addressOriginalLocation}
        />
        <View style={styles.line}>
          <Text style={styles.lineText}>|</Text>
          <Text style={styles.lineText}>|</Text>
          {/* <Text style={styles.lineText}>|</Text>
          <Text style={styles.lineText}>|</Text> */}
        </View>
        <SafeAreaView style={{flex: 1}}>
          <FlatList
            data={list_destination}
            renderItem={renderDestination}
            keyExtractor={item => item.phoneNumber}
          />
        </SafeAreaView>
        
      </View>
    </View>
  )
}

export default TripDetails
