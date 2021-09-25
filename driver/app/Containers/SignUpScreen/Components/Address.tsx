import React from 'react'
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native'
import { useFormikContext } from 'formik'

// Components
import { BBackButton, BLabelTextInput, BNextButton } from '@/Components'

// Functions
import { isEmpty } from '@/Functions/ValidateFunctions'

// Styles
import styles from './Styles/AddressStyles'

// Language
import { translate } from '@/Language'

type Address = {
  address: string
}

const Address = ({ ...childProps }) => {
  const { decreasePhase } = childProps

  const {
    values,
    handleChange,
    handleSubmit,
    errors
  } = useFormikContext<Address>()

  const onSubmit = () => {
    if (!!errors.address || isEmpty(values.address)) {
      return
    }
    handleSubmit()
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <BBackButton backFunc={decreasePhase} />
      <KeyboardAvoidingView
        style={styles.contentWrapper}
        behavior={'padding'}
        keyboardVerticalOffset={0}
        enabled={Platform.OS === 'ios'}
      >
        <BLabelTextInput
          value={values.address}
          label={translate('address')}
          placeholder={translate('exampleAddress')}
          returnKeyType={'done'}
          onChangeText={handleChange('address')}
          onSubmitEditing={onSubmit}
          errorMessage={errors.address}
        />
      </KeyboardAvoidingView>
      <BNextButton navigateFunc={onSubmit} enable={!!values.address} />
    </SafeAreaView>
  )
}

export default Address
