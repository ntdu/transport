import React from 'react'
import { View, Text, ViewStyle, TextStyle, FlatList } from 'react-native'

// Styles
import styles from './Styles/LocationStyles'
import { Metrics } from '@/Themes'

// Svgs
import LocationImage from '@/Svgs/Icons/location.svg'
import Destination from '@/Svgs/Icons/destination.svg'

type LocationProps = {
  origin: string
  list_destination: any
  inforStyle?: ViewStyle
  textStyle?: TextStyle
  lineStyle?: ViewStyle
}

const Location = (props: LocationProps) => {
  const { origin, list_destination, inforStyle, textStyle, lineStyle } = props

  const renderDestination = ({ item }: any) => (
    <View style={[styles.infor, inforStyle]}>
      <Destination
        height={Metrics.defaultImageHeight}
        width={Metrics.defaultImageWidth}
      />
      <Text style={[styles.addressText, textStyle]}>{item.address}</Text>
    </View>
  );
  return (
    <>
      <View style={[styles.infor, inforStyle]}>
        <LocationImage
          height={Metrics.defaultImageHeight}
          width={Metrics.defaultImageWidth}
        />
        <Text style={[styles.addressText, textStyle]}>{origin}</Text>
      </View>
      <View style={[styles.line, lineStyle]} />

      <FlatList
        style={styles.flatlist}
        data={list_destination}
        renderItem={renderDestination}
        keyExtractor={item => item.phoneNumber}
      />
     
    </>
  )
}

export default Location
