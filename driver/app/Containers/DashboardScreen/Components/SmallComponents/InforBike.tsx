import React, { memo } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/Types'
import PhaseActions from '@/Redux/PhaseRedux'

// Functions
import Call from '@/Functions/CallBikerFunctions'

// Styles
import styles from './Styles/RenderListBikersStyles'
import { Metrics } from '@/Themes'

// Language
import { translate } from '@/Language'
import { PhaseBookingBeforeRide } from '@/Constants/PhaseReduxConstants'

// Svgs
import DeliverMan from '@/Svgs/Icons/licensePlate.svg'
import Phone from '@/Svgs/Icons/phone.svg'

type InforBikeProps = {
  index: number
}

const InforBike = (props: InforBikeProps) => {
  const dispatch = useDispatch()

  const { bikers } = useSelector(
    (state: RootState) => state.phase.resultFoundBikers
  )

  const { index } = props

  const phoneNumber = bikers[index].userDetail.phoneNumber
  const callBiker = (phoneNumber: string, index: number) => () => {
    Call(phoneNumber)

    setTimeout(() => {
      dispatch(PhaseActions.setIndexChooseBiker(index))
      dispatch(PhaseActions.setPhase(PhaseBookingBeforeRide.CHOOSE_BIKER))
    }, 1000)
  }

  return (
    <View style={styles.rowView}>
      <View style={styles.imageView}>
        <DeliverMan
          width={Metrics.defaultImageWidth}
          height={Metrics.defaultImageHeight}
        />
      </View>
      <Text style={styles.name}>{'59V3-18722'}</Text>
      <TouchableOpacity
        style={styles.callButton}
        onPress={callBiker(phoneNumber, index)}
      >
        <Phone width={20} height={20} style={styles.imagePhone} />
        <Text style={styles.callText}>{translate('call')}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default memo(InforBike)
