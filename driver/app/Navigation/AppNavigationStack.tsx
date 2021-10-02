import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

// AuthStack Screen
import SplashScreen from '@/Containers/SplashScreen'
import { AuthScreen } from '@/Containers/AuthScreen'
import { SignInScreen } from '@/Containers/SignInScreen'
import { SignUpScreen } from '@/Containers/SignUpScreen'
// import { ForgotPasswordScreen } from '@/Containers/ForgotPasswordScreen'
// import { OTPScreen } from '@/Containers/OTPScreen'

// // MainStack Screen
// import {
//   SettingScreen,
//   ProfileScreen,
//   OrderHistoryScreen,
//   NotificationScreen,
//   ChangePasswordScreen,
//   InviteFriendScreen
// } from '@/Containers/SettingScreen'
import { DashboardScreen } from '@/Containers/DashboardScreen'
import { SearchPlacesScreen } from '@/Containers/SearchPlaceScreen'
// import {
//   PhaseRenderScreen,
//   SimpleMapScreen
// } from '@/Containers/PhaseRenderScreen'
import { InforPackageScreen } from '@/Containers/InforPackageScreen'

import { DestinationScreen } from '@/Containers/DestinationScreen'

// Navigation Type
import {
  AuthStackParams,
  BookingStackParams,
  MainStackParams,
  SettingStackParams
} from './AppNavigationType'

// Navigation Screen
import {
  AppStacks,
  AuthScreens,
  BookingScreens,
  MainScreens
} from '@/Constants/AppNavigationConstants'

// Styles
import { Normalize, Colors } from '@/Themes'

// Language
import { translate } from '@/Language'
import { BButton } from '@/Components'

const Auth = createStackNavigator<AuthStackParams>()
export const AuthStack = () => {
  return (
    <Auth.Navigator
      initialRouteName={AuthScreens.SplashScreen}
      screenOptions={{
        headerShown: false
      }}
    >
      <Auth.Screen name={AuthScreens.SplashScreen} component={SplashScreen} />
      <Auth.Screen name={AuthScreens.AuthScreen} component={AuthScreen} />
      <Auth.Screen name={AuthScreens.SignInScreen} component={SignInScreen} />
      <Auth.Screen name={AuthScreens.SignUpScreen} component={SignUpScreen} />
      {/* <Auth.Screen name={AuthScreens.OTPScreen} component={OTPScreen} />
      <Auth.Screen
        name={AuthScreens.ForgotPasswordScreen}
        component={ForgotPasswordScreen}
      /> */}
    </Auth.Navigator>
  )
}

const Booking = createStackNavigator<BookingStackParams>()
export const BookingStack = () => {
  return (
    <Booking.Navigator
      initialRouteName={BookingScreens.InforPackageScreen}
      screenOptions={{
        headerShown: false
      }}
    >
      <Booking.Screen
        name={BookingScreens.DashboardScreen}
        component={DashboardScreen}
      />
      <Booking.Screen
        name={BookingScreens.InforPackageScreen}
        component={InforPackageScreen}
      />
      <Booking.Screen
        name={BookingScreens.DestinationScreen}
        component={DestinationScreen}
      />
      <Booking.Screen
        name={BookingScreens.SearchPlacesScreen}
        component={SearchPlacesScreen}
      />
      {/* <Booking.Screen
        name={BookingScreens.PhaseRenderScreen}
        component={PhaseRenderScreen}
      />
      <Booking.Screen
        name={BookingScreens.SimpleMapScreen}
        component={SimpleMapScreen}
      /> */}
    </Booking.Navigator>
  )
}

// const Setting = createStackNavigator<SettingStackParams>()
// export const SettingStack = () => {
//   return (
//     <Setting.Navigator
//       initialRouteName={'SettingScreen'}
//       screenOptions={{
//         headerStyle: {
//           height: Normalize(80),
//           // backgroundColor: Colors.royalBlue,
//           elevation: 0
//         },
//         headerTitleStyle: {
//           fontWeight: 'normal'
//         }
//       }}
//     >
//       <Setting.Screen
//         name={'SettingScreen'}
//         component={SettingScreen}
//         options={({}) => ({
//           headerTitle: translate('myProfile')
//         })}
//       />
//       <Setting.Screen
//         name={'ProfileScreen'}
//         component={ProfileScreen}
//         options={{
//           headerTitle: translate('editProfile')
//         }}
//       />
//       <Setting.Screen
//         name={'OrderHistoryScreen'}
//         component={OrderHistoryScreen}
//         options={{
//           headerTitle: translate('editProfile')
//         }}
//       />
//       <Setting.Screen
//         name={'NotificationScreen'}
//         component={NotificationScreen}
//         options={{
//           headerTitle: translate('editProfile')
//         }}
//       />
//       <Setting.Screen
//         name={'InviteFriendScreen'}
//         component={InviteFriendScreen}
//         options={{
//           headerTitle: translate('editProfile')
//         }}
//       />
//       <Setting.Screen
//         name={'ChangePasswordScreen'}
//         component={ChangePasswordScreen}
//         options={{
//           headerTitle: translate('editProfile')
//         }}
//       />
//     </Setting.Navigator>
//   )
// }

const Main = createStackNavigator<MainStackParams>()
export const MainStack = () => {
  return (
    <Main.Navigator 
      initialRouteName={'BookingStack'}
      screenOptions={{
        headerShown: false
      }}
    >
      <Main.Screen name={AppStacks.BookingStack} component={BookingStack} />
      {/* <Main.Screen name={'SettingStack'} component={SettingStack} /> */}
    </Main.Navigator>
  )
}
