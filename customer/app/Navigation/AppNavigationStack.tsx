import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

// AuthStack Screen
import SplashScreen from '@/Containers/SplashScreen';
import { SignInScreen } from '@/Containers/SignInScreen'
import { SignUpScreen } from '@/Containers/SignUpScreen'
// import { OTPScreen } from '@/Containers/OTPScreen'
import { AuthScreen } from '@/Containers/AuthScreen'

// // MainStack Screen
import { HomeScreen } from '@/Containers/HomeScreen'
// import { RideScreen } from '@/Containers/RideScreen'
// import { PhaseRideScreen } from '@/Containers/PhaseRideScreen'
// import { PayScreen } from '@/Containers/PayScreen'

// // History Stack Screen
// import {
//   DayHistory,
//   StaticHistory,
//   HistoryDetail
// } from '@/Containers/HistoryScreen'

// // Account Stack Screen
// import { AccountScreen } from '@/Containers/AccountScreen'

// Navigation Type
// import {
//   AccountStackParams,
//   AuthStackParams,
//   HistoryMeterialTabParams,
//   HomeStackParams,
//   MainStackParams,
//   TabParams,
//   HistoryStackParams
// } from './AppNavigationType'
import {
  AuthStackParams,
  MainStackParams,
  HomeStackParams,
  TabParams,
} from './AppNavigationType'
// Navigation Screen
import { AuthScreens, MainScreens } from '@/Constants/AppNavigationConstants'

// Components
import { TabIcon, HeaderTab } from '@/Components'
import { Colors, Images } from '@/Themes'
// import { translate } from '@/Language'

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
      {/* <Auth.Screen name={AuthScreens.OTPScreen} component={OTPScreen} /> */}
    </Auth.Navigator>
  )
}
// // ---------------- History stack ---------------

// const HistoryMeterial = createMaterialTopTabNavigator<HistoryMeterialTabParams>()
// export const HistoryTab = () => {
//   return (
//     <HistoryMeterial.Navigator
//       initialRouteName={'DayHistory'}
//       tabBarOptions={{
//         activeTintColor: Colors.white,
//         inactiveTintColor: Colors.white50,
//         style: { backgroundColor: Colors.valhalla },
//         indicatorStyle: { backgroundColor: Colors.fruitSalad }
//       }}
//       swipeEnabled={false}
//     >
//       <HistoryMeterial.Screen
//         name={'DayHistory'}
//         component={DayHistory}
//         options={{ title: translate('dayHistory') }}
//       />
//       <HistoryMeterial.Screen
//         name={'StaticHistory'}
//         component={StaticHistory}
//         options={{ title: translate('static') }}
//       />
//     </HistoryMeterial.Navigator>
//   )
// }

// const renderHeader = () => <HeaderTab title={translate('history')} />

// const HistoryStack = createStackNavigator<HistoryStackParams>()
// export const History = () => {
//   return (
//     <HistoryStack.Navigator
//       initialRouteName={'History'}
//       screenOptions={{
//         header: () => renderHeader()
//       }}
//     >
//       <HistoryStack.Screen name={'History'} component={HistoryTab} />
//       <HistoryStack.Screen
//         name={'HistoryDetail'}
//         component={HistoryDetail}
//         options={{ headerShown: false }}
//       />
//     </HistoryStack.Navigator>
//   )
// }

// // ---------------- Account Stack ----------------
// const Account = createStackNavigator<AccountStackParams>()

// export const AccountStack = () => {
//   return (
//     <Account.Navigator initialRouteName={'AccountScreen'} headerMode={'none'}>
//       <Account.Screen name={'AccountScreen'} component={AccountScreen} />
//     </Account.Navigator>
//   )
// }

// // ---------------- Account Stack ----------------
const Home = createStackNavigator<HomeStackParams>()

export const HomeStack = () => {
  return (
    <Home.Navigator initialRouteName={'HomeScreen'}
      screenOptions={{
        headerShown: false
      }}
    >
      <Home.Screen name={'HomeScreen'} component={HomeScreen} />
    </Home.Navigator>
  )
}

// // ---------------- Tab ----------------

const renderTabIcon = (name: string, color: string) => {
  switch (name) {
    case 'History':
      return <TabIcon source={Images.history} color={color} />
    case 'Home':
      return <TabIcon source={Images.home} color={color} />
    case 'Account':
      return <TabIcon source={Images.profile} color={color} />
  }
}

const Tab = createBottomTabNavigator<TabParams>()
export const MainTab = () => {
  return (
    <Tab.Navigator
      // initialRouteName={'History'}
      initialRouteName={'Home'}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          return <>{renderTabIcon(route.name, color)}</>
        }
      })}
      // tabBarOptions={{
      //   activeTintColor: Colors.bahamaBlue,
      //   inactiveTintColor: Colors.nobel
      // }}
    >
      <Tab.Screen name={'Home'} component={HomeStack} />
      {/* <Tab.Screen name={'History'} component={History} /> */}
      {/* <Tab.Screen name={'Account'} component={AccountStack} /> */}
    </Tab.Navigator>
  )
}

// // ---------------- Main ----------------

// const Main = createStackNavigator<MainStackParams>()
// export const MainStack = () => {
//   console.log("------------------------------------------------------------------")
//   console.log("MainStack")
//   return (
//     <Main.Navigator initialRouteName={'TabScreen'} headerMode={'none'}>
//       <Main.Screen name={'TabScreen'} component={MainTab} />
//       <Main.Screen name={MainScreens.RideScreen} component={RideScreen} />
//       <Main.Screen
//         name={MainScreens.PhaseRideScreen}
//         component={PhaseRideScreen}
//       />
//       <Main.Screen name={'PayScreen'} component={PayScreen} />
//     </Main.Navigator>
//   )
// }
const Main = createStackNavigator<MainStackParams>()
export const MainStack = () => {
  console.log("------------------------------------------------------------------")
  console.log("MainStack")
  return (
    <Main.Navigator 
      initialRouteName={'TabScreen'} 
      screenOptions={{
        headerShown: false
      }}
    >
      <Main.Screen name={'TabScreen'} component={MainTab} />
      {/* <Main.Screen name={MainScreens.RideScreen} component={RideScreen} />
      <Main.Screen
        name={MainScreens.PhaseRideScreen}
        component={PhaseRideScreen}
      />
      <Main.Screen name={'PayScreen'} component={PayScreen} /> */}
    </Main.Navigator>
  )
}