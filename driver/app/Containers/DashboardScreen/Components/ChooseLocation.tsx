import React, { memo } from 'react'

// Component
import { FooterButton, RenderLocation } from './SmallComponents'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import PhaseActions from '@/Redux/PhaseRedux'
import SocketActions from '@/Redux/SocketRedux'
import { RootState, Coordinates } from '@/Types'

// Constnants
import {
  PhaseBookingBeforeRide,
  SERVICE
} from '@/Constants/PhaseReduxConstants'

// Styles
import styles from './Styles/ChooseLocationStyles'

// Language
import { translate } from '@/Language'

type ChooseLocationProps = {
  onPress: () => void
}

const ChooseLocation = (props: ChooseLocationProps) => {
  const { phase } = useSelector((state: RootState) => state.phase)

  const token = useSelector((state: RootState) => state.auth.token)
  console.log("ChooseLocation--------------")
  console.log(token)
  const { onPress } = props

  const dispatch = useDispatch()
  // const addressAndCoordinates = useSelector(
  //   (state: RootState) => state.map.addressAndCoordinates
  // )

  const service = useSelector((state: RootState) => state.phase.service)

  // const packageInfor =
  //   service === SERVICE.DELIVERY &&
  //   useSelector((state: RootState) => state.package.package)
  const packageInfor = useSelector((state: RootState) => {
    return state.package
  })

  console.log(packageInfor)

  // const packageInformation = packageInfor
  //   ? packageInfor[packageInfor.length - 1]
  //   : null

  const confirm = () => {
    dispatch(SocketActions.initSocket())
    if (packageInfor) {
      dispatch(
        SocketActions.emitDeliveryRequest(
          token,
          packageInfor
        )
      )
    }
    console.log("GET_BIKER")
    dispatch(PhaseActions.setPhase(PhaseBookingBeforeRide.GET_BIKER))
  }

  return (
    <>
      <RenderLocation wrapperStyle={styles.location} />
      {/* {phase === PhaseBookingBeforeRide.CHOOSE_LOCATION ? (
        <FooterButton title={translate('search')} onPress={onPress} />
      ) : ( */}
      <FooterButton title={translate('confirm')} onPress={confirm} />
      {/* )} */}
    </>
  )
}

export default memo(ChooseLocation)
