import React from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Styles
import styles from './Styles/BBackButtonStyles'
import { Metrics } from '@/Themes'

// Svgs
import LeftArrow from '@/Svgs/Icons/leftArrow.svg'

type BBackButtonProps = {
  backFunc?: () => void
  wrapperStyle?: ViewStyle
}

const BBackButton = (props: BBackButtonProps) => {
  const navigation = useNavigation()

  const { backFunc, wrapperStyle } = props

  const navigateBack = () => navigation.goBack()

  return (
    <TouchableOpacity
      style={[styles.mainContainer, wrapperStyle]}
      onPress={backFunc ? backFunc : navigateBack}
    >
      <LeftArrow
        width={Metrics.defaultImageWidth}
        height={Metrics.defaultImageHeight}
      />
    </TouchableOpacity>
  )
}

export default BBackButton
