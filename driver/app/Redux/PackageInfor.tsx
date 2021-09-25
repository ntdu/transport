import { createReducer, createActions } from 'reduxsauce'
import Immutable, { asMutable } from 'seamless-immutable'

// Types
import { PackageInfor, PackageState } from '@/Types/RootState'
import {
  PhaseBookingAfterRide,
  PhaseBookingInRide
} from '@/Constants/PhaseReduxConstants'
import {
  mapDataUserToFrontEnd,
  mapDeliveryStateAfterRefresh
} from '@/Functions/MapDataToFrontendFunctions'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setPackageInfor: ['packageInfor'],
  setPhasePackage: ['phase', 'index', 'time'],

  setLocationByMapDelivery: ['addressAndCoordinates', 'index'],

  setBikerAndRideHashDelivery: ['biker', 'rideHash', 'index'],

  setPriceDelivery: ['price', 'index'],

  refreshDeliveryDataAfterQuit: ['deliveryDatas']
})

export const PackageInforTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE: Immutable.ImmutableObject<PackageState> = Immutable(
  {
    package: [
      {
        phaseBooking: PhaseBookingInRide.CONFIRM_RIDE,
        time: 1620470263008,
        price: '1000',
        category: 0,
        weight: 1,
        receiverInfor: {
          phoneNumber: '',
          name: ''
        },
        senderProof: null,
        biker: {
          phone: '',
          userDetail: {
            accountUsername: '',
            address: '',
            dateOfBirth: '',
            firstName: '',
            gender: true,
            lastName: '',
            phoneNumber: '',
            createdDate: ''
          },
          distance: 0
        },
        rideHash: '',
        bikerLocationUpdate: {
          lat: 10.7721767,
          lng: 106.6153013
        },
        addressAndCoordinates: {
          address: {
            addressOriginalLocation: '262 Luy Ban Bich, Hoa Thanh, Tan Phu',
            addressDestination: '262 Luy Ban Bich, Hoa Thanh, Tan Phu'
          },
          coordinates: {
            originalLat: 0,
            originalLng: 0,
            destinationLat: 0,
            destinationLng: 0
          }
        }
      },
      {
        phaseBooking: PhaseBookingInRide.WAIT_BIKER,
        time: 1620470263008,
        category: 0,
        weight: 1,
        receiverInfor: {
          phoneNumber: '',
          name: ''
        },
        senderProof: null,
        biker: {
          phone: '',
          userDetail: {
            accountUsername: '',
            address: '',
            dateOfBirth: '',
            firstName: 'Tran',
            gender: true,
            lastName: 'Hung',
            phoneNumber: '0971126169'
          },
          distance: 0
        },
        rideHash: '',
        bikerLocationUpdate: {
          lat: 10.7721767,
          lng: 106.6153013
        },
        addressAndCoordinates: {
          address: {
            addressOriginalLocation: '262 Luy Ban Bich, Hoa Thanh, Tan Phu',
            addressDestination: '262 Luy Ban Bich, Hoa Thanh, Tan Phu'
          },
          coordinates: {
            originalLat: 0,
            originalLng: 0,
            destinationLat: 0,
            destinationLng: 0
          }
        }
      },
      {
        phaseBooking: PhaseBookingInRide.WAIT_BIKER,
        time: 1620470263008,
        category: 0,
        weight: 1,
        receiverInfor: {
          phoneNumber: '',
          name: 'Tran Hieu'
        },
        senderProof: null,
        biker: {
          phone: '',
          userDetail: {
            accountUsername: '',
            address: '',
            dateOfBirth: '',
            firstName: 'Tran',
            gender: true,
            lastName: 'Hung',
            phoneNumber: '0971126169'
          },
          distance: 0
        },
        rideHash: '',
        bikerLocationUpdate: {
          lat: 10.7721767,
          lng: 106.6153013
        },
        addressAndCoordinates: {
          address: {
            addressOriginalLocation:
              '262 Luy Ban Bich, Hoa Thanh, Tan Phu, Thành Phố Hồ Chí Minh, 700000',
            addressDestination:
              '262 Luy Ban Bich, Hoa Thanh, Tan Phu, Thành Phố Hồ Chí Minh, 700000'
          },
          coordinates: {
            originalLat: 0,
            originalLng: 0,
            destinationLat: 0,
            destinationLng: 0
          }
        }
      }
    ]
  }
)

/* ------------- Reducers ------------- */
// This function need to be in PackageRedux

export const setPackageInfor = (
  state = INITIAL_STATE,
  { packageInfor }: any
) => {
  const { category, weight, receiverInfor, image } = packageInfor
  return state.merge({
    package: state.package.concat({
      category,
      weight,
      receiverInfor,
      senderProof: image,
      phaseBooking: '',
      time: 0,
      price: '0'
    })
  })
}

export const setPhasePackage = (
  state = INITIAL_STATE,
  { phase, index, time }: any
) => {
  const tempPackage = asMutable(state.package, { deep: true })
  tempPackage[index].phaseBooking = phase
  tempPackage[index].time = time
  return state.merge({ package: tempPackage })
}

export const setLocationByMapDelivery = (
  state = INITIAL_STATE,
  { addressAndCoordinates, index }: any
) => {
  const tempPackage = asMutable(state.package, { deep: true })
  tempPackage[index].addressAndCoordinates = addressAndCoordinates

  return state.merge({ package: tempPackage })
}

export const setBikerAndRideHashDelivery = (
  state = INITIAL_STATE,
  { biker, rideHash, index }: any
) => {
  const tempPackage = asMutable(state.package, { deep: true })
  tempPackage[index].biker = biker
  tempPackage[index].rideHash = rideHash

  return state.merge({ package: tempPackage })
}

export const setPriceDelivery = (
  state = INITIAL_STATE,
  { price, index }: any
) => {
  const tempPackage = asMutable(state.package, { deep: true })
  tempPackage[index].price = price
  return state.merge({ package: tempPackage })
}

export const refreshDeliveryDataAfterQuit = (
  state = INITIAL_STATE,
  { deliveryDatas }: any
) => {
  const tempPackage = asMutable(state.package, { deep: true })

  deliveryDatas.map((deliveryData: any, index: number) => {
    const {
      coordinates,
      address,
      deliveryHash,
      biker,
      price,
      receiver,
      isDeliveryConfirmed,
      isDeliveryCancelled
    } = deliveryData

    const phone: string = biker.phone

    const tempBikerUserDetail = mapDataUserToFrontEnd(biker.userDetail)
    const tempAddressAndCoordinate = {
      address: {
        addressDestination: address.destination,
        addressOriginalLocation: address.origin
      },
      coordinates: {
        originalLat: coordinates.origin.lat,
        originalLng: coordinates.origin.lng,
        destinationLat: coordinates.destination.lat,
        destinationLng: coordinates.destination.lng
      }
    }
    const tempPackageIndex: any = {}
    tempPackageIndex.addressAndCoordinates = tempAddressAndCoordinate

    tempPackageIndex.rideHash = deliveryHash

    tempPackageIndex.biker = {
      phone,
      userDetail: tempBikerUserDetail,
      distance: 0
    }
    tempPackageIndex.price = price

    const PackageData = deliveryData.package

    tempPackageIndex.phaseBooking = mapDeliveryStateAfterRefresh({
      isDeliveryConfirmed,
      isDeliveryCancelled,
      PackageData
    })

    tempPackageIndex.receiverInfor = {
      phoneNumber: receiver.phone,
      name: receiver.name
    }

    tempPackage.push(tempPackageIndex)
  })

  return state.merge({ package: tempPackage })
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_PACKAGE_INFOR]: setPackageInfor,

  [Types.SET_PHASE_PACKAGE]: setPhasePackage,

  [Types.SET_LOCATION_BY_MAP_DELIVERY]: setLocationByMapDelivery,

  [Types.SET_BIKER_AND_RIDE_HASH_DELIVERY]: setBikerAndRideHashDelivery,

  [Types.SET_PRICE_DELIVERY]: setPriceDelivery,

  [Types.REFRESH_DELIVERY_DATA_AFTER_QUIT]: refreshDeliveryDataAfterQuit
})
