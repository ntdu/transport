import { StyleSheet } from 'react-native'

// Styles
import { Normalize, Colors } from '@/Themes'

export default StyleSheet.create({
  name: {
    fontSize: Normalize(18),
    fontWeight: 'bold',
    color: Colors.black,
    flex: 0.6,
    marginLeft: Normalize(10)
  },
  starView: {
    flex: 0.3,
    flexDirection: 'row'
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Normalize(20),
    justifyContent: 'flex-start'
  },
  imageDriverView: {
    flex: 0.1
  }
})
