import React, { useState, useEffect, useContext } from 'react'
import { View, Text } from 'react-native'

// Context
import HomeScreenContext from '../HomeScreenContext'

// Styles
import styles from './Styles/NotificationStyles'

// Language
import { translate } from '@/Language'

const Notification = () => {
  const [isVisible, setIsVisible] = useState(false)

  // const phase = useContext(HomeScreenContext)?.state.phase

  // useEffect(() => {
  //   if (phase !== 0) {
  //     setIsVisible(true)
  //     setTimeout(() => setIsVisible(false), 3000)
  //   }
  // }, [phase])

  const renderText = () => {
    return (
      <>
        <Text style={styles.textNormal}>{translate('youNow')} </Text>
        <Text style={[styles.textNormal, styles.textHighlight]}>
          {translate('ready')}
        </Text>
        <Text style={styles.textNormal}> {translate('getRide')}</Text>
      </>
    )
  }

  return isVisible ? (
    <View style={styles.container}>{renderText()}</View>
  ) : (
    <></>
  )
}

export default Notification
