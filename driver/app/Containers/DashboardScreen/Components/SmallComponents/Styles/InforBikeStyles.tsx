import { StyleSheet } from 'react-native'

// Styles
import { Metrics, Normalize, Colors } from '@/Themes'

export default StyleSheet.create({
  container: {
    marginHorizontal: Normalize(20),
    borderRadius: Normalize(20),
    marginTop: Normalize(10),
    alignItems: 'center',
    paddingTop: Normalize(10),
    paddingBottom: Normalize(10),
    paddingHorizontal: Normalize(20),
    alignSelf: 'center',
    width: Metrics.screenWidth - 40,
    backgroundColor: Colors.white,
    justifyContent: 'space-between'
  },
  imageDriver: {
    height: Normalize(20),
    width: Normalize(20),
    marginBottom: Normalize(30)
  },
  imageStar: {
    height: Normalize(20),
    width: Normalize(20),
    marginRight: Normalize(10)
  },
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
  licensePlate: {
    fontSize: Normalize(18),
    fontWeight: 'bold',
    color: Colors.black
  },
  imagePhone: {
    height: Normalize(20),
    width: Normalize(20),
    marginRight: Normalize(20),
    tintColor: Colors.white
  },
  imageMotobike: {
    height: Normalize(25),
    width: Normalize(25)
  },
  callButton: {
    backgroundColor: Colors.royalBlue,
    borderRadius: Normalize(5),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 0.3,
    height: 30
  },
  callText: {
    color: Colors.white
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageView: {
    flex: 0.1
  }
})
