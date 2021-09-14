import React from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'

// Styles
import styles from './Styles/BNextButtonStyles'
import { Metrics } from '@/Themes'

// Svgs
import RightArrow from '@/Svgs/Icons/rightArrow.svg'
import Svg, {Path} from 'react-native-svg';

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
      {/* <RightArrow
        width={Metrics.defaultImageWidth}
        height={Metrics.defaultImageHeight}
      /> */}
      <Svg width={Metrics.defaultImageWidth} height={Metrics.defaultImageHeight} x="0" y="0" viewBox="0 0 64 64" >
        <Path  
        d="m37.379 12.552c-.799-.761-2.066-.731-2.827.069-.762.8-.73 2.066.069 2.828l15.342 14.551h-39.963c-1.104 0-2 .896-2 2s.896 2 2 2h39.899l-15.278 14.552c-.8.762-.831 2.028-.069 2.828.393.412.92.62 1.448.62.496 0 .992-.183 1.379-.552l17.449-16.62c.756-.755 1.172-1.759 1.172-2.828s-.416-2.073-1.207-2.862z"
        fill="#0a0a0a"
        />
      </Svg>
    </TouchableOpacity>
  )
}

export default BNextButton
