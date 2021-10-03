import { StyleSheet } from 'react-native'

// Styles
import { Colors, Normalize } from '@/Themes'

export default StyleSheet.create({
  container: {
    paddingHorizontal: Normalize(20),
    paddingTop: Normalize(15),
    paddingBottom: Normalize(15),
    borderBottomColor: Colors.gainsboro,
    borderBottomWidth: Normalize(1),
    flexDirection: 'row'
  },
  infor: {
    marginLeft: Normalize(20),
    justifyContent: 'center'
  },
  serviceText: {
    fontWeight: 'bold'
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
