import React, { useRef, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useFormikContext } from 'formik'
import { Colors, Metrics, Normalize } from '@/Themes'

// Components
import { BLabelTextInput } from '@/Components'

// Functions
import { refTextInputFocus } from '@/Functions/RefFunctions'

// Style
import styles from './Styles/RecipientStyles'

// Navigation
import { useNavigation } from '@react-navigation/native'
import { BookingScreens } from '@/Constants/AppNavigationConstants'

// Language
import { translate } from '@/Language'
import Location from '@/Svgs/Icons/location.svg'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/Types'
import MapActions from '@/Redux/MapRedux'

type Recipient = {
  recipientName: string
  phoneNumber: string
  image: string
}

const Recipient = ( props: any) => {
  const { name, setName, phoneNumber, setPhoneNumber } = props
  console.log("Recipient--------------------------------")
  console.log(name)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { values, errors, handleChange } = useFormikContext<Recipient>()

  const { list_destination } = useSelector(
    (state: RootState) => state.map.originAndDestiationInfo
  )
  const { phaseDestination, numberOfDestinations } = useSelector(
    (state: RootState) => state.phase
  )

  let address = null
  if (list_destination.length == parseInt(phaseDestination)) {
    address = list_destination[list_destination.length - 1].address
  }

  const { originAndDestiationInfo } = useSelector(
    (state: RootState) => state.map
  )
  // const location = originAndDestiationInfo.list_destination[0].address
  let nameRef = useRef<TextInput>(null)
  let phoneNumberRef = useRef<TextInput>(null)

  const onNameSubmitEditing = () => refTextInputFocus(phoneNumberRef)
  const navigateListBikersScreen = () => navigation.navigate(BookingScreens.SearchPlacesScreen, {type: 'Destination'})
 
  const handleChangeName = (value: any) => {
    setName(value);
  }
  const handleChangePhone = (value: any) => {
    setPhoneNumber(value);
  }
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.titleText}>{translate('recipientInfor')}</Text>

        <>
          <BLabelTextInput
            label={translate('recipientName')}
            value={name}
            // onChangeText={handleChange('recipientName')}
            onChangeText={handleChangeName}
            ref={nameRef}
            errorMessage={errors.recipientName}
            onSubmitEditing={onNameSubmitEditing}
            wrapperStyle={styles.wrapperStyle}
            textInputStyle={styles.textInputStyle}
            returnKeyType={'next'}
            isRequired
          />
          <BLabelTextInput
            label={translate('phoneNumber')}
            value={phoneNumber}
            onChangeText={handleChangePhone}
            ref={phoneNumberRef}
            errorMessage={errors.phoneNumber}
            wrapperStyle={styles.wrapperStyle}
            textInputStyle={styles.textInputStyle}
            returnKeyType={'next'}
            keyboardType={'phone-pad'}
            isRequired
          />
         
          <View style={{justifyContent: 'center',alignItems: 'flex-start', marginTop: 15}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 14, color: Colors.black}}>Location</Text>
              <Text style={{fontSize: Normalize(14), color: Colors.red}}>*</Text>
            </View>

            <TouchableOpacity
              // style={[styles.chooseLocationButton, styles.seperate]}
              onPress={navigateListBikersScreen}
              activeOpacity={0.9}
              style={{
                width: '100%',
                height: Normalize(120),
                borderRadius: 5,
                borderColor: Colors.black,
                borderWidth: Normalize(1),
              }}
            >
              <Text 
                style={{
                  padding: Normalize(10),
                  fontSize: Normalize(22),
                  width: '90%',
                }}
              >
                { address }
              </Text>
            </TouchableOpacity>
          </View>
        </>
      </View>
    </>
  )
}

export default Recipient
