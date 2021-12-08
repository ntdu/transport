import React, { memo } from 'react'
import { View, Text } from 'react-native'

// Redux
import { useSelector } from 'react-redux'
import { RootState } from '@/Types'

// Styles
import styles from './Styles/DistanceStyles'

// Language
import { translate } from '@/Language'

const Distance = () => {
  // const { distance } = useSelector((state: RootState) => state.map)
  const { resultFoundBikers } = useSelector((state: RootState) => state.phase)
  const { bikers, rideHash } = resultFoundBikers

  const distance = bikers[0].distance
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{translate('distance')}</Text>
      <Text style={styles.text}>{distance} Km</Text>
    </View>
  )
}

export default memo(Distance)
