import React from 'react'
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Text
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useFormikContext } from 'formik'

// Components
import { BBackButton, BNextButton } from '@/Components'

// Styles
import styles from './Styles/GenderStyles'

// Language
import { translate } from '@/Language'

type Gender = {
  gender: boolean
}

const Gender = ({ ...childProps }) => {
  const { increasePhase, decreasePhase } = childProps

  const { values, setFieldValue } = useFormikContext<Gender>()

  const navigateFunc = () => {
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
        <Text style={styles.textGender}>{translate('gender?')}</Text>

        <Picker
          selectedValue={values.gender}
          style={styles.picker}
          onValueChange={onValueChange}
        >
          <Picker.Item label={translate('man')} value={true} />
          <Picker.Item label={translate('woman')} value={false} />
        </Picker>
      </KeyboardAvoidingView>
      <BNextButton navigateFunc={navigateFunc} enable={true} />
    </SafeAreaView>
  )
}

export default Gender
