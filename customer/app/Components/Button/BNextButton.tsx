import React from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'

// Styles
import styles from './Styles/BNextButtonStyles'
import { Metrics } from '@/Themes'

// Svgs
import RightArrow from '@/Svgs/Icons/rightArrow.svg'

type BNextButtonProps = {
  navigateFunc: () => void
  wrapperStyle?: ViewStyle
  enable?: boolean
}

const BNextButton = (props: BNextButtonProps) => {
  const { navigateFunc, wrapperStyle, enable } = props
  return (
    <TouchableOpacity
      style={[
        styles.mainContainer,
        wrapperStyle,
        enable ? styles.enable : styles.disable
      ]}
      onPress={navigateFunc}
    >
      <RightArrow
        width={Metrics.defaultImageWidth}
        height={Metrics.defaultImageHeight}
      />
    </TouchableOpacity>
  )
}

export default BNextButton
