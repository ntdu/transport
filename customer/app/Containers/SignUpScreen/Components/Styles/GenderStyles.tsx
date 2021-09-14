import { StyleSheet } from 'react-native'

// Styles
import { ApplicationStyles, Normalize, Metrics } from '@/Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  contentWrapper: {
    flex: 1,
    paddingHorizontal: Metrics.doubleBaseMargin,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textGender: {
    fontSize: Normalize(20),
    fontFamily: 'LucidaGrandeBold'
  },
  picker: {
    height: Normalize(50),
    width: (Metrics.screenWidth * 3) / 4
  }
})
