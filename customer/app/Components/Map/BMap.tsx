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
    (state: RootState) => state.ride.originAndDestiationInfo.origin
  )
  const { list_destination } = useSelector(
    (state: RootState) => state.ride.originAndDestiationInfo
  )

  let originalLat = 10.811074
  let originalLng = 106.625305

  let destinationLat2 = 10.811074
  let destinationLng2 = 106.625305

  let destinationLat = 10.811074
  let destinationLng = 106.625305

  let destinationLat1 = 10.811074
  let destinationLng1 = 106.625305

  console.log(list_destination)
  if (list_destination.length > 0) {
    destinationLat2 = parseFloat(list_destination[0].destinationlLat)
    destinationLng2 = parseFloat(list_destination[0].destinationLng)
    
    destinationLat = parseFloat(list_destination[1].destinationlLat)
    destinationLng = parseFloat(list_destination[1].destinationLng)

    destinationLat1 = parseFloat(coordinates.originalLat)
    destinationLng1 = parseFloat(coordinates.originalLng)
  }
  

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
            waypoints={[{
              latitude: destinationLat1,
              longitude: destinationLng1
            },
            {
              latitude: destinationLat2,
              longitude: destinationLng2
            }]}
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

          <BMarker
            latitude={destinationLat1}
            longitude={destinationLng1}
            image={
              <Destination
                width={Metrics.defaultImageWidth}
                height={Metrics.defaultImageHeight}
              />
            }
          />

          <BMarker
            latitude={destinationLat2}
            longitude={destinationLng2}
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
