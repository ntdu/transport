import {
  // HistoryByDate,
  // ReportHistory,
  RideInforState,
  UserDetail
} from '@/Types'

// export const mapHistoryToFrontEnd = (response: any): HistoryByDate => {
//   const {
//     origin_lat,
//     origin_lng,
//     destination_lng,
//     destination_lat,
//     address_origin,
//     address_destination,
//     is_ride_confirmed,
//     is_ride_cancelled,
//     price,
//     ride_hash,
//     date,
//     created_date,

//     customer_first_name,
//     customer_last_name,
//     customer_is_active,
//     customer_gender,
//     customer_phone_number,
//     customer_date_of_birth,
//     customer_address,
//     customer_email
//   } = response

//   return {
//     originLat: origin_lat,
//     originLng: origin_lng,
//     destinationLat: destination_lat,
//     destinationLng: destination_lng,
//     addressOrigin: address_origin,
//     addressDestination: address_destination,
//     isRideConfirmed: is_ride_confirmed,
//     isRideCancelled: is_ride_cancelled,
//     price,
//     rideHash: ride_hash,
//     date,
//     createdDate: created_date,
//     customerFirstName: customer_first_name,
//     customerLastName: customer_last_name,
//     customerIsActive: customer_is_active,
//     customerGender: customer_gender,
//     customerPhoneNumber: customer_phone_number,
//     customerDateOfBirth: customer_date_of_birth,
//     customerAddress: customer_address,
//     customerEmail: customer_email
//   }
// }

// export const mapReportToFrontEnd = (response: any): ReportHistory => {
//   const { date, amt, count_success, count_cancel } = response
//   return {
//     date,
//     amount: amt,
//     countSuccess: count_success,
//     countCancel: count_cancel
//   }
// }

// export const mapUserDetailToFrontEnd = (response: any): UserDetail => {
//   const { user_info, total_trip_biker, total_trip_customer } = response

//   const {
//     phone_number,
//     email,
//     first_name,
//     last_name,
//     female,
//     date_of_birth,
//     address,
//     created_date
//   } = user_info
//   console.log(user_info)
//   return {
//     accountUsername: email,
//     address,
//     dateOfBirth: date_of_birth,
//     firstName: first_name,
//     lastName: last_name,
//     gender: female,
//     phoneNumber: phone_number,
//     createdDate: created_date,
//     totalTripCustomer: total_trip_biker,
//     totalTripRider: total_trip_customer
//   }
// }

// export const mapRideDataToFrontEnd = (response: any): RideInforState => {
//   const { coordinates, address, customer, rideHash, price } = response
//   const { origin, destination } = coordinates
//   const {
//     phone_number,
//     email,
//     first_name,
//     last_name,
//     female,
//     date_of_birth,
//     created_date
//   } = customer

//   return {
//     addressAndCoordinates: {
//       address: {
//         addressDestination: address.origin,
//         addressOriginalLocation: address.destination
//       },
//       coordinates: {
//         originalLat: origin.lat,
//         originalLng: origin.lng,
//         destinationLat: destination.lat,
//         destinationLng: destination.lng
//       }
//     },

//     customer: {
//       phoneNumber: phone_number,
//       accountUsername: email,
//       firstName: first_name,
//       lastName: last_name,
//       gender: female,
//       dateOfBirth: date_of_birth,
//       createdDate: created_date,
//       address: customer.address
//     },
//     rideHash,
//     price
//   }
// }

// export const mapDeliveryDataToFrontEnd = (response: any): RideInforState => {
  export const mapDeliveryDataToFrontEnd = (response: any): any => {
  const {
    coordinates,
    address,
    sender,
    receiver,
    price,
    deliveryHash
  } = response
  const { origin, destination } = coordinates

  const {
    phone_number,
    email,
    first_name,
    last_name,
    female,
    date_of_birth,
    created_date
  } = sender

  return {
    // addressAndCoordinates: {
    //   address: {
    //     addressOriginalLocation: address.origin,
    //     addressDestination: address.destination
    //   },
    //   coordinates: {
    //     originalLat: origin.lat,
    //     originalLng: origin.lng,
    //     destinationLat: destination.lat,
    //     destinationLng: destination.lng
    //   }
    // },
    // sender: {
    //   phoneNumber: phone_number,
    //   accountUsername: email,
    //   firstName: first_name,
    //   lastName: last_name,
    //   gender: female,
    //   dateOfBirth: date_of_birth,
    //   createdDate: created_date,
    //   address: sender.address
    // },
    // package: response.package,
    // receiver: receiver,
    // rideHash: deliveryHash,
    // price
  }
}
