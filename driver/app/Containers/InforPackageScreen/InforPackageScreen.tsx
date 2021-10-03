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
import styles from './Styles/InforPackageScreenStyles'
import { Colors, Metrics } from '@/Themes'

// Language
import { translate } from '@/Language'

// Svgs
import Camera from '@/Svgs/Icons/camera.svg'
import ImageSVG from '@/Svgs/Icons/image.svg'
import { RootState } from '@/Types'

type InforPackageScreenNavigationProps = StackNavigationProp<
  BookingStackParams,
  'InforPackageScreen'
>

const InforPackageScreen = () => {
  const navigation = useNavigation<InforPackageScreenNavigationProps>()
  const dispatch = useDispatch()

  const [weight, setWeight] = useState<number>(-1)
  const [numberOfDestinations, setnumberOfDestinations] = useState<number>(-1)
  const [image, setImage] = useState('')
  const [imgUri, setimgUri] = useState('')

  const selectWeight = (value: number) => setWeight(value)

  const formikRef = useRef<any>(null)
  const toastRef = useRef<Toast>(null)

  const handleSubmit = () => {
    formikRef.current?.handleSubmit()
  }

  const { originalLat, originalLng, address } = useSelector(
    (state: RootState) => state.map.originAndDestiationInfo.origin
  )

  const onSubmit = (values: FormikValues) => {
    const packageInfor = {
      weight: weight,
      image: image,
      originalLat: originalLat,
      originalLng: originalLng,
      address: address
    }

    dispatch(PackageInforActions.setPackageInfor(packageInfor))
    dispatch(PhaseActions.setnumberOfDestinations(numberOfDestinations))
    // dispatch(PhaseActions.setPhase(PhaseBookingBeforeRide.CHOOSE_LOCATION))
    // navigation.navigate('DashboardScreen')
    navigation.navigate('DestinationScreen')
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
            title={translate('packageInfor').toUpperCase()}
            canCall={false}
            titleStyle={styles.titleStyle}
          />
          <Parcel
            setnumberOfDestinations={setnumberOfDestinations}
            selectWeight={selectWeight}
            numberOfDestinations={numberOfDestinations}
            weight={weight}
          />
          <Formik
            innerRef={formikRef}
            initialValues={{
              recipientName: 'Trong Du',
              phoneNumber: '0354471333'
            }}
            onSubmit={onSubmit}
            validationSchema={ValidateRecipientSchema}
          >
            {({ values }) => (
              <>
                {/* <Recipient /> */}


                
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
                    !!values.phoneNumber &&
                    !!values.recipientName &&
                    weight !== -1 
                    // &&
                    // category !== -1
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

export default InforPackageScreen
