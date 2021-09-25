import React, { memo } from 'react'
import { View, Text, ViewStyle } from 'react-native'

// Redux
import { useSelector } from 'react-redux'
import { RootState } from '@/Types'

// Styles
import styles from './Styles/InforRiderStyles'
import { Metrics } from '@/Themes'

// Svg
import DeliverMan from '@/Svgs/Icons/deliveryMan.svg'
import Star from '@/Svgs/Icons/star.svg'

type InforRiderProps = {
  index: number
  wrapperStyle?: ViewStyle
}

const InforRider = (props: InforRiderProps) => {
  const { index, wrapperStyle } = props
  const { bikers } = useSelector(
    (state: RootState) => state.phase.resultFoundBikers
  )

  const { firstName, lastName } = bikers[index].userDetail

  return (
    <View style={[styles.rowView, wrapperStyle]}>
      <View style={styles.imageDriverView}>
        <DeliverMan
          width={Metrics.defaultImageWidth}
          height={Metrics.defaultImageHeight}
        />
      </View>
      <Text style={styles.name}>{firstName + ' ' + lastName}</Text>
      <View style={styles.starView}>
        <Star
          width={Metrics.defaultImageWidth}
          height={Metrics.defaultImageHeight}
        />
        <Star
          width={Metrics.defaultImageWidth}
          height={Metrics.defaultImageHeight}
        />
        <Star
          width={Metrics.defaultImageWidth}
          height={Metrics.defaultImageHeight}
        />
      </View>
    </View>
  )
}

export default memo(InforRider)
