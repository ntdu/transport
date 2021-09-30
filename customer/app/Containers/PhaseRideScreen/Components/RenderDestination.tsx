import React from 'react'
import { View, Text, FlatList } from 'react-native'

// Styles
import styles from './Styles/RenderDestinationStyles'
import { Metrics, Normalize } from '@/Themes'

// Svgs
import PersonRaiseHand from '@/Svgs/Icons/personRaiseHandWhite.svg'
import Destination from '@/Svgs/Icons/destination.svg'

type RenderDestinationProps = {
  list_destination: any
  type: number
}

const RenderDestination = (props: RenderDestinationProps) => {
  console.log(props.list_destination)
  const renderDestination = ({ item }: any) => (
    <View style={styles.itemDestination}>
      <View style={styles.imageView}>
        {/* {props.type === 1 ? (
          <PersonRaiseHand
            width={Metrics.defaultImageWidth}
            height={Metrics.defaultImageHeight}
          />
        ) : (
          <Destination width={Normalize(20)} height={Normalize(20)} />
        )} */}
        <Destination width={Normalize(20)} height={Normalize(20)} />
      </View>
      <Text style={styles.destinationText}>{item.address}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
        {/* <View style={styles.imageView}>
          <PersonRaiseHand
            width={Metrics.defaultImageWidth}
            height={Metrics.defaultImageHeight}
          />
          
        </View>
        <Text style={styles.destinationText}>{props.list_destination}</Text> */}
      {props.type === 1 ? (
        <>
          <View style={styles.imageView}>
            <PersonRaiseHand
              width={Metrics.defaultImageWidth}
              height={Metrics.defaultImageHeight}
            />
          </View>
          <Text style={styles.destinationText}>{props.list_destination}</Text>
        </>
      ) : (
          <FlatList
            data={props.list_destination}
            renderItem={renderDestination}
            keyExtractor={item => item.phoneNumber}
          />
      )}
    </View>
  )
}

export default RenderDestination
