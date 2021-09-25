import React, { memo } from 'react'
import Config from 'react-native-config'
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

// Redux
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { RootState } from '@/Types'
import MapActions from '@/Redux/MapRedux'

// Components
import { BMarker } from './Components'

// Styles
import styles from './Styles/BMapStyles'
import { Colors, Metrics } from '@/Themes'
import CustomMapStyles from './Styles/CustomMapStyles'

// Svgs
import PlaceOrgin from '@/Svgs/Icons/location.svg'
import Destination from '@/Svgs/Icons/destination.svg'
const BMap = () => {
  const dispatch = useDispatch()

  const {
    originalLat,
    originalLng,
    destinationLat,
    destinationLng
  } = useSelector(
    (state: RootState) => state.map.addressAndCoordinates.coordinates,
    shallowEqual
  )

  const region: Region = {
    latitude: originalLat,
    latitudeDelta: 0.0922,
    longitude: originalLng,
    longitudeDelta: 0.0421
  }

  const getDistanceFunc = (data: any) =>
    dispatch(MapActions.getDistance(data.distance))

  return (
    <MapView
      // ref={(mapRef) => {
      //   mapRef === null ? null : mapRef.fitToElements(true)
      // }}
      style={styles.map}
      region={region}
      mapPadding={styles.edgePadding}
      provider={PROVIDER_GOOGLE}
      customMapStyle={CustomMapStyles}
      maxZoomLevel={18}
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
      {!!destinationLat && !!destinationLng && (
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
            strokeWidth={6}
            strokeColor={Colors.fruitSalad}
            onReady={getDistanceFunc}
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
