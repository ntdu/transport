import React, { useEffect, useState } from 'react'
import {
  NavigationContainer,
  NavigationContainerRef,
  Theme
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'

import { Text } from 'react-native'
// FCM
// import {
//   getMessageHandlerOnBackground,
//   getMessageOnForeground,
//   getMessageOnBackground,
//   getMessageOnQuitWithoutInteract
// } from '@/Functions/FCMFunctions'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/Types'

// Functions
import { getAsyncStorage } from '@/Functions/AsyncStorageFunctions'

// Theme
import { DefaultTheme, DarkTheme } from '@/Themes'

// Constants
import { AppStacks, AuthScreens } from '@/Constants/AppNavigationConstants'
// import { TOKEN_IS_NOT_AUTHENTICATED_BY_SERVER_ERROR } from '@/Constants/SocketEventConstants'
import { RIDE_HASH } from '@/Constants/AsyncStorageKey'

// Navigation Stack
// import { AuthStack, BookingStack, MainStack } from './AppNavigationStack'
import { AuthStack, BookingStack, MainStack } from './AppNavigationStack'

// Navigation Type
import { RootStackParams } from './AppNavigationType'

const Stack = createStackNavigator<RootStackParams>()

const AppNavigation = () => {
  console.log("AppNavigation");

  const scheme = useColorScheme()

  // const [rideHash, setRideHash] = useState('')

  // const { errorRefreshToken } = useSelector((state: RootState) => state.auth)

  // const phase = useSelector((state: RootState) => state.phase.phase)

  const navigationRef = React.useRef<NavigationContainerRef>(null)

  // useEffect(() => {
  //   if (errorRefreshToken === TOKEN_IS_NOT_AUTHENTICATED_BY_SERVER_ERROR) {
  //     navigationRef.current?.resetRoot({
  //       index: 0,
  //       routes: [
  //         {
  //           name: AppStacks.AuthStack,
  //           params: { screen: AuthScreens.AuthScreen }
  //         }
  //       ]
  //     })
  //   }
  // }, [errorRefreshToken])

  // const getRideHashData = async () => {
  //   const rideHash = await getAsyncStorage(RIDE_HASH)

  //   if (!!rideHash) {
  //     setRideHash(rideHash)
  //   }
  // }

  // useEffect(() => {
  //   getMessageOnForeground()
  //   getMessageOnBackground(phase)

  //   getRideHashData()
  // }, [])

  // useEffect(() => {
  //   if (!!rideHash) {
  //     // ---------- This function will run when api remove ridehash done ---------------
  //     // getMessageOnQuitWithoutInteract(rideHash)
  //     // ---------- $$$$$$ ---------------

  //     getMessageHandlerOnBackground(phase, rideHash)
  //   }
  // }, [rideHash])

  return (
    <SafeAreaProvider>
      <AppearanceProvider>
        <NavigationContainer
          theme={
            scheme === 'dark' ? (DarkTheme as Theme) : (DefaultTheme as Theme)
          }
          ref={navigationRef}
          // onStateChange={screenTracking}
        >
          <Stack.Navigator
            initialRouteName={AppStacks.AuthStack}
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name={AppStacks.AuthStack} component={AuthStack} />
            <Stack.Screen name={AppStacks.MainStack} component={MainStack} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppearanceProvider>
    </SafeAreaProvider>
  )
}

export default AppNavigation
