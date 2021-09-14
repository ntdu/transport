import React from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Styles
import styles from './Styles/BBackButtonStyles'
import { Metrics } from '@/Themes'

// Svgs
// import LeftArrow from '@/Svgs/Icons/leftArrow.svg'
import { Text, View } from 'react-native';
import Svg, {Path} from 'react-native-svg';

type BBackButtonProps = {
  backFunc?: () => void
  wrapperStyle?: ViewStyle
}

const BBackButton = (props: BBackButtonProps) => {
  console.log("BBackButton")
  const navigation = useNavigation()

  const { backFunc, wrapperStyle } = props

  const navigateBack = () => navigation.goBack()

  return (
    <TouchableOpacity
      style={[styles.mainContainer, wrapperStyle]}
      onPress={backFunc ? backFunc : navigateBack}
    >
      {/* <LeftArrow
        width={Metrics.defaultImageWidth}
        height={Metrics.defaultImageHeight}
      /> */}
      <Svg width={Metrics.defaultImageWidth} height={Metrics.defaultImageHeight} x="0" y="0" viewBox="0 0 64 64" >
        <Path  
        d="m54 30h-39.899l15.278-14.552c.8-.762.831-2.028.069-2.828-.761-.799-2.027-.831-2.828-.069l-17.448 16.62c-.755.756-1.172 1.76-1.172 2.829 0 1.068.417 2.073 1.207 2.862l17.414 16.586c.387.369.883.552 1.379.552.528 0 1.056-.208 1.449-.621.762-.8.731-2.065-.069-2.827l-15.342-14.552h39.962c1.104 0 2-.896 2-2s-.896-2-2-2z" 
        fill="#0a0a0a"
        />
      </Svg>

      {/* <Text>ABc</Text> */}

    </TouchableOpacity>
  )
}

export default BBackButton
