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
    justifyContent: 'flex-start'
  },
  wrapperStyle: {
    width: '45%'
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
  },
  nextButton: {
    marginLeft: Normalize(20)
  },
  picker: {
    height: Normalize(50),
    width: (Metrics.screenWidth * 1) / 2 
  },
  signUpText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: Normalize(10),
    fontFamily: 'LucidaGrandeBold'
  },
  enterInforText: {
    marginBottom: Normalize(20),
    fontSize: Normalize(18),
    fontFamily: 'LucidaGrande'
  },
  genderText: {
    marginTop: Normalize(20)
  },
  address: {
    marginTop: Normalize(20)
  },
  start: {
    color: Colors.red
  }
})
