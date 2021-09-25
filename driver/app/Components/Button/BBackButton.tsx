import React from 'react'
import { TouchableOpacity, Image, ViewStyle, ImageStyle } from 'react-native'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Styles
import styles from './Styles/BBackButtonStyles'
import { Images } from '@/Themes'
import Svg, {Path} from 'react-native-svg';
import { Metrics } from '@/Themes'

type BBackButtonProps = {
  backFunc?: () => void
  wrapperStyle?: ViewStyle
  imageStyle?: ImageStyle
}

const BBackButton = (props: BBackButtonProps) => {
  const navigation = useNavigation()

  const { backFunc, wrapperStyle, imageStyle } = props

  const navigateBack = () => navigation.goBack()

  return (
    <TouchableOpacity
      style={[styles.mainContainer, wrapperStyle]}
      onPress={backFunc ? backFunc : navigateBack}
    >
      <Svg width={Metrics.defaultImageWidth} height={Metrics.defaultImageHeight} x="0" y="0" viewBox="0 0 64 64" >
            <Path  
            d="m407.579 87.677c-31.073-53.624-86.265-86.385-147.64-87.637-2.62-.054-5.257-.054-7.878 0-61.374 1.252-116.566 34.013-147.64 87.637-31.762 54.812-32.631 120.652-2.325 176.123l126.963 232.387c.057.103.114.206.173.308 5.586 9.709 15.593 15.505 26.77 15.505 11.176 0 21.183-5.797 26.768-15.505.059-.102.116-.205.173-.308l126.963-232.387c30.304-55.471 29.435-121.311-2.327-176.123zm-151.579 144.323c-39.701 0-72-32.299-72-72s32.299-72 72-72 72 32.299 72 72-32.298 72-72 72z" 
            fill="#0a0a0a"
            />
          </Svg>

      {/* <Image
        source={Images.leftArrow}
        resizeMode={'contain'}
        style={[styles.image, imageStyle]}
      /> */}
    </TouchableOpacity>
  )
}

export default BBackButton
