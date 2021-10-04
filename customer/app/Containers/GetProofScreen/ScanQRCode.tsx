import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, Linking, StyleSheet } from 'react-native'
import { launchCamera } from 'react-native-image-picker'
import RNFS from 'react-native-fs'

// Navigation
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { MainStackParams } from '@/Navigation/AppNavigationType'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import SocketActions from '@/Redux/SocketRedux'
import { RootState } from '@/Types'

// Components
import { HeaderWithCamera } from './Components'
import { BButton } from '@/Components'

// Styles
import styles from './Styles/DeliverPackageProofScreenStyles'
import { Normalize } from '@/Themes'

// Language
import { translate } from '@/Language'

import QRCodeScanner from 'react-native-qrcode-scanner';

// Svg
import Camera from '@/Svgs/Icons/camera.svg'
type ScanQRCode = StackNavigationProp<
  MainStackParams,
  'ScanQRCode'
>

const DeliverPackageProofeScreen = () => {
  const navigation = useNavigation<ScanQRCode>()

  const dispatch = useDispatch()

  const [image, setImage] = useState('')
  const [scan, setScan] = useState(true)

  const [imageToShow, setImageToShow] = useState('')

  const rideHash = useSelector((state: RootState) => state.ride.rideHash)

  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const token = useSelector((state: RootState) => state.auth.token)

  const onPressCamera = () => {
    launchCamera(
      { mediaType: 'photo', maxWidth: 600, maxHeight: 600 },
      (image) => {
        if (image.assets) {
          if (image.assets[0].uri) {
            setImageToShow(image.assets[0].uri)
            RNFS.readFile(image.assets[0].uri, 'base64')
              .then((base) => {
                setImage(base)
              })
              .catch((err) => {
                console.log('ERROR LAUNCH CAMERA', err)
              })
          }
        }
      }
    )
  }

  const confirmSendPackage = () => {
    console.log("confirmSendPackage")
    // dispatch(SocketActions.emitCompleteDelivery(token, rideHash, image))
    // navigation.reset({
    //   index: 0,
    //   routes: [
    //     {
    //       name: 'PayScreen'
    //     }
    //   ]
    // })
  }
  const onSuccess = (e: any) => {
    console.log(e)
    const check = e.data;
    console.log('scanned data' + check);
    // this.setState({
    //     result: e,
    //     scan: false,
    //     ScanResult: true
    // })
    if (check === 'http') {
        Linking
            .openURL(e.data)
            .catch(err => console.error('An error occured', err));


    } else {
      setScan(false)
        // this.setState({
        //     result: e,
        //     scan: false,
        //     ScanResult: true
        // })
    }

}
  
  return (
    <View style={styles.container}>
      <HeaderWithCamera
        title={'Scan QR Code'}
        setImage={() => {}}
        needCamera={false}
      />
      {/* <Text style={styles.confirmSendText}>
        {translate('confirmSendQuestion')}
        adfad
      </Text> */}

      {/* <Text style={styles.rideHash}>{rideHash}</Text> */}

      <View style={styles.box}>
        {scan ? (
          <QRCodeScanner
            reactivate={true}
            showMarker={true}
            // ref={(node) => { this.scanner = node }}
            onRead={onSuccess}
            topContent={
                <Text >
                    Go to <Text >wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code to test.</Text>
            }
          />
        ) : (
          <Text style={styles.rideHash}>Mã QR hợp lệ</Text>
        )
        }
      </View>
     
    </View>
  )
}

export default DeliverPackageProofeScreen
