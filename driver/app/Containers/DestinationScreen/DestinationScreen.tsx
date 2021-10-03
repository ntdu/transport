import React, { useRef, useState } from 'react'
import {
  View,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  Image
} from 'react-native'
import { Formik, FormikValues } from 'formik'
import { launchCamera } from 'react-native-image-picker'
import RNFS from 'react-native-fs'
import Toast from 'react-native-easy-toast'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import PackageInforActions from '@/Redux/PackageInfor'
import PhaseActions from '@/Redux/PhaseRedux'

// Navigation
import { useNavigation } from '@react-navigation/native'
import { BookingStackParams } from '@/Navigation/AppNavigationType'
import { StackNavigationProp } from '@react-navigation/stack'

// Components
import { Parcel, Recipient } from './Components'
import { BNextButton, Header } from '@/Components'

// Functions
import ValidateRecipientSchema from '@/Functions/Validates/ValidateRecipient'

// Constants
import { PhaseBookingBeforeRide } from '@/Constants/PhaseReduxConstants'

// Styles
import styles from './Styles/InforDestinationScreenStyles'
import { Colors, Metrics } from '@/Themes'
import { RootState } from '@/Types'

// Language
import { translate } from '@/Language'

// Svgs
import Camera from '@/Svgs/Icons/camera.svg'
import ImageSVG from '@/Svgs/Icons/image.svg'

type InforPackageScreenNavigationProps = StackNavigationProp<
  BookingStackParams,
  'InforPackageScreen'
>

const DestinationScreen = () => {
  const navigation = useNavigation<InforPackageScreenNavigationProps>()
  const dispatch = useDispatch()

  const [weight, setWeight] = useState<number>(-1)
  const [image, setImage] = useState('')
  const [imgUri, setimgUri] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [name, setName] = useState('')

  const selectWeight = (value: number) => setWeight(value)

  const formikRef = useRef<any>(null)
  const toastRef = useRef<Toast>(null)

  const handleSubmit = () => {
    formikRef.current?.handleSubmit()
  }

  const { phaseDestination, numberOfDestinations } = useSelector(
    (state: RootState) => state.phase
  )
  const { list_destination } = useSelector(
    (state: RootState) => state.map.originAndDestiationInfo
  )
  const { originAndDestiationInfo } = useSelector(
    (state: RootState) => state.package
  )

  let header = ''
  if (phaseDestination === '1') {
    header = 'firstDestination'
  }
  else if (phaseDestination === '2') {
    header = 'secondDestination'
  }
  else if (phaseDestination === '3') {
    header = 'thirdDestination'
  }

  const onSubmit = (values: FormikValues) => {
    console.log(originAndDestiationInfo)
    console.log(phaseDestination)
    console.log(numberOfDestinations)
    const { address, destinationLat, destinationLng } = list_destination[list_destination.length - 1]

    console.log("onSubmit")
    const destinationInfor = {
      phoneNumber: phoneNumber,
      name: name,
      destinationLat: destinationLat,
      destinationLng: destinationLng,
      address: address
    }
    console.log(destinationInfor)
    dispatch(PackageInforActions.setDestination(destinationInfor))

    if(parseInt(phaseDestination) < parseInt(numberOfDestinations)) {
      setImage('')
      setimgUri('')
      setName('')
      setPhoneNumber('')
      dispatch(PhaseActions.setPhaseDestination(String(parseInt(phaseDestination) + 1)))
      navigation.navigate('DestinationScreen')
    }
    else {
      dispatch(PhaseActions.setPhase(PhaseBookingBeforeRide.CHOOSE_LOCATION))
      navigation.navigate('DashboardScreen')
    }

    // const packageInfor = {
    //   weight: weight,
    //   numberOfDestinations: numberOfDestinations,
    //   receiverInfor: {
    //     name: values.recipientName,
    //     phoneNumber: values.phoneNumber
    //   },
    //   image: image
    // }

    // dispatch(PackageInforActions.setPackageInfor(packageInfor))
    // dispatch(PhaseActions.setPhase(PhaseBookingBeforeRide.CHOOSE_LOCATION))
    // navigation.navigate('DashboardScreen')
  }

  const launchImage = () => {
    launchCamera(
      { mediaType: 'photo', maxWidth: 600, maxHeight: 600 },
      (image) => {
        if (image.assets) {
          if (image.assets[0].uri) {
            setimgUri(image.assets[0].uri)
            RNFS.readFile(image.assets[0].uri, 'base64')
              .then((base) => {
                setImage(base)
              })
              .catch((err) => toastRef.current?.show('ERROR LAUNCH CAMERA'))
          }
        }
      }
    )
  }

  return (
    <>
      <ScrollView
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView style={styles.container}>
          <StatusBar
            backgroundColor={Colors.royalBlue}
            hidden={false}
            barStyle={'light-content'}
          />
          <Header
            hasBackButton={false}
            title={translate(header).toUpperCase()}
            canCall={false}
            titleStyle={styles.titleStyle}
          />
          <Formik
            innerRef={formikRef}
            initialValues={{
              recipientName: name,
              phoneNumber: phoneNumber
            }}
            onSubmit={onSubmit}
            // validationSchema={ValidateRecipientSchema}
          >
            {({ values }) => (
              <> 
                <Recipient name={name} setName={setName} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}/>
                {
                  !!image ? (
                    <View style={styles.imgView}>
                      <View style={styles.takePicture}>
                        <Image
                          source={{ uri: imgUri }}
                          style={{ width: 300, height: 150 }}
                        />
                      </View>
                      <View style={styles.takeCamera}> 
                        <Camera
                          width={Metrics.defaultImageWidth}
                          height={Metrics.defaultImageHeight}
                          onPress={launchImage}
                        />
                      </View>

                    </View>
                  ) : 
                    <View style={styles.imageView}>
                      <View style={styles.image}>
                        <ImageSVG
                          width={Metrics.defaultImageWidth}
                          height={Metrics.defaultImageHeight}
                        />
                        <Text style={styles.imageName}>
                          {translate('parcelImage')}
                        </Text>
                      </View>
                      <Camera
                        width={Metrics.defaultImageWidth}
                        height={Metrics.defaultImageHeight}
                        onPress={launchImage}
                      />
                    </View>
                }
                <BNextButton
                  enable={
                    !!image &&
                    !!phoneNumber &&
                    !!name
                  }
                  navigateFunc={handleSubmit}
                  wrapperStyle={styles.buttonStyle}
                />
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  )
}

export default DestinationScreen
