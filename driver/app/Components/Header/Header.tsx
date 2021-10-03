import React from 'react'
import {
  View,
  Text,
  ViewStyle,
  TextStyle,
  ImageStyle,
  TouchableOpacity
} from 'react-native'

// Components
import { BBackButton } from '../Button'
import { useNavigation } from '@react-navigation/native'
import { BookingScreens } from '@/Constants/AppNavigationConstants'

// Functions
import Call from '@/Functions/CallBikerFunctions'

// Styles
import styles from './Styles/HeaderStyles'
import { Metrics } from '@/Themes'

// Svgs
import Phone from '@/Svgs/Icons/phone.svg'
import Email from '@/Svgs/Icons/email.svg'

type HeaderProps = {
  hasBackButton: boolean
  title: string
  canCall: boolean
  hasEmail?: boolean
  phoneNumber?: string
  wrapperStyle?: ViewStyle
  titleStyle?: TextStyle
  buttonStyle?: ImageStyle
}

const Header = (props: HeaderProps) => {
  const navigation = useNavigation()

  const {
    hasBackButton,
    title,
    wrapperStyle,
    buttonStyle,
    titleStyle,
    canCall,
    hasEmail,
    phoneNumber
  } = props

  const callBiker = () => {
    console.log("Call")
    phoneNumber && Call(phoneNumber)
  }

  const callEmail = () => {
    navigation.navigate(BookingScreens.QRScreen)
  }

  return (
    <>
      <View style={[styles.mainContainer, wrapperStyle]}>
        <View style={styles.blankView}>
          {hasBackButton ? (<BBackButton
            wrapperStyle={styles.wrapperStyle}
            imageStyle={buttonStyle}
          />): (
            <></>
          )}
        </View>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        {/* <View style={styles.blankView} /> */}
        {canCall ? (
          <TouchableOpacity onPress={callBiker} style={styles.phone}>
            <Phone
              width={Metrics.defaultImageWidth}
              height={Metrics.defaultImageHeight}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}

        {hasEmail ? (
          <TouchableOpacity onPress={callEmail} style={styles.email}>
            <Email
              width={Metrics.defaultImageWidth}
              height={Metrics.defaultImageHeight}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </>
  )
}

export default Header
