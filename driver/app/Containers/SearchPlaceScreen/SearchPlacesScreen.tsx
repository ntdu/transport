import React, { useRef, useEffect } from 'react'
import { TouchableOpacity, Text, View, SafeAreaView } from 'react-native'
import Config from 'react-native-config'
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef
} from 'react-native-google-places-autocomplete'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import MapActions from '@/Redux/MapRedux'
import PhaseActions from '@/Redux/PhaseRedux'
import { RootState } from '@/Types'

// Constants
import { PhaseBooking } from '@/Constants/PhaseReduxConstants'

// Styles
import styles from './Styles/SearchPlacesScreenStyles'
import { Metrics, Normalize } from '@/Themes'

// Language
import { translate } from '@/Language'

// Svgs
import Location from '@/Svgs/Icons/location.svg'
import Destination from '@/Svgs/Icons/destination.svg'
import LeftArrow from '@/Svgs/Icons/leftArrowBlack.svg'
// const homePlace = {
//   description: 'Home',
//   geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }
// }
// const workPlace = {
//   description: 'Work',
//   geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }
// }

const SearchPlacesScreen = ({ route }: any) => {
  const { type } = route.params;
  console.log(type)
  console.log('SearchPlacesScreen')
  // console.log(Config.GOOGLE_MAPS_API_KEY);
  console.log("-------------------------------");


  const navigation = useNavigation()
  const dispatch = useDispatch()

  // const { addressOriginalLocation, addressDestination } = useSelector(
  //   (state: RootState) => state.map.addressAndCoordinates.address
  // )
  // const { addressAndCoordinates } = useSelector(
  //   (state: RootState) => state.map
  // )

  
  const refDestinationLocation = useRef<GooglePlacesAutocompleteRef>(null)
  const refOriginalLocation = useRef<GooglePlacesAutocompleteRef>(null)

  const navigateBack = () => navigation.goBack()

  const onPressYourOriginalLocation = (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null
  ) => {
    console.log("onPressYourOriginalLocation")
    if (details) {
      const lat = details.geometry.location.lat
      const lng = details.geometry.location.lng
      const address = data.description

      console.log(lat)
      console.log(lng)
      console.log(address)
      console.log("-------------------------------------")
      //   lat: 10.800972
      //   lng: 106.706469
      //   address: 195/10 Điện Biên Phủ, Phường 15, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam

      // LOG  10.8094057
      // LOG  106.6710919
      // LOG  119 Phổ Quang, Phường 9 (Phú Nhuận), Phú Nhuận, Thành phố Hồ Chí Minh, Việt Nam

      //     10.7731708,
      //     106.6353054,
      //     '262/13/6 Lũy Bán Bích, Phú Trung, Tân Phú, Thành phố Hồ Chí Minh, Việt Nam'
      
      dispatch(MapActions.setOriginalMap(lat, lng, address))
    }
  }
  const { phaseDestination, numberOfDestinations } = useSelector(
    (state: RootState) => state.phase
  )
  
  const addressOrigin = '119 Phổ Quang, Phường 9 (Phú Nhuận), Phú Nhuận, Thành phố Hồ Chí Minh, Việt Nam'
  let ori_lat = 10.8094057
  let ori_lng = 106.6710919
  
  let addressDestination = ''
  let des_lat = 0
  let des_lng = 0

  if (phaseDestination === '1') {
    addressDestination = '262/13/6 Lũy Bán Bích, Phú Trung, Tân Phú, Thành phố Hồ Chí Minh, Việt Nam'
    des_lat = 10.7731708
    des_lng = 106.6353054
  }
  else if(phaseDestination === '2') {
    addressDestination = '195/10 Điện Biên Phủ, Phường 15, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam'
    des_lat = 10.800972
    des_lng = 106.706469
  }
  else {
    addressDestination = '300 Lý thường kiệt, phường 3, Quận 10, Thành phố Hồ Chí Minh'
  }


  const onPressYourDestination = (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null
  ) => {
    if (details) {
      const lat = details.geometry.location.lat
      const lng = details.geometry.location.lng
      const address = data.description
      dispatch(PhaseActions.setPhase(PhaseBooking.CONFIRM_BOOK))
      dispatch(MapActions.setDestination(lng, lat, address))
      navigateBack()
    }
  }

  const renderLeftButtonYourLocaition = () => {
    return (
      <Location
        width={Normalize(20)}
        height={Normalize(20)}
        style={styles.image}
      />
    )
  }

  const renderLeftButtonDestination = () => {
    return (
      <Destination
        width={Normalize(20)}
        height={Normalize(20)}
        style={styles.image}
      />
    )
  }

  const renderRow = (data: GooglePlaceData, index: number) => {
    const { description, structured_formatting } = data
    const { main_text } = structured_formatting

    return (
      <View key={'resultRow' + index}>
        <Text style={styles.mainText}>{main_text}</Text>
        <Text numberOfLines={1}>{description}</Text>
      </View>
    )
  }

  // useEffect(() => {
  //   // dispatch(MapActions.setOriginalLocation(107.122123, 106.123123, '109 Lý thường kiệt, phường 3, Quận 10, Thành phố Hồ Chí Minh'))
  //   dispatch(MapActions.setDestination(107.122123, 106.123123, '109 Lý thường kiệt, phường 3, Quận 10, Thành phố Hồ Chí Minh'))
  //   // console.log(addressAndCoordinates);
  //   // addressOriginalLocation &&
  //   //   refOriginalLocation.current?.setAddressText(addressOriginalLocation)
  //   addressDestination &&
  //     refDestinationLocation.current?.setAddressText(addressDestination)
  // }, [addressDestination])

  useEffect(() => {
    // dispatch(MapActions.setOriginalLocation(107.122123, 106.123123, '109 Lý thường kiệt, phường 3, Quận 10, Thành phố Hồ Chí Minh'))
    if (type === 'Origin') {
      dispatch(MapActions.setOriginalMap(ori_lng, ori_lat, addressOrigin))
    }
    else if (type === 'Destination') {
      dispatch(MapActions.setDestinationMap(des_lng, des_lat, addressDestination))
    }
    // console.log(addressAndCoordinates);
  }, [])
  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.backIcon} onPress={navigateBack}>
          <LeftArrow
            width={Metrics.defaultImageWidth}
            height={Metrics.defaultImageHeight}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        
        {/* <GooglePlacesAutocomplete
          ref={refOriginalLocation}
          placeholder={translate('originalLocation')}
          fetchDetails={true}
          query={{
            // key: Config.GOOGLE_MAPS_API_KEY,
            key: 'AIzaSyAcIPg4KEuiSe6uucNEO18PABpoO6Ymu5I',
            language: 'vi',
            components: 'country:vn'
          }}
          styles={{
            textInput: styles.textInput,
            container: styles.autocompleteContainer,
            listView: styles.listView,
            separator: styles.separator,
            row: styles.row
          }}
          textInputProps={{
            selectTextOnFocus: true
          }}
          isRowScrollable={false}
          enablePoweredByContainer={false}
          onPress={onPressYourOriginalLocation}
          renderRow={renderRow}
          renderLeftButton={renderLeftButtonYourLocaition}
          debounce={2000}
          onFail={error => console.error(error)}
        /> */}

        {/* <GooglePlacesAutocomplete
          ref={refDestinationLocation}
          placeholder={translate('whereTo')}
          fetchDetails={true}
          query={{
            // key: Config.GOOGLE_MAPS_API_KEY,
            // key: 'AIzaSyAcIPg4KEuiSe6uucNEO18PABpoO6Ymu5I',
            key: 'a',
            language: 'vi',
            components: 'country:vn'
          }}
          styles={{
            textInput: styles.textInput,
            container: styles.destinationContainer,
            separator: styles.separator,
            row: styles.row
          }}
          textInputProps={{
            selectTextOnFocus: true,
            returnKeyType: 'none'
          }}
          isRowScrollable={false}
          renderRow={renderRow}
          enablePoweredByContainer={false}
          onPress={onPressYourDestination}
          renderLeftButton={renderLeftButtonDestination}
          debounce={2000}
        /> */}
      </View>
    </SafeAreaView>
  )
}

export default SearchPlacesScreen
