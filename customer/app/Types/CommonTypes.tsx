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
  createdDate: string
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
