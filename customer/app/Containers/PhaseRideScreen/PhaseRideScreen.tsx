import React from 'react'
import { View, Linking, TouchableOpacity, Text } from 'react-native'

// Navigation
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { MainStackParams } from '@/Navigation/AppNavigationType'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/Types'
import PhaseRiderActions from '@/Redux/PhaseRiderRedux'
import SocketActions from '@/Redux/SocketRedux'

// Components
import { BMap } from '@/Components'
import { RenderDestination, RenderFooter } from './Components'

// Constants
import { PhaseRider, SERVICE } from '@/Constants/PhaseRiderConstants'

// Styles
import styles from './Styles/PhaseRideScreenStyles'
import { Normalize } from '@/Themes'

// Svgs
import Navigation from '@/Svgs/Icons/navigation.svg'

type PhaseRideScreenNavigationProp = StackNavigationProp<
  MainStackParams,
  'PhaseRideScreen'
>

const PhaseRideScreen = () => {
  console.log("PhaseRideScreen");

  const navigation = useNavigation<PhaseRideScreenNavigationProp>()

  const dispatch = useDispatch()
  const token = useSelector((state: RootState) => state.auth.token)
  
  const { phaseRider } = useSelector((state: RootState) => state.phaseRider)

  // const { addressDestination, addressOriginalLocation } = useSelector(
  //   (state: RootState) => state.ride.originAndDestiationInfo.address
  // )

  const { address } = useSelector(
    (state: RootState) => state.ride.originAndDestiationInfo.origin
  )

  console.log(address)
  const { list_destination } = useSelector(
    (state: RootState) => state.ride.originAndDestiationInfo
  )
  console.log(list_destination)
  const addressDestination = list_destination[0].address

  // const coordinates = useSelector(
  //   (state: RootState) => state.ride.addressAndCoordinates.coordinates
  // )

  const phoneNumber = useSelector(
    (state: RootState) => state.ride.originAndDestiationInfo.origin.sender?.phoneNumber
  )

  const rideHash = useSelector((state: RootState) => state.ride.rideHash)

  const googleMapOpenUrl = (latitude: number, longitude: number) => {
    const latLng = `${latitude},${longitude}`
    return `google.navigation:q=${latLng}`
  }

  const navigateByGGMap = () => {
    // if (phaseRider === PhaseRider.PICK_UP_CUSTOMER) {
    //   const { originalLat, originalLng } = coordinates
    //   Linking.openURL(googleMapOpenUrl(originalLat, originalLng))
    // } else {
    //   const { destinationLat, destinationLng } = coordinates
    //   if (destinationLat && destinationLng) {
    //     Linking.openURL(googleMapOpenUrl(destinationLat, destinationLng))
    //   }
    // }
  }

  const navigateToGetPackageProofScreen = () => {
    // console.log("navigateToGetPackageProofScreen")
    navigation.navigate('GetPackageProofScreen')
  }

  const dispatchStart = () => {
      console.log('service delivery')
      console.log(token)
      console.log('----------------------------------------')
      dispatch(SocketActions.emitDeliveryBikerWaiting(token))

      // With service delivery, driver need to
      // go to phase get package (Take picture) before go to destination

      dispatch(PhaseRiderActions.setPhaseRider(PhaseRider.GET_PACKAGE))
      navigateToGetPackageProofScreen()
  }
  const dispatchFinish = () =>
    dispatch(PhaseRiderActions.setPhaseRider(PhaseRider.FINISH_RIDE))

  const confirmComplete = () => {
    // dispatch(SocketActions.emitCompleteDelivery(token, rideHash, image))
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'PayScreen'
        }
      ]
    })
    // navigation.navigate('DeliverPackageProofScreen')
  }

  const renderFooter = () => {
    switch (phaseRider) {
      case PhaseRider.PICK_UP_CUSTOMER:
        return (
          <RenderFooter
            order={'Picking package up'}
            button={'arrived'}
            onPressFunction={dispatchStart}
          />
        )
      case PhaseRider.GO_TO_DESTINATION:
        return (
          <RenderFooter
            order={'Arrived destination'}
            button={'start'}
            onPressFunction={dispatchFinish}
          />
        )
      case PhaseRider.FINISH_RIDE:
        return (
          <RenderFooter
            hasScan = {true}
            order={'Arrived destination'}
            button={'finish'}
            onPressFunction={confirmComplete}
          />
        )
      default:
        return
    }
  }

  const renderDestination = () => {
    switch (phaseRider) {
      case PhaseRider.PICK_UP_CUSTOMER:
        return (
          <RenderDestination list_destination={address} type={1} />
        )
      case PhaseRider.GO_TO_DESTINATION:
        return <RenderDestination list_destination={list_destination} type={2} />
      case PhaseRider.FINISH_RIDE:
        return <RenderDestination list_destination={list_destination} type={2} />
      default:
        return
    }
  }

  return (
    <View style={styles.mainContainer}>
      {renderDestination()}
      <TouchableOpacity style={styles.navigation} onPress={navigateByGGMap}>
        <Navigation width={Normalize(20)} height={Normalize(20)} />
        <Text style={styles.navigateText}>Navigate</Text>
      </TouchableOpacity>
      <BMap type={1} />
      {renderFooter()}
    </View>
  )
}

export default PhaseRideScreen
