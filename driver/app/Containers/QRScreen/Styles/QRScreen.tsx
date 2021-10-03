import { StyleSheet } from 'react-native'

// Styles
import { Metrics, Normalize, Colors } from '@/Themes'

export default StyleSheet.create({
  codeView: {
    padding: Normalize(10),
    backgroundColor: Colors.white,
    marginHorizontal: Normalize(10),
    marginTop: Normalize(100),
    borderRadius: Normalize(10)
  },
  qrView: {
    padding: Normalize(10),
    backgroundColor: Colors.white,
    marginHorizontal: Normalize(10),
    marginTop: Normalize(10),
    borderRadius: Normalize(10)
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: Normalize(18),
    marginBottom: Normalize(10)
  },
  weight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  codeText: {
    marginLeft: Normalize(10)
  },
  headerTitle: {
    width: Metrics.screenWidth - Normalize(100),
    color: Colors.white
  },
  wrapperStyle: {
    backgroundColor: Colors.royalBlue
  }
})
