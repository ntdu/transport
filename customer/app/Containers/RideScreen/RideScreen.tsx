import React from 'react'
import { SafeAreaView } from 'react-native'

// Navigation
import { useNavigation } from '@react-navigation/native'
import { MainStackParams } from '@/Navigation/AppNavigationType'
import { StackNavigationProp } from '@react-navigation/stack'

// Components
import { Price, CustomerInfor, RideInfor } from './Components'

// Styles
import styles from './Styles/RideScreenStyles'

type RideScreenNavigationProp = StackNavigationProp<
  MainStackParams,
  'RideScreen'
>

const RideScreen = () => {
  console.log("RideScreen")
  const navigation = useNavigation<RideScreenNavigationProp>()

  const navigateToHome = () =>
    navigation.reset({
      index: 1,
      routes: [
        {
          name: 'TabScreen'
        }
      ]
    })

  const navigateToPhaseRideScreen = () => {
    navigation.reset({
      index: 1,
      routeNames: ['TabScreen', 'PhaseRideScreen'],
      routes: [
        {
          name: 'TabScreen'
        },
        {
          name: 'PhaseRideScreen'
        }
      ]
    })
  }
    

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Price navigateBack={navigateToHome} />
      <CustomerInfor />
      <RideInfor navigateToPhaseRider={navigateToPhaseRideScreen} />
    </SafeAreaView>
  )
}

export default RideScreen
