import React from 'react'
import { TouchableOpacity, ViewStyle, Image, ImageStyle } from 'react-native'

// Styles
import styles from './Styles/BNextButtonStyles'
import { Metrics } from '@/Themes'
import { Images } from '@/Themes'

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
      <RightArrow
        width={Metrics.defaultImageWidth}
        height={Metrics.defaultImageHeight}
      />
      
{/*       
      <Svg width={Metrics.defaultImageWidth} height={Metrics.defaultImageHeight} x="0" y="0" viewBox="0 0 64 64" >
        <Path  
d="m249.176 3.656-203.511 499.491c-2.15 5.277 3.719 10.215 8.551 7.195l198.3-123.961c1.268-.793 2.877-.796 4.148-.009l200.478 124.057c4.843 2.997 10.687-1.962 8.52-7.228l-205.618-499.564c-2-4.859-8.885-4.846-10.868.019z" fill="#7fb9ff"/><path d="m260.044 3.637c-.989-2.403-3.173-3.61-5.368-3.632v385.785c.69.014 1.378.205 1.988.582l200.478 124.057c4.843 2.997 10.687-1.962 8.52-7.228z" 

        // d="m37.379 12.552c-.799-.761-2.066-.731-2.827.069-.762.8-.73 2.066.069 2.828l15.342 14.551h-39.963c-1.104 0-2 .896-2 2s.896 2 2 2h39.899l-15.278 14.552c-.8.762-.831 2.028-.069 2.828.393.412.92.62 1.448.62.496 0 .992-.183 1.379-.552l17.449-16.62c.756-.755 1.172-1.759 1.172-2.828s-.416-2.073-1.207-2.862z"
        fill="#0a0a0a"
        />
      </Svg> */}
    </TouchableOpacity>
  )
}

export default BNextButton
