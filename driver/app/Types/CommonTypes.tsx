export type Coordinates = {
  lat: number
  lng: number
}

export type Address = {
  originAddress: string
  destinationAddress: string
}

export type UserDetail = {
  accountUsername: string
  address: string
  dateOfBirth: string
  firstName: string
  gender: boolean
  lastName: string
  phoneNumber: string
  createdDate?: string | undefined
  totalTripCustomer?: number
  totalTripRider?: number
}

export type AddressAndCoordinates = {
  address: {
    addressOriginalLocation: string | undefined
    addressDestination: string | undefined
  }
  coordinates: {
    originalLat: number
    originalLng: number
    destinationLat: number | undefined
    destinationLng: number | undefined
  }
}

export type Destination = {
  phone: string | undefined
  name: string | undefined
  destinationLat: number | undefined
  destinationLng: number | undefined
  address: string | undefined
}

export type OriginAndDestiationInfo = {
  origin: {
    originalLat: number | undefined
    originalLng: number | undefined
    address: string | undefined
  }
  list_destination: Destination[]
}

export type ReceiverInfor = {
  phoneNumber: string
  name: string
}
