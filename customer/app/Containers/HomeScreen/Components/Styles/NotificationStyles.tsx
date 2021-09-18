import { StyleSheet } from 'react-native'

// Styles
import { Metrics, Normalize, Colors } from '@/Themes'

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: Metrics.screenHeight / 6,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: Normalize(30),
    backgroundColor: '#9CF0F0',
    borderRadius: Normalize(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: Normalize(10),
    zIndex: -1
  },
  textNormal: {
    fontSize: Normalize(20),
    color: Colors.white
  },
  textHighlight: {
    color: Colors.red
  }
})
