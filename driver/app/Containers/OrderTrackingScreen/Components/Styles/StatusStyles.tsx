import { StyleSheet } from 'react-native'

// Styles
import { Colors, Normalize } from '@/Themes'

export default StyleSheet.create({
  container: {
    paddingHorizontal: Normalize(20),
    paddingTop: Normalize(10),
    paddingBottom: Normalize(10),
    borderBottomWidth: Normalize(1),
    borderBottomColor: Colors.gainsboro
  },
  title: {
    fontWeight: 'bold',
    color: Colors.nobel,
    marginBottom: Normalize(10)
  }
})
