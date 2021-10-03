import { StyleSheet } from 'react-native'

// Styles
import { Colors, Normalize } from '@/Themes'

export default StyleSheet.create({
  container: {
    marginTop: Normalize(10),
    paddingBottom: Normalize(5),
    borderBottomColor: Colors.gainsboro,
    borderBottomWidth: Normalize(1)
  },
  request: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  rating: {
    marginTop: Normalize(10)
  }
})
