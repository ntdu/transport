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

// Functions
import Call from '@/Functions/CallBikerFunctions'

// Styles
import styles from './Styles/HeaderStyles'
import { Metrics } from '@/Themes'

// Svgs
import Phone from '@/Svgs/Icons/phone.svg'

type HeaderProps = {
  hasBackButton: boolean
  title: string
  canCall: boolean
  phoneNumber?: string
  wrapperStyle?: ViewStyle
  titleStyle?: TextStyle
  buttonStyle?: ImageStyle
}

const Header = (props: HeaderProps) => {
  const {
    hasBackButton,
    title,
    wrapperStyle,
    buttonStyle,
    titleStyle,
    canCall,
    phoneNumber
  } = props

  const callBiker = () => {
    phoneNumber && Call(phoneNumber)
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
          <View style={styles.blankView} />
        )}
      </View>
    </>
  )
}

export default Header
