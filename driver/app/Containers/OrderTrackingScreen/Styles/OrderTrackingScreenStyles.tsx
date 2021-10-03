import { StyleSheet } from 'react-native'

// Styles
import { Metrics, Normalize, Colors } from '@/Themes'

export default StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  headerTitle: {
    width: Metrics.screenWidth - Normalize(100),
    color: Colors.white
  },
  wrapperStyle: {
    backgroundColor: Colors.royalBlue
  }
})
