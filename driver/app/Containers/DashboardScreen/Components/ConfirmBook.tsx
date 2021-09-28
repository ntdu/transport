import React, { memo, useEffect, useState, useRef } from 'react'
import { View, TextInput } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/Types'
import SocketActions from '@/Redux/SocketRedux'
import RideInforActions from '@/Redux/RideInforRedux'
// import PackageInforActions from '@/Redux/PackageInfor'
import PhaseActions from '@/Redux/PhaseRedux'

// Components
import { FooterButton, InforRider } from './SmallComponents'
import { BActivityIndicator, BToast } from '@/Components'

// Styles
import styles from './Styles/ConfirmBookStyles'
import { Metrics } from '@/Themes'

// Language
import { translate } from '@/Language'
import {
  PhaseBookingBeforeRide,
  PhaseBookingInRide,
  SERVICE
} from '@/Constants/PhaseReduxConstants'

// Svgs
import Dollar from '@/Svgs/Icons/money.svg'
import Toast from 'react-native-easy-toast'

const PriceSchema = Yup.object().shape({
  price: Yup.string().required('Required')
})
let isBook = false

const ConfirmBook = () => {
  const navigation = useNavigation()

  const dispatch = useDispatch()

  const addressAndCoordinates = useSelector(
    (state: RootState) => state.map.addressAndCoordinates
  )

  const toastRef = useRef<Toast>(null)

  const [price, setPrice] = useState('')

  const { coordinates, address } = addressAndCoordinates

  const { addressDestination, addressOriginalLocation } = address
  const {
    originalLat,
    originalLng,
    destinationLng,
    destinationLat
  } = coordinates
  const { indexChooseBiker } = useSelector((state: RootState) => state.phase)
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const token = useSelector((state: RootState) => state.auth.token)

  useEffect(() => {
    console.log("ConfirmBook")
    console.log(token)
  }, [])

  const { isChooseBikerRequest, errorEmitChooseBiker } = useSelector(
    (state: RootState) => state.socket
  )

  const { rideHash, bikers } = useSelector(
    (state: RootState) => state.phase.resultFoundBikers
  )

  const service = useSelector((state: RootState) => state.phase.service)

  const packageInfor = useSelector((state: RootState) => state.package.package)

  const phoneNumber = bikers[indexChooseBiker].userDetail?.phoneNumber

  const orderBiker = (price: string) => {
    setPrice(price)
    if (service === SERVICE.DELIVERY) {
      dispatch(
        SocketActions.emitChooseBikerDeliveryRequest(
          token,
          phoneNumber,
          rideHash,
          price
        )
      )
    } else {
      // dispatch(
      //   SocketActions.emitChooseBikerRequest(
      //     accessToken,
      //     phoneNumber,
      //     rideHash,
      //     price
      //   )
      // )
    }
    isBook = true
  }

  const serviceWhenDelivery = () => {
    // dispatch(
    //   PackageInforActions.setPriceDelivery(price, packageInfor.length - 1)
    // )
    // dispatch(
    //   PackageInforActions.setPhasePackage(
    //     PhaseBookingInRide.WAIT_BIKER,
    //     packageInfor.length - 1,
    //     Date.now()
    //   )
    // )

    // dispatch(
    //   PackageInforActions.setLocationByMapDelivery(
    //     {
    //       coordinates: {
    //         originalLat: originalLat,
    //         originalLng: originalLng,
    //         destinationLat: destinationLat,
    //         destinationLng: destinationLng
    //       },
    //       address: {
    //         addressOriginalLocation: addressOriginalLocation,
    //         addressDestination: addressDestination
    //       }
    //     },
    //     packageInfor.length - 1
    //   )
    // )

    // dispatch(
    //   PackageInforActions.setBikerAndRideHashDelivery(
    //     bikers[indexChooseBiker],
    //     rideHash,
    //     packageInfor.length - 1
    //   )
    // )

    // dispatch(PhaseActions.setIndexOfPhaseRide(packageInfor.length))
  }

  const serviceWhenRide = () => {
    console.log('service ride')
    dispatch(RideInforActions.setPriceRide(price))
    dispatch(
      RideInforActions.setLocationByMap(
        {
          originalLat: originalLat,
          originalLng: originalLng,
          destinationLat: destinationLat,
          destinationLng: destinationLng
        },
        {
          addressOriginalLocation: addressOriginalLocation,
          addressDestination: addressDestination
        }
      )
    )
    dispatch(
      RideInforActions.setBikerAndRideHash(bikers[indexChooseBiker], rideHash)
    )
    const time = Date.now()
    dispatch(RideInforActions.setPhaseRide(PhaseBookingInRide.WAIT_BIKER, time))

    dispatch(PhaseActions.setIndexOfPhaseRide(0))
  }

  useEffect(() => {
    if (!isChooseBikerRequest && isBook) {
      if (errorEmitChooseBiker) {
        toastRef.current?.show(translate('canNotSendRequest'))
      } else {
        if (service === SERVICE.DELIVERY) {
          serviceWhenDelivery()
        } else {
          serviceWhenRide()
        }

        // navigation.navigate('OrderTrackingScreen')

        dispatch(PhaseActions.setPhase(PhaseBookingBeforeRide.CHOOSE_SERVICE))
      }

      isBook = false
    }
  }, [errorEmitChooseBiker, isChooseBikerRequest, isBook])

  return (
    <>
      <Formik
        initialValues={{ price: '' }}
        onSubmit={(values) => {
          console.log(values.price)
          orderBiker(values.price)
        }}
        validationSchema={PriceSchema}
      >
        {({ handleChange, values, handleSubmit }) => (
          <View style={styles.mainContainer}>
            <InforRider
              index={indexChooseBiker}
              wrapperStyle={styles.container}
            />
            <View style={styles.inputView}>
              <View style={styles.imageView}>
                <Dollar height={25} width={Metrics.defaultImageWidth} />
              </View>
              <TextInput
                placeholder={'59000đ'}
                style={styles.textInput}
                value={values.price}
                onChangeText={handleChange('price')}
                keyboardType={'number-pad'}
              />
            </View>
            <FooterButton
              title={translate('order')}
              onPress={handleSubmit}
              wrapperStyle={styles.wrapperStyle}
            />
          </View>
        )}
      </Formik>
      {isChooseBikerRequest && <BActivityIndicator />}
      <BToast ref={toastRef} />
    </>
  )
}

export default memo(ConfirmBook)
