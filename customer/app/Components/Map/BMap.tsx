import React, { memo } from 'react'
import Config from 'react-native-config'
import { ViewStyle } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

// Redux
import { useSelector, shallowEqual } from 'react-redux'
import { RootState } from '@/Types'

// Components
import { BMarker } from './Components'

// Styles
import styles from './Styles/BMapStyles'
import { Colors, Metrics } from '@/Themes'
import customStyle from './Styles/CustomMapStyles'

// Svgs
import PlaceOrgin from '@/Svgs/Icons/location.svg'
import Destination from '@/Svgs/Icons/destination.svg'

type BMapProps = {
  wrapperStyle?: ViewStyle
  type: number // Type 0 is map without destination
}

const BMap = (props: BMapProps) => {
  const { wrapperStyle, type } = props

  const coordinates = useSelector(
    (state: RootState) => state.ride.addressAndCoordinates.coordinates,
    shallowEqual
  )

  const {
    originalLat,
    originalLng,
    destinationLat,
    destinationLng
  } = coordinates

  const region: Region = {
    latitude: originalLat,
    latitudeDelta: 0.0922,
    longitude: originalLng,
    longitudeDelta: 0.0421
  }

  return (
    <MapView
      // ref={(mapRef) => (mapRef === null ? null : mapRef.fitToElements(true))}
      style={[styles.map, wrapperStyle]}
      provider={PROVIDER_GOOGLE}
      region={region}
      mapPadding={styles.edgePadding}
      maxZoomLevel={22}
      // minZoomLevel={15}
      customMapStyle={customStyle}
    >
      <BMarker
        latitude={originalLat}
        longitude={originalLng}
        image={
          <PlaceOrgin
            width={Metrics.defaultImageWidth}
            height={Metrics.defaultImageHeight}
          />
        }
      />
      {!!destinationLat && !!destinationLng && type !== 0 && (
        <>
          <MapViewDirections
            origin={{
              latitude: originalLat,
              longitude: originalLng
            }}
            destination={{
              latitude: destinationLat,
              longitude: destinationLng
            }}
            // apikey={Config.GOOGLE_MAPS_API_KEY}
            apikey={'AIzaSyAcIPg4KEuiSe6uucNEO18PABpoO6Ymu5I'}
            strokeWidth={4}
            strokeColor={Colors.black}
          />
          <BMarker
            latitude={destinationLat}
            longitude={destinationLng}
            image={
              <Destination
                width={Metrics.defaultImageWidth}
                height={Metrics.defaultImageHeight}
              />
            }
          />
        </>
      )}
    </MapView>
  )
}

export default memo(BMap)
