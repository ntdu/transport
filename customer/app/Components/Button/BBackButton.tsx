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
            d="m407.579 87.677c-31.073-53.624-86.265-86.385-147.64-87.637-2.62-.054-5.257-.054-7.878 0-61.374 1.252-116.566 34.013-147.64 87.637-31.762 54.812-32.631 120.652-2.325 176.123l126.963 232.387c.057.103.114.206.173.308 5.586 9.709 15.593 15.505 26.77 15.505 11.176 0 21.183-5.797 26.768-15.505.059-.102.116-.205.173-.308l126.963-232.387c30.304-55.471 29.435-121.311-2.327-176.123zm-151.579 144.323c-39.701 0-72-32.299-72-72s32.299-72 72-72 72 32.299 72 72-32.298 72-72 72z" 
            fill="#0a0a0a"
            />
          </Svg>
{/*           
      <Svg width={Metrics.defaultImageWidth} height={Metrics.defaultImageHeight} x="0" y="0" viewBox="0 0 64 64" >
        <Path  
        d="m54 30h-39.899l15.278-14.552c.8-.762.831-2.028.069-2.828-.761-.799-2.027-.831-2.828-.069l-17.448 16.62c-.755.756-1.172 1.76-1.172 2.829 0 1.068.417 2.073 1.207 2.862l17.414 16.586c.387.369.883.552 1.379.552.528 0 1.056-.208 1.449-.621.762-.8.731-2.065-.069-2.827l-15.342-14.552h39.962c1.104 0 2-.896 2-2s-.896-2-2-2z" 
        fill="#0a0a0a"
        />
      </Svg> */}

      {/* <Text>ABc</Text> */}

    </TouchableOpacity>
  )
}

export default BBackButton
