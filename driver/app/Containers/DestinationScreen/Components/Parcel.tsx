import React from 'react'
import {
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity
} from 'react-native'
import { Picker } from '@react-native-picker/picker'

// Components
import {
  optionCategory,
  OptionCategoryType,
  optionWeight,
  optionDestination
} from './ParcelConstants'

// Styles
import styles from './Styles/ParcelStyles'

// Language
import { translate } from '@/Language'

const keyExtractorCategory = (item: OptionCategoryType) =>
  'optionCategory' + item.value

type ParcelProps = {
  setnumberOfDestinations: (value: number) => void
  selectWeight: (value: number) => void
  weight: number
  numberOfDestinations: number
}

const Parcel = (props: ParcelProps) => {
  const { setnumberOfDestinations, selectWeight, weight, numberOfDestinations } = props

  const onNumofDesChange = (value: number) => {
    console.log(value)
    setnumberOfDestinations(value)
  }

  const onWeightChange = (value: number) => {
    console.log(value)
    selectWeight(value)
  }
  // const onValueChange = (value: number) => setnumberOfDestinations(value)

  // const renderCategory = ({
  //   item,
  //   index
  // }: ListRenderItemInfo<OptionCategoryType>) => {
  //   return (
  //     <TouchableOpacity
  //       key={index}
  //       style={[styles.category, index === category && styles.selectedCategory]}
  //       onPress={selectType(index)}
  //     >
  //       <Text style={styles.categoryText}>{translate(item.label)}</Text>
  //     </TouchableOpacity>
  //   )
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{translate('details')}</Text>
      {/* <Text style={styles.typeText}>{translate('type')}</Text>
      <FlatList
        data={optionCategory}
        renderItem={renderCategory}
        keyExtractor={keyExtractorCategory}
        horizontal
        showsHorizontalScrollIndicator={false}
      /> */}
      <View style={styles.weight}>
        <Text style={styles.weightText}>{translate('weight')} (Kg)</Text>
        <Picker
          style={styles.picker}
          onValueChange={onWeightChange}
          selectedValue={weight}
          mode={'dropdown'}
        >
          <Picker.Item label={'Choose'} value={-1}/>
          {optionWeight.map((weight) => (
            <Picker.Item
              label={weight.label}
              value={weight.value}
              key={weight.value}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.weight}>
        <Text style={styles.weightText}>{translate('destinationNumber')}</Text>
        <Picker
          style={styles.picker}
          onValueChange={onNumofDesChange}
          selectedValue={numberOfDestinations}
          mode={'dropdown'}
        >
          <Picker.Item label={'Choose'} value={-1}/>
          {optionDestination.map((num) => (
            <Picker.Item
              label={num.label}
              value={num.value}
              key={num.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  )
}

export default Parcel
