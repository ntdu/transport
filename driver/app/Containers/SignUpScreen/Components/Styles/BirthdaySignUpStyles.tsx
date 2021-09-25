import { StyleSheet } from 'react-native'

// Styles
import { Normalize, Metrics, Colors } from '@/Themes'

export default StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  datePickerView: {
    position: 'absolute',
    bottom: 0,
    flex: 0.3,
    width: Metrics.screenWidth
  },
  wrapperStyle: {
    position: 'absolute',
    bottom: Normalize(200)
  },
  textBirthDay: {
    textAlign: 'center',
    fontSize: Normalize(20),
    fontFamily: 'LucidaGrandeBold',
    marginBottom: Normalize(10)
  },
  date: {
    borderBottomColor: Colors.black,
    borderBottomWidth: Normalize(1),
    width: '80%',
    alignSelf: 'center'
  },
  textView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.7
  }
})
