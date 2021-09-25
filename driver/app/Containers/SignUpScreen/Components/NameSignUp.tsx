import React, { useRef } from 'react'
import {
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  View,
  TextInput
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useFormikContext } from 'formik'

// Components
import { BBackButton, BLabelTextInput, BNextButton } from '@/Components'

// Functions
import { refTextInputFocus } from '@/Functions/RefFunctions'
import { isEmpty } from '@/Functions/ValidateFunctions'

// Styles
import styles from './Styles/NameSignUpStyles'

import { translate } from '@/Language'

type NameSignUp = {
  firstName: string
  lastName: string
  gender: boolean
  address: string
}

const NameSignUp = ({ ...childProps }) => {
  const { increasePhase, decreasePhase } = childProps

  const { values, errors, handleChange, setFieldValue } = useFormikContext<NameSignUp>()

  const FirstNameRef = useRef<TextInput>(null)
  const LastNameRef = useRef<TextInput>(null)
  const AddressRef = useRef<TextInput>(null)

  const onFirstNameSubmitEditing = () => refTextInputFocus(LastNameRef)
  // const onLastNameSubmitEditing = () => navigateFunc()
  const onLastNameSubmitEditing = () => refTextInputFocus(LastNameRef)
  const onAdressSubmitEditing = () => Keyboard.dismiss()

  const validateFunction = () => {
    const { firstName, lastName, gender, address } = values
    if (
      !!errors.firstName ||
      !!errors.lastName ||
      !!errors.gender ||
      !!errors.address ||
      isEmpty(lastName) ||
      isEmpty(firstName) ||
      isEmpty(gender) ||
      isEmpty(address)
    ) {
      return false
    }
    return true
  }

  const navigateFunc = () => {
    if (!validateFunction()) {
      return
    }

    increasePhase()
  }

  const onValueChange = (itemValue: boolean | null) =>
    setFieldValue('gender', itemValue)

  return (
    <SafeAreaView style={styles.mainContainer}>
      <BBackButton backFunc={decreasePhase} />
      <KeyboardAvoidingView
        style={styles.contentWrapper}
        behavior={'padding'}
        keyboardVerticalOffset={0}
        enabled={Platform.OS === 'ios'}
      >
        {/* <View style={styles.titleView}>
          <Text style={styles.name}>{translate('name?')}</Text>
          {!validateFunction() && (
            <Text style={styles.error}>{translate('nameRequired')}</Text>
          )}
        </View> */}
        <Text style={styles.signUpText}>{translate('SignUp')}</Text>
        <Text style={styles.enterInforText}>
          {translate('pleaseEnterInforBelow')}
        </Text>
        <View style={styles.nameView}>
          <BLabelTextInput
            value={values.firstName}
            ref={FirstNameRef}
            label={translate('firstName')}
            placeholder={translate('exampleFirstName')}
            wrapperStyle={styles.wrapperStyle}
            isRequired
            returnKeyType={'next'}
            onChangeText={handleChange('firstName')}
            onSubmitEditing={onFirstNameSubmitEditing}
          />
          <BLabelTextInput
            value={values.lastName}
            ref={LastNameRef}
            label={translate('lastName')}
            placeholder={translate('exampleLastName')}
            wrapperStyle={styles.wrapperStyle}
            isRequired
            returnKeyType={'done'}
            onChangeText={handleChange('lastName')}
            onSubmitEditing={onLastNameSubmitEditing}
          />
        </View>

        <BLabelTextInput
          value={values.address}
          label={translate('address')}
          placeholder={translate('exampleAddress')}
          wrapperStyle={styles.address}
          ref={AddressRef}
          returnKeyType={'done'}
          isRequired
          onChangeText={handleChange('address')}
          onSubmitEditing={onAdressSubmitEditing}
          errorMessage={errors.address}
        />

        <Text style={styles.genderText}>
          {translate('gender')}<Text style={styles.start}>*</Text>
        </Text>
        
        <Picker
          selectedValue={values.gender}
          style={styles.picker}
          onValueChange={onValueChange}
        >
          <Picker.Item label={translate('man')} value={true} />
          <Picker.Item label={translate('woman')} value={false} />
        </Picker>
        
      </KeyboardAvoidingView>
      <BNextButton
        navigateFunc={navigateFunc}
        enable={!!values.firstName && !!values.lastName}
      />
    </SafeAreaView>
  )
}

export default NameSignUp
