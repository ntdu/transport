import React, { memo } from 'react'
import { Marker } from 'react-native-maps'

type BMarkerProps = {
  latitude: number
  longitude: number
  image: Element
}

const BMarker = (props: BMarkerProps) => {
  const { latitude, longitude, image } = props
  return (
    <Marker
      coordinate={{
        latitude: latitude,
        longitude: longitude
      }}
    >
      {image}
    </Marker>
  )
}

export default memo(BMarker)
