import React, { memo } from 'react'
import { View, Text, TouchableOpacity, ViewStyle, FlatList } from 'react-native'

// Redux
import { useSelector } from 'react-redux'
import { RootState } from '@/Types'

// Navigation
import { useNavigation } from '@react-navigation/native'
import { BookingScreens } from '@/Constants/AppNavigationConstants'

// Styles
import styles from './Styles/RenderLocationStyles'
import { Metrics } from '@/Themes'

// Language
import { translate } from '@/Language'

// Svg
import Location from '@/Svgs/Icons/location.svg'
import Destination from '@/Svgs/Icons/destination.svg'

type RenderLocationProps = {
  wrapperStyle?: ViewStyle
}

const RenderLocation = (props: RenderLocationProps) => {
  const navigation = useNavigation()

  const { wrapperStyle } = props

  const addressOriginalLocation = useSelector((state: RootState) => state.map.originAndDestiationInfo.origin.address)
  const { list_destination } = useSelector((state: RootState) => state.package.originAndDestiationInfo)
  console.log(list_destination)
  // const navigateListBikersScreen = () =>
  //   navigation.navigate(BookingScreens.SearchPlacesScreen)

  const renderDestination = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.chooseLocationButton, styles.border]}
      // onPress={navigateListBikersScreen}
      activeOpacity={0.9}
    >
      <Destination
        width={Metrics.defaultImageWidth}
        height={Metrics.defaultImageHeight}
      />
      <Text style={styles.locationText} numberOfLines={1}>
        {item.address}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.chooseLocationView, wrapperStyle]}>
      <TouchableOpacity
        style={[styles.chooseLocationButton, styles.seperate]}
        // onPress={navigateListBikersScreen}
        activeOpacity={0.9}
      >
        <Location
          width={Metrics.defaultImageWidth}
          height={Metrics.defaultImageHeight}
        />

        <Text style={styles.locationText} numberOfLines={1}>
          {addressOriginalLocation}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={list_destination}
        renderItem={renderDestination}
        keyExtractor={item => item.phoneNumber}
      />

      {/* <TouchableOpacity
        style={[styles.chooseLocationButton, styles.border]}
        onPress={navigateListBikersScreen}
        activeOpacity={0.9}
      >
        <Destination
          width={Metrics.defaultImageWidth}
          height={Metrics.defaultImageHeight}
        />
        {addressDestination ? (
          <Text style={styles.locationText} numberOfLines={1}>
            {addressDestination}
          </Text>
        ) : (
          <Text style={styles.whereToText}>{translate('whereTo')}</Text>
        )}
      </TouchableOpacity> */}
    </View>
  )
}

export default memo(RenderLocation)
