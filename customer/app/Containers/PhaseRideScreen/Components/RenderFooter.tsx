import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

// Redux
import { useSelector } from 'react-redux'
import { RootState } from '@/Types'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { MainStackParams } from '@/Navigation/AppNavigationType'

// Components
import { BButton } from '@/Components'

// Functions
import CallFunction from '@/Functions/CallFunctions'

// Styles
import styles from './Styles/RenderFooterStyles'
import { Metrics, Colors } from '@/Themes'

// Svgs
import PersonRaiseHand from '@/Svgs/Icons/personRaiseHand.svg'
import Phone from '@/Svgs/Icons/phone.svg'
import Email from '@/Svgs/Icons/email.svg'
import Camera from '@/Svgs/Icons/camera_black.svg'

type RenderFooterProps = {
  hasScan?: boolean
  button: string
  order: string
  onPressFunction: () => void
}

type PhaseRideScreenNavigationProp = StackNavigationProp<
  MainStackParams,
  'PhaseRideScreen'
>

const RenderFooter = (props: RenderFooterProps) => {
  // const phoneNumber = useSelector(
  //   (state: RootState) => state.ride.customer?.phoneNumber
  // )
  const navigation = useNavigation<PhaseRideScreenNavigationProp>()
  const phoneNumber = '0354471333'
  const { button, order, onPressFunction, hasScan } = props

  const callCustomer = () => {
    if (phoneNumber) {
      CallFunction(phoneNumber)
    }
  }

  const scanQR = () => {
    console.log("QRRRRR")
    
    navigation.navigate('ScanQRCode')
  }

  return (
    <View style={styles.container}>
      {hasScan ? (
      <View style={{flexDirection:'row', justifyContent: 'flex-end'}}>
        <TouchableOpacity
          // style={{background}}
          onPress={scanQR}
          activeOpacity={0.8}
        >
          {/* <Text>abc</Text> */}
          <Camera
            width={Metrics.defaultImageWidth}
            height={Metrics.defaultImageHeight}
          />
        </TouchableOpacity>
      </View>
      ):(<></>)}

      <View style={styles.rowView}>
        <View />
        <View>
          <View style={styles.content}>
            <Text style={styles.distanceText}>2 min</Text>
            <PersonRaiseHand
              width={Metrics.defaultImageWidth}
              height={Metrics.defaultImageHeight}
            />
            <Text style={styles.distanceText}>0.5 Km</Text>
          </View>
          <Text style={styles.order}>{order}</Text>
        </View>
        <TouchableOpacity
          style={styles.callButton}
          onPress={callCustomer}
          activeOpacity={0.8}
        >
          <Phone
            width={Metrics.defaultImageWidth}
            height={Metrics.defaultImageHeight}
          />
        </TouchableOpacity>
      </View>
      <BButton
        content={button}
        buttonStyle={styles.buttonStyle}
        onPressButton={onPressFunction}
      />
    </View>
  )
}

export default RenderFooter
