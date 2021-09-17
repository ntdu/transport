import React, { useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { useFormikContext } from 'formik'

// Styles
import styles from './Styles/BirthdaySignUpStyles'

// Language
import { translate } from '@/Language'
import { BBackButton, BNextButton } from '@/Components'

type BirthdaySignUp = {
  dateOfBirth: string
}

const BirthdaySignUp = ({ ...childProps }) => {
  const { increasePhase, decreasePhase } = childProps

  const [date, setDate] = useState(new Date())

  const { values, setFieldValue, handleSubmit } = useFormikContext<BirthdaySignUp>()

  const navigateFunc = () => {
    // increasePhase()
    handleSubmit()
  }

  const onDateChange = (date: Date) => {
    setDate(date)
    setFieldValue('dateOfBirth', date.toISOString().substr(0, 10))
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <BBackButton backFunc={decreasePhase} />
      <View style={styles.textView}>
        <Text style={styles.textBirthDay}>{translate('birthday')}</Text>

        <Text style={styles.date}>{values.dateOfBirth}</Text>
      </View>
      <BNextButton
        wrapperStyle={styles.wrapperStyle}
        navigateFunc={navigateFunc}
        enable={!!values.dateOfBirth}
      />
      <DatePicker
        date={date}
        mode={'date'}
        onDateChange={onDateChange}
        style={styles.datePickerView}
      />
    </SafeAreaView>
  )
}

export default BirthdaySignUp
