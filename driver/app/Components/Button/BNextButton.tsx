import React, { memo } from 'react'
import { TouchableOpacity, Image, ViewStyle } from 'react-native'

// Styles
import styles from './Styles/BNextButtonStyles'
import { Images } from '@/Themes'

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
      onPress={enable ? navigateFunc : () => {}}
    >
      <Image
        source={Images.rightArrow}
        resizeMode={'contain'}
        style={styles.image}
      />
    </TouchableOpacity>
  )
}

export default memo(BNextButton)
