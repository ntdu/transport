import React from 'react'
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
// import { AppearanceProvider } from 'react-native-appearance';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
// Theme
// import { DefaultTheme, DarkTheme } from '@/Themes';

// Constants
import { AppStacks } from '@/Constants/AppNavigationConstants';

// Navigation Stack
import { AuthStack, MainStack } from './AppNavigationStack'

// NavigationActions
// import { screenTracking } from './NavigationActions'

// Navigation Type
import { RootStackParams } from './AppNavigationType'

const Stack = createStackNavigator<RootStackParams>()
import { Text } from 'react-native';

import { DefaultTheme } from '@react-navigation/native';
const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};
const AppNavigation = () => {
  // const scheme = useColorScheme()
  // console.log(scheme);

  const scheme = 'dark';
  return (
    <SafeAreaProvider>
      {/* <AppearanceProvider>
        <NavigationContainer
          theme={
            scheme === 'dark' ? (DarkTheme as Theme) : (DefaultTheme as Theme)
          }
          // onStateChange={screenTracking}
        >
          <Stack.Navigator
            initialRouteName={AppStacks.AuthStack}
            // headerMode={'none'}
          >
            <Stack.Screen name={AppStacks.AuthStack} component={AuthStack} />
            <Stack.Screen name={AppStacks.MainStack} component={MainStack} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppearanceProvider> */}

        <NavigationContainer
            theme={MyTheme}
            // onStateChange={screenTracking}
          >
            <Stack.Navigator
              initialRouteName={AppStacks.AuthStack}
              // headerMode={'none'}
              screenOptions={{
                headerShown: false
              }}
            >
              <Stack.Screen name={AppStacks.AuthStack} component={AuthStack} />
              <Stack.Screen name={AppStacks.MainStack} component={MainStack} />
            </Stack.Navigator>
        </NavigationContainer>
      
    </SafeAreaProvider>
  )
}

export default AppNavigation
