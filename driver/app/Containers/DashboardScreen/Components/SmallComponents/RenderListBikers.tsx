import React, { memo } from 'react'
import { View, FlatList, ListRenderItemInfo } from 'react-native'

// Components

import InforRider from './InforRider'
import InforBike from './InforBike'
// Types
import { PayloadFoundBikers } from '@/Types'

// Styles
import styles from './Styles/RenderListBikersStyles'

type RenderListBikersProps = {
  payloadFoundBikers: PayloadFoundBikers[]
}

const keyExtractor = (item: PayloadFoundBikers) =>
  'ListBikers' + item.userDetail.accountUsername

const RenderListBikers = (props: RenderListBikersProps) => {
  const { payloadFoundBikers } = props

  const renderListBikers = ({
    item,
    index
  }: ListRenderItemInfo<PayloadFoundBikers>) => {
    return (
      <View
        style={styles.container}
        key={'ListBikers' + item.userDetail.accountUsername + index}
      >
        <InforRider index={index} />
        <InforBike index={index} />
      </View>
    )
  }

  return (
    <>
      {payloadFoundBikers[0].phone !== '' && (
        <FlatList
          data={payloadFoundBikers}
          renderItem={renderListBikers}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  )
}

export default memo(RenderListBikers)
