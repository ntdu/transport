import { StyleSheet } from 'react-native'

// Styles
import { Normalize, Metrics, Colors } from '@/Themes'

export default StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: Metrics.doubleBaseMargin,
    justifyContent: 'center'
  },
  nameView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleView: {
    marginBottom: Normalize(80)
  },
  name: {
    fontFamily: 'LucidaGrandeBold',
    textAlign: 'center',
    fontSize: Normalize(20)
  },
  error: {
    textAlign: 'center',
    color: Colors.red
  }
})
